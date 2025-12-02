# 🎵 Statify - Your Retro 90s Japanese Spotify Wrapped Clone ✨

<div align="center">

![Statify Logo](https://img.shields.io/badge/Statify-Retro%2090s%20Japanese-FFB3D9?style=for-the-badge)
![Spotify](https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**Discover your music stats with a funky retro 90s Japanese aesthetic! 🎌**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Reference](#-api-reference)

</div>

---

## ✨ Features

### 🎨 **Retro 90s Japanese Aesthetic**
- Beautiful pastel gradients and neon glows
- Windows XP-style UI elements
- Funky Japanese-inspired design
- Smooth animations and transitions

### 📊 **Comprehensive Music Statistics**
- 🎤 **Top 5 Most Streamed Artists** - See your favorite artists from the past year
- 🎵 **Top 5 Most Streamed Tracks** - Discover your most played songs
- ⏱️ **Total Minutes Listened** - Track your listening time
- 🎭 **Unique Artists Count** - See how diverse your music taste is
- 📈 **Total Tracks Played** - Count of all your recent plays

### 🔐 **Secure Spotify OAuth Integration**
- Safe and secure authentication flow
- Automatic token refresh
- Seamless user experience

### 🎯 **User-Friendly Interface**
- Clean, intuitive navigation
- Responsive design for all devices
- Beautiful visualizations of your music data

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Spotify Developer Account
- Spotify App credentials (Client ID & Client Secret)

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

3. Configure your Spotify credentials in `../configs.env`:
```env
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://localhost:5000/api/auth/callback
FRONTEND_URL=http://localhost:3000
PORT=5000
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000` 🎵

### Step 3: Set Up Frontend

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` ✨

### Step 4: Configure Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:5000/api/auth/callback` to your Redirect URIs
4. Copy your Client ID and Client Secret to `configs.env`

---

## 📖 Usage

### 🎯 Getting Started

1. **Start Both Servers**
   - Backend: `cd backend && npm start`
   - Frontend: `cd frontend && npm run dev`

2. **Open Your Browser**
   - Navigate to `http://localhost:3000`

3. **Connect Your Spotify Account**
   - Click the **"Connect Spotify"** button 🎵
   - Authorize the app on Spotify's OAuth page
   - You'll be redirected back to Statify

4. **View Your Stats**
   - After connecting, click **"See Your Stats Now!"** ✨
   - Explore your personalized dashboard with all your music statistics!

### 🎨 Dashboard Features

#### 📊 Overview Cards
- **Total Minutes Listened** - Your listening time ⏱️
- **Unique Artists Count** - Number of different artists you've listened to 🎤
- **Total Tracks Played** - Count of all your recent plays 🎵

#### 🎤 Top 5 Artists
- Beautiful cards showing your most streamed artists
- Click any artist to open their Spotify page
- Images and names displayed in retro style

#### 🎵 Top 5 Tracks
- List of your most played songs
- Album artwork and artist information
- Direct links to Spotify tracks

---

## 🔧 API Reference

### Backend Endpoints

#### `GET /api/auth/login`
Initiates Spotify OAuth flow.
- **Response**: `{ authUrl: string }`

#### `GET /api/auth/callback`
Handles OAuth callback from Spotify.
- **Query Params**: `code`, `state`
- **Redirects**: To frontend with tokens

#### `POST /api/auth/refresh`
Refreshes access token.
- **Body**: `{ refresh_token: string }`
- **Response**: `{ access_token: string, refresh_token: string }`

#### `GET /api/user/profile`
Gets user profile information.
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: User profile object

#### `GET /api/user/top-artists`
Gets user's top artists.
- **Headers**: `Authorization: Bearer <access_token>`
- **Query Params**: `time_range` (short_term, medium_term, long_term)
- **Response**: Top artists array

#### `GET /api/user/top-tracks`
Gets user's top tracks.
- **Headers**: `Authorization: Bearer <access_token>`
- **Query Params**: `time_range` (short_term, medium_term, long_term)
- **Response**: Top tracks array

#### `GET /api/user/stats`
Gets comprehensive user statistics.
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: Complete stats object with profile, artists, tracks, and metrics

---

## 🎨 Design Philosophy

Statify embraces a **retro 90s Japanese aesthetic** with:
- 🌸 Pastel color palettes (pink, purple, blue, yellow)
- ✨ Neon glow effects
- 🎮 Windows XP-inspired UI elements
- 🎌 Japanese-inspired funky design elements
- 💫 Smooth animations and transitions

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 18** - Modern UI library
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Animation library
- 🛣️ **React Router** - Client-side routing
- 📦 **Vite** - Fast build tool

### Backend
- 🚀 **Express.js** - Web framework
- 🔐 **Spotify Web API** - Music data
- 🌐 **Axios** - HTTP client
- 🔒 **OAuth 2.0** - Authentication

---

## 📝 Project Structure

```
Statify/
├── backend/
│   ├── server.js          # Express server with Spotify API integration
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx    # Landing page hero
│   │   │   ├── CallbackPage.tsx   # OAuth callback handler
│   │   │   ├── Dashboard.tsx      # Stats dashboard
│   │   │   └── ...                # Other UI components
│   │   ├── App.tsx                # Main app with routing
│   │   └── main.tsx               # Entry point
│   └── package.json               # Frontend dependencies
├── configs.env                    # Environment variables
└── README.md                      # This file
```

---

## 🐛 Troubleshooting

### Issue: "Failed to connect to Spotify"
- ✅ Check that your backend server is running on port 5000
- ✅ Verify your `CLIENT_ID` and `CLIENT_SECRET` in `configs.env`
- ✅ Ensure your redirect URI matches in Spotify Developer Dashboard

### Issue: "Token expired" error
- ✅ The app automatically refreshes tokens, but if it fails:
- ✅ Clear localStorage and reconnect your Spotify account
- ✅ Check that your refresh token is valid

### Issue: "CORS error"
- ✅ Make sure both frontend and backend are running
- ✅ Verify `FRONTEND_URL` in `configs.env` matches your frontend URL

---

## 🎉 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🎨 Improve the design
- 📝 Update documentation

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- 🎵 **Spotify** for the amazing Web API
- 🎨 **Design inspiration** from retro 90s Japanese aesthetics
- ⚛️ **React community** for excellent tools and libraries

---

<div align="center">

**Made with ❤️ and 🎵 by the Statify Team**

⭐ Star this repo if you like it!

</div>

