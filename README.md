# 🎵 Statify — Your Music. Recorded.

<div align="center">

![Statify](https://img.shields.io/badge/Statify-Broadcast%20FM-D4A843?style=for-the-badge)
![Spotify](https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**Tune into your Spotify stats. See your top artists, tracks, and listening time — beautifully visualized.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Reference](#-api-reference)

</div>

---

## ✨ Features

### 📻 **Broadcast / Vintage Aesthetic**
- Dark theme with warm gold accents (`#0F0D0B`, `#D4A843`)
- Cassette tape and reel-inspired visuals
- Clean typography (Bebas Neue, Playfair Display, DM Sans, IBM Plex Mono)
- Smooth scroll-reveal animations

### 📊 **Music Statistics**
- **Top 5 Artists** — With images and listening time
- **Top 5 Tracks** — Album art, artist credits, duration
- **Total Minutes Listened** — Your listening time
- **Unique Artists Count** — How diverse your taste is
- **Total Tracks Played** — Recent play count

### 🔐 **Spotify OAuth**
- Secure authentication flow
- Automatic token refresh
- No password stored

### 🎯 **Responsive UI**
- Container-based layout (max-width 1200px)
- Mobile-friendly grids and navigation
- Demo preview of top 5 artists on the landing page

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm
- [Spotify Developer Account](https://developer.spotify.com/dashboard) and app credentials

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd Statify
```

### Step 2: Set Up Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `configs.env` in the **Statify root** (one level up from `backend`):
```env
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://127.0.0.1:5000/api/auth/callback
FRONTEND_URL=http://127.0.0.1:3000
PORT=5000
```

4. Start the backend:
```bash
npm start
# or with auto-reload:
npm run dev
```

Backend runs on **http://127.0.0.1:5000**

### Step 3: Set Up Frontend

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the dev server:
```bash
npm run dev
```

Frontend runs on **http://localhost:3000** (or 3001/3002 if 3000 is in use). Update `FRONTEND_URL` in `configs.env` to match.

### Step 4: Configure Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an app (or use an existing one)
3. In **Settings → Redirect URIs**, add exactly:
   ```
   http://127.0.0.1:5000/api/auth/callback
   ```
4. Copy **Client ID** and **Client Secret** into `Statify/configs.env`

---

## 📖 Usage

### Getting Started

1. **Start both servers**
   - Terminal 1: `cd Statify/backend && node server.js`
   - Terminal 2: `cd Statify/frontend && npm run dev`

2. **Open the app**
   - Go to `http://localhost:3000` (or the port Vite shows)

3. **Connect Spotify**
   - Click **Connect Spotify**
   - Authorize on Spotify’s page
   - You’ll be redirected back to Statify

4. **View your stats**
   - Click **See Your Stats**
   - Browse your dashboard: top artists, tracks, and listening metrics

### Dashboard

- **Hero Artist Card** — Your #1 artist with photo and minutes
- **Stats Row** — Total minutes, unique artists, tracks played, hours listened
- **Top Artists Grid** — All 5 with images and links to Spotify
- **Tracklist** — Top 5 tracks with album art and duration

---

## 🔧 API Reference

| Endpoint | Method | Description |
|----------|--------|--------------|
| `/api/auth/login` | GET | Returns `{ authUrl }` to start OAuth |
| `/api/auth/callback` | GET | Handles Spotify callback, redirects to frontend with tokens |
| `/api/auth/refresh` | POST | Body: `{ refresh_token }` — returns new tokens |
| `/api/user/stats` | GET | Headers: `Authorization: Bearer <token>` — full stats (profile, artists, tracks, metrics) |

---

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS v4, React Router, Lucide React  
**Backend:** Node.js, Express, Axios, dotenv

---

## 📁 Project Structure

```
Statify/
├── backend/
│   ├── server.js          # Express server, Spotify OAuth + API
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.tsx   # Hero, How It Works, Features, Demo
│   │   │   ├── CallbackPage.tsx  # OAuth callback handler
│   │   │   └── Dashboard.tsx     # Stats dashboard
│   │   ├── styles/
│   │   │   └── globals.css       # Theme, layout, animations
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── configs.env             # CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, FRONTEND_URL, PORT
└── README.md
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| "Failed to connect to Spotify" | Ensure backend is running on port 5000. Run `cd Statify/backend && node server.js` |
| Port 5000 in use | `netstat -ano \| findstr :5000` then `taskkill /PID <pid> /F` (Windows) |
| "Token exchange failed" | Check REDIRECT_URI in Spotify Dashboard matches `http://127.0.0.1:5000/api/auth/callback` exactly |
| Wrong port after login | Update `FRONTEND_URL` in `configs.env` to match where Vite runs (e.g. `http://127.0.0.1:3002`) |
| CLIENT_ID/CLIENT_SECRET missing | Ensure `configs.env` is in `Statify/` (parent of `backend/`) |

---

## 📄 License

MIT License.

---

<div align="center">

**Made with ❤️ and 🎵**

</div>
