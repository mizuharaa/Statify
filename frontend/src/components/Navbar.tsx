import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SpotifyLogo } from './SpotifyLogo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/90 border-b-3 border-pink-200 shadow-xl"
      style={{ 
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(255, 105, 180, 0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Clickable to Home */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer relative flex items-center gap-3"
            onClick={() => navigate('/')}
          >
            {/* Official Spotify Icon */}
            <div className="relative w-11 h-11 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg border-2 border-white">
              <SpotifyLogo className="w-6 h-6" fill="white" />
            </div>
            
            {/* Logo Text - SHARP */}
            <span 
              className="text-3xl md:text-4xl curvy-font pastel-gradient clear-text"
              style={{ 
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              statify
            </span>
            
            {/* Sparkle */}
            <motion.span
              className="absolute -top-1 -right-2 text-lg"
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              ✦
            </motion.span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="#plus">Plus Plan ⭐</NavLink>
            <NavLink href="#support">Support</NavLink>
            <NavLink href="#feedback">Feedback</NavLink>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bubble-button py-3 px-8 text-base curvy-font flex items-center gap-2"
            >
              <SpotifyLogo className="w-5 h-5" fill="#1DB954" />
              Login
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-pink-100 border-2 border-pink-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t-2 border-pink-200 py-6 space-y-4"
            >
              <MobileNavLink href="#plus">Plus Plan ⭐</MobileNavLink>
              <MobileNavLink href="#support">Support</MobileNavLink>
              <MobileNavLink href="#feedback">Feedback</MobileNavLink>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bubble-button w-full py-3 text-base curvy-font flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DB954">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0z"/>
                </svg>
                Login
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05, y: -2 }}
      className="curvy-font text-base clear-text px-4 py-2 rounded-xl hover:bg-pink-50 transition-colors"
      style={{ 
        fontWeight: 700,
        color: '#2C3E50',
      }}
    >
      {children}
    </motion.a>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.98 }}
      className="block curvy-font text-lg clear-text px-4 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors text-center"
      style={{ 
        fontWeight: 700,
        color: '#2C3E50',
      }}
    >
      {children}
    </motion.a>
  );
}
