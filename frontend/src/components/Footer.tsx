import { motion } from 'motion/react';
import { Github, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'API', 'Docs'],
  Company: ['About', 'Blog', 'Careers'],
  Resources: ['Help', 'Community', 'Status'],
  Legal: ['Privacy', 'Terms', 'Security'],
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 border-t-4 border-pink-200 bg-white/80 backdrop-blur-md relative" style={{
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 -4px 20px rgba(255, 105, 180, 0.15)',
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="anime-font text-2xl pastel-gradient mb-2">
              statify
            </div>
            <p className="text-sm anime-font" style={{ fontWeight: 600, color: '#8B4513' }}>
              tokyo retro web revival ✦
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="pixel-font text-xs hover:scale-105 transition-transform"
              style={{ color: '#FFB3D9' }}
            >
              ABOUT
            </a>
            <a 
              href="#" 
              className="pixel-font text-xs hover:scale-105 transition-transform"
              style={{ color: '#A5D8FF' }}
            >
              PRIVACY
            </a>
            <a 
              href="#" 
              className="pixel-font text-xs hover:scale-105 transition-transform"
              style={{ color: '#C3FFE3' }}
            >
              CONTACT
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-xs anime-font" style={{ fontWeight: 600, opacity: 0.7, color: '#666' }}>
              Made with ♡ in Tokyo
            </p>
            <p className="text-xs pixel-font mt-1" style={{ opacity: 0.6, color: '#999' }}>
              © 2024 STATIFY.EXE
            </p>
          </div>
        </div>
        
        {/* Retro web counter aesthetic */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 rounded-lg border-2 border-pink-200 shadow-md">
            <span className="pixel-font text-xs" style={{ color: '#FFB3D9' }}>VISITORS:</span>
            <div className="flex gap-1">
              {['0', '4', '7', '8', '2', '6'].map((digit, i) => (
                <div 
                  key={i}
                  className="w-5 h-7 bg-black text-pink-400 pixel-font text-xs flex items-center justify-center rounded border border-pink-300"
                  style={{ fontFamily: 'monospace' }}
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}