import { motion } from 'motion/react';
import { X, Minimize2, Square } from 'lucide-react';
import drakeImage from 'figma:asset/8f280272c0bf2b07720d3b027f1db44f6b4feace.png';
import weekndImage from 'figma:asset/0b0008e7c16939022d775d82c2b6080c4a016985.png';

interface RecapPosterProps {
  isPreview?: boolean;
}

export function RecapPoster({ isPreview = false }: RecapPosterProps) {
  const topTracks = [
    { rank: 1, title: 'One Dance', artist: 'Drake', plays: '2,847' },
    { rank: 2, title: 'Blinding Lights', artist: 'The Weeknd', plays: '2,156' },
    { rank: 3, title: 'Sky', artist: 'Playboi Carti', plays: '1,923' },
    { rank: 4, title: 'SICKO MODE', artist: 'Travis Scott', plays: '1,678' },
    { rank: 5, title: 'Starboy', artist: 'The Weeknd', plays: '1,542' },
  ];

  return (
    <div className={`${isPreview ? 'scale-95' : ''} max-w-5xl mx-auto relative`}>
      {/* WinXP Window - Performance Optimized */}
      <motion.div
        className="winxp-window crt-glow animated"
        whileHover={isPreview ? { scale: 1.01 } : {}}
        transition={{ duration: 0.3 }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      >
        {/* Title Bar */}
        <div className="xp-titlebar xp-titlebar-pink">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-white to-pink-200 rounded border border-white/60 flex items-center justify-center shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF69B4">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0z"/>
              </svg>
            </div>
            <span className="text-white pixel-font text-xs curvy-font" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}>
              STATIFY.EXE — YOUR MUSIC RECAP ✦
            </span>
          </div>
          <div className="xp-controls flex gap-1">
            <button><Minimize2 className="w-3 h-3 text-gray-700" /></button>
            <button><Square className="w-2.5 h-2.5 text-gray-700" /></button>
            <button className="bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700">
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-10 md:p-16 bg-gradient-to-br from-white/98 via-pink-50/95 to-purple-50/95 backdrop-blur-sm relative overflow-hidden">
          {/* Hero Stat - Crystal Clear */}
          <motion.div 
            className="text-center mb-20 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <div className="pixel-font text-sm mb-6 inline-block px-6 py-3 bg-white/95 rounded-full border-3 border-pink-200 shadow-lg curvy-font" style={{ color: '#FF69B4' }}>
              ★ TOTAL LISTENING TIME ★
            </div>
            <motion.div 
              className="text-9xl md:text-[12rem] mb-6 curvy-font pastel-gradient clear-text animated"
              style={{ 
                fontWeight: 900,
                lineHeight: 1,
              }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              47,826
            </motion.div>
            <div className="text-4xl md:text-5xl curvy-font clear-text mb-16" style={{ fontWeight: 800, color: '#2C3E50' }}>
              minutes ♪
            </div>
          </motion.div>

          {/* Top Artist - Enhanced Spacing */}
          <motion.div 
            className="mb-12 winxp-window crt-glow animated"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ x: 10, scale: 1.01 }}
          >
            <div className="xp-titlebar xp-titlebar-green">
              <span className="text-white pixel-font text-sm curvy-font clear-text" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                ★ TOP ARTIST ★
              </span>
              <div className="xp-controls flex gap-1">
                <button><div className="w-2 h-2 bg-gray-700 rounded-full" /></button>
              </div>
            </div>
            <div className="p-8 md:p-10 bg-gradient-to-br from-emerald-50/98 to-green-100/95">
              <div className="flex items-center gap-8">
                <div className="relative animated">
                  <motion.div 
                    className="absolute inset-0 bg-[#1DB954] blur-2xl opacity-50 rounded-3xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img 
                    src={drakeImage} 
                    alt="Drake"
                    className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl object-cover border-4 border-white shadow-2xl"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-5xl md:text-6xl mb-4 curvy-font clear-text" style={{ fontWeight: 900, color: '#1a1a1a' }}>Drake</div>
                  <div className="text-2xl md:text-3xl curvy-font clear-text" style={{ fontWeight: 800, color: '#1DB954' }}>
                    12,847 minutes
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top 5 Tracks */}
          <motion.div 
            className="mb-10 winxp-window crt-glow animated"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ x: -10, scale: 1.01 }}
          >
            <div className="xp-titlebar xp-titlebar-purple">
              <span className="text-white pixel-font text-sm curvy-font clear-text" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                ♫ TOP 5 TRACKS ♫
              </span>
              <div className="xp-controls flex gap-1">
                <button><div className="w-2 h-2 bg-gray-700 rounded-full" /></button>
              </div>
            </div>
            <div className="p-8 md:p-10 bg-gradient-to-br from-purple-50/98 to-pink-100/95">
              <div className="space-y-4">
                {topTracks.map((track, i) => (
                  <motion.div
                    key={track.rank}
                    className="flex items-center gap-5 p-5 bg-white/95 rounded-2xl border-3 border-purple-200 shadow-lg hover:shadow-xl transition-all animated"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white pixel-font text-base curvy-font"
                      style={{ 
                        background: i === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 
                                   i === 1 ? 'linear-gradient(135deg, #C0C0C0, #A8A8A8)' :
                                   i === 2 ? 'linear-gradient(135deg, #CD7F32, #B8733E)' :
                                   'linear-gradient(135deg, #FFB3D9, #FF85BC)',
                        boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.2)',
                      }}
                    >
                      {track.rank}
                    </div>
                    {track.rank === 2 && (
                      <img 
                        src={weekndImage} 
                        alt={track.artist}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md"
                        style={{ imageRendering: 'crisp-edges' }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-xl md:text-2xl curvy-font clear-text" style={{ fontWeight: 800, color: '#1a1a1a' }}>{track.title}</div>
                      <div className="text-base md:text-lg curvy-font clear-text" style={{ fontWeight: 700, opacity: 0.7, color: '#4a4a4a' }}>{track.artist}</div>
                    </div>
                    <div className="text-base curvy-font clear-text" style={{ fontWeight: 900, color: '#C69AFF' }}>
                      {track.plays}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              className="winxp-window crt-glow animated"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="xp-titlebar xp-titlebar-peach">
                <span className="text-white pixel-font text-xs curvy-font clear-text" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>GENRE</span>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-50/90 to-peach-50/90">
                <div className="pixel-font text-xs mb-3 curvy-font clear-text" style={{ color: '#8B4513' }}>TOP GENRE</div>
                <div className="inline-block px-6 py-3 rounded-full text-white curvy-font text-base clear-text" style={{ 
                  background: 'linear-gradient(135deg, #FF6B9D, #C69AFF)',
                  boxShadow: '0 4px 0 #FF85BC, inset 0 2px 0 rgba(255,255,255,0.4)',
                  fontWeight: 900,
                }}>
                  HIP-HOP
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="winxp-window crt-glow animated"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="xp-titlebar xp-titlebar-green">
                <span className="text-white pixel-font text-xs curvy-font clear-text" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>XP</span>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50/90 to-emerald-50/90">
                <div className="pixel-font text-xs mb-3 curvy-font clear-text" style={{ color: '#1DB954' }}>LEVEL 47</div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white curvy-font text-xl clear-text" style={{ 
                    background: 'linear-gradient(135deg, #1DB954, #1ed760)',
                    boxShadow: '0 4px 0 #0F8E3D, inset 0 2px 0 rgba(255,255,255,0.4)',
                    fontWeight: 900,
                  }}>
                    47
                  </div>
                  <div className="flex-1 h-5 bg-white/60 rounded-full overflow-hidden border-2 border-green-200">
                    <motion.div
                      className="h-full"
                      style={{ background: 'linear-gradient(90deg, #1DB954, #1ed760)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '78%' }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
