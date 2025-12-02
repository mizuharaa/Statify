# 🐛 Troubleshooting Guide

## Issue: "ERR_CONNECTION_REFUSED" on Callback

### Symptoms:
- ✅ OAuth login works
- ✅ Spotify redirects back
- ❌ Browser shows "This site can't be reached" / "ERR_CONNECTION_REFUSED"
- ❌ URL shows: `127.0.0.1:3000/callback?access_token=...`

### Cause:
**Frontend server is not running!**

The backend successfully handled the OAuth callback and redirected to the frontend, but the frontend server on port 3000 is not running.

### Solution:

1. **Start the Frontend Server:**
   ```powershell
   cd frontend
   npm run dev
   ```

2. **Verify it's running:**
   - You should see: `Local: http://127.0.0.1:3000/`
   - Or: `Local: http://localhost:3000/`

3. **Then retry:**
   - Go back to: `http://127.0.0.1:3000`
   - Click "Connect Spotify" again
   - This time the callback page should load!

---

## Quick Checklist

### ✅ Both Servers Must Be Running:

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
# Should see: "🎵 Statify backend server running on port 5000"
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
# Should see: "Local: http://127.0.0.1:3000/"
```

### ✅ Verify Ports Are Free:

If you get "port already in use" errors:
- Close other applications using ports 3000 or 5000
- Or change ports in `configs.env` and `vite.config.ts`

---

## Common Issues

### Issue 1: Frontend Not Starting
**Error:** `Cannot find module` or `npm ERR!`

**Fix:**
```powershell
cd frontend
npm install
npm run dev
```

### Issue 2: Backend Not Starting
**Error:** `Cannot find module` or `npm ERR!`

**Fix:**
```powershell
cd backend
npm install
npm start
```

### Issue 3: CORS Errors
**Error:** `CORS policy` in browser console

**Fix:**
- Make sure backend is running on port 5000
- Check `FRONTEND_URL` in `configs.env` matches your frontend URL

### Issue 4: Token in URL But Page Doesn't Load
**Symptom:** URL has `?access_token=...` but page is blank/error

**Fix:**
- Frontend server must be running
- Check browser console for errors
- Verify React Router is set up correctly

---

## Step-by-Step Debug Process

1. **Check Backend:**
   - Is it running? Check terminal for "port 5000" message
   - Test: Open `http://127.0.0.1:5000/api/auth/login` in browser
   - Should return JSON with `authUrl`

2. **Check Frontend:**
   - Is it running? Check terminal for "port 3000" message
   - Test: Open `http://127.0.0.1:3000` in browser
   - Should show the Statify homepage

3. **Check OAuth Flow:**
   - Click "Connect Spotify"
   - Should redirect to Spotify login
   - After authorizing, should redirect back to frontend callback
   - If connection refused, frontend is not running!

---

## Still Not Working?

1. **Restart Everything:**
   - Stop both servers (`Ctrl + C`)
   - Start backend: `cd backend && npm start`
   - Start frontend: `cd frontend && npm run dev`
   - Clear browser cache
   - Try again

2. **Check Browser Console:**
   - Press `F12` to open DevTools
   - Look for errors in Console tab
   - Check Network tab for failed requests

3. **Verify Config:**
   - Check `configs.env` has correct values
   - Check Spotify Dashboard has correct redirect URI
   - Make sure URLs match exactly (no typos)

