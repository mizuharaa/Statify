import { motion } from 'motion/react';

export function RetroBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Paper texture overlay for retro feel */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Minimalist Japanese Landscape Background - inspired by attachment 4 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(255, 245, 235, 0.95) 0%,
              rgba(255, 233, 214, 0.9) 25%,
              rgba(255, 218, 185, 0.85) 50%,
              rgba(255, 233, 214, 0.9) 75%,
              rgba(255, 245, 235, 0.95) 100%
            ),
            radial-gradient(ellipse at 20% 30%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(255, 182, 193, 0.2) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Stylized mountains - low poly style */}
      <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <polygon points="0,800 200,600 400,650 600,550 800,600 1000,500 1200,550 1200,800" 
          fill="rgba(105, 105, 105, 0.2)" 
          style={{ mixBlendMode: 'multiply' }}
        />
        <polygon points="0,800 150,700 300,750 500,650 700,700 900,600 1100,650 1200,600 1200,800" 
          fill="rgba(128, 128, 128, 0.15)" 
          style={{ mixBlendMode: 'multiply' }}
        />
      </svg>

      {/* Retro Anime Stickers/Posters - Right Side */}
      <div className="fixed right-4 top-1/4 z-40 hidden xl:flex flex-col gap-6">
        {/* Retro Anime Poster 1 - Future/VR style */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="sticker-shadow"
        >
          <div 
            className="w-32 h-40 rounded-lg border-4 border-yellow-400 shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
            }}
          >
            <div className="absolute inset-0 p-2 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-white mb-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                FUTURE
              </div>
              <div className="text-xs text-white opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                未来
              </div>
              <div className="mt-2 w-12 h-12 rounded-full bg-blue-400 border-2 border-white"></div>
            </div>
          </div>
        </motion.div>

        {/* Retro Bodega Sign Style */}
        <motion.div
          animate={{
            rotate: [-3, 3, -3],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
          className="sticker-shadow"
        >
          <div 
            className="w-36 h-20 rounded-lg border-3 border-red-500 shadow-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
            }}
          >
            <div className="absolute inset-0 p-2 flex flex-col items-center justify-center">
              <div className="text-lg font-black text-red-600" style={{ 
                textShadow: '2px 2px 0px white, 4px 4px 0px rgba(0,0,0,0.2)',
                letterSpacing: '2px',
              }}>
                STATIFY
              </div>
              <div className="text-xs text-red-700 font-bold mt-1">24/7 MUSIC</div>
            </div>
          </div>
        </motion.div>

        {/* Retro Japanese Movie Poster Style */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2,
          }}
          className="sticker-shadow"
        >
          <div 
            className="w-28 h-36 rounded-lg border-3 border-blue-600 shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #1E3A5F 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
            }}
          >
            <div className="absolute inset-0 p-2 flex flex-col items-center justify-center text-center">
              <div className="text-white text-xs font-bold mb-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                音楽
              </div>
              <div className="text-white text-xs" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                MUSIC
              </div>
              <div className="mt-2 w-8 h-8 rounded-full bg-yellow-300 border border-white"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Left Side - Bodega Style Elements */}
      <div className="fixed left-4 top-1/3 z-40 hidden xl:flex flex-col gap-6">
        {/* Bodega "OPEN" Sign */}
        <motion.div
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="sticker-shadow"
        >
          <div 
            className="w-24 h-24 rounded-full border-4 border-green-500 shadow-xl flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, #90EE90 0%, #32CD32 100%)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.4)',
            }}
          >
            <div className="text-white font-black text-sm" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              OPEN
            </div>
          </div>
        </motion.div>

        {/* Retro Cassette Tape */}
        <motion.div
          animate={{
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="sticker-shadow"
        >
          <div 
            className="w-20 h-14 rounded border-2 border-pink-400 shadow-lg relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            <div className="absolute inset-1 border border-white/50 rounded"></div>
            <div className="absolute top-2 left-2 right-2 h-1 bg-white/30 rounded"></div>
            <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/30 rounded"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/20 border border-white/50"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating Retro Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 opacity-20 hidden lg:block"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      >
        <div className="w-16 h-16 rounded-lg border-2 border-yellow-400 bg-yellow-200/50 flex items-center justify-center">
          <span className="text-2xl">🎵</span>
        </div>
      </motion.div>
    </div>
  );
}
