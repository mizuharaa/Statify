import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SpotifyLogo } from './SpotifyLogo';

const handleConnectSpotify = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/auth/login');
    const data = await response.json();
    window.location.href = data.authUrl;
  } catch (error) {
    console.error('Error initiating Spotify login:', error);
    alert('Failed to connect to Spotify. Please try again.');
  }
};

interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
}

export function HeroSection() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      // Top 5 Artists - Random rap, R&B, pop, US/UK artists
      const artistData = [
        { id: '3TVXtAsR1Inumwj472S9r4', name: 'Drake', genre: 'Rap' },
        { id: '1Xyo4u8uXC1ZmMpatF05PJ', name: 'The Weeknd', genre: 'R&B' },
        { id: '1URnnhqYAYcrqrcwql10ft', name: '21 Savage', genre: 'Rap' },
        { id: '4Z8W4fKeB5YxbusRsdQVPb', name: 'Radiohead', genre: 'Rock' },
        { id: '7tYKF4w9nC0nq9CsPZTHyP', name: 'SZA', genre: 'R&B' },
      ];

      const accessToken = localStorage.getItem('spotify_access_token');
      
      if (accessToken) {
        try {
          // Fetch all artists via backend API
          const artistPromises = artistData.map(artist =>
            fetch(`http://127.0.0.1:5000/api/artists/${artist.id}`, {
              headers: { 'Authorization': `Bearer ${accessToken}` }
            })
            .then(res => {
              if (!res.ok) throw new Error('Failed to fetch');
              return res.json();
            })
            .then(data => ({
              id: data.id,
              name: data.name,
              images: data.images || [{ url: '' }],
              external_urls: { spotify: data.external_urls?.spotify || `https://open.spotify.com/artist/${data.id}` }
            }))
            .catch(() => {
              // Fallback
              return {
                id: artist.id,
                name: artist.name,
                images: [{ url: '' }],
                external_urls: { spotify: `https://open.spotify.com/artist/${artist.id}` }
              };
            })
          );
          
          const artists = await Promise.all(artistPromises);
          setTopArtists(artists);
        } catch (error) {
          console.error('Error fetching artists:', error);
          // Fallback artists
          const fallbackArtists: Artist[] = artistData.map(artist => ({
            id: artist.id,
            name: artist.name,
            images: [{ url: '' }],
            external_urls: { spotify: `https://open.spotify.com/artist/${artist.id}` }
          }));
          setTopArtists(fallbackArtists);
        }
      } else {
        // Default artists when not logged in
        const defaultArtists: Artist[] = [
          { id: '3TVXtAsR1Inumwj472S9r4', name: 'Drake', images: [{ url: '' }], external_urls: { spotify: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4' } },
          { id: '1Xyo4u8uXC1ZmMpatF05PJ', name: 'The Weeknd', images: [{ url: '' }], external_urls: { spotify: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ' } },
          { id: '1URnnhqYAYcrqrcwql10ft', name: '21 Savage', images: [{ url: '' }], external_urls: { spotify: 'https://open.spotify.com/artist/1URnnhqYAYcrqrcwql10ft' } },
          { id: '4Z8W4fKeB5YxbusRsdQVPb', name: 'Radiohead', images: [{ url: '' }], external_urls: { spotify: 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb' } },
          { id: '7tYKF4w9nC0nq9CsPZTHyP', name: 'SZA', images: [{ url: '' }], external_urls: { spotify: 'https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP' } },
        ];
        setTopArtists(defaultArtists);
      }
    };

    fetchArtists();
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 pt-32 pb-20 relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Stats.fm Style: Centered Hero with Large Typography */}
        <div className="text-center relative max-w-5xl mx-auto">
          {/* Main Hero Title - Crystal Clear */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl curvy-font clear-text animated mb-4" 
              style={{
                letterSpacing: '0.05em',
                lineHeight: 0.95,
                fontWeight: 900,
                color: '#1a1a1a',
                textShadow: '3px 3px 0px rgba(255,215,0,0.5), 6px 6px 0px rgba(0,0,0,0.1)',
              }}
              animate={{
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              STATIFY
            </motion.h1>
            
            <motion.div 
              className="mb-6 inline-block px-8 py-3 bg-yellow-400 border-4 border-red-600 rounded"
              style={{
                boxShadow: '0 6px 0 #8B0000, 0 12px 24px rgba(0,0,0,0.3)',
              }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <div className="text-2xl md:text-3xl font-black text-red-700" style={{
                textShadow: '2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.2)',
                letterSpacing: '4px',
              }}>
                BODEGA
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl curvy-font clear-text mb-8 animated" 
              style={{ 
                fontWeight: 900,
                color: '#1a1a1a',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}
              animate={{
                x: [0, 3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              Your Music Stats
            </motion.h2>

            {/* Sparkle decorations */}
            <motion.span
              className="absolute top-0 right-1/4 text-5xl"
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              ✦
            </motion.span>
            <motion.span
              className="absolute bottom-1/4 left-1/4 text-4xl"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: 1,
              }}
            >
              ✧
            </motion.span>
          </motion.div>

          {/* Subtitle - Crystal Clear */}
            <motion.p 
            className="text-xl md:text-2xl lg:text-3xl curvy-font clear-text mb-12 animated" 
            style={{ 
              fontWeight: 700,
              color: '#2a2a2a',
              letterSpacing: '0.02em',
              textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.3,
            }}
          >
            See your top artists & tracks ♪ 24/7 Music Stats
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="curvy-font clear-text flex items-center justify-center gap-3 animated px-8 py-4 text-lg font-black"
              onClick={handleConnectSpotify}
              style={{
                background: 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)',
                border: '4px solid #1a1a1a',
                borderRadius: '12px',
                color: 'white',
                boxShadow: '0 6px 0 #0d7a3d, 0 12px 24px rgba(29, 185, 84, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <SpotifyLogo className="w-7 h-7" fill="white" />
              Connect Spotify
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 text-lg curvy-font clear-text flex items-center justify-center gap-3 animated"
              style={{
                background: 'linear-gradient(180deg, #E5F3FF 0%, #A5D8FF 100%)',
                border: '3px solid #FFFFFF',
                borderRadius: '24px',
                fontWeight: 900,
                boxShadow: '0 6px 0 #74C0FC, 0 12px 28px rgba(165, 216, 255, 0.35), inset 0 3px 0 rgba(255, 255, 255, 0.9)',
              }}
            >
              View Demo ✦
            </motion.button>
          </motion.div>

          {/* Grocery Store Style - Top 5 Tracks Display */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-6xl mx-auto"
          >
            {/* Bodega Store Shelf Header */}
            <div className="mb-8 text-center">
              <div className="inline-block px-8 py-3 bg-yellow-400 border-4 border-red-600 rounded" style={{
                boxShadow: '0 6px 0 #8B0000, 0 12px 24px rgba(0,0,0,0.3)',
              }}>
                <div className="text-2xl md:text-3xl font-black text-red-700" style={{
                  textShadow: '2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '3px',
                }}>
                  TOP 5 ARTISTS - BROWSE NOW
                </div>
              </div>
            </div>

            {/* Grocery Store Shelf Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {topArtists.map((artist, index) => (
                <motion.a
                  key={artist.id}
                  href={artist.external_urls?.spotify || `https://open.spotify.com/artist/${artist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -8, rotate: 2, scale: 1.05 }}
                  className="relative block"
                >
                  {/* Product Card - Bodega Style */}
                  <div 
                    className="relative overflow-hidden rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      border: '4px solid #1a1a1a',
                      boxShadow: '0 6px 0 #1a1a1a, 0 12px 24px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
                    }}
                  >
                    {/* Price Tag Style Rank */}
                    <div 
                      className="absolute top-2 left-2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-white"
                      style={{
                        background: `linear-gradient(135deg, ${['#FF6347', '#4169E1', '#FF1493', '#32CD32', '#FFD700'][index]} 0%, ${['#DC143C', '#1E90FF', '#C71585', '#228B22', '#FFA500'][index]} 100%)`,
                        border: '3px solid #1a1a1a',
                        boxShadow: '0 3px 0 #1a1a1a, 0 6px 12px rgba(0,0,0,0.3)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      #{index + 1}
                    </div>

                    {/* Large Artist Image - Grocery Product Style */}
                    <div className="aspect-square w-full relative overflow-hidden">
                      {artist.images?.[0]?.url ? (
                        <img
                          src={artist.images[0].url}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'contrast(1.1) saturate(1.1)',
                          }}
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                            const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center ${artist.images?.[0]?.url ? 'hidden' : ''}`}>
                        <span className="text-6xl">🎤</span>
                      </div>
                      {/* Overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Product Info - Like Price Tag */}
                    <div className="p-4 bg-white/95 backdrop-blur-sm">
                      <div className="text-lg md:text-xl font-black mb-1" style={{
                        color: '#1a1a1a',
                        textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
                        lineHeight: 1.2,
                      }}>
                        {artist.name}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Floating decorative stickers around mockup */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl p-3 border-3 border-white shadow-xl sticker-shadow hidden lg:block"
              animate={{
                rotate: [0, -10, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <span className="text-3xl">🎵</span>
            </motion.div>

            <motion.div
              className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-300 rounded-2xl p-3 border-3 border-white shadow-xl sticker-shadow hidden lg:block"
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <span className="text-3xl">⭐</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}