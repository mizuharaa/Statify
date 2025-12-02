# 🎵 Spotify Developer Dashboard Setup Guide

## 🔄 How the OAuth Flow Works

### Architecture:
```
User Browser (Port 3000 - Frontend)
    ↓
Clicks "Connect Spotify"
    ↓
Backend Server (Port 5000)
    ↓
Redirects to Spotify OAuth
    ↓
Spotify redirects BACK to Backend (Port 5000)
    ↓
Backend exchanges code for token
    ↓
Backend redirects to Frontend (Port 3000) with tokens
    ↓
Frontend shows dashboard
```

### Why Two Ports?

- **Backend (Port 5000)**: 
  - Handles secure OAuth callback from Spotify
  - Exchanges authorization code for access token
  - Protects your CLIENT_SECRET (never exposed to frontend)
  
- **Frontend (Port 3000)**:
  - React app that users see and interact with
  - Makes API calls to backend (which then calls Spotify API)
  - Never directly communicates with Spotify OAuth

---

## ✅ Spotify Developer Dashboard Configuration

### Redirect URI to Add:

```
http://localhost:5000/api/auth/callback
```

**Important:** This must point to your **BACKEND** server (port 5000), NOT the frontend!

---

## 📝 Step-by-Step Setup

1. **Go to Spotify Developer Dashboard**
   - Visit: https://developer.spotify.com/dashboard
   - Log in with your Spotify account

2. **Create or Select Your App**
   - Click "Create an app" or select existing app
   - Fill in app name and description

3. **Add Redirect URI**
   - Click "Edit Settings"
   - Scroll to "Redirect URIs"
   - Click "Add URI"
   - Enter: `http://localhost:5000/api/auth/callback`
   - Click "Add"
   - Click "Save"

4. **Copy Your Credentials**
   - Copy your **Client ID**
   - Click "View client secret" and copy **Client Secret**
   - Paste them into `configs.env`:
     ```
     CLIENT_ID=your_client_id_here
     CLIENT_SECRET=your_client_secret_here
     ```

---

## 🔍 Verify Your Configuration

Check that `configs.env` has:
```env
CLIENT_ID=your_actual_client_id
CLIENT_SECRET=your_actual_client_secret
REDIRECT_URI=http://localhost:5000/api/auth/callback
FRONTEND_URL=http://localhost:3000
PORT=5000
```

---

## ⚠️ Common Mistakes

❌ **Wrong:** `http://localhost:3000/callback`  
✅ **Correct:** `http://localhost:5000/api/auth/callback`

❌ **Wrong:** `http://localhost:5000/callback`  
✅ **Correct:** `http://localhost:5000/api/auth/callback` (must include `/api/auth/`)

❌ **Wrong:** Adding `https://` when running locally  
✅ **Correct:** Use `http://` for local development

---

## 🚀 Testing

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Open: http://localhost:3000
4. Click "Connect Spotify"
5. You should be redirected to Spotify login
6. After authorizing, you should be redirected back to your app

If you see an error about redirect URI mismatch, double-check:
- The URI in Spotify Dashboard matches exactly: `http://localhost:5000/api/auth/callback`
- No trailing slashes
- Using `http://` not `https://` for localhost

