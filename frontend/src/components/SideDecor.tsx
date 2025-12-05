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

      {/* Right Side Decor - Moved to RetroBackground */}
    </>
  );
}
