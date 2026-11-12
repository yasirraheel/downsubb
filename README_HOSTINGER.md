# VidSnap — Hostinger Unlimited deploy guide

Plan confirmed by the user on 2026-11-12: **Hostinger Unlimited**.
No VPS needed if the steps below work — Unlimited supports Node.js
web apps via hPanel. If ffmpeg is missing on the host, the server
automatically falls back to single-file mode (up to 720p, no merging).

## What is in the deploy zip
`vidsnap-live-deploy.zip`:
- `server.mjs` — our own backend (Node, no dependencies)
- `package.json` — `npm start` runs `node server.mjs`
- `public/index.html` — single-interface UI
- `yt-dlp` — bundled standalone binary (3 MB), no Python install needed
- `README_HOSTINGER.md` — this file

Do NOT upload `.jobs/`, `.venv/`, or `node_modules/`.

## Deploy in hPanel
1. hPanel → Websites → Add Website → **Node.js Web App**
   (on older hPanel: Advanced → Node.js → Create Application)
2. Domain / subdomain choose karo, e.g. `vidsnap.yourdomain.com`
3. Node.js version: **20** (22 bhi chalega; 18 EOL hai, avoid karo)
4. Upload `vidsnap-live-deploy.zip`, ya Git repo connect karo
5. Application startup file: `server.mjs`
6. Environment variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3000` (Hostinger kabhi override karta hai — hamara
     server `process.env.PORT` padhta hai, fallback 4175 hai)
7. SSL issue karo (hPanel → SSL → free Let's Encrypt), phir **Start / Restart**
8. Site kholo aur test karo: koi public YouTube link paste karo,
   Fetch → quality → Download.

## How it avoids Hostinger's 120-second limit
Download ek hi request mein nahi hota. `POST /api/jobs` background
mein download start karta hai aur turant job id deta hai. Frontend
har 2 second mein `GET /api/jobs/:id` se status poochta hai, aur jab
ready ho to `GET /api/jobs/:id/file` se file milti hai (Range /
resume support ke saath). File bhejne ke 5 second baad server se
delete ho jati hai; 1 ghante purani jobs auto-clean hoti hain.

## If something fails on Hostinger
- **App start nahi hoti:** Node version 20 set karo, startup file
  `server.mjs` check karo, logs hPanel Node.js section mein dekho.
- **ffmpeg missing:** koi error nahi aayega — server single-file mode
  mein chalega (720p tak). 1080p merge ke liye ffmpeg chahiye.
- **YouTube 429 / timeout:** server IP rate-limited hai. Thoda wait
  karo aur dobara try karo; ya server location change karo.
- **Bari file fail:** 120-second file-transfer limit ho sakti hai.
  Chhoti videos pehle test karo; bari files ke liye VPS behtar hai.

## SSH deploy (alternative, if SSH access is enabled)
Public key already given to the user on 2026-11-12. After the key is
added to `~/.ssh/authorized_keys` on the server, the agent can SSH in
and check Node / ffmpeg / yt-dlp, upload the files, and start the app.
