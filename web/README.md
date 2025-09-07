# HackMate Web (React + Vite)

A minimal React web client wired to the existing HackMate backend for 1:1 DMs over Socket.IO.

Run
- Install deps: npm install
- Start dev server: npm run dev

Configure backend endpoints
- Default API is http://localhost:4000 and chat uses the same URL.
- Override via query:
  - http://localhost:5173/?apiBase=http://localhost:4000&chatBase=http://localhost:5003
- Or persist via localStorage:
  - localStorage.setItem('hm_api_base','http://localhost:4000')
  - localStorage.setItem('hm_chat_base','http://localhost:5003')

Notes
- Notifications appear when permission is granted; browser may require user action.
- Sound plays a short beep for incoming messages.