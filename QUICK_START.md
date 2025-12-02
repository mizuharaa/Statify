# 🚀 Quick Start Guide

## How to Start the Application

You need to run **TWO servers** - one for the backend and one for the frontend.

---

## 📋 Prerequisites

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **Install dependencies** (first time only):
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

---

## 🎯 Starting the Application

### Option 1: Using Two Terminal Windows (Recommended)

#### Terminal 1 - Backend Server:
```bash
cd Statify/backend
npm start
```
**Expected output:** `🎵 Statify backend server running on port 5000`

#### Terminal 2 - Frontend Server:
```bash
cd Statify/frontend
npm run dev
```
**Expected output:** Server running at `http://localhost:3000`

---

### Option 2: Using PowerShell (Windows)

Open **PowerShell** and run:

**Backend:**
```powershell
cd "C:\Users\user\OneDrive\Desktop\Python Env\Statify\backend"
npm start
```

**Frontend (in a new PowerShell window):**
```powershell
cd "C:\Users\user\OneDrive\Desktop\Python Env\Statify\frontend"
npm run dev
```

---

## 📁 Files to Run

### Backend:
- **File:** `backend/server.js`
- **Command:** `npm start` (from `backend` folder)
- **Port:** 5000
- **URL:** http://localhost:5000

### Frontend:
- **File:** `frontend/src/main.tsx` (entry point)
- **Command:** `npm run dev` (from `frontend` folder)
- **Port:** 3000
- **URL:** http://localhost:3000

---

## ✅ Verification

1. **Backend is running** if you see:
   ```
   🎵 Statify backend server running on port 5000
   ```

2. **Frontend is running** if you see:
   ```
   VITE v6.x.x  ready in xxx ms
   ➜  Local:   http://localhost:3000/
   ```

3. **Open your browser** and go to: **http://localhost:3000**

---

## 🐛 Troubleshooting

### "Port already in use" error:
- Close any other applications using ports 3000 or 5000
- Or change the ports in `configs.env` and `vite.config.ts`

### "Cannot find module" error:
- Run `npm install` in both `backend` and `frontend` folders

### Backend not connecting:
- Make sure backend is running on port 5000
- Check `configs.env` has correct `CLIENT_ID` and `CLIENT_SECRET`

---

## 🎵 Next Steps

Once both servers are running:
1. Open http://localhost:3000 in your browser
2. Click "Connect Spotify" button
3. Authorize the app
4. View your stats! ✨

