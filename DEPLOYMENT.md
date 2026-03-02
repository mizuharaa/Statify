# Statify — Production Deployment Guide

Your frontend is on Vercel. Follow these steps to get the full app working online.

---

## Step 1: Deploy the Backend (Railway or Render)

### Option A: Railway (recommended)

1. Go to [railway.app](https://railway.app) and sign in with GitHub.
2. **New Project** → **Deploy from GitHub repo** → select `mizuharaa/Statify`.
3. Railway may auto-detect. If not: **Add Service** → **GitHub Repo** → select Statify.
4. In project settings, set **Root Directory** to `backend`.
5. Under **Variables**, add (use your actual backend URL if different):
   - `CLIENT_ID` = (from Spotify Dashboard)
   - `CLIENT_SECRET` = (from Spotify Dashboard)
   - `REDIRECT_URI` = `https://statify-prod.up.railway.app/api/auth/callback`
   - `FRONTEND_URL` = `https://statify-bice.vercel.app`
   - `PORT` = `5001` (Railway sets this automatically; optional)
6. Deploy.

### Option B: Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**.
2. Connect GitHub → select `mizuharaa/Statify`.
3. **Root Directory**: `backend`.
4. **Build Command**: `npm install` (or leave default).
5. **Start Command**: `node server.js`.
6. Add environment variables (same as above).
7. Deploy and copy your backend URL.

---

## Step 2: Spotify Developer Dashboard

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard).
2. Open your app (or create one).
3. Click **Settings** (or **Edit Settings**).
4. Under **Redirect URIs**, add this **exact** URI (replace with your backend URL if different):
   ```
   https://statify-prod.up.railway.app/api/auth/callback
   ```
   - Must be **https** (not http) for production
   - Must point to your **backend** URL, not the frontend
   - Must end with `/api/auth/callback`
5. Click **Add** then **Save**.

---

## Step 3: Vercel — Frontend Environment Variable

1. Open your project on [vercel.com](https://vercel.com).
2. **Settings** → **Environment Variables**.
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://statify-prod.up.railway.app` (no trailing slash)
4. Redeploy the frontend (Deployments → ⋮ → Redeploy).

---

## Step 4: Verify

1. Visit your Vercel URL.
2. Click **Connect Spotify**.
3. You should be redirected to Spotify to authorize, then back to your app.
4. Your stats should load.

---

## Checklist

| Where | What |
|-------|------|
| **Spotify Dashboard** | Redirect URI: `https://statify-prod.up.railway.app/api/auth/callback` |
| **Backend (Railway)** | `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, `FRONTEND_URL` |
| **Vercel** | `VITE_API_URL` = `https://statify-prod.up.railway.app` |

---

## Troubleshooting

- **"Failed to connect"** → Backend not deployed or wrong `VITE_API_URL`.
- **Redirect URI mismatch** → Spotify Redirect URI must match backend `REDIRECT_URI` exactly.
- **CORS errors** → Backend uses `cors({ origin: true })`; should allow your Vercel domain.
- **`state_mismatch` or redirect to `127.0.0.1:3002`** → Set `FRONTEND_URL` = `https://statify-bice.vercel.app` in Railway Variables. The backend now uses the request Origin when available, but a correct `FRONTEND_URL` is still required as fallback. Redeploy after changing.
