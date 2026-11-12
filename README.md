# SubDown — live video downloader

Single interface, server-first download.

## What this is
- One page: paste any public video link (YouTube, TikTok, Instagram,
  Facebook, X, Vimeo, Dailymotion, Reddit, …), pick a quality, download.
- The uploaded `SubDown-clean.zip` is **template only** — a cleaned
  SaveFrom.net capture with no downloader backend (`savefrom.php` was
  missing, the form was visual-only). **All of its backend / API URLs
  are ignored.** No SaveFrom API, and no third-party downloader API,
  is used anywhere here.
- This is **our own backend**: a Node.js server (`server.mjs`) that
  runs `yt-dlp` + `ffmpeg` directly on our server.
- Flow: `POST /api/info` (yt-dlp --dump-json) → user picks quality →
  `GET /api/download` → yt-dlp downloads the file to the server temp
  folder first → server streams it to the user → temp file is deleted.

## Country restriction
Download happens on the server, so a video blocked in the *user's*
country can still work **if it is available in the server's country**.
It cannot bypass a block that also applies in the server's country,
and it cannot open private, login-only, or age-restricted videos.
For a specific country, deploy the server (or a proxy) in that country.

## Run
```bash
bash install.sh   # creates .venv, installs yt-dlp
node server.mjs   # http://127.0.0.1:4175/
# PORT=8080 HOST=0.0.0.0 node server.mjs   # on a VPS
```

## Limits (in server.mjs)
- No playlists, max duration 3 hours, max file 2 GB (env `MAX_DURATION`, `MAX_BYTES`).
- Temp files are deleted after sending, and files older than 1 hour are cleaned up.
- Only download videos you own or have permission to download; respect copyright and each platform's terms.

## Live deployment — what is still needed
This VM is not permanent hosting. For a public live site you need:
1. A VPS (not shared Hostinger PHP hosting — it cannot run a persistent
   Node process / yt-dlp / ffmpeg), e.g. Hostinger VPS, DigitalOcean, Hetzner.
2. A domain / subdomain pointing at that VPS, e.g. `subdown.yourdomain.com`.
3. On the VPS: Node 18+, Python 3, ffmpeg, `bash install.sh`, then a
   process manager (systemd / pm2) and a reverse proxy (nginx + HTTPS).
Tell me the domain and VPS/hosting you want to use and I will prepare the deploy steps / systemd + nginx config for it.
