const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const querystring = require('querystring');

require('dotenv').config({ path: path.join(__dirname, '../configs.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://127.0.0.1:5001/api/auth/callback';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://127.0.0.1:3000';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('ERROR: CLIENT_ID or CLIENT_SECRET missing. Check Statify/configs.env');
  process.exit(1);
}

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateStore = new Map();

const SCOPES = [
  'user-top-read',
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-read-private',
  'user-read-email',
  'user-read-playback-state'
].join(' ');

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Statify backend is running' });
});

app.get('/api/auth/login', (req, res) => {
  const state = generateRandomString(16);
  stateStore.set(state, true);

  const authUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      state: state,
      show_dialog: true
    });

  res.json({ authUrl });
});

app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (!state || !stateStore.has(state)) {
    return res.redirect(`${FRONTEND_URL}/?error=state_mismatch`);
  }
  stateStore.delete(state);

  if (!code) {
    return res.redirect(`${FRONTEND_URL}/?error=missing_code`);
  }

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({ code, redirect_uri: REDIRECT_URI, grant_type: 'authorization_code' }),
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    const { access_token, refresh_token } = tokenResponse.data;
    res.redirect(`${FRONTEND_URL}/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Token exchange failed:', error.response?.data || error.message);
    res.redirect(`${FRONTEND_URL}/?error=token_exchange_failed`);
  }
});

app.post('/api/auth/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(400).json({ error: 'Refresh token required' });

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({ grant_type: 'refresh_token', refresh_token }),
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.json({
      access_token: tokenResponse.data.access_token,
      refresh_token: tokenResponse.data.refresh_token || refresh_token
    });
  } catch (error) {
    console.error('Token refresh failed:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to refresh token' });
  }
});

app.get('/api/user/profile', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  if (!access_token) return res.status(401).json({ error: 'Access token required' });
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': `Bearer ${access_token}` } });
    res.json(response.data);
  } catch (error) {
    res.status(401).json({ error: 'Failed to fetch user profile' });
  }
});

app.get('/api/user/top-artists', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  const time_range = req.query.time_range || 'long_term';
  if (!access_token) return res.status(401).json({ error: 'Access token required' });
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { 'Authorization': `Bearer ${access_token}` },
      params: { time_range, limit: 5 }
    });
    res.json(response.data);
  } catch (error) {
    res.status(401).json({ error: 'Failed to fetch top artists' });
  }
});

app.get('/api/user/top-tracks', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  const time_range = req.query.time_range || 'long_term';
  if (!access_token) return res.status(401).json({ error: 'Access token required' });
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: { 'Authorization': `Bearer ${access_token}` },
      params: { time_range, limit: 5 }
    });
    res.json(response.data);
  } catch (error) {
    res.status(401).json({ error: 'Failed to fetch top tracks' });
  }
});

async function fetchAllRecentlyPlayed(access_token) {
  const allItems = [];
  let url = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';

  for (let page = 0; page < 5; page++) {
    try {
      const res = await axios.get(url, { headers: { 'Authorization': `Bearer ${access_token}` } });
      const items = res.data.items || [];
      if (items.length === 0) break;
      allItems.push(...items);
      if (res.data.cursors?.before) {
        url = `https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${res.data.cursors.before}`;
      } else break;
    } catch { break; }
  }
  return allItems;
}

app.get('/api/now-playing', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  if (!access_token) return res.status(401).json({ error: 'Access token required' });

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });
    if (response.status === 204 || !response.data) return res.json({ playing: false });
    const item = response.data.item;
    res.json({
      playing: response.data.is_playing || false,
      track: item?.name || null,
      artist: item?.artists?.map(a => a.name).join(', ') || null,
      albumArt: item?.album?.images?.[0]?.url || null,
      progress: response.data.progress_ms || 0,
      duration: item?.duration_ms || 0
    });
  } catch {
    res.json({ playing: false });
  }
});

app.get('/api/user/stats', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  if (!access_token) return res.status(401).json({ error: 'Access token required' });

  try {
    const [profile, topArtists20, topTracks] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': `Bearer ${access_token}` } }),
      axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { 'Authorization': `Bearer ${access_token}` },
        params: { time_range: 'medium_term', limit: 20 }
      }),
      axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { 'Authorization': `Bearer ${access_token}` },
        params: { time_range: 'medium_term', limit: 20 }
      }),
    ]);

    const recentItems = await fetchAllRecentlyPlayed(access_token);

    const totalMinutes = recentItems.reduce((t, item) => t + (item.track.duration_ms / 60000), 0);

    const uniqueArtists = new Set();
    recentItems.forEach(item => item.track.artists.forEach(a => uniqueArtists.add(a.id)));

    const genreCounts = {};
    (topArtists20.data.items || []).forEach(artist => {
      (artist.genres || []).forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1; });
    });
    const genres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, count]) => ({ name, count }));
    const genreTotal = genres.reduce((s, g) => s + g.count, 0) || 1;
    const genreBreakdown = genres.map(g => ({ name: g.name, pct: Math.round((g.count / genreTotal) * 100) }));

    const heatDayMap = {};
    recentItems.forEach(item => {
      const day = item.played_at.split('T')[0];
      heatDayMap[day] = (heatDayMap[day] || 0) + 1;
    });
    const heatmap = Object.entries(heatDayMap).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date));

    const dowMinutes = [0, 0, 0, 0, 0, 0, 0];
    recentItems.forEach(item => {
      const dow = new Date(item.played_at).getDay();
      dowMinutes[dow] += item.track.duration_ms / 60000;
    });
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const activeDays = dayNames.map((name, i) => ({ name, minutes: Math.round(dowMinutes[i]) }));

    const hourlyActivity = new Array(24).fill(0);
    recentItems.forEach(item => {
      const hour = new Date(item.played_at).getHours();
      hourlyActivity[hour]++;
    });

    const trackItems = topTracks.data.items || [];
    const avgPopularity = trackItems.length > 0
      ? trackItems.reduce((sum, t) => sum + (t.popularity || 50), 0) / trackItems.length
      : 50;

    let personalityType, personalityDesc;
    if (avgPopularity > 70) {
      personalityType = 'THE TRENDSETTER';
      personalityDesc = 'You ride the charts — always first to the hottest tracks.';
    } else if (avgPopularity > 50) {
      personalityType = 'THE BALANCER';
      personalityDesc = 'Mainstream with soul — you blend the popular with the profound.';
    } else {
      personalityType = 'THE DEEP DIVER';
      personalityDesc = 'You find what others miss — your taste runs deep beneath the surface.';
    }

    res.json({
      profile: profile.data,
      topArtists: (topArtists20.data.items || []).slice(0, 5),
      topArtistsAll: topArtists20.data.items || [],
      topTracks: trackItems,
      recentlyPlayed: recentItems,
      stats: {
        totalMinutesListened: Math.round(totalMinutes),
        uniqueArtistsCount: uniqueArtists.size,
        totalTracksPlayed: recentItems.length
      },
      genreBreakdown,
      heatmap,
      activeDays,
      hourlyActivity,
      personality: { type: personalityType, description: personalityDesc }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch user stats' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Statify backend running on http://localhost:${PORT}`);
});
