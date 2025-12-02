import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { RetroBackground } from './RetroBackground';
import { RetroStickers } from './RetroStickers';
import { SideDecor } from './SideDecor';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
}

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string }> };
  external_urls: { spotify: string };
  duration_ms: number;
}

interface UserStats {
  profile: {
    display_name: string;
    images: Array<{ url: string }>;
  };
  topArtists: Artist[];
  topTracks: Track[];
  stats: {
    totalMinutesListened: number;
    uniqueArtistsCount: number;
    totalTracksPlayed: number;
  };
}

export function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const accessToken = localStorage.getItem('spotify_access_token');
      
      if (!accessToken) {
        setError('No access token found. Please connect your Spotify account.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/api/user/stats', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshToken = localStorage.getItem('spotify_refresh_token');
          if (refreshToken) {
            const refreshResponse = await fetch('http://127.0.0.1:5000/api/auth/refresh', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ refresh_token: refreshToken })
            });

            if (refreshResponse.ok) {
              const { access_token, refresh_token } = await refreshResponse.json();
              localStorage.setItem('spotify_access_token', access_token);
              if (refresh_token) {
                localStorage.setItem('spotify_refresh_token', refresh_token);
              }
              
              // Retry with new token
              const retryResponse = await fetch('http://127.0.0.1:5000/api/user/stats', {
                headers: {
                  'Authorization': `Bearer ${access_token}`
                }
              });
              
              if (retryResponse.ok) {
                const data = await retryResponse.json();
                setStats(data);
              } else {
                setError('Failed to fetch stats. Please try again.');
              }
            } else {
              setError('Session expired. Please reconnect your Spotify account.');
            }
          } else {
            setError('Session expired. Please reconnect your Spotify account.');
          }
        } else if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          setError('Failed to fetch stats. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to fetch stats. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatMinutes = (minutes: number) => {
    if (minutes >= 1000) {
      return `${(minutes / 1000).toFixed(1)}k`;
    }
    return minutes.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <RetroBackground />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-pink-300 border-t-pink-500 rounded-full relative z-10"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <RetroBackground />
        <div className="text-center relative z-10">
          <h2 className="text-4xl curvy-font clear-text mb-4" style={{ color: '#ff6b6b' }}>
            {error}
          </h2>
          <button
            onClick={() => window.location.href = '/'}
            className="bubble-button curvy-font clear-text px-8 py-4"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <RetroBackground />
      <RetroStickers />
      <SideDecor />
      
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        
        <main className="py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl curvy-font pastel-gradient clear-text mb-4">
                Welcome Back!
              </h1>
              {stats.profile.images?.[0] && (
                <motion.img
                  src={stats.profile.images[0].url}
                  alt={stats.profile.display_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
              )}
              <p className="text-2xl md:text-3xl curvy-font clear-text" style={{ color: '#4a4a4a', fontWeight: 700 }}>
                {stats.profile.display_name} ♪
              </p>
            </motion.div>

            {/* Stats Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { label: 'TOTAL MINUTES', value: formatMinutes(stats.stats.totalMinutesListened), color: '#1DB954', emoji: '⏱️' },
                { label: 'UNIQUE ARTISTS', value: stats.stats.uniqueArtistsCount.toString(), color: '#FFB3D9', emoji: '🎤' },
                { label: 'TRACKS PLAYED', value: stats.stats.totalTracksPlayed.toString(), color: '#A5D8FF', emoji: '🎵' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="winxp-window p-8 text-center crt-glow"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="text-4xl mb-4">{stat.emoji}</div>
                  <div className="pixel-font text-xs mb-2 curvy-font" style={{ color: stat.color }}>
                    {stat.label}
                  </div>
                  <div className="text-4xl md:text-5xl curvy-font clear-text" style={{ 
                    fontWeight: 900,
                    color: '#1a1a1a',
                  }}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top 5 Artists */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-6xl curvy-font pastel-gradient clear-text mb-8 text-center">
                Your Top 5 Artists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.topArtists.map((artist, index) => (
                  <motion.a
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="winxp-window p-6 text-center crt-glow block"
                  >
                    {artist.images?.[0] && (
                      <motion.img
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-2xl mb-4 border-2 border-white"
                        whileHover={{ rotate: 5 }}
                      />
                    )}
                    <div className="text-xl md:text-2xl curvy-font clear-text" style={{ fontWeight: 700 }}>
                      #{index + 1} {artist.name}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>

            {/* Top 5 Tracks */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-6xl curvy-font pastel-gradient clear-text mb-8 text-center">
                Your Top 5 Tracks
              </h2>
              <div className="space-y-4">
                {stats.topTracks.map((track, index) => (
                  <motion.a
                    key={track.id}
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="winxp-window p-6 flex items-center gap-6 crt-glow"
                  >
                    <div className="text-3xl curvy-font clear-text" style={{ fontWeight: 900, minWidth: '3rem' }}>
                      #{index + 1}
                    </div>
                    {track.album.images?.[0] && (
                      <img
                        src={track.album.images[0].url}
                        alt={track.name}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-white"
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-xl md:text-2xl curvy-font clear-text mb-1" style={{ fontWeight: 700 }}>
                        {track.name}
                      </div>
                      <div className="text-lg curvy-font" style={{ color: '#4a4a4a' }}>
                        {track.artists.map(a => a.name).join(', ')}
                      </div>
                    </div>
                    <div className="text-2xl">🎵</div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

