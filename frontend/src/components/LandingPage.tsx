import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Plug, Waves, Star, Menu, X, Music, Disc3, Headphones, Clock } from 'lucide-react';

const API_BASE = `http://${typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1'}:5000`;

const handleConnectSpotify = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`);
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
    const data = await response.json();
    if (!data?.authUrl) throw new Error('No auth URL in response');
    window.location.href = data.authUrl;
  } catch (error) {
    console.error('Error initiating Spotify login:', error);
    const msg = error instanceof Error ? error.message : String(error);
    alert(`Failed to connect to Spotify.\n\n${msg}\n\nMake sure the backend is running: cd Statify/backend && node server.js`);
  }
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Cassette SVG ── */
function CassetteSVG() {
  return (
    <svg viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="340" height="220" rx="16" fill="#1A1714" stroke="#D4A843" strokeWidth="1.5" opacity="0.8"/>
      <rect x="20" y="30" width="340" height="220" rx="16" fill="url(#cassGrad)" opacity="0.3"/>
      <rect x="60" y="60" width="260" height="100" rx="10" fill="#0F0D0B" stroke="rgba(212,168,67,0.25)" strokeWidth="1"/>
      <g className="reel-spin" style={{ transformOrigin: '130px 110px' }}>
        <circle cx="130" cy="110" r="32" fill="none" stroke="#D4A843" strokeWidth="1" opacity="0.4"/>
        <circle cx="130" cy="110" r="16" fill="none" stroke="#D4A843" strokeWidth="0.8" opacity="0.25"/>
        <circle cx="130" cy="110" r="5" fill="#D4A843" opacity="0.5"/>
      </g>
      <g className="reel-spin" style={{ transformOrigin: '250px 110px', animationDelay: '-3s' }}>
        <circle cx="250" cy="110" r="32" fill="none" stroke="#D4A843" strokeWidth="1" opacity="0.4"/>
        <circle cx="250" cy="110" r="16" fill="none" stroke="#D4A843" strokeWidth="0.8" opacity="0.25"/>
        <circle cx="250" cy="110" r="5" fill="#D4A843" opacity="0.5"/>
      </g>
      <path d="M162 110 C175 95, 205 95, 218 110" stroke="#D4A843" strokeWidth="0.8" fill="none" opacity="0.2"/>
      <rect x="120" y="180" width="140" height="40" rx="6" fill="#242018" stroke="rgba(212,168,67,0.2)" strokeWidth="1"/>
      <text x="190" y="205" textAnchor="middle" fill="#D4A843" fontSize="12" fontFamily="IBM Plex Mono" opacity="0.6">STATIFY VOL.1</text>
      <circle cx="44" cy="226" r="5" fill="#0F0D0B" stroke="rgba(212,168,67,0.15)" strokeWidth="1"/>
      <circle cx="336" cy="226" r="5" fill="#0F0D0B" stroke="rgba(212,168,67,0.15)" strokeWidth="1"/>
      <defs>
        <linearGradient id="cassGrad" x1="20" y1="30" x2="360" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4A843" stopOpacity="0.05"/>
          <stop offset="1" stopColor="#0F0D0B" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══ NAVBAR ═══ */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-logo">
          STATIFY
        </a>

        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#demo">Preview</a>
        </div>

        <button onClick={handleConnectSpotify} className="btn-gold" style={{ padding: '10px 22px', fontSize: 14, display: 'none' }} id="nav-cta-desktop">
          Connect Spotify &#9654;
        </button>
        {/* Desktop CTA — visible on md+ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={handleConnectSpotify} className="btn-gold hidden-mobile" style={{ padding: '10px 22px', fontSize: 14 }}>
            Connect Spotify &#9654;
          </button>
          <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-mobile-menu">
          <a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#demo" onClick={() => setOpen(false)}>Preview</a>
          <button onClick={handleConnectSpotify} className="btn-gold" style={{ padding: '12px 24px', marginTop: 8, width: '100%' }}>
            Connect Spotify &#9654;
          </button>
        </div>
      )}

      <style>{`.hidden-mobile { display: inline-flex; } @media(max-width:768px) { .hidden-mobile { display: none !important; } }`}</style>
    </>
  );
}

/* ═══ HERO ═══ */
function HeroSection() {
  return (
    <section className="hero">
      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '50%', height: '50%', top: '5%', right: '0%', background: 'radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', width: '50%', height: '50%', bottom: '10%', left: '0%', background: 'radial-gradient(ellipse, rgba(77,189,181,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-text">
          <div className="hero-eyebrow anim-1">✦ NOW BROADCASTING</div>
          <h1 className="hero-h1 anim-2">
            YOUR MUSIC.<br />
            <span className="gold">RECORDED.</span>
          </h1>
          <p className="hero-sub anim-3">
            Tune into your Spotify stats. See your top artists, tracks, and listening time — beautifully visualized.
          </p>
          <div className="hero-ctas anim-4">
            <button onClick={handleConnectSpotify} className="btn-gold" style={{ padding: '14px 32px' }}>
              &#9654; Connect Spotify
            </button>
            <a href="#demo" className="btn-ghost" style={{ padding: '14px 32px' }}>
              View Demo <ArrowRight size={16} />
            </a>
          </div>
          <div className="anim-5" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {['Free to use', 'No password stored', '10k+ users'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>✦ {t}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual anim-6">
          <CassetteSVG />
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker-bar" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5 }}>
        <div className="ticker-fade" />
        <div className="ticker-track">
          {[0, 1].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {['STATIFY FM', '93.7', 'TOP ARTISTS', 'TOP TRACKS', 'LISTENING TIME', 'NOW BROADCASTING'].map((t, i) => (
                <span key={`${s}-${i}`} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <span className="ticker-item">{t}</span>
                  <span className="ticker-sep">//</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ HOW IT WORKS — 3-column grid ═══ */
function HowItWorks() {
  const reveal = useReveal();
  const steps = [
    { num: '01', Icon: Plug, title: 'Connect', desc: 'Link your Spotify account with one click. We use secure OAuth — your password never touches our servers.' },
    { num: '02', Icon: Waves, title: 'Analyze', desc: 'We process your listening data and surface your top artists, most-played tracks, and listening patterns.' },
    { num: '03', Icon: Star, title: 'Discover', desc: 'Get a beautiful, detailed breakdown of your musical identity — explore your stats and share them.' },
  ];

  return (
    <section id="how-it-works" style={{ padding: '100px 0', backgroundColor: 'var(--bg)' }}>
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-eyebrow">THE PROCESS</div>
            <h2 className="section-title">Three Steps to Signal</h2>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={i} className="card">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', marginBottom: 16 }}>{step.num}</div>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, marginBottom: 20,
                    background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} stroke="#D4A843" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURES — 4-column grid ═══ */
function FeaturesSection() {
  const reveal = useReveal();
  const features = [
    { Icon: Music, title: 'Top Artists', desc: 'See who dominates your listening — ranked with visuals and play time.' },
    { Icon: Disc3, title: 'Top Tracks', desc: 'Your most-played songs displayed like premium liner notes.' },
    { Icon: Clock, title: 'Listening Stats', desc: 'Total minutes, unique artists, and track counts — all in one view.' },
    { Icon: Headphones, title: 'Instant Results', desc: 'Connect once, get your full report in seconds. No setup needed.' },
  ];

  return (
    <section id="features" style={{ padding: '100px 0', backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-eyebrow">FEATURES</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--text-primary)' }}>EVERYTHING YOU NEED</h2>
          </div>

          <div className="features-grid">
            {features.map((f, i) => {
              const Icon = f.Icon;
              return (
                <div key={i} className="card">
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, marginBottom: 20,
                    background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} stroke="#D4A843" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Demo avatar with fallback when image fails (e.g. Drake pfp) ── */
function DemoAvatar({ name, img }: { name: string; img: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0);
  const style = { width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' as const, border: '2px solid rgba(212,168,67,0.2)', flexShrink: 0 };
  if (failed) {
    return (
      <div style={{ ...style, background: 'rgba(212,168,67,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)' }}>
        {initial}
      </div>
    );
  }
  return <img src={img} alt={name} style={style} referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

/* ═══ DEMO TOP 5 — Tape Dashboard Preview ═══ */
function DemoSection() {
  const reveal = useReveal();
  const demoArtists = [
    { rank: 1, name: 'Drake', genre: 'Hip-Hop', mins: '12,847', img: 'https://i.scdn.co/image/ab6761610000e5eb4293385d429161f6a1db3362' },
    { rank: 2, name: 'The Weeknd', genre: 'R&B', mins: '9,312', img: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb' },
    { rank: 3, name: 'Taylor Swift', genre: 'Pop', mins: '7,450', img: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676' },
    { rank: 4, name: 'Kendrick Lamar', genre: 'Hip-Hop', mins: '5,891', img: 'https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022' },
    { rank: 5, name: 'SZA', genre: 'R&B', mins: '4,233', img: 'https://i.scdn.co/image/ab6761610000e5eb0895066d172e1f51f520bc65' },
  ];

  return (
    <section id="demo" style={{ padding: '100px 0', backgroundColor: 'var(--bg)' }}>
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">♪ PREVIEW</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--text-primary)', marginTop: 12 }}>YOUR TOP 5 ON TAPE</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-secondary)', marginTop: 12, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
              Connect Spotify to see your real stats. Here's what it looks like.
            </p>
          </div>

          {/* Tape card */}
          <div style={{
            background: '#1A1714', borderRadius: 24, padding: '32px 28px', maxWidth: 800, margin: '0 auto',
            border: '1px solid rgba(212,168,67,0.2)', boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,168,67,0.08)',
          }}>
            {/* Tape header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold)' }}>STATIFY FM</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(237,227,208,0.3)' }}>SIDE A // 2024</span>
            </div>

            {/* Reel window */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '16px 0', marginBottom: 24,
              borderRadius: 12, background: '#0F0D0B', border: '1px solid rgba(212,168,67,0.08)',
            }}>
              <div className="reel-spin" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(212,168,67,0.3)', borderTopColor: 'var(--gold)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', letterSpacing: '0.15em' }}>▶ PLAYING</span>
              <div className="reel-spin" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(212,168,67,0.3)', borderTopColor: 'var(--gold)', animationDelay: '-2s' }} />
            </div>

            {/* Artist rows */}
            {demoArtists.map((a) => (
              <div key={a.rank} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '12px 8px', borderRadius: 10,
                transition: 'background 0.15s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600, color: 'rgba(212,168,67,0.2)', width: 40, textAlign: 'center', flexShrink: 0 }}>
                  {String(a.rank).padStart(2, '0')}
                </span>
                <DemoAvatar name={a.name} img={a.img} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)' }}>{a.genre}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--gold)', flexShrink: 0 }}>{a.mins}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-secondary)', flexShrink: 0 }}>min</span>
              </div>
            ))}

            {/* Bottom label */}
            <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(212,168,67,0.08)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(237,227,208,0.25)', letterSpacing: '0.15em' }}>
                RECORDED FROM SPOTIFY BROADCAST // STATIFY BROADCASTING CO.
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={handleConnectSpotify} className="btn-gold" style={{ padding: '14px 32px', fontSize: 15 }}>
              &#9654; See Your Real Stats
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ SIGNAL BAR ═══ */
function SignalBar() {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}
      style={{ padding: '48px 0', backgroundColor: 'var(--surface-2)', borderTop: '1px solid var(--gold-border)', borderBottom: '1px solid var(--gold-border)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
        {[
          { v: '10,000+', l: 'Listeners Tuned In' },
          { v: '50M+', l: 'Minutes Analyzed' },
          { v: '24/7', l: 'Always Available' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: 140 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg)', padding: '60px 0 40px', borderTop: '1px solid var(--gold-border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)', marginBottom: 8 }}>STATIFY</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Your music stats, beautifully visualized. Connect your Spotify and discover your listening identity.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>NAVIGATION</div>
            {['How It Works', 'Features', 'Dashboard'].map((l) => (
              <a key={l} href="#" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>LEGAL</div>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((l) => (
              <a key={l} href="#" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid var(--gold-border)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>&copy; 2024 Statify Broadcasting Co.</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(122,110,96,0.5)' }}>All frequencies reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══ LANDING PAGE ROOT ═══ */
export function LandingPage() {
  return (
    <div style={{ backgroundColor: '#0F0D0B', color: '#EDE3D0' }}>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <DemoSection />
      <SignalBar />
      <Footer />
    </div>
  );
}
