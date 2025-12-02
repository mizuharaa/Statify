import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function CallbackPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      // Store tokens in localStorage
      localStorage.setItem('spotify_access_token', accessToken);
      localStorage.setItem('spotify_refresh_token', refreshToken);
      setLoading(false);
    } else {
      // No tokens, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleSeeStats = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-pink-300 border-t-pink-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 relative">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Message */}
          <motion.div
            className="mb-12"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <motion.span
              className="text-8xl md:text-9xl block mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              ✨
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl curvy-font pastel-gradient clear-text mb-6">
              Connected!
            </h1>
            <p className="text-2xl md:text-3xl curvy-font clear-text" style={{ color: '#4a4a4a', fontWeight: 700 }}>
              Your Spotify account is ready ♪
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSeeStats}
            className="bubble-button curvy-font clear-text flex items-center justify-center gap-3 animated mx-auto text-2xl md:text-3xl px-16 py-6"
            style={{
              fontSize: '1.5rem',
            }}
          >
            <span>See Your Stats Now!</span>
            <motion.span
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              →
            </motion.span>
          </motion.button>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl p-4 border-3 border-white shadow-xl sticker-shadow hidden lg:block"
            animate={{
              rotate: [0, -10, 10, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <span className="text-4xl">🎵</span>
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-300 rounded-2xl p-4 border-3 border-white shadow-xl sticker-shadow hidden lg:block"
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1,
            }}
          >
            <span className="text-4xl">⭐</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

