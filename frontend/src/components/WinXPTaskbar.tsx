import { motion } from 'motion/react';
import { Folder, FileText, Music, Volume2, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WinXPTaskbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { icon: Folder, label: 'My Music', color: '#FFD700' },
    { icon: FileText, label: 'TopTracks.csv', color: '#fff' },
    { icon: Music, label: 'Statify.exe', color: '#1DB954', active: true },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="taskbar h-10 md:h-12 px-2 flex items-center justify-between border-t-2 border-[#1aa7ff]">
        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button-win h-8 md:h-9 px-3 md:px-4 flex items-center gap-2 shadow-lg"
        >
          <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-blue-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs" style={{ fontWeight: 900 }}>⊞</span>
          </div>
          <span className="hidden sm:block pixel-font text-xs text-white" style={{ fontWeight: 900 }}>START</span>
        </motion.button>

        {/* Running Apps */}
        <div className="flex-1 flex items-center gap-1 px-2 overflow-x-auto">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`button-win h-8 px-2 md:px-3 flex items-center gap-1.5 md:gap-2 flex-shrink-0 ${
                app.active ? 'shadow-inner' : ''
              }`}
            >
              <app.icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: app.color }} />
              <span className="hidden md:block text-xs truncate max-w-[100px]" style={{ fontWeight: 700 }}>
                {app.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 md:gap-3 border-l-2 border-[#0c6bb1] pl-2 md:pl-3">
          {/* Spotify Icon */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="cursor-pointer"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </motion.div>

          {/* Volume */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="cursor-pointer"
          >
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </motion.div>

          {/* Clock */}
          <div className="button-win h-8 px-2 md:px-3 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-700" />
            <span className="pixel-font text-xs text-gray-800" style={{ fontWeight: 700 }}>
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
