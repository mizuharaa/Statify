import { motion } from 'motion/react';
import { Users, Music, Disc3, Clock } from 'lucide-react';
import drakeImage from 'figma:asset/8f280272c0bf2b07720d3b027f1db44f6b4feace.png';
import cartiImage from 'figma:asset/d48c64c3d19d73e4bf9d72cd948cff099ab47d07.png';

export function StatsArcadeStrip() {
  const stats = [
    {
      icon: Users,
      title: 'TOP ARTISTS ♡',
      data: [
        { name: 'Drake', image: drakeImage, value: '12,847 min' },
        { name: 'Carti', image: cartiImage, value: '8,234 min' },
        { name: 'Weeknd', image: null, value: '7,156 min' },
      ],
      color: '#FFB3D9',
      titlebarClass: 'xp-titlebar-pink',
    },
    {
      icon: Music,
      title: 'TOP TRACKS ♪',
      data: [
        { name: 'One Dance', value: '2,847 plays' },
        { name: 'Blinding Lights', value: '2,156 plays' },
        { name: 'Sky', value: '1,923 plays' },
      ],
      color: '#D4BBFF',
      titlebarClass: 'xp-titlebar-purple',
    },
    {
      icon: Disc3,
      title: 'TOP GENRES ✨',
      data: [
        { name: 'Hip-Hop', value: '42%' },
        { name: 'R&B', value: '28%' },
        { name: 'Electronic', value: '15%' },
      ],
      color: '#A5D8FF',
      titlebarClass: 'xp-titlebar',
    },
    {
      icon: Clock,
      title: 'MINUTES 🎵',
      data: [
        { name: 'Total', value: '47,826' },
        { name: 'Daily Avg', value: '131' },
        { name: 'Longest', value: '387' },
      ],
      color: '#C3FFE3',
      titlebarClass: 'xp-titlebar-green',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl anime-font pastel-gradient neon-glow mb-4">
            your stats arcade
          </h2>
          <p className="pixel-font text-base opacity-90" style={{ color: '#8B4513' }}>
            ★ INSERT COIN TO CONTINUE ★
          </p>
        </motion.div>

        {/* Retro Widget Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.15, 
                type: 'spring', 
                bounce: 0.5 
              }}
              whileHover={{ 
                scale: 1.05, 
                rotate: i % 2 === 0 ? 2 : -2,
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="crt-glow"
              style={{
                animation: 'wobble 10s ease-in-out infinite',
                animationDelay: `${i * 2}s`,
              }}
            >
              {/* Retro Music Player Widget */}
              <div className="winxp-window h-full">
                {/* Mini Title Bar */}
                <div className={`xp-titlebar ${stat.titlebarClass}`}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.2)',
                      }}
                    >
                      <stat.icon className="w-2.5 h-2.5" style={{ color: stat.color }} strokeWidth={3} />
                    </div>
                    <span className="text-white pixel-font text-xs" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                      {stat.title}
                    </span>
                  </div>
                  <div className="xp-controls flex gap-1">
                    <button>
                      <div className="w-2 h-0.5 bg-gray-700 rounded" />
                    </button>
                    <button>
                      <div className="w-2 h-2 border border-gray-700 rounded-sm" />
                    </button>
                  </div>
                </div>

                {/* Widget Content */}
                <div className="p-6 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm" style={{
                  backgroundImage: `linear-gradient(135deg, ${stat.color}10 0%, ${stat.color}05 100%)`,
                }}>
                  {/* Icon Display */}
                  <motion.div 
                    className="flex justify-center mb-6"
                    animate={{
                      rotate: [0, -3, 3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-xl border-3 border-white"
                      style={{ 
                        background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                        boxShadow: `0 4px 0 ${stat.color}80, 0 8px 20px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.5)`,
                      }}
                    >
                      <stat.icon className="w-10 h-10" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  {/* Data List */}
                  <div className="space-y-3">
                    {stat.data.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        className="flex items-center justify-between p-3 bg-white/90 rounded-xl border-2 border-white shadow-md hover:shadow-lg transition-all"
                        style={{
                          borderColor: `${stat.color}40`,
                        }}
                        whileHover={{ x: 4, scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <div className="relative">
                              <div 
                                className="absolute inset-0 blur-md opacity-40 rounded-lg"
                                style={{ background: stat.color }}
                              />
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="relative w-12 h-12 rounded-lg object-cover border-2 border-white shadow-lg"
                              />
                            </div>
                          ) : (
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center text-white pixel-font text-sm border-2 border-white shadow-md"
                              style={{ 
                                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                                boxShadow: `0 2px 0 ${stat.color}80, inset 0 1px 0 rgba(255,255,255,0.4)`,
                              }}
                            >
                              {idx + 1}
                            </div>
                          )}
                          <span className="anime-font text-base" style={{ fontWeight: 700, color: '#2C3E50' }}>
                            {item.name}
                          </span>
                        </div>
                        <span className="pixel-font text-xs" style={{ fontWeight: 900, color: stat.color }}>
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
