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
const FFMPEG_CANDIDATES = [process.env.FFMPEG, path.join(root, 'ffmpeg'), path.join(os.homedir(), 'bin', 'ffmpeg'), '/usr/bin/ffmpeg', 'ffmpeg'];
const FFMPEG = FFMPEG_CANDIDATES.find(p => { try { return p && spawnSync(p, ['-version'], { stdio: 'ignore' }).status === 0; } catch { return false; } }) || null;
const HAS_FFMPEG = !!FFMPEG;
// YouTube cookies (optional, for bot-check): set COOKIES_FILE in the
// environment, or put a cookies.txt next to server.mjs. The file must
// live OUTSIDE public_html so it is never web-accessible, and must
// never be committed or put in a deploy zip. It is only used by yt-dlp
// to prove to YouTube that the request comes from a logged-in account.
const COOKIES_CANDIDATES = [
  process.env.COOKIES_FILE,
  path.join(root, 'cookies.txt'),
  path.join(os.homedir(), '.cookies', 'youtube.txt'),
];
const COOKIES_FILE = COOKIES_CANDIDATES.find(p => p && fs.existsSync(p)) || null;
console.log(`SubDown starting: yt-dlp=${YTDLP} ffmpeg=${FFMPEG || 'none'} cookies=${COOKIES_FILE ? 'loaded' : 'none'}`);

const MAX_BYTES = Number(process.env.MAX_BYTES || 2 * 1024 * 1024 * 1024); // 2 GB
const MAX_DURATION = Number(process.env.MAX_DURATION || 3 * 60 * 60); // 3 hours

const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.json': 'application/json' };
// Own-backend args, applied to every yt-dlp call. No API, no login
// is required for the server itself: yt-dlp + Deno (JS challenge
// solver, ~/bin/deno on Hostinger) + ffmpeg are all self-contained.
// The android player client is what got YouTube working from a clean
// server IP; the web client is used when cookies are present, because
// android does not support cookies.
const PLAYER_CLIENT = COOKIES_FILE ? 'web' : 'android';
const BASE_ARGS = ['--force-ipv4', '--js-runtimes', 'deno', '--extractor-args', `youtube:player_client=${PLAYER_CLIENT}`, ...(COOKIES_FILE ? ['--cookies', COOKIES_FILE] : []), ...(FFMPEG ? ['--ffmpeg-location', FFMPEG] : [])];
// Extra PATH for yt-dlp to find deno/node/ffmpeg on shared hosting.
const CHILD_PATH = [path.join(os.homedir(), 'bin'), '/opt/alt/alt-nodejs20/root/usr/bin', process.env.PATH].filter(Boolean).join(':');
const CHILD_ENV = { ...process.env, PATH: CHILD_PATH };

