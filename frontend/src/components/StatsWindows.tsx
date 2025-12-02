import { motion } from 'motion/react';
import { WindowFrame } from './WindowFrame';
import { TimeRangeFilter } from './TimeRangeFilter';
import { useState } from 'react';
import drakeImage from 'figma:asset/8f280272c0bf2b07720d3b027f1db44f6b4feace.png';
import cartiImage from 'figma:asset/d48c64c3d19d73e4bf9d72cd948cff099ab47d07.png';

const topTracks = [
  { title: 'Blinding Lights', artist: 'The Weeknd', plays: 247 },
  { title: 'Anti-Hero', artist: 'Taylor Swift', plays: 218 },
  { title: 'As It Was', artist: 'Harry Styles', plays: 196 },
  { title: 'Die For You', artist: 'The Weeknd', plays: 185 },
];

const topArtists = [
  { name: 'Drake', image: drakeImage, minutes: 1247, rank: 1 },
  { name: 'Playboi Carti', image: cartiImage, minutes: 983, rank: 2 },
  { name: 'Travis Scott', minutes: 876, rank: 3 },
];

const genreData = [
  { name: 'Hip-Hop', percentage: 35, color: '#1DB954' },
  { name: 'Pop', percentage: 28, color: '#B026FF' },
  { name: 'R&B', percentage: 22, color: '#00F0FF' },
];

export function StatsWindows() {
  const [selectedTime, setSelectedTime] = useState('4W');

  return (
    <div className="grid md:grid-cols-2 gap-4 pb-14">
      {/* Top Tracks Window */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <WindowFrame title="C:\STATIFY\TOP_TRACKS" icon="🎵">
          <TimeRangeFilter selected={selectedTime} onSelect={setSelectedTime} />
          
          <div className="space-y-1.5 mt-3">
            {topTracks.map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ backgroundColor: '#0054E3', color: 'white' }}
                className="flex items-center gap-2 p-2 rounded cursor-pointer border border-transparent hover:border-white transition-all"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#1DB954] to-[#1aa34a] rounded flex items-center justify-center text-white border-2 border-black/20 pixel-font flex-shrink-0" style={{ fontWeight: 900 }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontWeight: 900, fontSize: '0.875rem' }} className="truncate">{track.title}</div>
                  <div className="text-xs opacity-75 truncate" style={{ fontWeight: 700 }}>{track.artist}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div style={{ fontWeight: 900 }} className="pixel-font text-sm">{track.plays}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </WindowFrame>
      </motion.div>

      {/* Top Artists Window */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <WindowFrame title="C:\STATIFY\TOP_ARTISTS" icon="🎤">
          <div className="space-y-2">
            {topArtists.map((artist, i) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, backgroundColor: '#0054E3', color: 'white' }}
                className="flex items-center gap-3 p-2 rounded border border-transparent hover:border-white transition-all cursor-pointer"
              >
                {artist.image ? (
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-12 h-12 rounded-lg object-cover border-2 border-[#1DB954] flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#B026FF] to-[#FF10F0] border-2 border-black/20 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div style={{ fontWeight: 900, fontSize: '0.9rem' }} className="truncate">{artist.name}</div>
                  <div className="text-xs opacity-75 pixel-font" style={{ fontWeight: 700 }}>{artist.minutes} MIN</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#1DB954] text-white flex items-center justify-center border-2 border-black/20 pixel-font flex-shrink-0" style={{ fontWeight: 900, fontSize: '0.875rem' }}>
                  {artist.rank}
                </div>
              </motion.div>
            ))}
          </div>
        </WindowFrame>
      </motion.div>

      {/* Genres Window */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -0.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <WindowFrame title="C:\STATIFY\GENRES" icon="🎧">
          <div className="space-y-3">
            {genreData.map((genre, i) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-black/20"
                      style={{ backgroundColor: genre.color }}
                    />
                    <span style={{ fontWeight: 900, fontSize: '0.875rem' }}>{genre.name}</span>
                  </div>
                  <span style={{ fontWeight: 900, color: genre.color }} className="pixel-font text-base">
                    {genre.percentage}%
                  </span>
                </div>
                <div className="h-5 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: genre.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${genre.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </WindowFrame>
      </motion.div>

      {/* Activity Window */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 0.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <WindowFrame title="C:\STATIFY\ACTIVITY" icon="📊">
          <div className="h-40 flex items-end gap-1.5">
            {[52, 68, 61, 78, 89, 82, 93, 85].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-[#1DB954] to-[#1ed760] rounded-t border-2 border-black/10 cursor-pointer hover:opacity-80 transition-opacity"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
              />
            ))}
          </div>
        </WindowFrame>
      </motion.div>
    </div>
  );
}