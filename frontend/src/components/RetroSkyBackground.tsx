import { motion, useScroll, useTransform } from 'motion/react';

export function RetroSkyBackground() {
  const { scrollYProgress } = useScroll();
  
  // Sun moves up and scales as you scroll
  const sunY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const sunScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  
  // Beams transition from bright yellow to deep orange
  const beamColor1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    ['rgba(255, 240, 31, 0.4)', 'rgba(255, 200, 50, 0.5)', 'rgba(255, 140, 0, 0.35)']
  );
  const beamColor2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    ['rgba(255, 215, 0, 0.3)', 'rgba(255, 165, 0, 0.4)', 'rgba(255, 100, 0, 0.25)']
  );
  const beamLength = useTransform(scrollYProgress, [0, 0.5], [200, 300]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5DADE2] via-[#85C1E9] to-[#AED6F1]" />
      
      {/* Sun with gradient beams - better positioned */}
      <motion.div
        className="absolute top-20 right-[10%] hidden lg:block"
        style={{ y: sunY, scale: sunScale }}
      >
        <div className="relative w-40 h-40">
          {/* Animated gradient beams */}
          <motion.div
            className="absolute inset-0 -inset-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: '4px',
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center',
                  transform: `rotate(${i * 15}deg) translateY(-50%)`,
                  background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? beamColor1 : beamColor2})`,
                  filter: 'blur(3px)',
                }}
              >
                <motion.div 
                  className="w-full"
                  style={{ height: beamLength }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Warm glow overlay */}
          <motion.div 
            className="absolute inset-0 -inset-24"
            style={{
              background: 'radial-gradient(circle, rgba(255,220,100,0.4) 0%, rgba(255,180,50,0.2) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          
          {/* Pixelated sun core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="140" height="140" viewBox="0 0 140 140">
              {/* Outer glow pixels */}
              <rect x="50" y="25" width="40" height="10" fill="#FFE066" opacity="0.6" />
              <rect x="25" y="50" width="10" height="40" fill="#FFE066" opacity="0.6" />
              <rect x="105" y="50" width="10" height="40" fill="#FFE066" opacity="0.6" />
              <rect x="50" y="105" width="40" height="10" fill="#FFE066" opacity="0.6" />
              
              {/* Main sun body - warm gradient */}
              <rect x="50" y="35" width="40" height="10" fill="#FFF01F" />
              <rect x="35" y="45" width="70" height="10" fill="#FFF01F" />
              <rect x="25" y="55" width="90" height="10" fill="#FFD700" />
              <rect x="25" y="65" width="90" height="10" fill="#FFD700" />
              <rect x="25" y="75" width="90" height="10" fill="#FFA500" />
              <rect x="35" y="85" width="70" height="10" fill="#FFA500" />
              <rect x="50" y="95" width="40" height="10" fill="#FF8C00" />
              
              {/* Bright highlights */}
              <rect x="55" y="45" width="30" height="10" fill="#FFFACD" opacity="0.9" />
              <rect x="45" y="55" width="50" height="10" fill="#FFFACD" opacity="0.7" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Pixel clouds with parallax */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${8 + (i * 7) % 45}%`,
            }}
            animate={{
              x: [0, i % 2 === 0 ? 70 : -50, 0],
            }}
            transition={{
              duration: 20 + i * 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg width={i % 2 === 0 ? "130" : "100"} height="70" viewBox="0 0 130 70" className={i % 3 === 0 ? "opacity-95" : "opacity-75"}>
              <rect x="35" y="40" width="18" height="18" fill="#fff" />
              <rect x="53" y="28" width="18" height="18" fill="#fff" />
              <rect x="71" y="22" width="18" height="18" fill="#fff" />
              <rect x="89" y="28" width="18" height="18" fill="#fff" />
              <rect x="53" y="40" width="54" height="18" fill="#fff" />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Distant blocky hills */}
      <div className="absolute bottom-0 left-0 right-0 h-48">
        <svg width="100%" height="100%" viewBox="0 0 1200 180" preserveAspectRatio="none" className="opacity-35">
          <rect x="0" y="110" width="220" height="25" fill="#3498DB" />
          <rect x="60" y="85" width="140" height="25" fill="#3498DB" />
          <rect x="90" y="60" width="90" height="25" fill="#3498DB" />
          
          <rect x="380" y="120" width="300" height="25" fill="#3498DB" />
          <rect x="440" y="95" width="180" height="25" fill="#3498DB" />
          
          <rect x="760" y="110" width="380" height="25" fill="#3498DB" />
          <rect x="820" y="85" width="260" height="25" fill="#3498DB" />
          <rect x="880" y="60" width="180" height="25" fill="#3498DB" />
        </svg>
      </div>
      
      {/* Subtle dithering */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
