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
        
        {/* Bodega Computer Screen Container */}
        <main className="py-8 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* CRT Monitor Frame */}
            <div 
              className="relative mx-auto max-w-6xl"
              style={{
                background: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 50%, #0F0F0F 100%)',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.1)',
                border: '8px solid #1A1A1A',
              }}
            >
              {/* Screen Bezel */}
              <div 
                className="relative"
                style={{
                  background: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8), 0 0 0 2px #333',
                }}
              >
                {/* CRT Screen Effect */}
                <div 
                  className="relative"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,245,235,0.98) 0%, rgba(255,233,214,0.95) 100%)',
                    minHeight: '80vh',
                    borderRadius: '4px',
                    padding: '24px',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)',
                    position: 'relative',
                  }}
                >
                  {/* CRT Scanlines Effect - Subtle */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
                      borderRadius: '4px',
                    }}
                  />
                  
                  {/* Screen Content */}
                  <div className="relative z-10">
            {/* Bodega Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="mb-4 inline-block px-6 py-2 bg-yellow-400 border-4 border-red-600 rounded" style={{
                boxShadow: '0 4px 0 #8B0000, 0 8px 16px rgba(0,0,0,0.2)',
              }}>
                <div className="text-2xl md:text-3xl font-black text-red-700" style={{
                  textShadow: '2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '3px',
                }}>
                  STATIFY BODEGA
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl curvy-font clear-text mb-2" style={{
                color: '#1a1a1a',
                fontWeight: 900,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}>
                YOUR MUSIC STATS
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

            {/* Stats Overview Cards - Bodega Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'TOTAL MINUTES', value: formatMinutes(stats.stats.totalMinutesListened), color: '#1DB954', emoji: '⏱️', bg: '#FFD700' },
                { label: 'UNIQUE ARTISTS', value: stats.stats.uniqueArtistsCount.toString(), color: '#FF6347', emoji: '🎤', bg: '#FFA500' },
                { label: 'TRACKS PLAYED', value: stats.stats.totalTracksPlayed.toString(), color: '#4169E1', emoji: '🎵', bg: '#87CEEB' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${stat.bg} 0%, ${stat.color} 100%)`,
                    border: '4px solid #1a1a1a',
                    borderRadius: '8px',
                    boxShadow: '0 6px 0 #1a1a1a, 0 12px 24px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="text-4xl mb-3">{stat.emoji}</div>
                  <div className="pixel-font text-xs mb-2 font-bold" style={{ 
                    color: '#1a1a1a',
                    textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
                  }}>
                    {stat.label}
                  </div>
                  <div className="text-4xl md:text-5xl curvy-font font-black" style={{ 
                    color: '#1a1a1a',
                    textShadow: '2px 2px 4px rgba(255,255,255,0.6), 4px 4px 8px rgba(0,0,0,0.2)',
                  }}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top 5 Artists - Grocery Store Shelf */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              {/* Shelf Label */}
              <div className="mb-6 text-center">
                <div className="inline-block px-6 py-2 bg-yellow-400 border-4 border-red-600 rounded mb-3" style={{
                  boxShadow: '0 4px 0 #8B0000, 0 8px 16px rgba(0,0,0,0.2)',
                }}>
                  <h2 className="text-2xl md:text-3xl curvy-font font-black" style={{
                    color: '#8B0000',
                    textShadow: '2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.2)',
                    letterSpacing: '2px',
                  }}>
                    ARTIST AISLE
                  </h2>
                </div>
              </div>
              
              {/* Grocery Store Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.topArtists.map((artist, index) => (
                  <motion.a
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05, rotate: 2 }}
                    className="relative block"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      border: '4px solid #1a1a1a',
                      borderRadius: '12px',
                      boxShadow: '0 6px 0 #1a1a1a, 0 12px 24px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
                    }}
                  >
                    {/* Price Tag Rank */}
                    <div 
                      className="absolute top-3 left-3 z-10 w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg"
                      style={{
                        background: `linear-gradient(135deg, ${['#FF6347', '#4169E1', '#FF1493', '#32CD32', '#FFD700'][index]} 0%, ${['#DC143C', '#1E90FF', '#C71585', '#228B22', '#FFA500'][index]} 100%)`,
                        border: '3px solid #1a1a1a',
                        boxShadow: '0 3px 0 #1a1a1a, 0 6px 12px rgba(0,0,0,0.3)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      #{index + 1}
                    </div>
                    
                    {artist.images?.[0] && (
                      <motion.img
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="w-full aspect-square object-cover"
                        style={{
                          filter: 'contrast(1.1) saturate(1.1)',
                        }}
                        whileHover={{ scale: 1.05 }}
                      />
                    )}
                    <div className="p-4 bg-white/95 backdrop-blur-sm">
                      <div className="text-lg md:text-xl curvy-font font-black text-center" style={{ 
                        color: '#1a1a1a',
                        textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
                      }}>
                        {artist.name}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>

            {/* Top 5 Tracks - Grocery Store Shelf */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              {/* Shelf Label */}
              <div className="mb-6 text-center">
                <div className="inline-block px-6 py-2 bg-blue-400 border-4 border-blue-700 rounded mb-3" style={{
                  boxShadow: '0 4px 0 #1E3A8A, 0 8px 16px rgba(0,0,0,0.2)',
                }}>
                  <h2 className="text-2xl md:text-3xl curvy-font font-black" style={{
                    color: '#1E3A8A',
                    textShadow: '2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.2)',
                    letterSpacing: '2px',
                  }}>
                    TRACKS AISLE
                  </h2>
                </div>
              </div>
              
              {/* Grocery Store Product Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.topTracks.map((track, index) => (
                  <motion.a
                    key={track.id}
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05, rotate: 2 }}
                    className="relative block"
                    style={{
                      background: 'linear-gradient(135deg, #87CEEB 0%, #4169E1 100%)',
                      border: '4px solid #1a1a1a',
                      borderRadius: '12px',
                      boxShadow: '0 6px 0 #1a1a1a, 0 12px 24px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
                    }}
                  >
                    {/* Price Tag Rank */}
                    <div 
                      className="absolute top-3 left-3 z-10 w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg"
                      style={{
                        background: `linear-gradient(135deg, ${['#FF6347', '#4169E1', '#FF1493', '#32CD32', '#FFD700'][index]} 0%, ${['#DC143C', '#1E90FF', '#C71585', '#228B22', '#FFA500'][index]} 100%)`,
                        border: '3px solid #1a1a1a',
                        boxShadow: '0 3px 0 #1a1a1a, 0 6px 12px rgba(0,0,0,0.3)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      #{index + 1}
                    </div>
                    
                    {/* Large Album Art */}
                    <div className="aspect-square w-full relative overflow-hidden">
                      {track.album.images?.[0] ? (
                        <img
                          src={track.album.images[0].url}
                          alt={track.name}
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'contrast(1.1) saturate(1.1)',
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                          <span className="text-6xl">🎵</span>
                        </div>
                      )}
                      {/* Overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4 bg-white/95 backdrop-blur-sm">
                      <div className="text-lg md:text-xl curvy-font font-black mb-1 text-center" style={{ 
                        color: '#1a1a1a',
                        textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
                        lineHeight: 1.2,
                      }}>
                        {track.name}
                      </div>
                      <div className="text-sm font-bold text-center" style={{ 
                        color: '#4a4a4a',
                        textShadow: '1px 1px 2px rgba(255,255,255,0.3)',
                      }}>
                        {track.artists.map(a => a.name).join(', ')}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
                  </div>
                </div>
                
                {/* Monitor Brand Label */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-mono">
                  STATIFY SYSTEMS v1.0
                </div>
              </div>
              
              {/* Monitor Stand */}
              <div className="mx-auto mt-4 w-32 h-8" style={{
                background: 'linear-gradient(180deg, #1A1A1A 0%, #0A0A0A 100%)',
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }} />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

