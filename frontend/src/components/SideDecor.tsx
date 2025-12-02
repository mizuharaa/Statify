import { motion } from 'motion/react';

export function SideDecor() {
  return (
    <>
      {/* Left Side Decor */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6">
        {/* Now Playing Button */}
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          className="cursor-pointer"
        >
          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border-3 border-pink-300 shadow-xl" style={{
            boxShadow: '0 4px 0 #FFB3D9, 0 8px 20px rgba(255, 105, 180, 0.3), inset 0 2px 0 rgba(255,255,255,0.8)',
          }}>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-pink-500 rounded-full"
              />
              <span className="pixel-font text-xs" style={{ color: '#FF69B4' }}>NOW PLAYING ♫</span>
            </div>
          </div>
        </motion.div>

        {/* Enter Site Button */}
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          className="cursor-pointer"
        >
          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border-3 border-blue-300 shadow-xl" style={{
            boxShadow: '0 4px 0 #A5D8FF, 0 8px 20px rgba(165, 216, 255, 0.3), inset 0 2px 0 rgba(255,255,255,0.8)',
          }}>
            <span className="pixel-font text-xs" style={{ color: '#5CA8E8' }}>ENTER SITE ✦</span>
          </div>
        </motion.div>

        {/* Profile.exe Button */}
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          className="cursor-pointer"
        >
          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border-3 border-purple-300 shadow-xl" style={{
            boxShadow: '0 4px 0 #D4BBFF, 0 8px 20px rgba(212, 187, 255, 0.3), inset 0 2px 0 rgba(255,255,255,0.8)',
          }}>
            <span className="pixel-font text-xs" style={{ color: '#B893F0' }}>PROFILE.EXE</span>
          </div>
        </motion.div>

        {/* Mini Sticker - Pixel Cityscape */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="mt-4"
        >
          <div className="bg-white/90 p-3 rounded-lg border-2 border-purple-200 shadow-lg">
            <svg width="60" height="40" viewBox="0 0 60 40">
              {/* Pixel cityscape */}
              <rect x="5" y="20" width="8" height="15" fill="#A5D8FF"/>
              <rect x="15" y="15" width="8" height="20" fill="#FFB3D9"/>
              <rect x="25" y="10" width="8" height="25" fill="#D4BBFF"/>
              <rect x="35" y="18" width="8" height="17" fill="#C3FFE3"/>
              <rect x="45" y="22" width="8" height="13" fill="#FFDAB9"/>
              {/* Windows */}
              <rect x="6" y="22" width="2" height="2" fill="white"/>
              <rect x="10" y="22" width="2" height="2" fill="white"/>
              <rect x="16" y="17" width="2" height="2" fill="white"/>
              <rect x="20" y="17" width="2" height="2" fill="white"/>
              <rect x="26" y="12" width="2" height="2" fill="white"/>
              <rect x="30" y="12" width="2" height="2" fill="white"/>
            </svg>
          </div>
        </motion.div>

        {/* Retro CD Icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200 border-2 border-white shadow-lg holo-foil flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white" />
          </div>
        </motion.div>
      </div>

      {/* Right Side Decor */}
      <div className="fixed right-4 top-1/3 z-40 hidden xl:flex flex-col gap-6">
        {/* Anime Girl Sticker Placeholder */}
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
          <div className="w-24 h-32 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl border-3 border-white shadow-xl flex items-center justify-center">
            <span className="text-4xl">♪</span>
          </div>
        </motion.div>

        {/* Pixel Heart */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill="#FFB3D9" 
              stroke="#FF69B4" 
              strokeWidth="2"/>
          </svg>
        </motion.div>

        {/* 90s Toy Sticker */}
        <motion.div
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <div className="bg-white/90 p-2 rounded-lg border-2 border-pink-200 shadow-lg">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#FFB3D9">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              <circle cx="12" cy="12" r="4" fill="white" opacity="0.5"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </>
  );
}
