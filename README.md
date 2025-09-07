# 🚀 HackMate - MERN Stack Project

HackMate is a platform to help hackathon participants **find teammates**, **share project ideas**, and **collaborate effectively**.  
Built with the **MERN stack (MongoDB, Express, React, Node.js)**.

---

## 📌 Features
- 🔑 **Authentication** – Register/Login with JWT & bcrypt
- 👤 **User Profiles** – Store name, email, skills, tech stack, and bio
- 🤝 **Team Management** – Create teams, join existing teams, view members
- 💡 **Project Ideas** – Post hackathon ideas and explore others
- 🌐 **Frontend + Backend** – React frontend connected to Express API
- 🗄 **Database** – MongoDB for persistent storage

---

## 🛠 Tech Stack
**Frontend:**
- React.js
- Axios (API calls)
- TailwindCSS / Material UI (UI components)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- dotenv, cors, morgan

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/hackmate.git
cd hackmate

### 2. Start the Backend API
```bash
npm install
npm start
```

The API will print the port (e.g., http://localhost:5004). This also serves the legacy static site (index.html).

### 3. React Web App (Vite)
```bash
cd web
npm install
npm run dev
```
Open the printed URL (e.g., http://localhost:5173). If your backend runs on a different port, add query params to point the app to your API/socket server:

- http://localhost:5173/?apiBase=http://localhost:4000&chatBase=http://localhost:5003

These values are saved to localStorage for future sessions.

### 4. React Native App (Expo)
```bash
cd mobile
npm install
npm start
```
For device testing, set your LAN IP in environment variables (Windows PowerShell):
```powershell
setx EXPO_PUBLIC_API_BASE http://192.168.1.10:4000
setx EXPO_PUBLIC_CHAT_BASE http://192.168.1.10:5003
```
Restart terminal, then run `npm start` again.