function detectPlatform(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    if (h.includes('youtube') || h === 'youtu.be') return 'YouTube';
    if (h.includes('tiktok')) return 'TikTok';
    if (h.includes('instagram')) return 'Instagram';
    if (h.includes('facebook') || h === 'fb.watch') return 'Facebook';
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

function runYtDlp(args, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    const p = spawn(YTDLP, [...BASE_ARGS, ...args], { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
    let out = '', err = '';
    const t = setTimeout(() => { p.kill('SIGKILL'); reject(new Error('Timed out while talking to the video site. Try again.')); }, timeoutMs);
    p.stdout.on('data', d => { out += d; if (out.length > 5_000_000) p.kill(); });
    p.stderr.on('data', d => { err += d; });
    p.on('error', e => { clearTimeout(t); reject(new Error(`yt-dlp not found at ${YTDLP}. (${e.message})`)); });
    p.on('close', code => { clearTimeout(t); if (code === 0) resolve(out); else reject(new Error(friendlyError(err || out || `yt-dlp exited with code ${code}`))); });
  });
}
function friendlyError(raw) {
  const s = raw.toLowerCase();
  if (s.includes('not available in your country') || s.includes('blocked in your country')) return 'This video is not available in the server country either. A server in an allowed country is needed for this link.';
  if (s.includes('private video') || s.includes('login required') || s.includes('sign in')) return 'This video is private or needs a login. Server-side download cannot open it without an account.';
  if (s.includes('age')) return 'This video is age-restricted and needs a logged-in account.';
  if (s.includes('unsupported url') || s.includes('no video formats')) return 'This link is not a supported public video link, or the video has no downloadable formats.';
  if (s.includes('video unavailable') || s.includes('removed') || s.includes('deleted')) return 'This video is unavailable, removed, or deleted.';
  if (s.includes('unable to download json metadata') || s.includes('http error 400') || s.includes('bad request')) return 'This video could not be found on that site. The link may be wrong, or the video was removed.';
  if (s.includes('http error 404') || s.includes('not found')) return 'This video could not be found. Check the link and try again.';
  if (s.includes('http error 403') || s.includes('forbidden')) return 'That site refused the download. Try another link.';
  if (s.includes('timed out') || s.includes('timeout')) return 'That site took too long to respond. Please try again.';
  // Never show raw yt-dlp stderr (it leaks internal paths and looks broken).
  return 'Something went wrong while checking this link. Please check the link and try again.';
}
function sendJson(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(obj)); }
function readBody(req) { return new Promise((resolve, reject) => { let b = ''; req.on('data', d => { b += d; if (b.length > 10000) req.destroy(); }); req.on('end', () => resolve(b)); req.on('error', reject); }); }
function safeName(s) { return (s || 'video').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '_').slice(0, 80) || 'video'; }

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
    const f = quality === 'best' ? 'bv*[height<=1080]+ba/b[height<=1080]' : `bv*[height<=${parseInt(quality, 10) || 720}]+ba/b[height<=${parseInt(quality, 10) || 720}]`;
    return ['--no-playlist', '--continue', '-f', f, '--merge-output-format', 'mp4', '-o', outTpl, url];
  }
  // No ffmpeg: single pre-merged file only, up to 720p.
  const f = quality === 'best' ? 'best[height<=720]/18/b[height<=720]' : `best[height<=${parseInt(quality, 10) || 720}]/b[height<=${parseInt(quality, 10) || 720}]`;
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
function fetchText(url, referer) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36', ...(referer ? { Referer: referer } : {}) } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(fetchText(new URL(res.headers.location, url).toString(), referer));
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      let b = ''; res.setEncoding('utf8'); res.on('data', d => { b += d; if (b.length > 5_000_000) req.destroy(); }); res.on('end', () => resolve(b));
    });
    req.on('error', reject); req.setTimeout(30000, () => req.destroy(new Error('Timed out')));
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
function isDirectMedia(url) {
  try { const p = new URL(url).pathname.toLowerCase(); return /\.(mp4|webm|mov|mkv|m3u8|mp3|m4a|wav|avi)$/.test(p); } catch { return false; }
}
// Pick the file a job should serve: a real video file first (largest),
// never an audio-only part left behind when a merge did not run. A direct
// audio link (e.g. a pasted .mp3) is fine when its extension matches the URL.
function pickJobFile(job, jobDir) {
  const files = fs.readdirSync(jobDir).filter(f => fs.statSync(path.join(jobDir, f)).isFile() && f !== 'meta.json' && !f.endsWith('.part') && !f.endsWith('.ytdl') && !f.endsWith('.temp'));
  if (!files.length) return null;
  const videoExts = ['.mp4', '.webm', '.mkv', '.mov'];
  let pool = files.filter(f => videoExts.includes(path.extname(f).toLowerCase()));
  if (!pool.length) {
    let urlExt = ''; try { urlExt = path.extname(new URL(job.url).pathname).toLowerCase(); } catch {}
    if (urlExt) pool = files.filter(f => path.extname(f).toLowerCase() === urlExt);
  }
  if (!pool.length && job.quality === 'audio') pool = files;
  if (!pool.length) return null;
  pool.sort((a, b) => fs.statSync(path.join(jobDir, b)).size - fs.statSync(path.join(jobDir, a)).size);
  return path.join(jobDir, pool[0]);
}
function finishJob(job, jobDir, errText) {
  if (job.status === 'error') return;
  if (errText) { job.status = 'error'; job.error = friendlyError(errText); return; }
  try {
    // Finished media only: ignore resume state (.part/.ytdl) and meta.json.
    const file = pickJobFile(job, jobDir);
    if (!file) {
      const anyFile = fs.readdirSync(jobDir).some(f => f !== 'meta.json' && !f.endsWith('.part') && !f.endsWith('.ytdl') && !f.endsWith('.temp'));
      job.status = 'error';
      job.error = anyFile ? 'The video could not be assembled on the server (merging failed). Please try again.' : 'Download finished on the server but no file was created.';
      return;
    }
    job.size = fs.statSync(file).size;
    if (job.size > MAX_BYTES) { job.status = 'error'; job.error = 'File is too large to send (over 2 GB).'; return; }
    job.file = file;
    job.name = `${safeName(path.basename(file, path.extname(file)))}.${path.extname(file).slice(1) || 'mp4'}`;
    job.status = 'ready'; job.progress = 100;
  } catch (e) { job.status = 'error'; job.error = e.message; }
}

