import { motion } from 'motion/react';
import chiikawaSticker from 'figma:asset/d7f27a0b2ce402b4b9e7d1603d277d42637dd846.png';
import sakuraBranch from 'figma:asset/7ccdefcb7623b22c61cc550b65df61df057644d7.png';
import sakuraPetal from 'figma:asset/94b62a74a4091ec490d3376543e55674f2372946.png';

export function RetroBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Illustrated Sakura Branches - like scanned stickers */}
      <motion.img
        src={sakuraBranch}
        alt=""
        className="absolute top-0 right-0 w-1/4 opacity-40 sticker-shadow"
        style={{ transform: 'scaleX(-1)', mixBlendMode: 'multiply', filter: 'saturate(1.2) brightness(1.1)' }}
        animate={{
          rotate: [0, -1, 1, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.img
        src={sakuraBranch}
        alt=""
        className="absolute top-20 left-0 w-1/4 opacity-40 sticker-shadow"
        style={{ mixBlendMode: 'multiply', filter: 'saturate(1.2) brightness(1.1)' }}
        animate={{
          rotate: [0, 1, -1, 0],
          y: [0, 5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          delay: 1,
        }}
      />

      {/* Drifting Sakura Petals - slower parallax */}
      {[...Array(25)].map((_, i) => (
        <motion.img
          key={`petal-${i}`}
          src={sakuraPetal}
          alt=""
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            width: `${14 + Math.random() * 18}px`,
            opacity: 0.4 + Math.random() * 0.3,
            mixBlendMode: 'multiply',
            filter: 'saturate(1.3)',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, Math.random() * 360],
            opacity: [0, 0.7, 0.7, 0.3, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: 'linear',
          }}
        />
      ))}

      {/* Anime Mascot - Chiikawa as retro sticker */}
      <motion.div
        className="absolute top-24 right-12 w-24 md:w-32 cursor-pointer pointer-events-auto sticker-shadow"
        whileHover={{ 
          scale: 1.15, 
          rotate: [0, -5, 5, -5, 0],
          y: -8,
          transition: { duration: 0.6 }
        }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, -1, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 blur-xl opacity-30 rounded-2xl" />
          <img 
            src={chiikawaSticker} 
            alt="Chiikawa" 
            className="relative w-full rounded-2xl border-3 border-white shadow-xl" 
            style={{ filter: 'saturate(1.2) brightness(1.05)' }}
          />
        </div>
      </motion.div>

      {/* Floating Pixel Icons */}
      <motion.div
        className="absolute top-1/4 left-10 opacity-60 hidden lg:block"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#FFB3D9">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-20 opacity-60 hidden lg:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#A5D8FF">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6" fill="white" opacity="0.3"/>
        </svg>
      </motion.div>

      {/* Retro Japanese Text Labels - like web stickers */}
      <motion.div
        className="absolute top-1/2 left-8 hidden xl:block"
        animate={{
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-lg border-3 border-pink-300 shadow-xl rotate-6" style={{
          boxShadow: '0 4px 0 #FFB3D9, 0 8px 20px rgba(255, 105, 180, 0.3), inset 0 2px 0 rgba(255,255,255,0.8)',
        }}>
          <div className="pixel-font text-xs" style={{ color: '#FF69B4' }}>音楽♪</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-16 hidden xl:block"
        animate={{
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1.5,
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-lg border-3 border-blue-300 shadow-xl -rotate-6" style={{
          boxShadow: '0 4px 0 #A5D8FF, 0 8px 20px rgba(165, 216, 255, 0.3), inset 0 2px 0 rgba(255,255,255,0.8)',
        }}>
          <div className="pixel-font text-xs" style={{ color: '#5CA8E8' }}>レトロ✦</div>
        </div>
      </motion.div>

      {/* Cassette Tape Pixel Art */}
      <motion.div
        className="absolute bottom-40 left-20 hidden lg:block opacity-50"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <svg width="60" height="40" viewBox="0 0 60 40">
          <rect x="2" y="5" width="56" height="30" rx="3" fill="#FFB3D9" stroke="#FF69B4" strokeWidth="2"/>
          <rect x="5" y="8" width="50" height="24" fill="white" opacity="0.3"/>
          <circle cx="18" cy="20" r="8" fill="#000" opacity="0.6"/>
          <circle cx="42" cy="20" r="8" fill="#000" opacity="0.6"/>
          <circle cx="18" cy="20" r="4" fill="white" opacity="0.3"/>
          <circle cx="42" cy="20" r="4" fill="white" opacity="0.3"/>
          <rect x="14" y="18" width="32" height="4" fill="#8B4513" opacity="0.5"/>
        </svg>
      </motion.div>
    </div>
  );
}
