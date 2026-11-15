# My LLM Router (personal fork of FreeLLMAPI, MIT)

Based on https://github.com/tashfeenahmed/freellmapi (c) 2026 Tashfeen Ahmed. Keep LICENSE.

## Run
    npm install
    npm run dev          # dev: server + client
    # or: docker compose up -d   (always-on, open on phone)

## Phone
Open the server URL in Chrome/Safari -> Add to Home Screen (PWA is enabled in production builds).
Keep it private: set an admin password, use HTTPS or Tailscale. Your provider API keys live here.

## Pull upstream updates
    git remote add upstream https://github.com/tashfeenahmed/freellmapi.git
    git pull upstream main

## My changes
- PWA: client/public/manifest.webmanifest, sw.js, icons; client/index.html; client/src/main.tsx
- Mobile CSS: end of client/src/index.css