// ---- background jobs ----
const jobs = new Map(); // id -> {id, url, quality, status, progress, error, file, size, name, createdAt}
// One job id per link+quality, so a retry resumes the same .part files.
function jobIdFor(url, quality) { return crypto.createHash('sha256').update(url + '|' + quality).digest('hex').slice(0, 16); }
function parseProgress(job, text) {
  const m = text.match(/\[download\]\s+(\d+(?:\.\d+)?)%/g);
  if (m) { const last = m[m.length - 1].match(/(\d+(?:\.\d+)?)%/); if (last) job.progress = Math.round(parseFloat(last[1])); }
}
function runYtDlpJob(job, jobDir) {
  const outTpl = path.join(jobDir, '%(title)s.%(ext)s');
  const p = spawn(YTDLP, [...BASE_ARGS, ...downloadArgs(job.url, job.quality, outTpl)], { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
  job.proc = p;
  let err = '';
  p.stdout.on('data', d => parseProgress(job, d.toString()));
  p.stderr.on('data', d => { err += d; parseProgress(job, err); });
  p.on('error', e => { job.status = 'error'; job.error = `yt-dlp not found at ${YTDLP}. (${e.message})`; });
  p.on('close', code => {
    job.proc = null;
    if (job.status === 'error' || job.status === 'cancelled') return;
    if (code !== 0) { job.status = 'error'; job.error = friendlyError(err || `yt-dlp exited with code ${code}`); return; }
    finishJob(job, jobDir, null);
  });
}
function startJob(url, quality) {
  const id = jobIdFor(url, quality);
  const jobDir = path.join(jobsDir, id);
  fs.mkdirSync(jobDir, { recursive: true });
  // Keep the link on disk so a server restart can resume this job.
  try { fs.writeFileSync(path.join(jobDir, 'meta.json'), JSON.stringify({ url, quality, createdAt: Date.now() })); } catch {}
  const existing = jobs.get(id);
  if (existing && (existing.status === 'downloading' || existing.status === 'ready')) return existing;
  const job = { id, url, quality, status: 'downloading', progress: 0, error: null, file: null, size: 0, name: null, createdAt: Date.now() };
  jobs.set(id, job);
  // Beeg: native ffmpeg download (yt-dlp cannot do it: broken extractor
  // + CDN 403s fragments without a Referer, which ffmpeg sends).
  const bid = beegId(url);
  if (bid && FFMPEG) {
    getBeegInfo(bid).then(info => {
      const variant = beegVariantFor(info, quality);
      const outFile = path.join(jobDir, `${safeName(info.title)}.mp4`);
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
      p.on('error', e => { job.status = 'error'; job.error = `ffmpeg not found. (${e.message})`; });
      p.on('close', code => { job.proc = null; if (job.status === 'cancelled') return; if (code !== 0) finishJob(job, jobDir, err || `ffmpeg exited with code ${code}`); else finishJob(job, jobDir, null); });
    }).catch(e => { job.status = 'error'; job.error = 'This Beeg video could not be found. The link may be wrong, or the video was removed.'; });
    return job;
  }
  // Direct media: ffmpeg trick, no login/API.
  if (isDirectMedia(url) && FFMPEG) {
    const ext = new URL(url).pathname.split('.').pop().toLowerCase().split('?')[0] || 'mp4';
    const outFile = path.join(jobDir, `video.${ext === 'm3u8' ? 'mp4' : ext}`);
    const args = ['-y', '-user_agent', 'Mozilla/5.0', '-i', url, '-c', 'copy', outFile];
    const p = spawn(FFMPEG, args, { stdio: ['ignore', 'pipe', 'pipe'], env: CHILD_ENV });
    job.proc = p;
    let err = '';
    p.stderr.on('data', d => { err += d; const m = err.match(/time=(\d+):(\d+):(\d+)/g); if (m) job.progress = 50; });
    p.on('error', e => { job.status = 'error'; job.error = `ffmpeg not found. (${e.message})`; });
    p.on('close', code => { job.proc = null; if (job.status === 'cancelled') return; if (code !== 0) finishJob(job, jobDir, err || `ffmpeg exited with code ${code}`); else finishJob(job, jobDir, null); });
    return job;
  }
  runYtDlpJob(job, jobDir);
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
      const job = { id, url: meta.url, quality: meta.quality || 'best', status: finished ? 'ready' : 'downloading', progress: finished ? 100 : 0, error: null, file: null, size: 0, name: null, createdAt: meta.createdAt || Date.now() };
      jobs.set(id, job);
      if (finished) finishJob(job, dir, null); else runYtDlpJob(job, dir);
    }
  } catch {}
}
recoverJobs();
function cleanupJob(id) {
  const job = jobs.get(id); if (!job) return;
  jobs.delete(id);
  if (job.file) { try { fs.rmSync(path.dirname(job.file), { recursive: true, force: true }); } catch {} }
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
    if (req.method === 'GET' && (u.pathname === '/' || u.pathname === '/index.html')) {
      res.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache, must-revalidate' }); fs.createReadStream(path.join(publicDir, 'index.html')).pipe(res); return;
    }
    if (req.method === 'GET' && (u.pathname === '/terms' || u.pathname === '/privacy')) {
      const f = path.join(publicDir, u.pathname.slice(1) + '.html');
      res.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache, must-revalidate' }); fs.createReadStream(f).pipe(res); return;
    }
    if (req.method === 'GET' && !u.pathname.startsWith('/api/')) {
      // Static assets from public/ (exact template design: /build, /img, /font, /js, /subdown.js)
      // Unknown pages fall back to the homepage instead of a blank
      // "Not found" page (the template has many guide links we do not host).
      const rel = u.pathname === '/' || u.pathname === '/index.html' ? 'index.html' : u.pathname.replace(/^\/+/, '');
      const f = path.resolve(publicDir, rel);
      if (!f.startsWith(publicDir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) {
        res.writeHead(200, { 'Content-Type': mime['.html'] }); fs.createReadStream(path.join(publicDir, 'index.html')).pipe(res); return;
      }
      // JS/CSS must never be cached long: a cached old subdown.js kept
      // showing the old left-aligned layout after fixes were deployed.
      const headers = { 'Content-Type': mime[path.extname(f)] || 'application/octet-stream' };
      if (/\.(js|css|html)$/.test(f)) headers['Cache-Control'] = 'no-cache, must-revalidate';
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
      const out = await runYtDlp(['--no-playlist', '--dump-json', '--no-download', url]);
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
      sendJson(res, 200, { title: j.title, uploader: j.uploader || j.channel || '', duration: j.duration || 0, thumbnail: j.thumbnail || '', platform: detectPlatform(url), formats: formats.slice(0, 6), hasAudio: true, ffmpeg: HAS_FFMPEG });
      return;
    }
    // Job-based download (Hostinger-safe)
    if (req.method === 'POST' && u.pathname === '/api/jobs') {
      const { url, quality } = JSON.parse(await readBody(req) || '{}');
      if (!url || !validUrl(url)) return sendJson(res, 400, { error: 'Paste a valid http(s) video link.' });
      const job = startJob(url, quality || 'best');
      sendJson(res, 200, { jobId: job.id, status: job.status });
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
          res.writeHead(206, { 'Content-Type': 'video/mp4', 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1, 'Content-Disposition': `attachment; filename="${job.name}"` });
          fs.createReadStream(job.file, { start, end }).pipe(res);
                    return;
        }
        res.writeHead(200, { 'Content-Type': job.quality === 'audio' && !HAS_FFMPEG ? 'application/octet-stream' : 'video/mp4', 'Content-Length': size, 'Accept-Ranges': 'bytes', 'Content-Disposition': `attachment; filename="${job.name}"` });
        const stream = fs.createReadStream(job.file);
        stream.pipe(res);
        stream.on('close', () => {});
        return;
      }
      sendJson(res, 200, { jobId: job.id, status: job.status, progress: job.progress, error: job.error, size: job.size, name: job.name });
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
          res.writeHead(200, { 'Content-Type': 'video/mp4', 'Content-Length': job.size, 'Content-Disposition': `attachment; filename="${job.name}"` });
          const s = fs.createReadStream(job.file); s.pipe(res);
        } else if (job.status === 'error') { clearInterval(wait); if (!res.headersSent) sendJson(res, 500, { error: job.error || 'Download failed.' }); }
      }, 1000);
      return;
    }
    res.writeHead(404).end('Not found');
  } catch (e) {
    console.error(e);
    if (!res.headersSent) sendJson(res, 500, { error: e.message || 'Server error' });
  }
});

server.listen(PORT, HOST, () => console.log(`SubDown live at http://${HOST}:${PORT}/ (ffmpeg: ${HAS_FFMPEG})`));
