#!/bin/bash
# SubDown install — needs Python 3, Node 18+, ffmpeg
set -e
cd "$(dirname "$0")"
python3 -m venv .venv 2>/dev/null || true
.venv/bin/pip install -q --upgrade yt-dlp
# make a project-local yt-dlp shim so server.mjs finds it
ln -sf .venv/bin/yt-dlp ./yt-dlp
echo "Installed. Run: node server.mjs  (or PORT=8080 node server.mjs)"
echo "Then open http://127.0.0.1:4175/"
