import { motion } from 'motion/react';

interface PixelSeparatorProps {
  type: 'hills' | 'platform' | 'cityscape';
}

export function PixelSeparator({ type }: PixelSeparatorProps) {
  if (type === 'hills') {
    return (
      <div className="w-full py-8 relative">
        <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="none" className="opacity-40">
          <rect x="0" y="50" width="150" height="10" fill="#2C3E50" />
          <rect x="50" y="40" width="100" height="10" fill="#2C3E50" />
          <rect x="80" y="30" width="60" height="10" fill="#2C3E50" />
          
          <rect x="300" y="55" width="200" height="10" fill="#2C3E50" />
          <rect x="350" y="45" width="120" height="10" fill="#2C3E50" />
          
          <rect x="700" y="50" width="250" height="10" fill="#2C3E50" />
          <rect x="750" y="40" width="180" height="10" fill="#2C3E50" />
          <rect x="800" y="30" width="120" height="10" fill="#2C3E50" />
          
          <rect x="1000" y="55" width="180" height="10" fill="#2C3E50" />
          <rect x="1050" y="45" width="100" height="10" fill="#2C3E50" />
        </svg>
      </div>
    );
  }

  if (type === 'platform') {
    return (
      <div className="w-full py-8 relative">
        <div className="max-w-7xl mx-auto px-4">
          <svg width="100%" height="40" viewBox="0 0 1200 40" preserveAspectRatio="none">
            {/* Brick platform */}
            {[...Array(30)].map((_, i) => (
              <rect 
                key={i}
                x={i * 40} 
                y="10" 
                width="38" 
                height="28" 
                fill={i % 2 === 0 ? '#8B4513' : '#A0522D'}
                stroke="#654321"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'cityscape') {
    return (
      <div className="w-full py-12 relative">
        <svg width="100%" height="120" viewBox="0 0 1200 120" preserveAspectRatio="none" className="opacity-50">
          {/* Buildings */}
          <rect x="50" y="60" width="80" height="60" fill="#2C3E50" />
          <rect x="60" y="50" width="20" height="10" fill="#FFF01F" opacity="0.8" />
          <rect x="100" y="70" width="20" height="10" fill="#FFF01F" opacity="0.8" />
          
          <rect x="200" y="40" width="100" height="80" fill="#34495E" />
          <rect x="220" y="30" width="30" height="10" fill="#FFF01F" opacity="0.8" />
          <rect x="260" y="50" width="30" height="10" fill="#FFF01F" opacity="0.8" />
          
          <rect x="380" y="70" width="70" height="50" fill="#2C3E50" />
          <rect x="390" y="80" width="20" height="10" fill="#FFF01F" opacity="0.8" />
          
          <rect x="550" y="50" width="120" height="70" fill="#34495E" />
          <rect x="570" y="40" width="30" height="10" fill="#FFF01F" opacity="0.8" />
          <rect x="620" y="60" width="30" height="10" fill="#FFF01F" opacity="0.8" />
          
          <rect x="750" y="65" width="90" height="55" fill="#2C3E50" />
          <rect x="770" y="75" width="20" height="10" fill="#FFF01F" opacity="0.8" />
          
          <rect x="920" y="45" width="110" height="75" fill="#34495E" />
          <rect x="940" y="35" width="30" height="10" fill="#FFF01F" opacity="0.8" />
          <rect x="990" y="55" width="30" height="10" fill="#FFF01F" opacity="0.8" />
        </svg>
      </div>
    );
  }

  return null;
}
