NEWS CHATbot – Client

Overview

- React (Vite) + SCSS chat UI for the news RAG backend
- Shows history, sends messages, displays Gemini answers
- Reset session button and basic error banners
- **Coverage**: Global/world news, Pakistan, India national; all Indian states and their main cities; strong focus on IT/business and AI across major hubs (Bengaluru, Hyderabad, Pune, Chennai, Gurugram, Noida, Mumbai, Delhi)

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

Example questions the chatbot answers well

- Latest IT business headlines in India today
- Bengaluru AI business headlines today
- Hyderabad IT industry updates today
- Punjab top news today
- Karnataka headlines today
- Mumbai business headlines today
- Chandigarh headlines today
- Pakistan business headlines today
- World top headlines right now
- Global markets news today
- Delhi AI startup news today
- Pune IT services news today
- Chennai tech headlines today
- Gurugram startup funding news today
- Noida IT park news today
