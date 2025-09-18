NEWS CHATbot – Client

Overview

- React (Vite) + SCSS chat UI for the news RAG backend
- Shows history, sends messages, displays Gemini answers
- Reset session button and basic error banners

Run locally

```
cd client
npm install
$env:VITE_API_BASE="http://localhost:4000/api"
npm run dev
```

Config

- `VITE_API_BASE` must point to your deployed API, e.g. `https://YOUR-RENDER-SERVICE.onrender.com/api`

Build/Deploy (Vercel)

- Framework: Vite
- Build Command: `vite build`
- Output Directory: `dist`
- Env: `VITE_API_BASE=https://YOUR-RENDER-SERVICE.onrender.com/api`

Features

- Auto-creates a session on first send
- Renders user/bot messages and basic typing state
- Reset session clears server history and local view
