import { motion } from 'motion/react';
import { Music, Disc, Radio } from 'lucide-react';

export function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
      {/* Floating Coins */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`coin-${i}`}
          className="absolute"
          style={{
            left: `${5 + (i * 8) % 95}%`,
            top: `${15 + (i * 9) % 70}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 3.5 + (i % 4) * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="12" fill="#FFF01F" stroke="#FFD700" strokeWidth="2" />
            <circle cx="14" cy="14" r="8" fill="#FFD700" />
            <text x="14" y="19" textAnchor="middle" fill="#FF8C00" fontSize="16" fontWeight="900">$</text>
          </svg>
        </motion.div>
      ))}
      
      {/* Pixel Stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-2 h-2 bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
      
      {/* Floating Music Icons */}
      {[Music, Disc, Radio].map((Icon, i) => (
        <motion.div
          key={`icon-${i}`}
          className="absolute text-white/20"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 1.2,
          }}
        >
          <Icon className="w-8 h-8" strokeWidth={3} />
        </motion.div>
      ))}
      
      {/* Fun Chat Bubbles */}
      {['New High Score!', 'Top 1%!', '🔥 Streak!'].map((text, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute hidden lg:block"
          style={{
            left: `${15 + i * 35}%`,
            top: `${45 + i * 8}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -10, -10, -20],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 3 + i * 5,
            repeatDelay: 8,
          }}
        >
          <div className="bg-white/90 px-4 py-2 rounded-lg border-2 border-black shadow-lg">
            <div className="pixel-font text-xs text-black" style={{ fontWeight: 900 }}>
              {text}
            </div>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/90" />
        </motion.div>
      ))}
    </div>
  );
}
