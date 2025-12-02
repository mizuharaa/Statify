import { motion } from 'motion/react';

const badges = [
  {
    icon: '💿',
    title: 'vinyl collector',
    label: 'explored 15+ genres',
    rarity: 'legendary',
    unlocked: true,
    color: '#FFD700',
  },
  {
    icon: '🌙',
    title: 'night listener',
    label: 'midnight sessions',
    rarity: 'epic',
    unlocked: true,
    color: '#C69AFF',
  },
  {
    icon: '🔁',
    title: 'replay master',
    label: 'repeated 100+ times',
    rarity: 'rare',
    unlocked: true,
    color: '#1DB954',
  },
  {
    icon: '🔥',
    title: 'streak keeper',
    label: '30 day listening',
    rarity: 'epic',
    unlocked: false,
    color: '#FF6B9D',
  },
  {
    icon: '🧭',
    title: 'music explorer',
    label: 'found 100 artists',
    rarity: 'rare',
    unlocked: false,
    color: '#48F5FF',
  },
  {
    icon: '📼',
    title: 'retro soul',
    label: 'nostalgic vibes',
    rarity: 'legendary',
    unlocked: false,
    color: '#FFC75F',
  },
  {
    icon: '🎧',
    title: 'audiophile',
    label: 'quality listener',
    rarity: 'common',
    unlocked: true,
    color: '#FF9A9E',
  },
  {
    icon: '🏆',
    title: 'top 1%',
    label: 'elite listener',
    rarity: 'legendary',
    unlocked: true,
    color: '#FFD700',
  },
];

export function AchievementsBadges() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl anime-font pastel-gradient neon-glow mb-4">
            achievement badges
          </h2>
          <p className="text-xl pixel-font" style={{ fontWeight: 600, color: '#8B4513' }}>
            ★ COLLECT RETRO STICKERS ★
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, i) => (
            <BadgeCard key={badge.title} badge={badge} index={i} />
          ))}
        </div>

        {/* Mobile Scroll */}
        <div className="sm:hidden overflow-x-auto pb-6 -mx-4 px-4">
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {badges.map((badge, i) => (
              <div key={badge.title} className="w-80">
                <BadgeCard badge={badge} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BadgeCard({ badge, index }: { badge: typeof badges[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        bounce: 0.5,
      }}
      whileHover={{ 
        scale: 1.08, 
        rotate: index % 2 === 0 ? 3 : -3, 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="cursor-pointer relative"
      style={{
        animation: badge.unlocked ? 'wobble 8s ease-in-out infinite' : 'none',
        animationDelay: `${index * 0.5}s`,
      }}
    >
      {/* Collectible Sticker Card */}
      <div 
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border-4 border-white shadow-2xl relative overflow-hidden"
        style={{
          opacity: badge.unlocked ? 1 : 0.6,
          boxShadow: badge.unlocked 
            ? `0 0 0 3px ${badge.color}40, 0 8px 0 ${badge.color}80, 0 12px 30px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.9)` 
            : '0 8px 20px rgba(0,0,0,0.1)',
        }}
      >
        {/* Holo Foil Background Effect */}
        {badge.unlocked && (
          <div className="absolute inset-0 holo-foil opacity-20 rounded-3xl" />
        )}

        {/* Rarity Tag */}
        <div 
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white pixel-font text-xs shadow-lg border-2 border-white/80 z-10"
          style={{
            background: badge.unlocked ? badge.color : '#999',
            boxShadow: `0 2px 0 ${badge.unlocked ? badge.color : '#777'}, inset 0 1px 0 rgba(255,255,255,0.5)`,
          }}
        >
          {badge.rarity}
        </div>

        {/* Icon with Bubble Effect */}
        <div className="flex justify-center mb-6">
          <motion.div 
            className="relative w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white"
            style={{
              background: badge.unlocked 
                ? `linear-gradient(135deg, ${badge.color}, ${badge.color}dd)` 
                : 'linear-gradient(135deg, #DDD, #BBB)',
              boxShadow: badge.unlocked
                ? `0 6px 0 ${badge.color}80, 0 10px 30px rgba(0,0,0,0.2), inset 0 3px 0 rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.1)`
                : '0 6px 0 #999, 0 10px 30px rgba(0,0,0,0.15)',
            }}
            whileHover={{
              rotate: [0, -6, 6, 0],
              transition: { duration: 0.5 }
            }}
          >
            {/* Glossy highlight */}
            {badge.unlocked && (
              <div className="absolute top-3 left-3 w-12 h-12 bg-white/50 rounded-full blur-lg" />
            )}
            
            {/* Icon */}
            <span className="text-5xl relative z-10" style={{
              filter: badge.unlocked ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' : 'grayscale(100%)',
            }}>
              {badge.icon}
            </span>

            {/* Sparkle corners */}
            {badge.unlocked && (
              <>
                <motion.div 
                  className="absolute -top-2 -left-2 text-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✦
                </motion.div>
                <motion.div 
                  className="absolute -top-2 -right-2 text-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, -360],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  ✧
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -left-2 text-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
                >
                  ✧
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 text-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, -360],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                >
                  ✦
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="anime-font text-center mb-2 text-xl relative z-10" style={{ 
          fontWeight: 800, 
          color: badge.unlocked ? '#2C3E50' : '#999',
        }}>
          {badge.title}
        </h3>

        {/* Label */}
        <p className="text-center text-base anime-font relative z-10" style={{ 
          fontWeight: 600, 
          opacity: 0.8, 
          color: '#666',
        }}>
          {badge.label}
        </p>

        {/* Lock overlay */}
        {!badge.unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-3xl">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#999">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
