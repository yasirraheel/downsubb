// SubDown — OUR OWN backend. The uploaded zip is ONLY a template.
// No SaveFrom backend, no SaveFrom API URLs, no third-party downloader
// API is used anywhere in this project. The only fetcher is yt-dlp
// running on OUR server, plus ffmpeg for merging when available.
// Flow (Hostinger-safe, job-based): user pastes a link ->
// POST /api/info (yt-dlp --dump-json) -> user picks quality ->
// POST /api/jobs starts the download in the BACKGROUND and returns a
// job id immediately, so Hostinger's 120-second request limit never
// kills a long download. Frontend polls GET /api/jobs/:id, and when
// ready GET /api/jobs/:id/file streams the file to the user, then the
// server deletes it.
// That server-first step is what lets a video blocked in the user's
// country still work, as long as it is available in the server's country.
// It does NOT bypass a block in the server's country too, or a private,
// login-only, or age-gated video.
import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'public');
// Job files live in the app folder by default so it works on shared
// hosting where /tmp may be restricted. Override with JOBS_DIR.
const jobsDir = process.env.JOBS_DIR || path.join(root, '.jobs');
fs.mkdirSync(jobsDir, { recursive: true });

const PORT = Number(process.env.PORT || 4175);
const HOST = process.env.HOST || '0.0.0.0';
// yt-dlp binary: env override, else bundled standalone ./yt-dlp, else PATH
const localYtDlp = path.join(root, 'yt-dlp');
const YTDLP = process.env.YTDLP || (fs.existsSync(localYtDlp) ? localYtDlp : 'yt-dlp');
// GitHub pushes lose the executable bit, which used to break yt-dlp
// with EACCES after a git pull — make sure it is executable on start.
for (const f of [localYtDlp, path.join(root, 'yt-dlp.bin')]) { try { if (fs.existsSync(f)) fs.chmodSync(f, 0o755); } catch {} }
// ffmpeg: check env, ~/bin, then PATH. Static ffmpeg 7.0.2 was
// installed on Hostinger at ~/bin/ffmpeg (no login, no API needed).
// It is used for merging AND for direct .mp4/.m3u8 links, which need
// no yt-dlp, no cookies, and no login at all.
// Under lsnode/Passenger, HOME (and os.homedir()) is the site's
// public_html dir, NOT the user home — so ~/.cookies/youtube.txt and
// ~/bin/ffmpeg were never found and YouTube fell back to the android
// client with no cookies ("Sign in to confirm you're not a bot").
// The app lives at <home>/domains/<domain>/public_html/downsub, so
// the real user home is four levels above the app root. Candidates
// are all checked for existence, so a wrong guess is just skipped.
const REAL_HOME = path.resolve(root, '..', '..', '..', '..');
const FFMPEG_CANDIDATES = [process.env.FFMPEG, path.join(root, 'ffmpeg'), path.join(REAL_HOME, 'bin', 'ffmpeg'), path.join(os.homedir(), 'bin', 'ffmpeg'), '/usr/bin/ffmpeg', 'ffmpeg'];
const FFMPEG = FFMPEG_CANDIDATES.find(p => { try { return p && spawnSync(p, ['-version'], { stdio: 'ignore' }).status === 0; } catch { return false; } }) || null;
const HAS_FFMPEG = !!FFMPEG;
// ffprobe (for verifying a finished file really is the full video):
// it ships next to ffmpeg in ~/bin, but NOT next to the app-dir ffmpeg.
const FFPROBE_CANDIDATES = [process.env.FFPROBE, FFMPEG ? FFMPEG.replace(/ffmpeg$/, 'ffprobe') : null, path.join(REAL_HOME, 'bin', 'ffprobe'), path.join(os.homedir(), 'bin', 'ffprobe'), '/usr/bin/ffprobe', 'ffprobe'];
const FFPROBE = FFPROBE_CANDIDATES.find(p => { try { return p && spawnSync(p, ['-version'], { stdio: 'ignore' }).status === 0; } catch { return false; } }) || null;
// Duration of a finished media file in seconds (null when ffprobe is
// missing or cannot read the file). Used to catch truncated downloads:
// ffmpeg can exit 0 with only the first minute of an HLS stream.
function probeDuration(file) {
  if (!FFPROBE) return null;
  try {
    const r = spawnSync(FFPROBE, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8', timeout: 15000 });
    const d = parseFloat((r.stdout || '').trim());
    return Number.isFinite(d) && d > 0 ? d : null;
  } catch { return null; }
}
// YouTube cookies (optional, for bot-check): set COOKIES_FILE in the
// environment, or put a cookies.txt next to server.mjs. The file must
// live OUTSIDE public_html so it is never web-accessible, and must
// never be committed or put in a deploy zip. It is only used by yt-dlp
// to prove to YouTube that the request comes from a logged-in account.
const COOKIES_CANDIDATES = [
  process.env.COOKIES_FILE,
  path.join(root, 'cookies.txt'),
  path.join(REAL_HOME, '.cookies', 'youtube.txt'),
  path.join(os.homedir(), '.cookies', 'youtube.txt'),
];
const COOKIES_FILE = COOKIES_CANDIDATES.find(p => p && fs.existsSync(p)) || null;
console.log(`SubDown starting: yt-dlp=${YTDLP} ffmpeg=${FFMPEG || 'none'} cookies=${COOKIES_FILE ? 'loaded' : 'none'}`);

const MAX_BYTES = Number(process.env.MAX_BYTES || 2 * 1024 * 1024 * 1024); // 2 GB
const MAX_DURATION = Number(process.env.MAX_DURATION || 3 * 60 * 60); // 3 hours

const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };
// Own-backend args, applied to every yt-dlp call. No API, no login
// is required for the server itself: yt-dlp + Deno (JS challenge
// solver, ~/bin/deno on Hostinger) + ffmpeg are all self-contained.
// The android player client is what got YouTube working from a clean
// server IP; the web client is used when cookies are present, because
// android does not support cookies.
// The cookies file is a whole-browser export: it holds YouTube login
// cookies AND stale session cookies for TikTok, Instagram, X, etc.
// Sending those stale TikTok cookies (msToken, ttwid, tt_csrf_token)
// makes TikTok answer HTTP 403 (proven 2026-11-12 on
// vt.tiktok.com/ZSpHogRWk: same link 403s with --cookies and works
// without, 6/6 in a controlled A/B test). Cookies are therefore only
// ever sent to YouTube, where they prove a logged-in account; every
// other site gets no cookies at all.
function siteArgs(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    if (h.includes('youtube') || h === 'youtu.be') {
      return COOKIES_FILE ? ['--extractor-args', 'youtube:player_client=web', '--cookies', COOKIES_FILE] : ['--extractor-args', 'youtube:player_client=android'];
    }
  } catch {}
  return [];
}
const BASE_ARGS = ['--force-ipv4', '--js-runtimes', 'deno', '--extractor-retries', '5', '--retry-sleep', 'extractor:15', ...(FFMPEG ? ['--ffmpeg-location', FFMPEG] : [])];
// Extra PATH for yt-dlp to find deno/node/ffmpeg on shared hosting.
const CHILD_PATH = [path.join(REAL_HOME, 'bin'), path.join(os.homedir(), 'bin'), '/opt/alt/alt-nodejs20/root/usr/bin', process.env.PATH].filter(Boolean).join(':');
const CHILD_ENV = { ...process.env, PATH: CHILD_PATH };

