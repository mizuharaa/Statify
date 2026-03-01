import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const API_BASE = import.meta.env.DEV ? '' : `http://${typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1'}:5001`;

const handleConnectSpotify = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`);
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
    const data = await response.json();
    if (!data?.authUrl) throw new Error('No auth URL in response');
    window.location.href = data.authUrl;
  } catch (error) {
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ═══ CUSTOM SVG ICONS ═══ */
const CassetteIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="#D4A843" strokeWidth="1.5">
    <rect x="3" y="6" width="22" height="16" rx="3" />
    <circle cx="10" cy="14" r="3" /><circle cx="18" cy="14" r="3" />
    <path d="M13 14h2" /><path d="M7 22h14" strokeOpacity="0.4" />
  </svg>
);

const VennIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="#D4A843" strokeWidth="1.5">
    <circle cx="11" cy="14" r="7" /><circle cx="17" cy="14" r="7" />
  </svg>
);

const RadioTowerIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="#D4A843" strokeWidth="1.5">
    <path d="M14 24V10" strokeLinecap="round" />
    <path d="M10 24h8" strokeLinecap="round" />
    <circle cx="14" cy="8" r="2" />
    <path d="M9 12Q14 4 19 12" strokeOpacity="0.7" />
    <path d="M6 15Q14 3 22 15" strokeOpacity="0.4" />
  </svg>
);

const VinylIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="#D4A843" strokeWidth="1.5">
    <circle cx="14" cy="14" r="11" /><circle cx="14" cy="14" r="4" />
    <circle cx="14" cy="14" r="1.5" fill="#D4A843" stroke="none" />
  </svg>
);

/* ═══ PARTICLE NETWORK CANVAS ═══ */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 1,
        });
      }
    }

    const onMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = { x: null, y: null }; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mx !== null && my !== null) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 168, 67, 0.6)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(212, 168, 67, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ═══ MOCKUP STACK (hero visual) ═══ */
function MockupStack() {
  return (
    <div className="mockup-stack">
      {/* Back card — blurred heatmap preview */}
      <div className="mockup-card mockup-card-back">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: 8 }}>LISTENING YEAR</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
          {Array.from({ length: 84 }, (_, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '1', borderRadius: 1, background: `rgba(212,168,67,${Math.random() * 0.6 + 0.05})` }} />
          ))}
        </div>
      </div>

      {/* Middle card — mini donut preview */}
      <div className="mockup-card mockup-card-mid">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: 8 }}>YOUR SOUND</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg viewBox="0 0 60 60" style={{ width: 60, height: 60 }}>
            <circle cx="30" cy="30" r="22" fill="none" stroke="#D4A843" strokeWidth="6" strokeDasharray="44 94" transform="rotate(-90 30 30)" />
            <circle cx="30" cy="30" r="22" fill="none" stroke="#4DBDB5" strokeWidth="6" strokeDasharray="28 110" strokeDashoffset="-44" transform="rotate(-90 30 30)" />
            <circle cx="30" cy="30" r="22" fill="none" stroke="#C93333" strokeWidth="6" strokeDasharray="22 116" strokeDashoffset="-72" transform="rotate(-90 30 30)" />
          </svg>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-primary)' }}>Hip-Hop</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--gold)' }}>34%</div>
          </div>
        </div>
      </div>

      {/* Front card — artist preview */}
      <div className="mockup-card mockup-card-front">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 6 }}>TOP ARTIST</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>THE WEEKND</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--gold)', fontWeight: 600 }}>12,847</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-secondary)' }}>MIN ON TAPE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{
              width: 3, borderRadius: 1,
              height: `${30 + Math.sin(i * 0.7) * 50 + Math.cos(i * 1.1) * 20}%`,
              background: '#D4A843', opacity: 0.3,
            }} />
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--gold)', marginTop: 8, opacity: 0.5 }}>CH 01</div>
      </div>
    </div>
  );
}

/* ═══ DUAL TICKER ═══ */
function DualTicker() {
  const row1 = ['TOP ARTISTS', 'TOP TRACKS', 'LISTENING TIME', 'GENRE MAP', 'YOUR RHYTHM'];
  const row2 = ['STATIFY FM 93.7', 'NOW BROADCASTING', 'YOUR MUSIC IDENTITY', 'SIGNAL REPORT'];

  return (
    <div className="ticker-wrap">
      <div className="ticker-row">
        <div className="ticker-fade" />
        <div className="ticker-track">
          {[0, 1].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {row1.map((t, i) => (
                <span key={`${s}-${i}`} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <span className="ticker-item ticker-item-gold">{t}</span>
                  <span className="ticker-sep">//</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-row">
        <div className="ticker-fade" />
        <div className="ticker-track-reverse">
          {[0, 1].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {row2.map((t, i) => (
                <span key={`${s}-${i}`} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <span className="ticker-item ticker-item-teal">{t}</span>
                  <span className="ticker-sep">//</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ NAVBAR ═══ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('spotify_access_token');
  const handleLogOut = () => { localStorage.clear(); window.location.href = '/'; };
  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-logo">STATIFY</a>
        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#demo">Preview</a>
          {isLoggedIn && <a href="/dashboard">Dashboard</a>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="btn-gold hidden-mobile" style={{ padding: '10px 22px', fontSize: 14, textDecoration: 'none' }}>
                Open Dashboard &#9654;
              </a>
              <button onClick={handleLogOut} className="btn-ghost hidden-mobile" style={{ padding: '10px 18px', fontSize: 13 }}>
                Log out
              </button>
            </>
          ) : (
            <button onClick={handleConnectSpotify} className="btn-gold hidden-mobile" style={{ padding: '10px 22px', fontSize: 14 }}>
              Connect Spotify &#9654;
            </button>
          )}
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
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="btn-gold" style={{ padding: '12px 24px', marginTop: 8, width: '100%', textAlign: 'center', display: 'block', textDecoration: 'none' }} onClick={() => setOpen(false)}>
                Open Dashboard &#9654;
              </a>
              <button onClick={() => { handleLogOut(); setOpen(false); }} className="btn-ghost" style={{ padding: '12px 24px', marginTop: 8, width: '100%' }}>
                Log out
              </button>
            </>
          ) : (
            <button onClick={handleConnectSpotify} className="btn-gold" style={{ padding: '12px 24px', marginTop: 8, width: '100%' }}>
              Connect Spotify &#9654;
            </button>
          )}
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
      {/* Gradient blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '50%', height: '50%', top: '5%', right: '0%', background: 'radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', width: '50%', height: '50%', bottom: '10%', left: '0%', background: 'radial-gradient(ellipse, rgba(77,189,181,0.04) 0%, transparent 70%)' }} />
      </div>

      <ParticleCanvas />

      <div className="hero-inner" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-text">
          <div className="hero-eyebrow">✦ NOW BROADCASTING</div>
          <h1 className="hero-h1">YOUR MUSIC.<br /><span className="gold">RECORDED.</span></h1>
          <p className="hero-sub">Tune into your Spotify stats. See your top artists, tracks, and listening time — beautifully visualized.</p>
          <div className="hero-ctas">
            <button onClick={handleConnectSpotify} className="btn-gold" style={{ padding: '14px 32px' }}>&#9654; Connect Spotify</button>
            <a href="#demo" className="btn-ghost" style={{ padding: '14px 32px' }}>View Demo <ArrowRight size={16} /></a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {['Free to use', 'No password stored', '10k+ users'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>✦ {t}</span>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <MockupStack />
        </div>
      </div>

      <DualTicker />
    </section>
  );
}

/* ═══ HOW IT WORKS ═══ */
function HowItWorks() {
  const reveal = useReveal();
  const steps = [
    { num: '01', Icon: CassetteIcon, title: 'Connect', desc: 'Link your Spotify account with one click. We use secure OAuth — your password never touches our servers.' },
    { num: '02', Icon: RadioTowerIcon, title: 'Analyze', desc: 'We process your listening data and surface your top artists, most-played tracks, and listening patterns.' },
    { num: '03', Icon: VinylIcon, title: 'Discover', desc: 'Get a beautiful, detailed breakdown of your musical identity — explore your stats and share them.' },
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
            {/* Connecting SVG line */}
            <svg className="steps-connector" viewBox="0 0 100 2" preserveAspectRatio="none"
              style={{ position: 'absolute', top: '50%', left: '10%', width: '80%', height: 2, zIndex: 0, overflow: 'visible' }}>
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(212,168,67,0.25)" strokeWidth="1" strokeDasharray="6 4">
                {reveal.visible && (
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" fill="freeze" />
                )}
              </line>
            </svg>

            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={i} className="card" style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', marginBottom: 16 }}>{step.num}</div>
                  <div style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 20, background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon />
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

/* ═══ FEATURES SHOWCASE ═══ */
function FeaturesShowcase() {
  const reveal = useReveal();

  const gradients = [
    'linear-gradient(135deg, #D4A843, #8B5E15)',
    'linear-gradient(135deg, #4DBDB5, #1A5E5A)',
    'linear-gradient(135deg, #C93333, #5A0F0F)',
    'linear-gradient(135deg, #7B6FA0, #2D1F5E)',
    'linear-gradient(135deg, #5A8A6A, #1A3D25)',
  ];

  return (
    <section id="features" style={{ padding: '100px 0', backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-eyebrow">FEATURES</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--text-primary)' }}>EVERYTHING YOU NEED</h2>
          </div>

          {/* Block 1: Text left, Artist Grid right */}
          <div className="feature-block">
            <div className="feature-text">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text-primary)', marginBottom: 16 }}>TOP ARTISTS</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                See who dominates your listening — ranked with rich portraits, play time, and colorful identity. Each artist gets their own signature gradient.
              </p>
              <button onClick={handleConnectSpotify} className="btn-ghost" style={{ padding: '12px 24px', fontSize: 13 }}>See Your Artists <ArrowRight size={14} /></button>
            </div>
            <div className="feature-visual">
              <div className="mini-artist-grid">
                {['#1', '#2', '#3', '#4', '#5'].map((rank, i) => (
                  <div key={i} className="mini-artist-cell" style={{ background: gradients[i] }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{rank}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Block 2: Donut left, Text right */}
          <div className="feature-block">
            <div className="feature-text">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text-primary)', marginBottom: 16 }}>GENRE BREAKDOWN</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                Discover your sonic DNA. We aggregate genres from your top 20 artists and visualize your music taste as a rich interactive chart.
              </p>
              <button onClick={handleConnectSpotify} className="btn-ghost" style={{ padding: '12px 24px', fontSize: 13 }}>Explore Genres <ArrowRight size={14} /></button>
            </div>
            <div className="feature-visual" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 200, height: 200 }}>
                <svg viewBox="0 0 100 100" style={{ width: 200, height: 200, transform: 'rotate(-90deg)' }}>
                  {[
                    { pct: 34, color: '#D4A843', offset: 0 },
                    { pct: 22, color: '#4DBDB5', offset: 34 },
                    { pct: 18, color: '#C93333', offset: 56 },
                    { pct: 14, color: '#7B6FA0', offset: 74 },
                    { pct: 12, color: '#5A8A6A', offset: 88 },
                  ].map((seg, i) => {
                    const c = 2 * Math.PI * 38;
                    const dash = (seg.pct / 100) * c;
                    return <circle key={i} cx="50" cy="50" r="38" fill="none" stroke={seg.color} strokeWidth="10" strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-(seg.offset / 100) * c} />;
                  })}
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-primary)' }}>Hip-Hop</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--gold)', fontWeight: 600 }}>34%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Text left, Heatmap right */}
          <div className="feature-block">
            <div className="feature-text">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text-primary)', marginBottom: 16 }}>LISTENING HEATMAP</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                See your listening patterns over time. Every day lights up based on how much you listened — inspired by GitHub's contribution graph.
              </p>
              <button onClick={handleConnectSpotify} className="btn-ghost" style={{ padding: '12px 24px', fontSize: 13 }}>View Heatmap <ArrowRight size={14} /></button>
            </div>
            <div className="feature-visual">
              <div className="mini-heatmap-grid">
                {Array.from({ length: 84 }, (_, i) => {
                  const intensities = [0.06, 0.15, 0.3, 0.5, 0.8];
                  const intensity = intensities[Math.floor(Math.random() * intensities.length)];
                  return <div key={i} className="mini-heat-square" style={{ background: `rgba(212,168,67,${intensity})` }} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ DEMO TOP 5 ═══ */
function DemoAvatar({ name, img }: { name: string; img: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0);
  const style = { width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' as const, border: '2px solid rgba(212,168,67,0.2)', flexShrink: 0 };
  if (failed) return (
    <div style={{ ...style, background: 'rgba(212,168,67,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)' }}>{initial}</div>
  );
  return <img src={img} alt={name} style={style} referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

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

          <div style={{ background: 'var(--surface)', borderRadius: 24, padding: '32px 28px', maxWidth: 800, margin: '0 auto', border: '1px solid rgba(212,168,67,0.2)', boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,168,67,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '0 4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold)' }}>STATIFY FM</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(237,227,208,0.3)' }}>SIDE A // 2025</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '16px 0', marginBottom: 24, borderRadius: 12, background: 'var(--bg)', border: '1px solid rgba(212,168,67,0.08)' }}>
              <div className="reel-spin" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(212,168,67,0.3)', borderTopColor: 'var(--gold)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', letterSpacing: '0.15em' }}>&#9654; PLAYING</span>
              <div className="reel-spin" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(212,168,67,0.3)', borderTopColor: 'var(--gold)', animationDelay: '-2s' }} />
            </div>

            {demoArtists.map(a => (
              <div key={a.rank} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 8px', borderRadius: 10, transition: 'background 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
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

            <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(212,168,67,0.08)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(237,227,208,0.25)', letterSpacing: '0.15em' }}>
                RECORDED FROM SPOTIFY BROADCAST // STATIFY BROADCASTING CO.
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={handleConnectSpotify} className="btn-gold" style={{ padding: '14px 32px', fontSize: 15 }}>&#9654; See Your Real Stats</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ SOCIAL PROOF — TUNE IN TOGETHER ═══ */
function SocialProof() {
  const reveal = useReveal();
  const friends = [
    { name: 'Alex M.', artist: 'Drake', compat: 87, color: '#D4A843' },
    { name: 'Sam K.', artist: 'Billie Eilish', compat: 72, color: '#4DBDB5' },
    { name: 'Jordan P.', artist: 'Tyler, The Creator', compat: 64, color: '#C93333' },
    { name: 'Taylor R.', artist: 'SZA', compat: 91, color: '#7B6FA0' },
  ];

  const CompatRing = ({ pct, color }: { pct: number; color: string }) => {
    const r = 18; const c = 2 * Math.PI * r; const dash = (pct / 100) * c;
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" style={{ flexShrink: 0 }}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(212,168,67,0.1)" strokeWidth="3" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" transform="rotate(-90 22 22)" />
        <text x="22" y="22" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="10" fontFamily="'IBM Plex Mono', monospace" fontWeight="600">{pct}%</text>
      </svg>
    );
  };

  return (
    <section style={{ padding: '100px 0', backgroundColor: 'var(--bg)' }}>
      <div className="container">
        <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">COMMUNITY</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 48px)', color: 'var(--text-primary)', marginBottom: 16 }}>TUNE IN TOGETHER</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                Share your broadcast with friends. Compare your top artists, see who's listening to the same tracks, and discover music through each other's taste.
              </p>
              <a href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gold)', textDecoration: 'none' }}>→ Share your profile</a>
            </div>
            <div className="friend-grid">
              {friends.map((f, i) => (
                <div key={i} className="friend-card" style={{ borderTop: `2px solid ${f.color}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${f.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16, color: f.color, flexShrink: 0 }}>
                    {f.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-primary)' }}>{f.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>♪ {f.artist}</div>
                  </div>
                  <CompatRing pct={f.compat} color={f.color} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', opacity: 0.6 }}>See how it works →</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px) { .friend-grid { grid-template-columns: 1fr; } }`}</style>
    </section>
  );
}

/* ═══ SIGNAL BAR ═══ */
function SignalBar() {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}
      style={{ padding: '48px 0', backgroundColor: 'var(--surface-2)', borderTop: '1px solid var(--gold-border)', borderBottom: '1px solid var(--gold-border)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
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
            {['How It Works', 'Features', 'Dashboard'].map(l => (
              <a key={l} href="#" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>LEGAL</div>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
              <a key={l} href="#" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid var(--gold-border)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>&copy; 2025 Statify Broadcasting Co.</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(122,110,96,0.5)' }}>All frequencies reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══ LANDING PAGE ROOT ═══ */
export function LandingPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesShowcase />
      <DemoSection />
      <SocialProof />
      <SignalBar />
      <Footer />
    </div>
  );
}
