import { motion } from 'motion/react';

export function RetroStickers() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
      {/* Top Left Cluster */}
      <motion.div
        className="absolute top-32 left-8 w-20 h-20"
        animate={{
          rotate: [0, -5, 5, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl p-3 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-3xl">🎵</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-48 left-24 w-16 h-16"
        animate={{
          rotate: [0, 10, -10, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl p-2 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-2xl">✨</span>
        </div>
      </motion.div>

      {/* Top Right Cluster */}
      <motion.div
        className="absolute top-40 right-12 w-24 h-24"
        animate={{
          rotate: [0, 8, -8, 0],
          y: [0, 12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      >
        <div className="bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl p-4 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-4xl">🌸</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-24 right-32 w-14 h-14"
        animate={{
          rotate: [0, -12, 12, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full p-2 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-xl">⭐</span>
        </div>
      </motion.div>

      {/* Middle Left */}
      <motion.div
        className="absolute top-1/2 left-4 w-20 h-20"
        animate={{
          rotate: [0, -6, 6, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      >
        <div className="bg-gradient-to-br from-green-200 to-green-300 rounded-2xl p-3 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-3xl">💿</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-16 w-16 h-16"
        animate={{
          rotate: [0, 15, -15, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
        }}
      >
        <div className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl p-2 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-2xl">🎧</span>
        </div>
      </motion.div>

      {/* Middle Right */}
      <motion.div
        className="absolute top-1/2 right-8 w-18 h-18"
        animate={{
          rotate: [0, 10, -10, 0],
          x: [0, 12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      >
        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-2xl p-3 border-3 border-white shadow-xl sticker-shadow holo-foil">
          <span className="text-3xl">✦</span>
        </div>
      </motion.div>

      {/* Bottom Left Cluster */}
      <motion.div
        className="absolute bottom-48 left-12 w-22 h-22"
        animate={{
          rotate: [0, -8, 8, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      >
        <div className="bg-gradient-to-br from-red-200 to-pink-300 rounded-2xl p-4 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-4xl">💖</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-32 w-16 h-16"
        animate={{
          rotate: [0, 12, -12, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1.5,
        }}
      >
        <div className="bg-gradient-to-br from-cyan-200 to-blue-300 rounded-xl p-2 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-2xl">🌙</span>
        </div>
      </motion.div>

      {/* Bottom Right Cluster */}
      <motion.div
        className="absolute bottom-40 right-16 w-20 h-20"
        animate={{
          rotate: [0, 7, -7, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      >
        <div className="bg-gradient-to-br from-teal-200 to-emerald-300 rounded-2xl p-3 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-3xl">🎸</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-56 right-28 w-14 h-14"
        animate={{
          rotate: [0, -10, 10, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 0.8,
        }}
      >
        <div className="bg-gradient-to-br from-violet-200 to-purple-300 rounded-full p-2 border-3 border-white shadow-xl sticker-shadow">
          <span className="text-xl">🔥</span>
        </div>
      </motion.div>

      {/* Floating cassette tapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 opacity-60"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      >
        <svg width="50" height="35" viewBox="0 0 60 40">
          <rect x="2" y="5" width="56" height="30" rx="3" fill="#FFB3D9" stroke="#FFF" strokeWidth="3"/>
          <circle cx="18" cy="20" r="8" fill="#000" opacity="0.3"/>
          <circle cx="42" cy="20" r="8" fill="#000" opacity="0.3"/>
          <rect x="14" y="18" width="32" height="4" fill="#8B4513" opacity="0.4"/>
        </svg>
      </motion.div>

      {/* Pixel music notes */}
      <motion.div
        className="absolute top-2/3 left-1/3 opacity-50"
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#A5D8FF">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </motion.div>
    </div>
  );
}
