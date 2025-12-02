import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RetroBackground } from './components/RetroBackground';
import { RetroStickers } from './components/RetroStickers';
import { SideDecor } from './components/SideDecor';
import { HeroSection } from './components/HeroSection';
import { RecapPoster } from './components/RecapPoster';
import { StatsArcadeStrip } from './components/StatsArcadeStrip';
import { AchievementsBadges } from './components/AchievementsBadges';
import { Footer } from './components/Footer';
import { CallbackPage } from './components/CallbackPage';
import { Dashboard } from './components/Dashboard';

function HomePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Retro 90s Japanese Background */}
      <RetroBackground />
      
      {/* Floating Retro Stickers */}
      <RetroStickers />
      
      {/* Side Decorations */}
      <SideDecor />
      
      {/* Main Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        
        <main>
          <HeroSection />
          
          {/* Full Recap Poster Section */}
          <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-6xl md:text-7xl lg:text-8xl curvy-font pastel-gradient neon-glow clear-text mb-6">
                  YOUR MUSIC RECAP
                </h2>
                <p className="text-xl md:text-2xl pixel-font curvy-font clear-text" style={{ color: '#4a4a4a', fontWeight: 700 }}>
                  ♪ SHAREABLE POSTER • SCREENSHOT & SHARE ♪
                </p>
              </div>
              <RecapPoster />
            </div>
          </section>

          <StatsArcadeStrip />
          <AchievementsBadges />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}