function detectPlatform(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    if (h.includes('youtube') || h === 'youtu.be') return 'YouTube';
    if (h.includes('tiktok')) return 'TikTok';
    if (h.includes('instagram')) return 'Instagram';
    if (h.includes('facebook') || h === 'fb.watch') return 'Facebook';
    if (h.includes('linkedin') || h === 'lnkd.in') return 'LinkedIn';
    if (h.includes('twitter') || h === 'x.com') return 'X / Twitter';
    if (h.includes('vimeo')) return 'Vimeo';
    if (h.includes('dailymotion')) return 'Dailymotion';
    if (h.includes('reddit')) return 'Reddit';
    if (h.includes('pinterest')) return 'Pinterest';
    if (h.includes('twitch')) return 'Twitch';
    return h;
  } catch { return 'Unknown'; }
}
function validUrl(s) { try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:'; } catch { return false; } }

function runYtDlp(args, url, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    const p = spawn(YTDLP, [...BASE_ARGS, ...siteArgs(url), ...args], { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
    let out = '', err = '';
    const t = setTimeout(() => { p.kill('SIGKILL'); reject(new Error('Timed out while talking to the video site. Try again.')); }, timeoutMs);
    p.stdout.on('data', d => { out += d; if (out.length > 5_000_000) p.kill(); });
    p.stderr.on('data', d => { err += d; });
    p.on('error', e => { clearTimeout(t); reject(new Error(`yt-dlp not found at ${YTDLP}. (${e.message})`)); });
    p.on('close', code => { clearTimeout(t); if (code === 0) resolve(out); else reject(new Error(friendlyError(err || out || `yt-dlp exited with code ${code}`, url))); });
  });
}
function friendlyError(raw, url) {
  const s = raw.toLowerCase();
  // YouTube is flagged on our server IP right now: bot-checks and
  // storyboard-only responses mean no formats, even logged in. Show a
  // clear "we are working on it" message instead of a scary error.
  if (url && detectPlatform(url) === 'YouTube' && (s.includes('sign in to confirm') || s.includes("confirm you're not a bot") || s.includes('requested format is not available') || s.includes('the page needs to be reloaded') || s.includes('storyboard'))) {
    return 'YouTube downloads are temporarily unavailable. We are working on it and they will be back soon.';
  }
  if (s.includes('not available in your country') || s.includes('blocked in your country')) return 'This video is not available in this region, so it cannot be downloaded here.';
  if (s.includes('private video') || s.includes('login required') || s.includes('sign in')) return 'This video is private or needs a login. It cannot be opened without an account.';
  if (s.includes('412') || s.includes('precondition failed')) return 'That site blocked the download request (HTTP 412). This video cannot be downloaded from here.';
  if (s.includes('age-restricted') || s.includes('age restricted') || s.includes('age gate') || s.includes('age verification')) return 'This video is age-restricted and needs a logged-in account.';
  if (s.includes('unsupported url') || s.includes('no video formats')) return 'This link is not a supported public video link, or the video has no downloadable formats.';
  if (s.includes('video unavailable') || s.includes('removed') || s.includes('deleted')) return 'This video is unavailable, removed, or deleted.';
  if (s.includes('unable to download json metadata') || s.includes('http error 400') || s.includes('bad request')) return 'This video could not be found on that site. The link may be wrong, or the video was removed.';
  if (s.includes('http error 404') || s.includes('not found')) return 'This video could not be found. Check the link and try again.';
  if (s.includes('http error 403') || s.includes('forbidden')) return 'That site refused the download. Try another link.';
  if (s.includes('timed out') || s.includes('timeout')) return 'That site took too long to respond. Please try again.';
  // A download that stopped early (truncated file) — keep the plain
  // wording so the user knows to try again, not that the link is bad.
  if (s.includes('stopped early')) return raw;
  // Never show raw yt-dlp stderr (it leaks internal paths and looks broken).
  return 'Something went wrong while checking this link. Please check the link and try again.';
}
function sendJson(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); }
function readBody(req) { return new Promise((resolve, reject) => { let b = ''; req.on('data', d => { b += d; if (b.length > 10000) req.destroy(); }); req.on('end', () => resolve(b)); req.on('error', reject); }); }
function safeName(s) { return (s || 'video').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '_').slice(0, 80) || 'video'; }
// Content-Type for a finished job file, by extension: images and PDFs
// (LinkedIn) must not be served as video/mp4, or some browsers and
// apps will not open them correctly.
function fileContentType(file) {
  const ext = path.extname(String(file || '')).toLowerCase();
  if (ext === '.mp3') return 'audio/mpeg';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.pdf') return 'application/pdf';
  return 'video/mp4';
}

function downloadArgs(url, quality, outTpl) {
  // Direct media (.mp4/.webm/...) has no height metadata, so height
  // filters match nothing ("Requested format is not available") — use best.
  if (isDirectMedia(url)) {
    if (quality === 'audio') return ['--no-playlist', '--continue', '-f', 'ba/b', '-o', outTpl, url];
    return ['--no-playlist', '--continue', '-f', 'best/b', '-o', outTpl, url];
  }
  // --continue: a retry (or a server restart) resumes the .part file
  // instead of downloading from zero again.
  if (quality === 'audio') {
    return HAS_FFMPEG
      ? ['--no-playlist', '--continue', '-f', 'ba', '-x', '--audio-format', 'mp3', '--audio-quality', '0', '-o', outTpl, url]
      : ['--no-playlist', '--continue', '-f', 'ba/b', '-o', outTpl, url];
  }
  if (HAS_FFMPEG) {
    // Format selector with full fallbacks: DASH (bv+ba) first, then best
    // single file at the wanted height, then any best. TikTok/Facebook
    // often serve single-file MP4s with no separate audio stream, so
    // the bare `bv*+ba/b` selector can fail even when the preview
    // (which only lists formats) succeeds — the extra `/best` fallback
    // covers that case.
    const h = quality === 'best' ? 1080 : (parseInt(quality, 10) || 720);
    const f = `bv*[height<=${h}]+ba/b[height<=${h}]/best[height<=${h}]/best`;
    return ['--no-playlist', '--continue', '-f', f, '--merge-output-format', 'mp4', '-o', outTpl, url];
  }
  // No ffmpeg: single pre-merged file only, up to 720p.
  const f = quality === 'best' ? 'best[height<=720]/18/b[height<=720]/best' : `best[height<=${parseInt(quality, 10) || 720}]/b[height<=${parseInt(quality, 10) || 720}]/best`;
  return ['--no-playlist', '--continue', '-f', f, '-o', outTpl, url];
}

// ---- Beeg (native, no yt-dlp: its Beeg extractor is broken) ----
// yt-dlp fails Beeg two ways: the facts API rejects ids with a leading
// zero (Go parses them as octal), and the CDN 403s fragments unless
// they carry Referer: https://beeg.com/ (yt-dlp does not send it on
// fragments, ffmpeg does). So we resolve Beeg ourselves: facts for the
// title, play_url for a signed master playlist, ffmpeg + Referer for
// the download. The signed key is IP-bound, so everything must be
// fetched from this same server.
function beegId(url) { const m = String(url).match(/beeg\.com\/(?:video\/)?-?(\d+)/i); return m ? m[1].replace(/^0+/, '') || '0' : null; }
function fetchText(url, referer, extraHeaders) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36', ...(referer ? { Referer: referer } : {}), ...(extraHeaders || {}) } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(fetchText(new URL(res.headers.location, url).toString(), referer, extraHeaders));
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      let b = ''; res.setEncoding('utf8'); res.on('data', d => { b += d; if (b.length > 5_000_000) req.destroy(); }); res.on('end', () => resolve(b));
    });
    req.on('error', reject); req.setTimeout(30000, () => req.destroy(new Error('Timed out')));
  });
}

