const express = require('express');
const cors = require('cors');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config({ path: '../configs.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Spotify OAuth configuration
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Generate random string for state
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Store state temporarily (in production, use Redis or similar)
const stateStore = new Map();

// Initiate Spotify OAuth
app.get('/api/auth/login', (req, res) => {
  const state = generateRandomString(16);
  stateStore.set(state, true);
  
  const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-position';
  
  const authUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    });
  
  res.json({ authUrl });
});

// Callback handler - exchange code for token
app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  
  if (!state || !stateStore.has(state)) {
    res.redirect(`${FRONTEND_URL}/?error=state_mismatch`);
    return;
  }
  
  stateStore.delete(state);
  
  if (!code) {
    res.redirect(`${FRONTEND_URL}/?error=missing_code`);
    return;
  }
  
  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      }),
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const { access_token, refresh_token } = tokenResponse.data;
    
    // Redirect to frontend with token
    res.redirect(`${FRONTEND_URL}/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    res.redirect(`${FRONTEND_URL}/?error=token_exchange_failed`);
  }
});

// Refresh access token
app.post('/api/auth/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token required' });
  }
  
  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
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
    console.error('Error refreshing token:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to refresh token' });
  }
});

// Get user profile
app.get('/api/user/profile', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch user profile' });
  }
});

// Get top artists
app.get('/api/user/top-artists', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  const time_range = req.query.time_range || 'long_term'; // short_term, medium_term, long_term
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      params: {
        time_range: time_range,
        limit: 5
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top artists:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch top artists' });
  }
});

// Get top tracks
app.get('/api/user/top-tracks', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  const time_range = req.query.time_range || 'long_term';
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      params: {
        time_range: time_range,
        limit: 5
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top tracks:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch top tracks' });
  }
});

// Get recently played tracks
app.get('/api/user/recently-played', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      params: {
        limit: 50
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recently played:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch recently played tracks' });
  }
});

// Get track by ID (for album art)
app.get('/api/tracks/:id', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  const trackId = req.params.id;
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching track:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch track' });
  }
});

// Get artist by ID (for artist images)
app.get('/api/artists/:id', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  const artistId = req.params.id;
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching artist:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch artist' });
  }
});

// Get multiple artists at once (bulk) - using Spotify's Get Several Artists endpoint
app.get('/api/artists/bulk', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  const { ids } = req.query;
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  if (!ids || typeof ids !== 'string') {
    return res.status(400).json({ error: 'Artist IDs required as query parameter (ids=id1,id2,id3)' });
  }
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists?ids=${ids}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching artists:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch artists' });
  }
});

// Get user stats summary
app.get('/api/user/stats', async (req, res) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    // Fetch all data in parallel
    const [profile, topArtists, topTracks, recentlyPlayed] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${access_token}` }
      }),
      axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { 'Authorization': `Bearer ${access_token}` },
        params: { time_range: 'long_term', limit: 5 }
      }),
      axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { 'Authorization': `Bearer ${access_token}` },
        params: { time_range: 'long_term', limit: 5 }
      }),
      axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: { 'Authorization': `Bearer ${access_token}` },
        params: { limit: 50 }
      }).catch(() => ({ data: { items: [] } })) // Gracefully handle if no recent plays
    ]);
    
    // Calculate total minutes listened (approximate from recently played)
    const totalMinutes = recentlyPlayed.data.items?.reduce((total, item) => {
      return total + (item.track.duration_ms / 60000);
    }, 0) || 0;
    
    // Calculate unique artists count
    const uniqueArtists = new Set();
    recentlyPlayed.data.items?.forEach(item => {
      item.track.artists.forEach(artist => uniqueArtists.add(artist.id));
    });
    
    res.json({
      profile: profile.data,
      topArtists: topArtists.data.items,
      topTracks: topTracks.data.items,
      stats: {
        totalMinutesListened: Math.round(totalMinutes),
        uniqueArtistsCount: uniqueArtists.size,
        totalTracksPlayed: recentlyPlayed.data.items?.length || 0
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error.response?.data || error.message);
    res.status(401).json({ error: 'Failed to fetch user stats' });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Statify backend server running on port ${PORT}`);
});

