import { motion } from 'motion/react';

const leaderboard = [
  { rank: 1, username: 'MUSICMASTER47', score: 45720, badge: '👑' },
  { rank: 2, username: 'VIBEKING_99', score: 42150, badge: '🥈' },
  { rank: 3, username: 'BEATDROP', score: 38940, badge: '🥉' },
  { rank: 4, username: 'YOU', score: 15620, badge: '⭐', isPlayer: true },
  { rank: 5, username: 'SOUNDWAVE_X', score: 14200, badge: '🎵' },
  { rank: 6, username: 'RHYTHMKING', score: 13800, badge: '🎧' },
  { rank: 7, username: 'BASSMASTER', score: 12500, badge: '🔊' },
  { rank: 8, username: 'MIXOLOGIST', score: 11900, badge: '🎸' },
];

export function HighScoresSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 pixel-font" style={{ fontWeight: 900 }}>
            <span style={{ 
              color: '#00F0FF',
              textShadow: '4px 4px 0 rgba(0,0,0,0.3), 0 0 30px rgba(0,240,255,0.5)'
            }}>
              HIGH
            </span>
            {' '}
            <span style={{ 
              color: '#B026FF',
              textShadow: '4px 4px 0 rgba(0,0,0,0.3), 0 0 30px rgba(176,38,255,0.5)'
            }}>
              SCORES
            </span>
          </h2>
          <p className="text-xl" style={{ fontWeight: 700, color: '#000' }}>
            🪙 Insert coin to climb the charts 🪙
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-black rounded-3xl p-6 md:p-10 border-8 border-[#B026FF]/60 shadow-2xl relative overflow-hidden"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B026FF]/10 to-transparent pointer-events-none" />
          
          <div className="relative">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 md:px-6 py-4 mb-4 border-b-4 border-[#1DB954]">
              <div className="col-span-2 pixel-font text-sm md:text-lg text-[#1DB954]" style={{ fontWeight: 900 }}>RANK</div>
              <div className="col-span-6 pixel-font text-sm md:text-lg text-[#1DB954]" style={{ fontWeight: 900 }}>PLAYER</div>
              <div className="col-span-4 pixel-font text-sm md:text-lg text-[#1DB954] text-right" style={{ fontWeight: 900 }}>XP</div>
            </div>

            {/* Leaderboard Entries */}
            <div className="space-y-2">
              {leaderboard.map((player, i) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ x: 12, backgroundColor: player.isPlayer ? '#1DB954' : '#B026FF' }}
                  className={`grid grid-cols-12 gap-4 px-4 md:px-6 py-4 rounded-xl transition-all cursor-pointer ${
                    player.isPlayer 
                      ? 'bg-[#1DB954]/40 border-2 border-[#1DB954] shadow-lg shadow-[#1DB954]/30' 
                      : 'bg-white/5 border-2 border-transparent hover:border-[#B026FF] hover:shadow-lg hover:shadow-[#B026FF]/30'
                  }`}
                >
                  <div className="col-span-2 flex items-center">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border-3 border-black/30 shadow-lg ${
                      player.rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600' :
                      player.rank === 2 ? 'bg-gradient-to-br from-gray-200 to-gray-500' :
                      player.rank === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-600' :
                      'bg-gradient-to-br from-[#00F0FF] to-[#0081CF]'
                    }`}>
                      <span className="text-black pixel-font text-base md:text-xl" style={{ fontWeight: 900 }}>
                        {player.rank}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-6 flex items-center gap-3">
                    <span className="text-2xl md:text-3xl">{player.badge}</span>
                    <div>
                      <div 
                        className={`pixel-font text-base md:text-xl ${
                          player.isPlayer ? 'text-white' : 'text-white'
                        }`}
                        style={{ 
                          fontWeight: 900,
                          textShadow: player.isPlayer ? '0 0 15px rgba(29,185,84,0.8)' : 'none'
                        }}
                      >
                        {player.username}
                      </div>
                      {player.isPlayer && (
                        <div className="pixel-font text-xs text-white/90" style={{ fontWeight: 700 }}>
                          ← YOU!
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-4 flex items-center justify-end">
                    <div className="pixel-font text-xl md:text-3xl text-[#00F0FF]" style={{ 
                      fontWeight: 900,
                      textShadow: '0 0 15px rgba(0,240,255,0.6)'
                    }}>
                      {player.score.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pixel divider */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {[...Array(30)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: i % 3 === 0 ? '#B026FF' : i % 3 === 1 ? '#00F0FF' : '#1DB954' }}
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.05 
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}