// ---- Thumbnails via our own server (/api/thumb) ----
// Video cover images live on the platforms' CDNs (xhcdn, ytimg, ...).
// Some of those CDNs are blocked in the user's country, so the cover
// never loads in their browser even though the video itself works
// (the video is downloaded by this server). The frontend therefore
// loads every cover through /api/thumb?url=...&page=... : this server
// fetches it (it can reach the CDNs) and streams it back. Only known
// thumbnail hosts are allowed, only images, max 5 MB, cached on disk
// for 7 days so repeat views cost nothing.
const THUMB_HOSTS = ['ytimg.com', 'hdslb.com', 'xhcdn.com', 'externulls.com', 'fbcdn.net', 'cdninstagram.com', 'tiktokcdn.com', 'twimg.com', 'redd.it', 'vimeocdn.com', 'dmcdn.net', 'pinimg.com', 'userapi.com', 'vk.com', 'scdn.co', 'snapcdn.com', 'sndcdn.com', 'licdn.com', 'kick.com', 'stream.kick.com'];
const thumbsDir = path.join(root, '.thumbs');
fs.mkdirSync(thumbsDir, { recursive: true });
function thumbHostOk(hostname) {
  const h = String(hostname || '').toLowerCase();
  return THUMB_HOSTS.some(s => h === s || h.endsWith('.' + s));
}
function fetchImage(url, referer, redirectsLeft) {
  return new Promise((resolve, reject) => {
    let u; try { u = new URL(url); } catch { return reject(new Error('Bad thumbnail URL')); }
    if (!thumbHostOk(u.hostname)) return reject(new Error('Thumbnail host not allowed'));
    const lib = u.protocol === 'https:' ? https : http;
    const req = lib.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36', ...(referer ? { Referer: referer } : {}) } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (!redirectsLeft) return reject(new Error('Too many redirects'));
        return resolve(fetchImage(new URL(res.headers.location, u).toString(), referer, redirectsLeft - 1));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const type = String(res.headers['content-type'] || '');
      if (!type.startsWith('image/')) return reject(new Error('Not an image'));
      const chunks = []; let size = 0;
      res.on('data', d => { size += d.length; if (size > 5_000_000) { req.destroy(new Error('Thumbnail too large')); } else chunks.push(d); });
      res.on('end', () => resolve({ type: type.split(';')[0].trim(), buf: Buffer.concat(chunks) }));
      res.on('error', reject);
    });
    req.on('error', reject); req.setTimeout(10000, () => req.destroy(new Error('Timed out')));
  });
}
async function getBeegInfo(id) {
  const facts = JSON.parse(await fetchText(`https://store.externulls.com/facts/file/${id}`));
  const title = (facts.file?.data || []).find(d => d.cd_column === 'sf_name')?.cd_value || 'Beeg video';
  const duration = facts.file?.fl_duration || 0;
  const playRaw = (await fetchText(`https://store.externulls.com/video/play_url/${id}`)).trim();
  const master = await fetchText('https://video.beeg.com/' + playRaw, 'https://beeg.com/');
  // Master playlist: pick h264 (avc1) variants only, one per height.
  const formats = []; const seen = new Set();
  const lines = master.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/#EXT-X-STREAM-INF:.*RESOLUTION=\d+x(\d+),CODECS="avc1[^"]*"/);
    if (!m) continue;
    const height = parseInt(m[1], 10);
    if (seen.has(height) || !lines[i + 1]) continue; seen.add(height);
    let vurl = lines[i + 1].trim();
    if (vurl.startsWith('//')) vurl = 'https:' + vurl;
    else if (vurl.startsWith('/')) vurl = 'https://video.beeg.com' + vurl;
    formats.push({ label: `${height}p`, height, variantUrl: vurl });
  }
  formats.sort((a, b) => b.height - a.height);
  if (!formats.length) throw new Error('No downloadable formats found for this Beeg video.');
  // Thumbnail: Beeg's own player uses the last fc_thumbs frame at
  // thumbs.externulls.com/videos/{fileId}/{offset}.webp?size=480x{height}.
  const thumbs = facts.fc_facts?.[0]?.fc_thumbs || [];
  const offset = thumbs.length ? thumbs[thumbs.length - 1] : 0;
  const fw = facts.file?.fl_width || 1920, fh = facts.file?.fl_height || 1080;
  const thumbnail = offset ? `https://thumbs.externulls.com/videos/${id}/${offset}.webp?size=480x${Math.round(480 * fh / fw)}` : '';
  return { title, duration, formats, thumbnail };
}
function beegVariantFor(info, quality) {
  const want = quality === 'best' ? 1080 : (parseInt(quality, 10) || 720);
  const ok = info.formats.filter(f => f.height <= want);
  return (ok[0] || info.formats[info.formats.length - 1]);
}

