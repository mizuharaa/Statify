import { motion } from 'motion/react';
import { Trophy, Flame, Zap, Target, Crown, Star } from 'lucide-react';

const achievements = [
  { 
    icon: Crown, 
    title: 'PLATINUM LISTENER', 
    description: 'Listen for 10,000 minutes',
    rarity: 'LEGENDARY',
    rarityColor: '#FFF01F',
    unlocked: true,
    progress: 100,
  },
  { 
    icon: Flame, 
    title: 'FIRE STREAK', 
    description: '30 day listening streak',
    rarity: 'EPIC',
    rarityColor: '#FF10F0',
    unlocked: true,
    progress: 100,
  },
  { 
    icon: Zap, 
    title: 'SPEED DEMON', 
    description: 'Discover 100 new artists',
    rarity: 'RARE',
    rarityColor: '#00F0FF',
    unlocked: false,
    progress: 65,
  },
  { 
    icon: Target, 
    title: 'GENRE MASTER', 
    description: 'Explore 15+ genres',
    rarity: 'RARE',
    rarityColor: '#1DB954',
    unlocked: false,
    progress: 73,
  },
  { 
    icon: Trophy, 
    title: 'TOP 1% LISTENER', 
    description: 'Beat 99% of users',
    rarity: 'LEGENDARY',
    rarityColor: '#B026FF',
    unlocked: false,
    progress: 87,
  },
  { 
    icon: Star, 
    title: 'EARLY ADOPTER', 
    description: 'Join Statify beta',
    rarity: 'EPIC',
    rarityColor: '#00F0FF',
    unlocked: true,
    progress: 100,
  },
];

export function AchievementsSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Crafted Title with Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            {/* Semi-transparent banner */}
            <div className="absolute inset-0 -inset-x-8 -inset-y-4 bg-black/30 backdrop-blur-sm rounded-2xl border-2 border-white/20" />
            
            <div className="relative flex items-center justify-center gap-4 px-8 py-4">
              {/* Trophy pixel icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" className="hidden md:block">
                <rect x="12" y="8" width="24" height="4" fill="#FFF01F" />
                <rect x="8" y="12" width="32" height="4" fill="#FFF01F" />
                <rect x="8" y="16" width="32" height="4" fill="#FFD700" />
                <rect x="12" y="20" width="24" height="4" fill="#FFD700" />
                <rect x="16" y="24" width="16" height="4" fill="#FFD700" />
                <rect x="20" y="28" width="8" height="8" fill="#FFA500" />
                <rect x="16" y="36" width="16" height="4" fill="#FFA500" />
              </svg>
              
              <h2 className="pixel-font text-3xl md:text-5xl lg:text-6xl" style={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #39FF14 0%, #00F0FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.3))',
              }}>
                ACHIEVEMENTS UNLOCKED
              </h2>
              
              <svg width="48" height="48" viewBox="0 0 48 48" className="hidden md:block">
                <rect x="20" y="4" width="8" height="4" fill="#00F0FF" />
                <rect x="16" y="8" width="16" height="4" fill="#00F0FF" />
                <rect x="12" y="12" width="24" height="4" fill="#00F0FF" />
                <rect x="16" y="16" width="16" height="4" fill="#0081CF" />
                <rect x="20" y="20" width="8" height="4" fill="#0081CF" />
              </svg>
            </div>
          </div>
          
          <p className="text-xl mt-6" style={{ fontWeight: 700, color: '#000' }}>
            Collect badges • Earn XP • Show your status
          </p>
        </motion.div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={i} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {achievements.map((achievement, i) => (
              <div key={achievement.title} className="w-80">
                <AchievementCard achievement={achievement} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="window-border rounded-2xl p-6 relative overflow-hidden cursor-pointer"
      style={{
        opacity: achievement.unlocked ? 1 : 0.85,
        boxShadow: achievement.unlocked 
          ? `0 0 30px ${achievement.rarityColor}40, inset 0 1px 0 rgba(255,255,255,0.5), 0 10px 20px rgba(0,0,0,0.2)`
          : 'inset 0 1px 0 rgba(255,255,255,0.5), 0 10px 20px rgba(0,0,0,0.2)',
      }}
    >
      {/* Rarity Badge */}
      <div 
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full border-2 border-black/30 pixel-font text-xs shadow-lg"
        style={{
          backgroundColor: achievement.unlocked ? achievement.rarityColor : '#666',
          color: achievement.unlocked ? '#000' : '#fff',
          boxShadow: achievement.unlocked ? `0 0 25px ${achievement.rarityColor}80` : 'none',
          fontWeight: 900,
        }}
      >
        {achievement.rarity}
      </div>

      {/* Icon with pixel effects */}
      <div className="flex justify-center mb-5">
        <div 
          className="relative w-24 h-24 rounded-2xl flex items-center justify-center border-4 shadow-xl"
          style={{
            backgroundColor: achievement.unlocked ? achievement.rarityColor : '#888',
            borderColor: achievement.unlocked ? '#000' : '#555',
            boxShadow: achievement.unlocked ? `0 0 35px ${achievement.rarityColor}70, inset 0 2px 0 rgba(255,255,255,0.3)` : 'inset 0 2px 0 rgba(255,255,255,0.2)',
          }}
        >
          <achievement.icon 
            className="w-12 h-12"
            style={{ color: achievement.unlocked ? '#000' : '#444' }}
            strokeWidth={2.5}
          />
          {/* Pixel corners */}
          {achievement.unlocked && (
            <>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/60" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black/40" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black/40" />
            </>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="pixel-font text-center mb-2 text-base" style={{ fontWeight: 900 }}>
        {achievement.title}
      </h3>
      <p className="text-center text-sm mb-4 opacity-80" style={{ fontWeight: 700 }}>
        {achievement.description}
      </p>

      {/* Thicker Progress Bar */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-400 shadow-inner">
          <motion.div
            className="h-full flex items-center justify-center relative"
            style={{ backgroundColor: achievement.unlocked ? achievement.rarityColor : '#999' }}
            initial={{ width: 0 }}
            whileInView={{ width: `${achievement.progress}%` }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, delay: index * 0.15 }}
          >
            <span className="pixel-font text-xs text-black relative z-10" style={{ fontWeight: 900 }}>
              {achievement.progress}%
            </span>
            {/* Inner glow */}
            {achievement.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            )}
          </motion.div>
        </div>
      </div>

      {achievement.unlocked && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-2xl"
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
        />
      )}
    </motion.div>
  );
}
