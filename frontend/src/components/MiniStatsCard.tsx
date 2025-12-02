import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Award, Headphones, Music2 } from 'lucide-react';
import drakeImage from 'figma:asset/8f280272c0bf2b07720d3b027f1db44f6b4feace.png';
import cartiImage from 'figma:asset/d48c64c3d19d73e4bf9d72cd948cff099ab47d07.png';

export function MiniStatsCard() {
  return (
    <div className="window-border rounded-2xl overflow-hidden shadow-2xl max-w-2xl mx-auto" style={{
      boxShadow: '0 0 60px rgba(176, 38, 255, 0.4), 0 20px 40px rgba(0,0,0,0.3)'
    }}>
      {/* Title Bar */}
      <div className="title-bar px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 title-bar-text">
          <BarChart3 className="w-5 h-5" />
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>Stats.exe - Your Music Dashboard</span>
        </div>
        <div className="flex gap-2">
          <div className="button-win w-6 h-6 flex items-center justify-center">
            <div className="w-3 h-0.5 bg-black" />
          </div>
          <div className="button-win w-6 h-6 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-black" />
          </div>
          <div className="button-win w-6 h-6 flex items-center justify-center bg-red-500 hover:bg-red-600">
            <div className="text-white" style={{ fontSize: '1.2rem', lineHeight: 1 }}>×</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-8">
        {/* Top Artists Row */}
        <div className="mb-6 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Headphones className="w-5 h-5 text-[#B026FF]" />
            <span className="pixel-font text-sm" style={{ fontWeight: 900 }}>TOP ARTISTS THIS MONTH</span>
          </div>
          <div className="flex gap-4">
            {[
              { name: 'Drake', image: drakeImage },
              { name: 'Playboi Carti', image: cartiImage },
              { name: 'Travis', image: null },
            ].map((artist, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {artist.image ? (
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-16 h-16 rounded-xl object-cover border-3 border-[#1DB954] shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#B026FF] to-[#FF10F0] border-3 border-black/20 flex items-center justify-center shadow-lg">
                    <Music2 className="w-8 h-8 text-white" />
                  </div>
                )}
                <span className="text-xs" style={{ fontWeight: 700 }}>{artist.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Listening Level */}
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B026FF] to-[#FF10F0] flex items-center justify-center border-4 border-black/20 shadow-lg">
            <span className="text-white pixel-font text-3xl" style={{ fontWeight: 900 }}>47</span>
          </div>
          <div className="flex-1">
            <div className="pixel-font text-sm text-gray-600 mb-1" style={{ fontWeight: 700 }}>LISTENING LEVEL</div>
            <div className="text-3xl mb-2" style={{ fontWeight: 900 }}>15,620 XP</div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ed760]"
                initial={{ width: 0 }}
                whileInView={{ width: '78%' }}
                viewport={{ once: false }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#1DB954]" />
              <span className="text-sm" style={{ fontWeight: 700 }}>Top Genre</span>
            </div>
            <div className="pixel-font text-xl" style={{ fontWeight: 900, color: '#1DB954' }}>HIP-HOP</div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-[#B026FF]" />
              <span className="text-sm" style={{ fontWeight: 700 }}>Badges</span>
            </div>
            <div className="pixel-font text-xl" style={{ fontWeight: 900, color: '#B026FF' }}>12/24</div>
          </div>
        </div>

        {/* Now Playing */}
        <div className="p-4 bg-gradient-to-r from-[#1DB954]/10 to-[#1ed760]/10 rounded-xl border-2 border-[#1DB954]/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse" />
              <span className="pixel-font text-xs" style={{ fontWeight: 900 }}>NOW PLAYING</span>
            </div>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
            </svg>
          </div>
          <div style={{ fontWeight: 700 }}>Blinding Lights • The Weeknd</div>
        </div>
      </div>
    </div>
  );
}
