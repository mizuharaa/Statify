import { motion } from 'motion/react';

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

export function HeroSection() {
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
              className="text-7xl md:text-8xl lg:text-9xl curvy-font pastel-gradient clear-text animated mb-6" 
              style={{
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                fontWeight: 900,
              }}
              animate={{
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              Level Up Your
            </motion.h1>
            
            <motion.h1 
              className="text-7xl md:text-8xl lg:text-9xl curvy-font clear-text mb-8 animated" 
              style={{ 
                fontWeight: 900,
                color: '#1a1a1a',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
              }}
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              Spotify Stats
            </motion.h1>

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
            className="text-2xl md:text-3xl lg:text-4xl curvy-font clear-text mb-12 animated" 
            style={{ 
              fontWeight: 700,
              color: '#4a4a4a',
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            See your top artists of the month ♪
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
              className="bubble-button curvy-font clear-text flex items-center justify-center gap-3 animated"
              onClick={handleConnectSpotify}
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#1DB954" style={{ shapeRendering: 'geometricPrecision' }}>
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
              </svg>
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

          {/* Device Mockup Section - Stats.fm Style */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            {/* Mock Phone/Desktop Preview */}
            <div className="winxp-window max-w-4xl mx-auto crt-glow">
              <div className="xp-titlebar xp-titlebar-pink">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white/80 rounded-full" />
                  <span className="text-white pixel-font text-xs">PREVIEW.EXE ✦</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-white/70 rounded-full" />
                  <div className="w-3 h-3 bg-white/70 rounded-full" />
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                </div>
              </div>
              
              <div className="p-8 md:p-12 bg-gradient-to-br from-pink-50/95 via-purple-50/95 to-blue-50/95">
                {/* Mini Stats Preview */}
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  {[
                    { label: 'TOTAL MINUTES', value: '47,826', color: '#1DB954' },
                    { label: 'TOP ARTIST', value: 'Drake', color: '#FFB3D9' },
                    { label: 'SONGS PLAYED', value: '2,847', color: '#A5D8FF' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-4 md:p-6 bg-white/90 rounded-2xl border-2 border-white shadow-lg animated"
                      whileHover={{ y: -4, scale: 1.03 }}
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      <div className="pixel-font text-xs mb-2 curvy-font" style={{ color: stat.color }}>
                        {stat.label}
                      </div>
                      <div className="text-3xl md:text-4xl curvy-font clear-text" style={{ 
                        fontWeight: 900,
                        color: '#1a1a1a',
                      }}>
                        {stat.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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