// ---- Bilibili (native, no yt-dlp: bilibili.com answers the video
// webpage with HTTP 412 from this server's IP, so yt-dlp's extractor
// never gets past "Downloading webpage" and falls back to generic
// (no formats at all). The api.bilibili.com endpoints work fine with
// a buvid3 device cookie, and the playurl API hands back a direct
// mp4 — same native pattern as Beeg. No login: the API grants at
// most 720p anonymously, so only 720p/480p/360p are offered.
function bilibiliId(url) {
  try {
    const u = new URL(url);
    if (!/(\.|^)bilibili\.com$/.test(u.hostname)) return null;
    const m = u.pathname.match(/\/video\/(BV[\w]+|av\d+)/i);
    if (!m) return null;
    const id = m[1];
    return /^bv/i.test(id) ? { bvid: id } : { aid: id.slice(2) };
  } catch { return null; }
}
async function bilibiliApi(path, buvid3) {
  const text = await fetchText('https://api.bilibili.com' + path, 'https://www.bilibili.com/', {
    ...(buvid3 ? { Cookie: `buvid3=${buvid3}` } : {}),
  });
  const j = JSON.parse(text);
  if (j.code !== 0) throw new Error('Bilibili API error: ' + (j.message || j.code));
  return j.data;
}
async function getBilibiliInfo(id) {
  // Device cookie first: without buvid3 the API returns a block page.
  const spi = JSON.parse(await fetchText('https://api.bilibili.com/x/frontend/finger/spi'));
  const buvid3 = spi?.data?.b_3 || '';
  const q = id.bvid ? `bvid=${id.bvid}` : `aid=${id.aid}`;
  const view = await bilibiliApi(`/x/web-interface/view?${q}`, buvid3);
  const cid = view.pages?.[0]?.cid || view.cid;
  if (!cid) throw new Error('No video found for this Bilibili link.');
  return {
    title: view.title || 'Bilibili video',
    duration: view.duration || 0,
    thumbnail: (view.pic || '').replace(/^http:/, 'https:'),
    formats: [{ label: '720p', height: 720 }, { label: '480p', height: 480 }, { label: '360p', height: 360 }],
    buvid3, cid, bvid: id.bvid, aid: id.aid,
  };
}
function bilibiliQn(quality) {
  // qn codes: 16=360p, 32=480p, 64=720p, 80=1080p (needs login; the
  // API downgrades anonymous requests to 720p, so ask for 80 = best).
  // `quality` is a height ('best', '720', '480', '360'), not a qn
  // code — compare against heights, then map to the qn code.
  const wantHeight = quality === 'best' ? 720 : (parseInt(quality, 10) || 720);
  if (wantHeight >= 720) return 80;
  if (wantHeight >= 480) return 32;
  return 16;
}
async function bilibiliFileUrl(info, quality) {
  const q = info.bvid ? `bvid=${info.bvid}` : `aid=${info.aid}`;
  const data = await bilibiliApi(`/x/player/playurl?${q}&cid=${info.cid}&qn=${bilibiliQn(quality)}&fnval=1`, info.buvid3);
  const durl = data.durl?.[0];
  if (!durl?.url) throw new Error('No downloadable file for this Bilibili video.');
  return { url: durl.url, size: durl.size || 0 };
}
function runBilibiliJob(job, jobDir) {
  getBilibiliInfo(bilibiliId(job.url)).then(async info => {
    try {
      const { url: fileUrl, size: expectedSize } = await bilibiliFileUrl(info, job.quality);
      const mp4File = path.join(jobDir, `${safeName(info.title)}.mp4`);
      const mp3File = path.join(jobDir, `${safeName(info.title)}.mp3`);
      // -reconnect: Bilibili's CDN sometimes drops the connection
      // mid-file (a test download stopped at 63/80 MB) and ffmpeg
      // still exits 0, so a truncated file would be served as ready.
      const p = spawn(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'info', '-headers', 'Referer: https://www.bilibili.com/', '-user_agent', 'Mozilla/5.0', '-reconnect', '1', '-reconnect_streamed', '1', '-reconnect_delay_max', '5', '-i', fileUrl, '-c', 'copy', mp4File], { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
      job.proc = p;
      let err = '';
      const dur = info.duration || 0;
      p.stderr.on('data', d => {
        err += d;
        const m = err.match(/time=(\d+):(\d+):(\d+(?:\.\d+)?)/g);
        if (m && dur) {
          const last = m[m.length - 1].match(/time=(\d+):(\d+):(\d+(?:\.\d+)?)/);
          const secs = (+last[1]) * 3600 + (+last[2]) * 60 + parseFloat(last[3]);
          job.progress = Math.min(99, Math.round(secs / dur * 100));
        } else if (m) job.progress = 50;
      });
      p.on('error', e => { job.status = 'error'; job.error = `ffmpeg not found. (${e.message})`; pumpQueue(); });
      p.on('close', code => {
        job.proc = null;
        if (job.status === 'cancelled') return;
        if (code !== 0) { finishJob(job, jobDir, err || `ffmpeg exited with code ${code}`); return; }
        // The API grants 720p most of the time but sometimes hands
        // back a lower-quality file, and a dropped connection can
        // still exit 0 — so check the size before calling it ready.
        if (expectedSize > 0) {
          let got = 0; try { got = fs.statSync(mp4File).size; } catch {}
          if (got < expectedSize * 0.9) {
            job.status = 'error';
            job.error = 'The download stopped early (only part of the video arrived). Please try again.';
            try { fs.rmSync(mp4File, { force: true }); } catch {}
            pumpQueue(); return;
          }
        }
        if (job.quality === 'audio') {
          const c = spawn(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', '-i', mp4File, '-vn', '-c:a', 'libmp3lame', '-q:a', '2', mp3File], { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
          job.proc = c;
          let cerr = '';
          c.stderr.on('data', d => { cerr += d; });
          c.on('error', e => { job.status = 'error'; job.error = `ffmpeg not found. (${e.message})`; pumpQueue(); });
          c.on('close', ccode => {
            job.proc = null;
            if (job.status === 'cancelled') return;
            if (ccode !== 0) { finishJob(job, jobDir, cerr || `ffmpeg exited with code ${ccode}`); return; }
            try { fs.rmSync(mp4File, { force: true }); } catch {}
            finishJob(job, jobDir, null);
          });
          return;
        }
        finishJob(job, jobDir, null);
      });
    } catch (e) { job.status = 'error'; job.error = 'This Bilibili video could not be downloaded. The link may be wrong, or the video was removed.'; pumpQueue(); }
  }).catch(e => { job.status = 'error'; job.error = 'This Bilibili video could not be found. The link may be wrong, or the video was removed.'; pumpQueue(); });
}
// ---- LinkedIn (native, no yt-dlp: yt-dlp has no LinkedIn extractor,
// so every LinkedIn link failed with "unsupported URL". A public post
// page is plain HTML with the media URLs embedded in it, no login
// needed: videos are direct dms.licdn.com mp4 files (one per quality),
// images are media.licdn.com dms/image files, and document posts
// expose a manifest whose transcribedDocumentUrl is the real PDF.
// Same native pattern as Beeg / Bilibili: fetch the page, pull the
// file URLs out, download them directly from this server. Private
// posts show a login wall instead of media, so they still fail with a
// clear message. lnkd.in short links are resolved first.
function linkedinPostUrl(url) {
  try {
    const u = new URL(url);
    const h = u.hostname.replace(/^www\./, '').toLowerCase();
    if (h === 'linkedin.com' || h.endsWith('.linkedin.com')) {
      if (/\/posts\//.test(u.pathname) || /\/feed\/update\/urn:li:(activity|ugcPost):/.test(u.pathname) || /\/embed\/feed\/update\//.test(u.pathname)) {
        return 'https://www.linkedin.com' + u.pathname.replace(/\/$/, '');
      }
      return null;
    }
    if (h === 'lnkd.in') return 'SHORT:' + url;
    return null;
  } catch { return null; }
}
function resolveRedirects(url, left) {
  return new Promise((resolve, reject) => {
    let u; try { u = new URL(url); } catch { return reject(new Error('Bad URL')); }
    const lib = u.protocol === 'https:' ? https : http;
    const req = lib.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if ((left ?? 5) <= 0) return reject(new Error('Too many redirects'));
        res.resume();
        return resolve(resolveRedirects(new URL(res.headers.location, u).toString(), (left ?? 5) - 1));
      }
      res.resume();
      resolve(u.toString());
    });
    req.on('error', reject); req.setTimeout(20000, () => req.destroy(new Error('Timed out')));
  });
}
function decodeEntities(s) {
  return String(s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
function parseIsoDuration(s) {
  const m = String(s || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
  if (!m || (!m[1] && !m[2] && !m[3])) return 0;
  return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + parseFloat(m[3] || 0);
}
async function getLinkedInInfo(pageUrl) {
  const raw = await fetchText(pageUrl, 'https://www.linkedin.com/');
  const html = decodeEntities(raw);
  // Title: og:title is the post text (or "Doc title | Author" for
  // documents). The page's JSON "name" fields are other people's
  // names (commenters), so never use those for the title.
  let title = 'LinkedIn post';
  const og = raw.match(/<meta property="og:title" content="([^"]+)"/);
  if (og) {
    let t = decodeEntities(og[1]).replace(/\s*\|\s*LinkedIn\s*$/i, '').replace(/\s+/g, ' ').trim();
    if (t.length > 100) t = t.slice(0, 100).replace(/\s+\S*$/, '').trim(); // cut at a word boundary
    title = t || title;
  }
  // Duration: JSON-LD "duration":"PT1M33S" on video posts.
  let duration = 0;
  const dm = html.match(/"duration"\s*:\s*"(PT[^"]+)"/);
  if (dm) duration = parseIsoDuration(dm[1]);
  // Thumbnail: video cover first, else first post image.
  let thumbnail = '';
  const tc = html.match(/https:\/\/media\.licdn\.com\/dms\/image\/v2\/[^\s"<>]*videocover-high[^\s"<>]*/);
  if (tc) thumbnail = tc[0];
  // Videos: direct dms.licdn.com mp4 files, one per quality.
  const videos = [];
  const vseen = new Set();
  for (const v of html.match(/https:\/\/dms\.licdn\.com\/playlist\/vid\/v2\/[^\s"<>]+/g) || []) {
    const q = v.match(/\/mp4-(\d+)p-/);
    if (!q) continue;
    const height = parseInt(q[1], 10);
    if (vseen.has(height)) continue; vseen.add(height);
    videos.push({ label: `${height}p`, height, fileUrl: v });
  }
  videos.sort((a, b) => b.height - a.height);
  // Images: media.licdn.com dms/image files, one per asset, largest
  // size variant. Profile photos, backgrounds and video covers are
  // not post images. URL shape: /dms/image/v2/<assetId>/<size-seg>/...
  const byId = new Map();
  for (const im of html.match(/https:\/\/media\.licdn\.com\/dms\/image\/v2\/[^\s"<>]+/g) || []) {
    if (/profile-displayphoto|profile-displaybackgroundimage|videocover|thumbnail-with-play-button/.test(im)) continue;
    const parts = im.split('/');
    const id = parts[6] || '';
    const seg = parts[7] || '';
    const w = (seg.match(/_(\d+)(?:_\d+)?$/) || [])[1];
    const width = w ? parseInt(w, 10) : 0;
    const cur = byId.get(id);
    if (!cur || width > cur.width) byId.set(id, { url: im, width });
  }
  const images = [...byId.values()].map((x, i) => ({ label: `Image ${i + 1}`, height: `image${i + 1}`, fileUrl: x.url }));
  // Document: the manifest's transcribedDocumentUrl is the real PDF.
  let doc = null;
  const dman = html.match(/https:\/\/media\.licdn\.com\/dms\/document\/pl\/v2\/[^\s"<>]*feedshare-document-master-manifest[^\s"<>]*/);
  if (dman) {
    try {
      const manifest = JSON.parse(await fetchText(dman[0], 'https://www.linkedin.com/'));
      if (manifest.transcribedDocumentUrl) doc = { label: 'Document (PDF)', height: 'doc', fileUrl: manifest.transcribedDocumentUrl };
    } catch {}
  }
  if (!thumbnail && images.length) thumbnail = images[0].fileUrl;
  if (!thumbnail) {
    const ogi = raw.match(/<meta property="og:image" content="([^"]+)"/);
    if (ogi) thumbnail = decodeEntities(ogi[1]);
  }
  const formats = [...videos, ...images, ...(doc ? [doc] : [])];
  if (!formats.length) throw new Error('No downloadable media found in this LinkedIn post.');
  const mediaKind = videos.length ? 'video' : (images.length ? 'image' : 'document');
  return { title, duration, thumbnail, formats, mediaKind };
}
function downloadToFile(url, dest, onProgress) {
  return new Promise((resolve, reject) => {
    let u; try { u = new URL(url); } catch { return reject(new Error('Bad download URL')); }
    const lib = u.protocol === 'https:' ? https : http;
    const req = lib.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36', Referer: 'https://www.linkedin.com/' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(downloadToFile(new URL(res.headers.location, u).toString(), dest, onProgress));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const total = parseInt(res.headers['content-length'] || '0', 10) || 0;
      let got = 0;
      const ws = fs.createWriteStream(dest);
      res.on('data', d => { got += d.length; if (onProgress) onProgress(got, total); });
      res.pipe(ws);
      ws.on('finish', () => resolve({ size: got, type: res.headers['content-type'] || '' }));
      ws.on('error', reject);
      res.on('error', reject);
    });
    req.on('error', reject); req.setTimeout(120000, () => req.destroy(new Error('Timed out')));
  });
}
async function runLinkedInJob(job, jobDir) {
  try {
    let pageUrl = linkedinPostUrl(job.url);
    if (pageUrl && pageUrl.startsWith('SHORT:')) pageUrl = linkedinPostUrl(await resolveRedirects(pageUrl.slice(6)));
    if (!pageUrl) throw new Error('Not a LinkedIn post link.');
    const info = await getLinkedInInfo(pageUrl);
    const q = job.quality || 'best';
    let fmt;
    if (q === 'audio') fmt = info.formats.find(f => typeof f.height === 'number');
    else if (q === 'best') fmt = info.formats.find(f => typeof f.height === 'number') || info.formats[0];
    else fmt = info.formats.find(f => String(f.height) === String(q));
    if (!fmt) throw new Error('That quality is no longer available for this post.');
    job.duration = info.duration || 0;
    try { fs.writeFileSync(path.join(jobDir, 'meta.json'), JSON.stringify({ url: job.url, quality: job.quality, duration: job.duration, createdAt: job.createdAt || Date.now() })); } catch {}
    const base = safeName(info.title);
    if (q === 'audio') {
      // Download the best video, then extract MP3 (same as Bilibili).
      const mp4File = path.join(jobDir, `${base}.mp4`);
      await downloadToFile(fmt.fileUrl, mp4File, (got, total) => { if (total) job.progress = Math.min(90, Math.round(got / total * 90)); });
      const mp3File = path.join(jobDir, `${base}.mp3`);
      const c = spawn(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', '-i', mp4File, '-vn', '-c:a', 'libmp3lame', '-q:a', '2', mp3File], { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
      job.proc = c;
      let cerr = '';
      c.stderr.on('data', d => { cerr += d; });
      c.on('error', e => { job.status = 'error'; job.error = `ffmpeg not found. (${e.message})`; pumpQueue(); });
      c.on('close', ccode => {
        job.proc = null;
        if (job.status === 'cancelled') return;
        if (ccode !== 0) { finishJob(job, jobDir, cerr || `ffmpeg exited with code ${ccode}`); return; }
        try { fs.rmSync(mp4File, { force: true }); } catch {}
        finishJob(job, jobDir, null);
      });
      return;
    }
    const isImage = String(fmt.height).startsWith('image');
    const isDoc = fmt.height === 'doc';
    const outFile = path.join(jobDir, isImage ? `${base}-${fmt.height}.jpg` : `${base}.${isDoc ? 'pdf' : 'mp4'}`);
    const { type } = await downloadToFile(fmt.fileUrl, outFile, (got, total) => { if (total) job.progress = Math.min(99, Math.round(got / total * 100)); else job.progress = 50; });
    // The image CDN always serves JPEG; if it ever says otherwise,
    // rename to the right extension so the file opens correctly.
    if (isImage && type) {
      const realExt = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : (type.includes('jpeg') || type.includes('jpg')) ? 'jpg' : null;
      if (realExt && realExt !== 'jpg') { try { fs.renameSync(outFile, outFile.replace(/\.jpg$/, '.' + realExt)); } catch {} }
    }
    finishJob(job, jobDir, null);
  } catch (e) {
    job.status = 'error';
    job.error = 'This LinkedIn post could not be downloaded. The link may be wrong, or the post is private.';
    pumpQueue();
  }
}
function isDirectMedia(url) {
  try { const p = new URL(url).pathname.toLowerCase(); return /\.(mp4|webm|mov|mkv|m3u8|mp3|m4a|wav|avi)$/.test(p); } catch { return false; }
}
// Pick the file a job should serve: a real video file first (largest),
// never an audio-only part left behind when a merge did not run. A direct
// audio link (e.g. a pasted .mp3) is fine when its extension matches the URL.
// NEVER pick an unmerged yt-dlp part: when yt-dlp downloads video+audio
// separately it writes "<title>.f<format-id>.mp4" parts and merges them
// into "<title>.mp4". A deploy restart can kill yt-dlp between the
// downloads and the merge, leaving a complete VIDEO-ONLY part on disk
// (2026-11-12: an X video job was marked "ready" from its .fhls-807.mp4
// part while the audio was still a .part file, so the user got a silent
// video). recoverJobs() must resume such a job, not serve the part — so
// part files are invisible here, and only the merged "<title>.mp4" (no
// ".f<id>" segment) counts as finished. The ".f<id>" shape is kept
// tight (digits / hls-… / http-… / sbN) so a title that merely ends in
// ".f…" is not mistaken for a part.
const PART_FILE = /\.f(?:\d+|hls-[\w-]+|http-[\w-]+|sb\d+)\.(mp4|webm|mkv|mov)$/i;
function pickJobFile(job, jobDir) {
  const files = fs.readdirSync(jobDir).filter(f => fs.statSync(path.join(jobDir, f)).isFile() && f !== 'meta.json' && !f.endsWith('.part') && !f.endsWith('.ytdl') && !f.endsWith('.temp') && !PART_FILE.test(f));
  if (!files.length) return null;
  const videoExts = ['.mp4', '.webm', '.mkv', '.mov'];
  let pool = files.filter(f => videoExts.includes(path.extname(f).toLowerCase()));
  if (!pool.length) {
    let urlExt = ''; try { urlExt = path.extname(new URL(job.url).pathname).toLowerCase(); } catch {}
    if (urlExt) pool = files.filter(f => path.extname(f).toLowerCase() === urlExt);
  }
  if (!pool.length && job.quality === 'audio') pool = files;
  // LinkedIn image/document jobs: the finished file is a .jpg/.png/
  // .webp image or a .pdf, never a video — so the video pool above is
  // empty by design. (Only these qualities take this branch, so a
  // video job that produced no video still errors instead of serving
  // a stray thumbnail as "ready".)
  if (!pool.length && (job.quality === 'doc' || /^image\d+$/.test(String(job.quality || '')))) pool = files.filter(f => ['.jpg', '.jpeg', '.png', '.webp', '.pdf'].includes(path.extname(f).toLowerCase()));
  if (!pool.length) return null;
  pool.sort((a, b) => fs.statSync(path.join(jobDir, b)).size - fs.statSync(path.join(jobDir, a)).size);
  return path.join(jobDir, pool[0]);
}
function finishJob(job, jobDir, errText) {
  if (job.status === 'error') return;
  if (errText) { job.status = 'error'; job.error = friendlyError(errText, job.url); pumpQueue(); return; }
  try {
    // Finished media only: ignore resume state (.part/.ytdl) and meta.json.
    const file = pickJobFile(job, jobDir);
    if (!file) {
      const anyFile = fs.readdirSync(jobDir).some(f => f !== 'meta.json' && !f.endsWith('.part') && !f.endsWith('.ytdl') && !f.endsWith('.temp'));
      job.status = 'error';
      job.error = anyFile ? 'The video could not be prepared (merging failed). Please try again.' : 'The download finished but no file was created.';
      pumpQueue(); return;
    }
    // A truncated file must never be served as "ready": ffmpeg can exit
    // 0 with only the first minute of an HLS stream, and a server
    // restart can recover a half-written file the same way. When the
    // expected duration is known, verify the real one; if it is much
    // shorter, drop the partial file and report an error so a retry
    // fetches it fresh.
    if (job.duration > 0) {
      const got = probeDuration(file);
      if (got !== null && got < job.duration * 0.85) {
        try { fs.unlinkSync(file); } catch {}
        job.status = 'error';
        job.error = `The download stopped early (only ${Math.round(got)}s of ${Math.round(job.duration)}s). Please try again.`;
        pumpQueue(); return;
      }
    }
    job.size = fs.statSync(file).size;
    if (job.size > MAX_BYTES) { job.status = 'error'; job.error = 'File is too large to send (over 2 GB).'; pumpQueue(); return; }
    job.file = file;
    job.name = `${safeName(path.basename(file, path.extname(file)))}.${path.extname(file).slice(1) || 'mp4'}`;
    job.status = 'ready'; job.progress = 100;
  } catch (e) { job.status = 'error'; job.error = e.message; }
  pumpQueue();
}

// ---- background jobs ----
const jobs = new Map(); // id -> {id, url, quality, status, progress, error, file, size, name, createdAt}
// Download queue: at most MAX_CONCURRENT downloads run at once, the
// rest wait in line with status 'queued' (oldest first). This keeps
// the site up when many users download at once: a burst of 50 users
// means 5 downloading and 45 waiting, not 50 yt-dlp processes at
// once on shared hosting. The queue lives inside this process: every
// download finishing frees a slot and pumps the queue, and
// recoverJobs() re-queues anything left over after a restart, so no
// cron job is needed to run it.
const MAX_CONCURRENT = Number(process.env.MAX_CONCURRENT_DOWNLOADS || 5);
function activeDownloads() { let n = 0; for (const j of jobs.values()) if (j.status === 'downloading') n++; return n; }
function queuePositionOf(job) {
  const q = [...jobs.values()].filter(j => j.status === 'queued').sort((a, b) => a.createdAt - b.createdAt);
  return q.findIndex(j => j.id === job.id) + 1;
}
function pumpQueue() {
  while (activeDownloads() < MAX_CONCURRENT) {
    const next = [...jobs.values()].filter(j => j.status === 'queued').sort((a, b) => a.createdAt - b.createdAt)[0];
    if (!next) return;
    next.status = 'downloading';
    dispatchJob(next, path.join(jobsDir, next.id));
  }
}
// One job id per link+quality, so a retry resumes the same .part files.
function jobIdFor(url, quality) { return crypto.createHash('sha256').update(url + '|' + quality).digest('hex').slice(0, 16); }
function parseProgress(job, text) {
  const m = text.match(/\[download\]\s+(\d+(?:\.\d+)?)%/g);
  if (m) { const last = m[m.length - 1].match(/(\d+(?:\.\d+)?)%/); if (last) job.progress = Math.round(parseFloat(last[1])); }
}
function runYtDlpJob(job, jobDir) {
  const outTpl = path.join(jobDir, '%(title)s.%(ext)s');
  // A site sometimes briefly refuses this server's IP (TikTok answered
  // HTTP 403 on 2026-11-12 18:25 PKT for vt.tiktok.com/ZSpHogRWk, then
  // the identical download worked 3 minutes later; yt-dlp also warns
  // that no impersonation target is available, so TikTok can 403 on
  // TLS fingerprint). Failing the job at once makes the user tap
  // "Download again" for a block that lifts on its own, so transient
  // failures are retried in the background instead.
  const isTransientError = s => {
    const t = (s || '').toLowerCase();
    return t.includes('403') || t.includes('forbidden') || t.includes('412') || t.includes('precondition failed') || t.includes('429') || t.includes('too many requests') || t.includes('timed out') || t.includes('timeout') || t.includes('connection reset') || t.includes('connection refused') || t.includes('temporary failure') || t.includes('http error 500') || t.includes('http error 502') || t.includes('http error 503') || t.includes('http error 504') || t.includes('bad gateway') || t.includes('service unavailable');
  };
  const JOB_MAX_ATTEMPTS = 3; // first try + 2 retries
  const JOB_RETRY_DELAYS = [30000, 60000]; // wait 30s, then 60s
  job.attempts = (job.attempts || 0) + 1;
  // --referer: the video page itself. Some CDNs refuse fragment
  // requests without a Referer (RedTube's rdtcdn answers 410 Gone,
  // so yt-dlp retries every fragment 10x and the job sits at 0%
  // forever — proven 2026-11-12 on redtube.com/189933211). Sending
  // the page URL as Referer is standard and harmless for other sites.
  const p = spawn(YTDLP, [...BASE_ARGS, ...siteArgs(job.url), '--referer', job.url, ...downloadArgs(job.url, job.quality, outTpl)], { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
  job.proc = p;
  let err = '';
  p.stdout.on('data', d => parseProgress(job, d.toString()));
  p.stderr.on('data', d => { err += d; parseProgress(job, err); });
  p.on('error', e => { job.status = 'error'; job.error = `yt-dlp not found at ${YTDLP}. (${e.message})`; pumpQueue(); });
  p.on('close', code => {
    job.proc = null;
    if (job.status === 'error' || job.status === 'cancelled') return;
    if (code !== 0) {
      const msg = err || `yt-dlp exited with code ${code}`;
      if (isTransientError(msg) && (job.attempts || 1) < JOB_MAX_ATTEMPTS) {
        const delay = JOB_RETRY_DELAYS[(job.attempts || 1) - 1] || 60000;
        console.log(`[job ${job.id}] transient failure (attempt ${job.attempts}), retrying in ${delay / 1000}s`);
        setTimeout(() => { if (job.status !== 'cancelled') runYtDlpJob(job, jobDir); }, delay);
        return;
      }
      job.status = 'error'; job.error = friendlyError(msg, job.url); pumpQueue(); return;
    }
    finishJob(job, jobDir, null);
  });
}
// Start the actual download for a job (yt-dlp, or the native Beeg /
// Bilibili / direct-media paths). Called by startJob when a slot is
// free, and by pumpQueue() when a queued job reaches the front.
function dispatchJob(job, jobDir) {
  const url = job.url;
  // Beeg: native ffmpeg download (yt-dlp cannot do it: broken extractor
  // + CDN 403s fragments without a Referer, which ffmpeg sends).
  const bid = beegId(url);
  if (bid && FFMPEG) {
    getBeegInfo(bid).then(info => {
      const variant = beegVariantFor(info, job.quality);
      const outFile = path.join(jobDir, `${safeName(info.title)}.mp4`);
      // Remember the expected duration on the job (and on disk) so
      // finishJob can reject a truncated file — including one recovered
      // after a server restart, where the close handler never runs.
      job.duration = info.duration || 0;
      try { fs.writeFileSync(path.join(jobDir, 'meta.json'), JSON.stringify({ url, quality: job.quality, duration: job.duration, createdAt: job.createdAt || Date.now() })); } catch {}
      const args = ['-y', '-hide_banner', '-loglevel', 'info', '-headers', 'Referer: https://beeg.com/', '-user_agent', 'Mozilla/5.0', '-i', variant.variantUrl, '-c', 'copy', outFile];
      const p = spawn(FFMPEG, args, { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
      job.proc = p;
      let err = '';
      const dur = info.duration || 0;
      p.stderr.on('data', d => {
        err += d;
        const m = err.match(/time=(\d+):(\d+):(\d+(?:\.\d+)?)/g);
        if (m && dur) {
          const last = m[m.length - 1].match(/time=(\d+):(\d+):(\d+(?:\.\d+)?)/);
          const secs = (+last[1]) * 3600 + (+last[2]) * 60 + parseFloat(last[3]);
          job.progress = Math.min(99, Math.round(secs / dur * 100));
        } else if (m) job.progress = 50;
      });
      p.on('error', e => { job.status = 'error'; job.error = `ffmpeg not found. (${e.message})`; pumpQueue(); });
      p.on('close', code => {
        job.proc = null; if (job.status === 'cancelled') return;
        if (code !== 0) { finishJob(job, jobDir, err || `ffmpeg exited with code ${code}`); return; }
        // finishJob verifies the real duration against job.duration
        // (set above) and rejects a truncated file, so a retry fetches
        // it fresh instead of serving the partial file as "ready".
        finishJob(job, jobDir, null);
      });
    }).catch(e => { job.status = 'error'; job.error = 'This Beeg video could not be found. The link may be wrong, or the video was removed.'; pumpQueue(); });
    return;
  }
  // Bilibili: native API download (yt-dlp cannot: bilibili.com 412s
  // the webpage from this IP, so it finds no formats at all).
  const bili = bilibiliId(url);
  if (bili && FFMPEG) { runBilibiliJob(job, jobDir); return; }
  // LinkedIn: native direct download (yt-dlp has no LinkedIn
  // extractor, so every LinkedIn link fails there).
  if (linkedinPostUrl(url)) { runLinkedInJob(job, jobDir); return; }
  // Direct media: ffmpeg trick, no login/API.
  if (isDirectMedia(url) && FFMPEG) {
    const ext = new URL(url).pathname.split('.').pop().toLowerCase().split('?')[0] || 'mp4';
    const outFile = path.join(jobDir, `video.${ext === 'm3u8' ? 'mp4' : ext}`);
    const args = ['-y', '-user_agent', 'Mozilla/5.0', '-i', url, '-c', 'copy', outFile];
    const p = spawn(FFMPEG, args, { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
    job.proc = p;
    let err = '';
    p.stderr.on('data', d => { err += d; const m = err.match(/time=(\d+):(\d+):(\d+)/g); if (m) job.progress = 50; });
    p.on('error', e => { job.status = 'error'; job.error = `ffmpeg not found. (${e.message})`; pumpQueue(); });
    p.on('close', code => { job.proc = null; if (job.status === 'cancelled') return; if (code !== 0) finishJob(job, jobDir, err || `ffmpeg exited with code ${code}`); else finishJob(job, jobDir, null); });
    return;
  }
  runYtDlpJob(job, jobDir);
}
function startJob(url, quality) {
  const id = jobIdFor(url, quality);
  const jobDir = path.join(jobsDir, id);
  fs.mkdirSync(jobDir, { recursive: true });
  // Keep the link on disk so a server restart can resume this job.
  try { fs.writeFileSync(path.join(jobDir, 'meta.json'), JSON.stringify({ url, quality, createdAt: Date.now() })); } catch {}
  const existing = jobs.get(id);
  if (existing && (existing.status === 'downloading' || existing.status === 'queued' || existing.status === 'ready')) return existing;
  const job = { id, url, quality, duration: 0, status: 'queued', progress: 0, error: null, file: null, size: 0, name: null, createdAt: Date.now() };
  jobs.set(id, job);
  pumpQueue();
  return job;
}
// Resume jobs that were downloading when the server restarted: the
// .part files are still on disk and yt-dlp --continue picks them up.
function recoverJobs() {
  try {
    for (const id of fs.readdirSync(jobsDir)) {
      const dir = path.join(jobsDir, id);
      let meta; try { meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8')); } catch { continue; }
      if (!meta || !meta.url || jobs.has(id)) continue;
      const finished = !!pickJobFile({ url: meta.url, quality: meta.quality || 'best' }, dir);
      const job = { id, url: meta.url, quality: meta.quality || 'best', duration: meta.duration || 0, status: finished ? 'ready' : 'queued', progress: finished ? 100 : 0, error: null, file: null, size: 0, name: null, createdAt: meta.createdAt || Date.now() };
      jobs.set(id, job);
      if (finished) finishJob(job, dir, null);
    }
  } catch {}
  pumpQueue();
}
recoverJobs();
function cleanupJob(id) {
  const job = jobs.get(id); if (!job) return;
  jobs.delete(id);
  if (job.file) { try { fs.rmSync(path.dirname(job.file), { recursive: true, force: true }); } catch {} }
  pumpQueue();
}
// Clean up old jobs every hour. Ready files stay 24 hours so the
// browser queue ("Your downloads") still works on a later visit;
// downloading/error jobs expire after 1 hour.
setInterval(() => {
  const now = Date.now();
  for (const [id, job] of jobs) {
    const ttl = job.status === 'ready' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
    if (now - job.createdAt > ttl) cleanupJob(id);
  }
}, 60 * 60 * 1000);

const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, `http://${req.headers.host}`);
    // www -> non-www (SEO: one canonical host; only vidsnap.online,
    // the downsub host keeps serving as-is).
    if (req.headers.host === 'www.vidsnap.online') {
      res.writeHead(301, { Location: 'https://vidsnap.online' + u.pathname + u.search }); res.end(); return;
    }
    if (req.method === 'GET' && (u.pathname === '/' || u.pathname === '/index.html')) {
      res.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache, must-revalidate' }); fs.createReadStream(path.join(publicDir, 'index.html')).pipe(res); return;
    }
    if (req.method === 'GET' && (u.pathname === '/terms' || u.pathname === '/privacy')) {
      const f = path.join(publicDir, u.pathname.slice(1) + '.html');
      res.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache, must-revalidate' }); fs.createReadStream(f).pipe(res); return;
    }
    if (req.method === 'GET' && !u.pathname.startsWith('/api/')) {
      // Static assets from public/ (exact template design: /build, /img, /font, /js, /subdown.js)
      const rel = u.pathname === '/' || u.pathname === '/index.html' ? 'index.html' : u.pathname.replace(/^\/+/, '');
      let f = path.resolve(publicDir, rel);
      if (!f.startsWith(publicDir) || !fs.existsSync(f)) {
        // Unknown page: a real branded 404 (SEO: no more soft-404 homepage).
        res.writeHead(404, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache, must-revalidate' }); fs.createReadStream(path.join(publicDir, '404.html')).pipe(res); return;
      }
      if (fs.statSync(f).isDirectory()) {
        // /youtube-video-downloader -> /youtube-video-downloader/ (canonical trailing slash)
        if (!u.pathname.endsWith('/')) { res.writeHead(301, { Location: u.pathname + '/' + u.search }); res.end(); return; }
        f = path.join(f, 'index.html');
        if (!fs.existsSync(f)) { res.writeHead(404, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache, must-revalidate' }); fs.createReadStream(path.join(publicDir, '404.html')).pipe(res); return; }
      }
      const headers = { 'Content-Type': mime[path.extname(f)] || 'application/octet-stream' };
      // Versioned assets (?v=) are immutable: the ?v= bump rule guarantees
      // a new URL on every change, so long caching is safe and fast.
      // Unversioned HTML/JS/CSS stay no-cache.
      if (/\.(js|css)$/.test(f) && u.searchParams.has('v')) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      else if (/\.(js|css|html)$/.test(f)) headers['Cache-Control'] = 'no-cache, must-revalidate';
      res.writeHead(200, headers); fs.createReadStream(f).pipe(res); return;
    }
    if (req.method === 'POST' && u.pathname === '/') {
      // A native form submit (JS off) lands here. Redirect (303) to a
      // plain GET so a later refresh never shows Chrome's
      // "Confirm Form Resubmission" dialog.
      res.writeHead(303, { Location: '/' }); res.end(); return;
    }
    if (req.method === 'POST' && u.pathname === '/api/info') {
      const { url } = JSON.parse(await readBody(req) || '{}');
      if (!url || !validUrl(url)) return sendJson(res, 400, { error: 'Paste a valid http(s) video link.' });
      if (isDirectMedia(url)) {
        const name = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'video');
        return sendJson(res, 200, { title: name, uploader: '', duration: 0, thumbnail: '', platform: 'Direct file', formats: [{ label: 'Original', height: 720 }], hasAudio: true, ffmpeg: HAS_FFMPEG });
      }
      // Beeg: native resolution (yt-dlp's Beeg extractor is broken).
      const bid = beegId(url);
      if (bid) {
        try {
          const info = await getBeegInfo(bid);
          return sendJson(res, 200, { title: info.title, uploader: '', duration: info.duration, thumbnail: info.thumbnail || '', platform: 'Beeg', formats: info.formats.map(f => ({ label: f.label, height: f.height })), hasAudio: true, ffmpeg: HAS_FFMPEG });
        } catch (e) { return sendJson(res, 500, { error: 'This Beeg video could not be found. The link may be wrong, or the video was removed.' }); }
      }
      // Bilibili: native resolution (yt-dlp finds no formats: the
      // video webpage 412s from this server's IP).
      const bili = bilibiliId(url);
      if (bili) {
        try {
          const info = await getBilibiliInfo(bili);
          if (info.duration && info.duration > MAX_DURATION) return sendJson(res, 400, { error: `Video is too long (${Math.round(info.duration / 60)} min). Limit is ${MAX_DURATION / 60} min.` });
          return sendJson(res, 200, { title: info.title, uploader: '', duration: info.duration, thumbnail: info.thumbnail || '', platform: 'Bilibili', formats: info.formats.map(f => ({ label: f.label, height: f.height })), hasAudio: true, ffmpeg: HAS_FFMPEG });
        } catch (e) { return sendJson(res, 500, { error: 'This Bilibili video could not be found. The link may be wrong, or the video was removed.' }); }
      }
      // LinkedIn: native resolution (yt-dlp has no LinkedIn extractor,
      // so every LinkedIn link failed with "unsupported URL"). lnkd.in
      // short links are resolved to the real post first.
      let liPage = linkedinPostUrl(url);
      if (liPage && liPage.startsWith('SHORT:')) {
        try { liPage = linkedinPostUrl(await resolveRedirects(liPage.slice(6))); } catch { liPage = null; }
      }
      if (liPage) {
        try {
          const info = await getLinkedInInfo(liPage);
          if (info.duration && info.duration > MAX_DURATION) return sendJson(res, 400, { error: `Video is too long (${Math.round(info.duration / 60)} min). Limit is ${MAX_DURATION / 60} min.` });
          return sendJson(res, 200, { title: info.title, uploader: '', duration: info.duration, thumbnail: info.thumbnail || '', platform: 'LinkedIn', formats: info.formats.map(f => ({ label: f.label, height: f.height })), hasAudio: info.mediaKind === 'video', ffmpeg: HAS_FFMPEG, mediaKind: info.mediaKind, noAudio: info.mediaKind !== 'video' });
        } catch (e) { return sendJson(res, 500, { error: 'This LinkedIn post could not be opened. It may be private, or the link may be wrong.' }); }
      }
      const out = await runYtDlp(['--no-playlist', '--dump-json', '--no-download', url], url);
      const j = JSON.parse(out);
      if (j.duration && j.duration > MAX_DURATION) return sendJson(res, 400, { error: `Video is too long (${Math.round(j.duration / 60)} min). Limit is ${MAX_DURATION / 60} min.` });
      // Labels use the shorter side mapped to the nearest standard
      // resolution (a 1080x1300 portrait clip is "1080p", not "1300p").
      // The real height is kept for the download filter; labels dedupe.
      const STD = [2160, 1440, 1080, 720, 480, 360, 240];
      const nearestStd = v => STD.reduce((a, b) => Math.abs(b - v) < Math.abs(a - v) ? b : a);
      const formats = [];
      for (const f of (j.formats || [])) {
        if (!f.height || f.height < 144 || !f.ext || !['mp4', 'webm'].includes(f.ext) || f.vcodec === 'none') continue;
        const short = (f.width && f.height) ? Math.min(f.width, f.height) : f.height;
        const label = `${nearestStd(short)}p`;
        const prev = formats.find(x => x.label === label);
        if (prev) { if (f.height > prev.height) prev.height = f.height; continue; }
        formats.push({ label, height: f.height });
      }
      formats.sort((a, b) => b.height - a.height);
      // Audio-only media (SoundCloud, Mixcloud, podcasts): yt-dlp finds
      // only audio streams (vcodec none, no height), so the video list
      // above is empty. Offer an MP3 download instead of an empty list
      // (an empty list makes the frontend show a "Download" button that
      // can never work, because there is no video format to fetch).
      let audioOnly = false;
      if (!formats.length && (j.formats || []).some(f => f.vcodec === 'none' && f.acodec && f.acodec !== 'none')) {
        audioOnly = true;
        formats.push({ label: 'MP3 Audio', height: 'audio' });
      }
      sendJson(res, 200, { title: j.title, uploader: j.uploader || j.channel || '', duration: j.duration || 0, thumbnail: j.thumbnail || '', platform: detectPlatform(url), formats: formats.slice(0, 6), hasAudio: true, ffmpeg: HAS_FFMPEG, audioOnly });
      return;
    }
    // Job-based download (Hostinger-safe)
    if (req.method === 'POST' && u.pathname === '/api/jobs') {
      const { url, quality } = JSON.parse(await readBody(req) || '{}');
      if (!url || !validUrl(url)) return sendJson(res, 400, { error: 'Paste a valid http(s) video link.' });
      const job = startJob(url, quality || 'best');
      sendJson(res, 200, { jobId: job.id, status: job.status, queuePosition: job.status === 'queued' ? queuePositionOf(job) : 0 });
      return;
    }
    if (req.method === 'GET' && u.pathname.startsWith('/api/jobs/')) {
      const parts = u.pathname.split('/').filter(Boolean); // api, jobs, id, [file]
      const job = jobs.get(parts[2]);
      if (!job) return sendJson(res, 404, { error: 'Job not found or expired. Start a new download.' });
      if (parts[3] === 'file') {
        if (job.status !== 'ready' || !job.file) return sendJson(res, 400, { error: job.status === 'error' ? (job.error || 'Download failed.') : 'File is not ready yet.' });
        const size = job.size;
        const range = req.headers.range;
        if (range) {
          const m = range.match(/bytes=(\d+)-(\d*)/);
          const start = m ? parseInt(m[1], 10) : 0;
          const end = m && m[2] ? parseInt(m[2], 10) : size - 1;
          res.writeHead(206, { 'Content-Type': fileContentType(job.file), 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1, 'Content-Disposition': `attachment; filename="${job.name}"` });
          fs.createReadStream(job.file, { start, end }).pipe(res);
                    return;
        }
        res.writeHead(200, { 'Content-Type': job.quality === 'audio' && !HAS_FFMPEG ? 'application/octet-stream' : fileContentType(job.file), 'Content-Length': size, 'Accept-Ranges': 'bytes', 'Content-Disposition': `attachment; filename="${job.name}"` });
        const stream = fs.createReadStream(job.file);
        stream.pipe(res);
        stream.on('close', () => {});
        return;
      }
      sendJson(res, 200, { jobId: job.id, status: job.status, progress: job.progress, error: job.error, size: job.size, name: job.name, queuePosition: job.status === 'queued' ? queuePositionOf(job) : 0 });
      return;
    }
    // Cancel a download: stop the running yt-dlp/ffmpeg and delete its files.
    if (req.method === 'DELETE' && u.pathname.startsWith('/api/jobs/')) {
      const parts = u.pathname.split('/').filter(Boolean);
      const job = jobs.get(parts[2]);
      if (!job) return sendJson(res, 404, { error: 'Job not found or expired.' });
      job.status = 'cancelled';
      try { if (job.proc) job.proc.kill('SIGKILL'); } catch {}
      const dir = path.join(jobsDir, job.id);
      jobs.delete(job.id);
      try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
      pumpQueue();
      sendJson(res, 200, { ok: true, status: 'cancelled' });
      return;
    }
    // Direct download (local / VPS use; may hit Hostinger's 120s limit on big files — prefer /api/jobs)
    if (req.method === 'GET' && u.pathname === '/api/download') {
      const url = u.searchParams.get('url') || '';
      const quality = u.searchParams.get('quality') || 'best';
      if (!validUrl(url)) return sendJson(res, 400, { error: 'Paste a valid http(s) video link.' });
      const job = startJob(url, quality);
      const wait = setInterval(() => {
        if (job.status === 'ready') {
          clearInterval(wait);
          res.writeHead(200, { 'Content-Type': fileContentType(job.file), 'Content-Length': job.size, 'Content-Disposition': `attachment; filename="${job.name}"` });
          const s = fs.createReadStream(job.file); s.pipe(res);
        } else if (job.status === 'error') { clearInterval(wait); if (!res.headersSent) sendJson(res, 500, { error: job.error || 'Download failed.' }); }
      }, 1000);
      return;
    }
    // Video cover through our server: some thumbnail CDNs are blocked
    // in the user's country, so the browser loads the cover from here.
    if (req.method === 'GET' && u.pathname === '/api/thumb') {
      const thumbUrl = u.searchParams.get('url') || '';
      const page = u.searchParams.get('page') || '';
      let host = '';
      try { host = new URL(thumbUrl).hostname; } catch {}
      if (!thumbUrl || !thumbHostOk(host)) { sendJson(res, 400, { error: 'Bad thumbnail URL' }); return; }
      const key = crypto.createHash('sha256').update(thumbUrl).digest('hex');
      const file = path.join(thumbsDir, key);
      const typeFile = file + '.type';
      try {
        const st = fs.statSync(file);
        if (Date.now() - st.mtimeMs < 7 * 24 * 60 * 60 * 1000) {
          const type = fs.readFileSync(typeFile, 'utf8');
          res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'public, max-age=86400' });
          fs.createReadStream(file).pipe(res); return;
        }
      } catch {}
      try {
        const img = await fetchImage(thumbUrl, page || undefined, 3);
        try { fs.writeFileSync(file + '.tmp', img.buf); fs.renameSync(file + '.tmp', file); fs.writeFileSync(typeFile, img.type); } catch {}
        // Bound the cache: drop the oldest files past 1000.
        try {
          const files = fs.readdirSync(thumbsDir).filter(f => !f.endsWith('.type') && !f.endsWith('.tmp')).map(f => ({ f, t: fs.statSync(path.join(thumbsDir, f)).mtimeMs })).sort((a, b) => a.t - b.t);
          for (const old of files.slice(0, Math.max(0, files.length - 1000))) { try { fs.rmSync(path.join(thumbsDir, old.f), { force: true }); fs.rmSync(path.join(thumbsDir, old.f + '.type'), { force: true }); } catch {} }
        } catch {}
        res.writeHead(200, { 'Content-Type': img.type, 'Cache-Control': 'public, max-age=86400' });
        res.end(img.buf);
      } catch (e) { if (!res.headersSent) sendJson(res, 404, { error: 'Thumbnail unavailable' }); }
      return;
    }
    res.writeHead(404).end('Not found');
  } catch (e) {
    console.error(e);
    if (!res.headersSent) sendJson(res, 500, { error: e.message || 'Server error' });
  }
});

server.listen(PORT, HOST, () => console.log(`SubDown live at http://${HOST}:${PORT}/ (ffmpeg: ${HAS_FFMPEG})`));
