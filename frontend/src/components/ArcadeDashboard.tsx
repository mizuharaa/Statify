import { motion } from 'motion/react';
import { useState } from 'react';
import { Star, Award, Zap } from 'lucide-react';
import { StatsWindows } from './StatsWindows';
import { WinXPTaskbar } from './WinXPTaskbar';

export function ArcadeDashboard() {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const buttons = [
    { color: 'from-[#1DB954] to-[#1aa34a]', glow: '#1DB954', name: 'green' },
    { color: 'from-[#00F0FF] to-[#0081CF]', glow: '#00F0FF', name: 'cyan' },
    { color: 'from-[#3B82F6] to-[#1d4ed8]', glow: '#3B82F6', name: 'blue' },
    { color: 'from-[#B026FF] to-[#8B1FCF]', glow: '#B026FF', name: 'purple' },
    { color: 'from-[#FFF01F] to-[#FFD700]', glow: '#FFF01F', name: 'yellow' },
    { color: 'from-[#FF6B35] to-[#F7931E]', glow: '#FF6B35', name: 'orange' },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Top Marquee */}
          <motion.div 
            className="hidden md:block mb-6 lg:mb-8"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-gradient-to-b from-[#FF10F0] via-[#B026FF] to-[#8B1FCF] rounded-2xl border-4 border-black shadow-2xl p-4 lg:p-6 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B026FF]/50 via-[#FF10F0]/50 to-[#00F0FF]/50 rounded-2xl blur-xl" />
              <div className="relative text-center">
                <h2 className="text-3xl lg:text-5xl pixel-font mb-2" style={{ 
                  color: '#00F0FF', 
                  fontWeight: 900,
                  textShadow: '0 0 30px rgba(0,240,255,0.8), 3px 3px 0 rgba(0,0,0,0.5)'
                }}>
                  ★ STATIFY ARCADE ★
                </h2>
                <div className="pixel-font text-xs lg:text-sm text-white/90" style={{ fontWeight: 700 }}>
                  MUSIC STATS • ACHIEVEMENTS • LEADERBOARDS
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Arcade Cabinet */}
          <div className="relative">
            {/* Side Panels */}
            <div className="hidden lg:block absolute left-0 top-32 bottom-32 w-16 -ml-16 z-10">
              <div className="h-full bg-gradient-to-r from-[#8B1FCF] via-[#B026FF] to-[#9820E0] border-r-4 border-black rounded-l-2xl shadow-xl">
                <div className="flex flex-col items-center justify-around h-full py-12">
                  {[Star, Award, Zap].map((Icon, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? 15 : -15 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-8 h-8 text-[#FFF01F]" fill="#FFF01F" />
                    </motion.div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent rounded-l-2xl pointer-events-none" />
              </div>
            </div>

            <div className="hidden lg:block absolute right-0 top-32 bottom-32 w-16 -mr-16 z-10">
              <div className="h-full bg-gradient-to-l from-[#0081CF] via-[#00F0FF] to-[#00C9E0] border-l-4 border-black rounded-r-2xl shadow-xl">
                <div className="flex flex-col items-center justify-around h-full py-12">
                  {[Star, Award, Zap].map((Icon, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? -15 : 15 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-8 h-8 text-[#1DB954]" fill="#1DB954" />
                    </motion.div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-r-2xl pointer-events-none" />
              </div>
            </div>

            {/* Cabinet Body */}
            <div className="bg-gradient-to-b from-[#2C3E50] to-[#1a252f] rounded-3xl border-8 border-black shadow-2xl overflow-hidden">
              {/* Screen */}
              <div className="p-6 md:p-10 lg:p-14">
                <div className="relative bg-[#0a0a0a] rounded-2xl p-3 md:p-5 border-8 border-[#1a1a1a] shadow-inner">
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 rounded-2xl pointer-events-none z-10" />
                  
                  {/* XP Banner */}
                  <motion.div 
                    className="mb-4 bg-gradient-to-r from-black/90 to-black/70 rounded-xl p-4 border-2 border-[#1DB954]/50 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#B026FF] via-[#FF10F0] to-[#B026FF] flex items-center justify-center border-4 border-black shadow-lg">
                          <span className="text-white pixel-font text-2xl md:text-3xl" style={{ fontWeight: 900 }}>47</span>
                        </div>
                        <div>
                          <div className="pixel-font text-sm md:text-base text-[#00F0FF] mb-1" style={{ fontWeight: 900 }}>LISTENING LEVEL</div>
                          <div className="text-white text-xl md:text-3xl pixel-font" style={{ fontWeight: 900 }}>15,620 XP</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="pixel-font text-xs md:text-sm text-gray-400 mb-1" style={{ fontWeight: 700 }}>NEXT LEVEL</div>
                        <div className="text-white pixel-font text-lg md:text-2xl" style={{ fontWeight: 900 }}>4,380 XP</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-6 md:h-7 bg-black/50 rounded-full border-2 border-[#1DB954]/30 overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] relative"
                        initial={{ width: 0 }}
                        whileInView={{ width: '78%' }}
                        viewport={{ once: false }}
                        transition={{ duration: 2, delay: 0.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pixel-font text-black text-sm md:text-base" style={{ fontWeight: 900 }}>
                          78% COMPLETE
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Desktop */}
                  <div className="bg-gradient-to-br from-[#5DADE2] to-[#85C1E9] rounded-xl min-h-[500px] md:min-h-[650px] p-3 md:p-5 relative overflow-hidden">
                    <StatsWindows />
                    <WinXPTaskbar />
                  </div>
                </div>
              </div>

              {/* 3D Candy Control Panel */}
              <div className="bg-gradient-to-b from-[#34495E] to-[#2C3E50] p-6 md:p-10 border-t-4 border-black">
                <div className="flex items-center justify-center gap-8 md:gap-16">
                  {/* 3D Joystick */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="relative cursor-pointer"
                  >
                    {/* Base */}
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-b from-[#1a1a1a] to-black rounded-full border-6 border-black flex items-center justify-center shadow-2xl">
                      {/* Ball */}
                      <div className="relative w-18 h-18 md:w-24 md:h-24 bg-gradient-to-br from-red-400 via-red-600 to-red-900 rounded-full border-4 border-black shadow-lg">
                        {/* Glossy highlight */}
                        <div className="absolute top-2 left-4 w-10 h-8 bg-gradient-to-br from-white/60 to-transparent rounded-full blur-sm" />
                        {/* Shadow on bottom */}
                        <div className="absolute bottom-1 inset-x-2 h-6 bg-black/40 rounded-full blur-md" />
                      </div>
                    </div>
                    {/* Stem */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 md:w-10 h-16 md:h-20 bg-gradient-to-b from-[#2a2a2a] to-black rounded-b-xl border-2 border-black shadow-lg" />
                  </motion.div>

                  {/* 3D Candy Arcade Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {buttons.map((btn, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92, y: 4 }}
                        onTapStart={() => setActiveButton(i)}
                        onTapCancel={() => setActiveButton(null)}
                        className={`relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-b ${btn.color} rounded-full cursor-pointer`}
                        style={{
                          boxShadow: activeButton === i 
                            ? `inset 0 8px 16px rgba(0,0,0,0.7), 0 0 30px ${btn.glow}80`
                            : `0 10px 0 rgba(0,0,0,0.7), 0 0 25px ${btn.glow}60, inset 0 2px 0 rgba(255,255,255,0.3)`,
                          border: `4px solid rgba(0,0,0,0.4)`,
                          transition: 'all 0.1s',
                        }}
                      >
                        {/* Top highlight */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-white/40 rounded-full blur-sm pointer-events-none" />
                        {/* Darker ring */}
                        <div className="absolute inset-0 rounded-full" style={{
                          boxShadow: `inset 0 0 0 2px rgba(0,0,0,0.2)`
                        }} />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Coin Slot */}
                <motion.div 
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 1 }}
                >
                  <div className="bg-black/70 px-6 py-2 rounded-lg border-2 border-yellow-500 shadow-lg">
                    <div className="pixel-font text-yellow-400 text-xs md:text-sm" style={{ fontWeight: 900 }}>
                      ⚡ INSERT COIN ⚡
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
