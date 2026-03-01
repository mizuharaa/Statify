import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, LogOut, Menu } from 'lucide-react';

const API_BASE = import.meta.env.DEV ? '' : `http://${typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1'}:5001`;

/* ═══ TYPES ═══ */
interface Artist { id: string; name: string; images: Array<{ url: string; height: number; width: number }>; external_urls: { spotify: string }; genres?: string[]; }
interface Track { id: string; name: string; popularity?: number; artists: Array<{ name: string }>; album: { images: Array<{ url: string }> }; external_urls: { spotify: string }; duration_ms: number; }
interface NowPlayingData { playing: boolean; track?: string; artist?: string; albumArt?: string; progress?: number; duration?: number; }
interface UserStats {
  profile: { display_name: string; images: Array<{ url: string }> };
  topArtists: Artist[]; topArtistsAll: Artist[]; topTracks: Track[];
  recentlyPlayed: Array<{ played_at: string; track: Track }>;
  stats: { totalMinutesListened: number; uniqueArtistsCount: number; totalTracksPlayed: number };
  genreBreakdown: Array<{ name: string; pct: number }>;
  heatmap: Array<{ date: string; count: number }>;
  activeDays: Array<{ name: string; minutes: number }>;
  hourlyActivity: number[];
  personality: { type: string; description: string };
}

/* ═══ HOOKS ═══ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useCountUp(target: number, visible: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return val;
}

function getImg(artist: Artist, size = 320): string | null {
  if (!artist.images?.length) return null;
  const sorted = [...artist.images].sort((a, b) => (b.height || 0) - (a.height || 0));
  return sorted.find(i => (i.height || 640) >= size)?.url || sorted[0]?.url || null;
}

/* ═══ CUSTOM SVG ICONS ═══ */
const CassetteIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="6" width="22" height="16" rx="3" /><circle cx="10" cy="14" r="3" /><circle cx="18" cy="14" r="3" /><path d="M13 14h2" />
  </svg>
);
const VennIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="14" r="7" /><circle cx="17" cy="14" r="7" />
  </svg>
);
const RadioTowerIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 24V10" strokeLinecap="round" /><path d="M10 24h8" strokeLinecap="round" /><circle cx="14" cy="8" r="2" />
    <path d="M9 12Q14 4 19 12" strokeOpacity="0.7" /><path d="M6 15Q14 3 22 15" strokeOpacity="0.4" />
  </svg>
);
const VinylIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="14" cy="14" r="11" /><circle cx="14" cy="14" r="4" /><circle cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const WaveIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 14h4l3-8 4 16 4-12 3 6h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const GridIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="8" height="8" rx="2" /><rect x="16" y="4" width="8" height="8" rx="2" />
    <rect x="4" y="16" width="8" height="8" rx="2" /><rect x="16" y="16" width="8" height="8" rx="2" />
  </svg>
);
const ClockIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="14" cy="14" r="11" /><path d="M14 8v6l4 2" strokeLinecap="round" />
  </svg>
);

/* ═══ LOGO SVG ═══ */
function LogoSVG() {
  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 140, height: 35 }}>
        <path d="M12 28 L16 8" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 28 L16 8" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 14 Q16 6 22 14" stroke="#D4A843" strokeWidth="1.2" fill="none" opacity="0.7" />
        <path d="M7 18 Q16 6 25 18" stroke="#D4A843" strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="16" cy="7" r="2" fill="#D4A843" opacity="0.8" />
        <text x="34" y="24" fill="#EDE3D0" fontFamily="'Bebas Neue', sans-serif" fontSize="22" letterSpacing="0.06em">STATIFY</text>
      </svg>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.2em', marginTop: 2, paddingLeft: 0 }}>FM 93.7</span>
    </div>
  );
}

/* ═══ SIDEBAR ═══ */
function Sidebar({ active, onNav, displayName, avatarUrl }: { active: string; onNav: (s: string) => void; displayName: string; avatarUrl?: string }) {
  const items = [
    { id: 'overview', icon: WaveIcon, label: 'Overview' },
    { id: 'artists', icon: VennIcon, label: 'Top Artists' },
    { id: 'tracks', icon: VinylIcon, label: 'Top Tracks' },
    { id: 'stats', icon: GridIcon, label: 'Listening Stats' },
    { id: 'genres', icon: RadioTowerIcon, label: 'Genre Map' },
    { id: 'habits', icon: ClockIcon, label: 'Listening Habits' },
  ];
  return (
    <aside className="dash-sidebar">
      <LogoSVG />
      <nav style={{ flex: 1, paddingTop: 12 }}>
        {items.map(it => {
          const Icon = it.icon;
          return (
            <button key={it.id} className={`dash-nav-item ${active === it.id ? 'active' : ''}`} onClick={() => onNav(it.id)}>
              <Icon /> {it.label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(212,168,67,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(212,168,67,0.2)' }} />
          ) : (
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <VennIcon size={14} />
            </div>
          )}
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            className="dash-nav-item" style={{ padding: '8px 0', color: 'var(--text-secondary)', fontSize: 11 }}>
            <LogOut size={14} /> Log out
          </button>
          <button onClick={async () => {
            localStorage.clear();
            try {
              const res = await fetch(`${API_BASE}/api/auth/login`);
              const data = await res.json();
              if (data?.authUrl) window.location.href = data.authUrl;
              else window.location.href = '/';
            } catch { window.location.href = '/'; }
          }} className="dash-nav-item" style={{ padding: '8px 0', color: 'var(--gold)', fontSize: 11 }}>
            Re-authorize
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ═══ BOTTOM TAB BAR ═══ */
function BottomBar({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const tabs = [
    { id: 'overview', icon: WaveIcon, label: 'Overview' },
    { id: 'artists', icon: VennIcon, label: 'Artists' },
    { id: 'tracks', icon: VinylIcon, label: 'Tracks' },
    { id: 'genres', icon: RadioTowerIcon, label: 'Genres' },
    { id: 'habits', icon: ClockIcon, label: 'Habits' },
  ];
  return (
    <div className="dash-bottom-bar">
      {tabs.map(t => {
        const Icon = t.icon;
        return (
          <button key={t.id} className={active === t.id ? 'active' : ''} onClick={() => onNav(t.id)}>
            <Icon />{t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ═══ NOW PLAYING — always visible ═══ */
function NowPlaying({ accessToken }: { accessToken: string }) {
  const [np, setNp] = useState<NowPlayingData>({ playing: false });

  useEffect(() => {
    const fetchNp = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/now-playing`, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (res.ok) setNp(await res.json());
      } catch { /* ignore */ }
    };
    fetchNp();
    const interval = setInterval(fetchNp, 15000);
    return () => clearInterval(interval);
  }, [accessToken]);

  const pct = np.duration ? Math.round(((np.progress || 0) / np.duration) * 100) : 0;
  const isPlaying = np.playing && np.track;

  return (
    <div className="card" style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 20, overflow: 'hidden' }}>
      {/* Spinning vinyl disc */}
      <div style={{ flexShrink: 0, position: 'relative', width: 56, height: 56 }}>
        <svg viewBox="0 0 56 56" style={{ width: 56, height: 56 }} className={isPlaying ? 'reel-spin' : ''}>
          <circle cx="28" cy="28" r="26" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
          <circle cx="28" cy="28" r="20" fill="none" stroke="var(--gold)" strokeWidth="0.5" opacity="0.15" />
          <circle cx="28" cy="28" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5" opacity="0.15" />
          <circle cx="28" cy="28" r="8" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
          <circle cx="28" cy="28" r="3" fill="var(--gold)" opacity="0.8" />
          {isPlaying && np.albumArt && <clipPath id="vinylClip"><circle cx="28" cy="28" r="20" /></clipPath>}
          {isPlaying && np.albumArt && <image href={np.albumArt} x="8" y="8" width="40" height="40" clipPath="url(#vinylClip)" opacity="0.4" />}
        </svg>
        {isPlaying && <div style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#4ADE80', border: '2px solid var(--surface)' }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {isPlaying ? (
          <>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 4 }}>♪ NOW PLAYING</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{np.track}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{np.artist}</div>
            <div style={{ marginTop: 8, height: 3, background: 'rgba(212,168,67,0.15)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gold)', borderRadius: 2, transition: 'width 1s linear' }} />
            </div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', letterSpacing: '0.15em', marginBottom: 4 }}>TUNED IN</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-secondary)' }}>Nothing playing right now</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', opacity: 0.5 }}>Play something on Spotify to see it here</div>
          </>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', opacity: 0.4, flexShrink: 0 }}>CH 01</div>
    </div>
  );
}

/* ═══ STAT TILES ═══ */
function StatTiles({ stats }: { stats: UserStats['stats'] }) {
  const reveal = useReveal();
  const mins = useCountUp(stats.totalMinutesListened, reveal.visible);
  const artists = useCountUp(stats.uniqueArtistsCount, reveal.visible);
  const tracks = useCountUp(stats.totalTracksPlayed, reveal.visible);
  const hours = useCountUp(Math.ceil(stats.totalMinutesListened / 60), reveal.visible);

  const sparkline = (seed: number) => {
    const pts = Array.from({ length: 7 }, (_, i) => {
      const y = 28 - (Math.sin(seed + i * 1.2) * 10 + Math.cos(seed * 0.7 + i) * 6 + 14);
      return `${i * 12},${y}`;
    }).join(' ');
    return <svg viewBox="0 0 72 30" fill="none" style={{ width: 80, height: 30 }}><polyline points={pts} stroke="#D4A843" strokeWidth="1.5" fill="none" opacity="0.5" /></svg>;
  };

  const tiles = [
    { Icon: CassetteIcon, value: mins.toLocaleString(), label: 'Total Minutes', seed: 1 },
    { Icon: VennIcon, value: artists.toString(), label: 'Unique Artists', seed: 2.5 },
    { Icon: VinylIcon, value: tracks.toString(), label: 'Tracks Played', seed: 4 },
    { Icon: RadioTowerIcon, value: hours.toString(), label: 'Hours Listened', seed: 5.5 },
  ];

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="stats-grid">
        {tiles.map((t, i) => {
          const Icon = t.Icon;
          return (
            <div key={i} className="stat-tile">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8, opacity: 0.4 }}><Icon /></div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{t.value}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, marginBottom: 12 }}>{t.label}</div>
              {sparkline(t.seed)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ HERO ARTIST ═══ */
function HeroArtist({ artist, minutes }: { artist: Artist; minutes: number }) {
  const reveal = useReveal();
  const imgUrl = getImg(artist, 640);
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', borderRadius: 20 }}>
        {imgUrl && <div className="hero-artist-bg" style={{ backgroundImage: `url(${imgUrl})` }} />}
        <div className="hero-artist-overlay" />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: 0 }} className="ha-layout">
          <div className="ha-photo" style={{ flexShrink: 0, padding: 24 }}>
            {imgUrl ? <img src={imgUrl} alt={artist.name} style={{ width: 240, height: 240, objectFit: 'cover', borderRadius: 12, display: 'block' }} />
              : <div style={{ width: 240, height: 240, borderRadius: 12, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><VinylIcon size={48} /></div>}
          </div>
          <div className="artist-hero-info" style={{ flex: 1, padding: '32px 32px 32px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em' }}>TOP ARTIST</div>
            <a href={artist.external_urls?.spotify} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 64px)', color: 'var(--text-primary)', lineHeight: 0.95, transition: 'color 0.2s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}>
                {artist.name.toUpperCase()}
              </h2>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{minutes.toLocaleString()}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)' }}>MINUTES ON TAPE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', padding: '4px 10px', borderRadius: 100, background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)' }}>#1 IN YOUR ROTATION</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} style={{ width: 3, borderRadius: 2, height: `${30 + Math.sin(i * 0.6) * 50 + Math.cos(i * 0.9) * 20}%`, background: '#D4A843', opacity: 0.2 + Math.sin(i * 0.4) * 0.1, animation: `wavePulse ${2 + (i % 5) * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 16, right: 20, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', padding: '4px 8px', borderRadius: 6, background: 'rgba(26,23,20,0.6)', zIndex: 3 }}>CH 01</div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ha-layout{flex-direction:column!important}.ha-photo{padding:16px!important}.ha-photo img{width:100%!important;height:200px!important}.artist-hero-info{padding:16px 20px!important;text-align:center}}`}</style>
    </div>
  );
}

/* ═══ HEATMAP — normalized data + better sparse display ═══ */
function Heatmap({ data }: { data: UserStats['heatmap'] }) {
  const reveal = useReveal();
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const dayMap: Record<string, number> = {};
  data.forEach(d => { dayMap[d.date] = d.count; });
  const totalTracks = data.reduce((s, d) => s + d.count, 0);
  const activeDayCount = data.filter(d => d.count > 0).length;

  const today = new Date();
  const days: { date: string; count: number }[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days.push({ date: key, count: dayMap[key] || 0 });
  }

  const maxCount = Math.max(...days.map(d => d.count), 1);
  const getColor = (count: number) => {
    if (count === 0) return 'rgba(212,168,67,0.06)';
    const ratio = count / maxCount;
    if (ratio <= 0.25) return 'rgba(212,168,67,0.2)';
    if (ratio <= 0.5) return 'rgba(212,168,67,0.45)';
    if (ratio <= 0.75) return 'rgba(212,168,67,0.7)';
    return '#D4A843';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)' }}>YOUR LISTENING YEAR</h3>
          {totalTracks > 0 && (
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', padding: '4px 10px', background: 'rgba(212,168,67,0.06)', borderRadius: 100, border: '1px solid rgba(212,168,67,0.1)' }}>{totalTracks} tracks</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', padding: '4px 10px', background: 'rgba(212,168,67,0.06)', borderRadius: 100, border: '1px solid rgba(212,168,67,0.1)' }}>{activeDayCount} active days</span>
            </div>
          )}
        </div>
        <div style={{ overflowX: 'auto', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 4, paddingLeft: 24 }}>
            {months.map((m, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', width: Math.floor(52 / 12) * 15, flexShrink: 0 }}>{m}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 4 }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', height: 12, lineHeight: '12px', width: 16 }}>
                  {i % 2 === 1 ? d : ''}
                </span>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 12px)', gridAutoFlow: 'column', gap: 3 }}>
              {days.map((day, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: getColor(day.count), transition: 'transform 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.4)';
                    const r = e.currentTarget.getBoundingClientRect();
                    const d = new Date(day.date);
                    setTooltip({ x: r.left, y: r.top - 36, text: `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${day.count} tracks` });
                  }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; setTooltip(null); }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>Less</span>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: getColor(Math.round(ratio * maxCount)) }} />)}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>More</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', marginLeft: 12, opacity: 0.5 }}>Based on your recent listening history</span>
          </div>
        </div>
        {tooltip && (
          <div style={{ position: 'fixed', left: tooltip.x, top: tooltip.y, zIndex: 999, background: 'var(--bg)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', pointerEvents: 'none', whiteSpace: 'nowrap' }}>{tooltip.text}</div>
        )}
      </div>
    </div>
  );
}

/* ═══ GENRE NETWORK — bigger nodes, lines, drag, collisions ═══ */
function GenreNetwork({ genres }: { genres: UserStats['genreBreakdown'] }) {
  const reveal = useReveal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Array<{ name: string; pct: number; color: string; x: number; y: number; vx: number; vy: number; r: number }>>([]);
  const animRef = useRef<number>(0);
  const dragRef = useRef<{ idx: number; offsetX: number; offsetY: number } | null>(null);
  const velocityRef = useRef<{ vx: number; vy: number; lastX: number; lastY: number; lastT: number }>({ vx: 0, vy: 0, lastX: 0, lastY: 0, lastT: 0 });
  const colors = ['#D4A843', '#4DBDB5', '#C93333', '#7B6FA0', '#5A8A6A', '#8A6A3A'];

  const handleDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (Math.hypot(px - n.x, py - n.y) <= n.r) {
        dragRef.current = { idx: i, offsetX: n.x - px, offsetY: n.y - py };
        n.vx = 0; n.vy = 0;
        velocityRef.current = { vx: 0, vy: 0, lastX: n.x, lastY: n.y, lastT: performance.now() };
        return;
      }
    }
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const d = dragRef.current;
    const rect = canvas.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const W = cr.width;
    const H = cr.height;
    const n = nodesRef.current[d.idx];
    const prevX = n.x, prevY = n.y;
    n.x = Math.max(n.r, Math.min(W - n.r, px + d.offsetX));
    n.y = Math.max(n.r, Math.min(H - n.r, py + d.offsetY));
    const v = velocityRef.current;
    const now = performance.now();
    const dt = Math.max(now - v.lastT, 4);
    const rawVx = (n.x - prevX) * 0.35 * 16 / dt;
    const rawVy = (n.y - prevY) * 0.35 * 16 / dt;
    velocityRef.current = {
      vx: rawVx * 0.5 + v.vx * 0.5,
      vy: rawVy * 0.5 + v.vy * 0.5,
      lastX: n.x, lastY: n.y, lastT: now
    };
  }, []);

  const handleUp = useCallback(() => {
    if (dragRef.current) {
      const v = velocityRef.current;
      const FLING_SCALE = 2.2;
      const n = nodesRef.current[dragRef.current.idx];
      n.vx = Math.max(-10, Math.min(10, v.vx * FLING_SCALE));
      n.vy = Math.max(-10, Math.min(10, v.vy * FLING_SCALE));
      dragRef.current = null;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || genres.length === 0 || !reveal.visible) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const w = () => container.getBoundingClientRect().width;
    const h = () => container.getBoundingClientRect().height;

    if (nodesRef.current.length !== genres.length) {
      const W = Math.max(w(), 400); const H = Math.max(h(), 320);
      nodesRef.current = genres.map((g, i) => ({
        name: g.name, pct: g.pct, color: colors[i % colors.length],
        x: 80 + Math.random() * (W - 160),
        y: 80 + Math.random() * (H - 160),
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        r: 44 + (g.pct / 100) * 56,
      }));
    }

    const GRAVITY = 0.18;
    const RESTITUTION = 0.72;

    const draw = () => {
      const W = w(); const H = h();
      if (W <= 0 || H <= 0) { animRef.current = requestAnimationFrame(draw); return; }
      ctx.fillStyle = '#242018';
      ctx.fillRect(0, 0, W, H);
      const nodes = nodesRef.current;
      const dragging = dragRef.current?.idx ?? -1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 320;
          if (dist < maxDist && dist > 0) {
            const alpha = 0.4 * (1 - dist / maxDist);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212,168,67,${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n, i) => {
        if (i === dragging) return;
        n.vy += GRAVITY;
        n.x += n.vx; n.y += n.vy;
        if (n.x - n.r < 0) { n.vx *= -RESTITUTION; n.x = n.r; }
        if (n.x + n.r > W) { n.vx *= -RESTITUTION; n.x = W - n.r; }
        if (n.y - n.r < 0) { n.vy *= -RESTITUTION; n.y = n.r; }
        if (n.y + n.r > H) { n.vy *= -RESTITUTION; n.y = H - n.r; }
        n.x = Math.max(n.r, Math.min(W - n.r, n.x));
        n.y = Math.max(n.r, Math.min(H - n.r, n.y));
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]; const b = nodes[j];
          const aDrag = i === dragging; const bDrag = j === dragging;
          const dx = b.x - a.x; const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const overlap = a.r + b.r - dist;
          if (overlap > 0 && dist > 0.001) {
            const nx = dx / dist; const ny = dy / dist;
            if (!aDrag) { a.x -= nx * overlap * 0.5; a.y -= ny * overlap * 0.5; }
            if (!bDrag) { b.x += nx * overlap * 0.5; b.y += ny * overlap * 0.5; }
            const dvx = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
            if (!aDrag) { a.vx -= nx * dvx * 0.5; a.vy -= ny * dvx * 0.5; }
            if (!bDrag) { b.vx += nx * dvx * 0.5; b.vy += ny * dvx * 0.5; }
          }
        }
      }

      nodes.forEach((n, i) => {
        const isDragging = i === dragging;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + (isDragging ? '55' : '33');
        ctx.fill();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = isDragging ? 3 : 2;
        ctx.stroke();

        ctx.fillStyle = '#EDE3D0';
        ctx.font = '600 14px "IBM Plex Mono"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.pct + '%', n.x, n.y - 8);
        ctx.font = '12px "DM Sans"';
        ctx.fillText(n.name.length > 14 ? n.name.slice(0, 12) + '…' : n.name, n.x, n.y + 10);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { ro.disconnect(); cancelAnimationFrame(animRef.current); };
  }, [genres, reveal.visible]);

  useEffect(() => {
    const onUp = () => dragRef.current = null;
    window.addEventListener('mouseup', onUp);
    return () => window.removeEventListener('mouseup', onUp);
  }, []);

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 20 }}>YOUR SOUND</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Drag the circles — they bounce off each other</p>
        <div ref={containerRef} className="genre-network-container" style={{ width: '100%', height: 420, minHeight: 320, borderRadius: 12, overflow: 'hidden', cursor: 'grab' }}>
          <canvas ref={canvasRef} onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp} onMouseLeave={handleUp} style={{ display: 'block' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
          {genres.map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors[i % colors.length] }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{g.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)' }}>{g.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ ARTIST PORTRAITS ═══ */
function ArtistPortraits({ artists }: { artists: Artist[] }) {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="section-eyebrow">♪ TONIGHT'S LINEUP</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 20, marginTop: 8 }}>YOUR TOP ARTISTS</h3>
      <div className="portrait-grid">
        {artists.map((artist, i) => {
          const imgUrl = getImg(artist, 320);
          return (
            <a key={artist.id} href={artist.external_urls?.spotify} target="_blank" rel="noopener noreferrer"
              className="portrait-card" style={{ textDecoration: 'none', animationDelay: `${i * 0.08}s` }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                {imgUrl ? <img src={imgUrl} alt={artist.name} /> : <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><VinylIcon size={32} /></div>}
                <div className="artist-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', bottom: 36, right: 10, fontFamily: 'var(--font-display)', fontSize: 80, color: 'var(--text-primary)', opacity: 0.12, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{artist.name}</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ WAVEFORM SVG ═══ */
function WaveformSVG() {
  const bars = 20;
  const barW = 4;
  const gap = 2;
  const totalW = bars * (barW + gap);
  const heights = Array.from({ length: bars }, () => 6 + Math.random() * 18);
  return (
    <svg viewBox={`0 0 ${totalW} 30`} className="waveform-svg" style={{ width: '100%', height: 30, marginBottom: 20 }}>
      {heights.map((h, i) => (
        <rect key={i} x={i * (barW + gap)} y={(30 - h) / 2} width={barW} height={h} rx={2} className="waveform-bar" style={{ animationDelay: `${i * 0.06}s` }} />
      ))}
    </svg>
  );
}

/* ═══ TRACK LIST — Liner Notes aesthetic ═══ */
function TrackList({ tracks }: { tracks: Track[] }) {
  const reveal = useReveal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setBarsAnimated(true); }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const maxPop = Math.max(...tracks.map(t => t.popularity ?? 50), 1);

  const formatDur = (ms: number) => ms ? `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}` : '';

  const featured = tracks[0];
  const listTracks = tracks;

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="section-eyebrow">♫ THE TRACKLIST</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 24, marginTop: 8 }}>YOUR TOP TRACKS</h3>

      <div ref={sectionRef} className="tracks-layout">
        <div className="tracks-left">
          <div className="tracklist-card">
            {listTracks.map((track, i) => {
              const imgUrl = track.album?.images?.[0]?.url;
              const dur = formatDur(track.duration_ms || 0);
              const barPct = Math.round(((track.popularity ?? 50) / maxPop) * 100);
              const rank = String(i + 1).padStart(2, '0');
              return (
                <a key={track.id} href={track.external_urls?.spotify} target="_blank" rel="noopener noreferrer" className={`track-row ${i === 0 ? 'track-row-featured' : ''}`} data-rank={rank}>
                  <div className="track-rank">{rank}</div>
                  <div className="track-art-wrap">
                    {imgUrl ? <img src={imgUrl} alt="" className="track-art" /> : <div style={{ width: '100%', height: '100%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><VinylIcon size={20} /></div>}
                    <div className="track-art-overlay" />
                  </div>
                  <div className="track-meta">
                    <span className="track-name">{track.name}</span>
                    <span className="track-artist">{track.artists?.map(a => a.name).join(', ')}</span>
                  </div>
                  <div className="track-bar-wrap">
                    <div className="track-bar" style={{ width: barsAnimated ? `${barPct}%` : '0%' }} />
                  </div>
                  <div className="track-duration">{dur}</div>
                  <span className="track-spotify-link">↗</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="featured-track-panel">
          <div className="featured-label">
            <span className="rec-dot" /><span>NOW ON TAPE</span>
          </div>
          <div className="featured-art-wrap">
            {featured?.album?.images?.[0]?.url ? (
              <img src={featured.album.images[0].url} alt="" className="featured-art" />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><VinylIcon size={64} /></div>
            )}
          </div>
          <div className="featured-info">
            <p className="featured-rank-label">YOUR #1 TRACK</p>
            <h2 className="featured-track-name">{featured?.name || '—'}</h2>
            <p className="featured-artist">{featured?.artists?.map(a => a.name).join(', ') || '—'}</p>
            <div className="featured-waveform"><WaveformSVG /></div>
            <div className="featured-stats-row">
              <div className="featured-stat"><span className="fstat-num">#1</span><span className="fstat-label">RANK</span></div>
              <div className="featured-stat"><span className="fstat-num">{formatDur(featured?.duration_ms || 0)}</span><span className="fstat-label">DURATION</span></div>
              <div className="featured-stat"><span className="fstat-num">{featured?.popularity ?? '—'}</span><span className="fstat-label">POPULARITY</span></div>
            </div>
          </div>
          <a href={featured?.external_urls?.spotify} target="_blank" rel="noopener noreferrer" className="open-spotify-btn">Open in Spotify ↗</a>
        </div>
      </div>
    </div>
  );
}

/* ═══ ACTIVE DAYS — handles both field names + empty state ═══ */
function ActiveDays({ data }: { data: UserStats['activeDays'] }) {
  const reveal = useReveal();
  const totalMins = data.reduce((sum, d) => sum + d.minutes, 0);
  const maxVal = Math.max(...data.map(d => d.minutes), 1);
  const peakIdx = data.indexOf(data.reduce((a, b) => a.minutes > b.minutes ? a : b));
  const avgMins = Math.round(totalMins / 7);

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)' }}>YOUR RHYTHM</h3>
          {totalMins > 0 && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', padding: '4px 12px', background: 'rgba(212,168,67,0.06)', borderRadius: 100, border: '1px solid rgba(212,168,67,0.1)' }}>
              AVG {avgMins} min/day
            </div>
          )}
        </div>
        {totalMins === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <WaveIcon size={32} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', marginTop: 12 }}>Not enough recent data yet</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', opacity: 0.5, marginTop: 4 }}>Keep listening — your rhythm will appear here</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {data.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: i === peakIdx && d.minutes > 0 ? 'var(--gold)' : 'var(--text-secondary)', width: 80, flexShrink: 0, fontWeight: i === peakIdx ? 600 : 400 }}>{d.name.slice(0, 3)}</span>
                <div style={{ flex: 1, height: 8, background: 'rgba(212,168,67,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: reveal.visible ? `${(d.minutes / maxVal) * 100}%` : '0%', background: i === peakIdx ? 'var(--gold)' : 'rgba(212,168,67,0.5)', borderRadius: 4, transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: `${i * 80}ms` }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', width: 60, flexShrink: 0, textAlign: 'right' }}>{Math.round(d.minutes)} min</span>
                {i === peakIdx && d.minutes > 0 && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', padding: '2px 8px', borderRadius: 100, background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)', flexShrink: 0 }}>★ PEAK</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ TIME OF DAY RADIAL CHART ═══ */
function TimeOfDay({ hours }: { hours: number[] }) {
  const reveal = useReveal();
  if (!hours || hours.length !== 24) return null;
  const max = Math.max(...hours, 1);
  const cx = 150; const cy = 150; const innerR = 45; const outerMaxR = 130;

  const arcs = hours.map((count, i) => {
    const startAngle = (i / 24) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((i + 1) / 24) * 2 * Math.PI - Math.PI / 2;
    const r = innerR + (count / max) * (outerMaxR - innerR);
    const opacity = 0.15 + (count / max) * 0.85;

    const x1Inner = cx + innerR * Math.cos(startAngle);
    const y1Inner = cy + innerR * Math.sin(startAngle);
    const x1Outer = cx + r * Math.cos(startAngle);
    const y1Outer = cy + r * Math.sin(startAngle);
    const x2Inner = cx + innerR * Math.cos(endAngle);
    const y2Inner = cy + innerR * Math.sin(endAngle);
    const x2Outer = cx + r * Math.cos(endAngle);
    const y2Outer = cy + r * Math.sin(endAngle);

    const path = `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${r} ${r} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerR} ${innerR} 0 0 0 ${x1Inner} ${y1Inner} Z`;

    return { path, opacity, count, hour: i };
  });

  const peakHour = hours.indexOf(Math.max(...hours));
  const peakLabel = peakHour >= 12 ? `${peakHour === 12 ? 12 : peakHour - 12} PM` : `${peakHour === 0 ? 12 : peakHour} AM`;

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 20 }}>YOUR CLOCK</h3>
        <div className="radial-chart" style={{ display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 300 300" style={{ width: 'min(480px, 100%)', height: 'min(480px, 100%)', maxWidth: 480, maxHeight: 480 }}>
            {arcs.map((a, i) => (
              <path key={i} d={a.path} fill={`rgba(212,168,67,${a.opacity})`} stroke="rgba(26,23,20,0.5)" strokeWidth="0.5" />
            ))}
            {[0, 6, 12, 18].map(h => {
              const angle = (h / 24) * 2 * Math.PI - Math.PI / 2;
              const lx = cx + (outerMaxR + 14) * Math.cos(angle);
              const ly = cy + (outerMaxR + 14) * Math.sin(angle);
              const label = h === 0 ? '12A' : h === 6 ? '6A' : h === 12 ? '12P' : '6P';
              return <text key={h} x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fill="var(--text-secondary)" fontSize="9" fontFamily="'IBM Plex Mono'">{label}</text>;
            })}
            <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--gold)" fontSize="12" fontFamily="'IBM Plex Mono'" fontWeight="600">PEAK</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontFamily="'Bebas Neue'">{peakLabel}</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══ LISTENING CIRCLE — friend compatibility ═══ */
function ListeningCircle() {
  const reveal = useReveal();
  const friends = [
    { name: 'Alex M.', artist: 'Drake', pct: 87, color: '#D4A843' },
    { name: 'Sam K.', artist: 'Billie Eilish', pct: 72, color: '#4DBDB5' },
    { name: 'Jordan P.', artist: 'Tyler', pct: 64, color: '#C93333' },
    { name: 'Taylor R.', artist: 'SZA', pct: 91, color: '#7B6FA0' },
    { name: 'Chris W.', artist: 'Kanye West', pct: 78, color: '#5A8A6A' },
    { name: 'Morgan L.', artist: 'Doja Cat', pct: 55, color: '#8A6A3A' },
  ];

  const CompatRing = ({ pct, color, name }: { pct: number; color: string; name: string }) => {
    const r = 30; const c = 2 * Math.PI * r; const dash = (pct / 100) * c;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative', width: 72, height: 72 }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(212,168,67,0.1)" strokeWidth="3" />
            <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" transform="rotate(-90 36 36)" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16, color }}>
              {name.charAt(0)}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-primary)' }}>{name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color }}>{pct}% match</div>
        </div>
      </div>
    );
  };

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>YOUR CIRCLE</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>See how your taste matches with friends</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {friends.map((f, i) => <CompatRing key={i} pct={f.pct} color={f.color} name={f.name} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn-ghost" style={{ padding: '10px 20px', fontSize: 12 }}>Invite Friends <ArrowRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}

/* ═══ MOOD BOARD ═══ */
function MoodBoard({ personality, topTracks }: { personality: UserStats['personality']; topTracks: Track[] }) {
  const reveal = useReveal();

  const illustrations: Record<string, JSX.Element> = {
    'THE TRENDSETTER': (
      <svg viewBox="0 0 200 200" fill="none" style={{ width: 200, height: 200 }}>
        {[30, 55, 80, 105].map((r, i) => <circle key={i} cx="100" cy="100" r={r} stroke="#D4A843" strokeWidth={2 - i * 0.3} opacity={0.5 - i * 0.08} />)}
        <path d="M100 20L120 80 180 80 130 120 150 180 100 140 50 180 70 120 20 80 80 80Z" stroke="#4DBDB5" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>
    ),
    'THE BALANCER': (
      <svg viewBox="0 0 200 200" fill="none" style={{ width: 200, height: 200 }}>
        <circle cx="80" cy="100" r="50" stroke="#D4A843" strokeWidth="1.5" opacity="0.4" />
        <circle cx="120" cy="100" r="50" stroke="#4DBDB5" strokeWidth="1.5" opacity="0.4" />
        <ellipse cx="100" cy="100" rx="20" ry="45" fill="rgba(212,168,67,0.1)" />
      </svg>
    ),
    'THE DEEP DIVER': (
      <svg viewBox="0 0 200 200" fill="none" style={{ width: 200, height: 200 }}>
        {[20, 35, 50, 65, 80, 95].map((r, i) => <circle key={i} cx="100" cy="100" r={r} stroke="#D4A843" strokeWidth={1.5 - i * 0.15} opacity={0.15 + i * 0.08} />)}
        <circle cx="100" cy="100" r="6" fill="#D4A843" opacity="0.8" />
      </svg>
    ),
  };

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 48 }}>
        <div className="section-eyebrow" style={{ marginBottom: 16 }}>YOUR MUSIC IDENTITY</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h2 className="mood-gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1, marginBottom: 16 }}>{personality.type}</h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 24 }}>{personality.description}</p>
            <button className="btn-gold" style={{ padding: '12px 24px', fontSize: 13 }}>Share your identity &#9654;</button>
          </div>
          <div style={{ flexShrink: 0 }}>
            {illustrations[personality.type] || illustrations['THE DEEP DIVER']}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ DASHBOARD ROOT ═══ */
export function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');

  const accessToken = localStorage.getItem('spotify_access_token') || '';

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (!accessToken) { setError('No signal. Please connect your Spotify account.'); setLoading(false); return; }
      try {
        const response = await fetch(`${API_BASE}/api/user/stats`, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (response.status === 401) {
          const refreshToken = localStorage.getItem('spotify_refresh_token');
          if (refreshToken) {
            const rr = await fetch(`${API_BASE}/api/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: refreshToken }) });
            if (rr.ok) {
              const { access_token, refresh_token } = await rr.json();
              localStorage.setItem('spotify_access_token', access_token);
              if (refresh_token) localStorage.setItem('spotify_refresh_token', refresh_token);
              const retry = await fetch(`${API_BASE}/api/user/stats`, { headers: { Authorization: `Bearer ${access_token}` } });
              if (retry.ok) setStats(await retry.json()); else setError('Session interrupted.');
            } else setError('Session expired. Please reconnect.');
          } else setError('Session expired.');
        } else if (response.ok) setStats(await response.json());
        else setError('Something went wrong.');
      } catch (err) { console.error(err); setError('Connection lost. Is the backend running?'); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, [accessToken]);

  const defaultDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const s: UserStats | null = stats ? {
    ...stats,
    topArtists: stats.topArtists || [],
    topArtistsAll: stats.topArtistsAll || [],
    topTracks: stats.topTracks || [],
    recentlyPlayed: stats.recentlyPlayed || [],
    genreBreakdown: stats.genreBreakdown || [],
    heatmap: ((stats.heatmap || []) as Array<Record<string, unknown>>).map(d => ({
      date: (d.date as string) || '',
      count: (d.count as number) ?? (d.minutes as number) ?? 0,
    })),
    activeDays: stats.activeDays?.length
      ? (stats.activeDays as Array<Record<string, unknown>>).map(d => ({
          name: (d.name as string) || '',
          minutes: (d.minutes as number) ?? (d.avgMinutes as number) ?? 0,
        }))
      : defaultDays.map(name => ({ name, minutes: 0 })),
    hourlyActivity: stats.hourlyActivity || new Array(24).fill(0),
    personality: stats.personality || { type: 'THE DEEP DIVER', description: 'Connect to discover your type.' },
    stats: stats.stats || { totalMinutesListened: 0, uniqueArtistsCount: 0, totalTracksPlayed: 0 },
  } : null;

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="reel-spin" style={{ width: 48, height: 48, border: '2px solid rgba(212,168,67,0.15)', borderTopColor: 'var(--gold)', borderRadius: '50%', margin: '0 auto 24px' }} />
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold)' }}>TUNING IN</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.15em', marginTop: 8 }}>RECEIVING YOUR BROADCAST</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="card" style={{ textAlign: 'center', padding: 48, maxWidth: 440 }}>
        <RadioTowerIcon size={32} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)', marginBottom: 12, marginTop: 20 }}>SIGNAL LOST</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>{error}</p>
        <a href="/" className="btn-gold" style={{ fontSize: 14, padding: '12px 24px' }}>Return Home <ArrowRight size={16} /></a>
      </div>
    </div>
  );

  if (!s) return null;

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Sidebar active={activeSection} onNav={scrollToSection} displayName={s.profile.display_name} avatarUrl={s.profile.images?.[0]?.url} />
      <BottomBar active={activeSection} onNav={scrollToSection} />

      <main className="dash-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)' }}>DASHBOARD</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>Your broadcast summary</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={async () => { localStorage.clear(); try { const r = await fetch(`${API_BASE}/api/auth/login`); const d = await r.json(); if (d?.authUrl) window.location.href = d.authUrl; else window.location.href = '/'; } catch { window.location.href = '/'; } }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 100, padding: '8px 14px', cursor: 'pointer' }}>
              Re-authorize
            </button>
            <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', background: 'transparent', border: '1px solid rgba(212,168,67,0.12)', borderRadius: 100, padding: '8px 14px', cursor: 'pointer' }}>
              Log out
            </button>
          </div>
        </div>

        {/* Now Playing — always visible */}
        {accessToken && <div style={{ marginBottom: 32 }}><NowPlaying accessToken={accessToken} /></div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div id="section-overview"><StatTiles stats={s.stats} /></div>
          {s.topArtists[0] && <HeroArtist artist={s.topArtists[0]} minutes={s.stats.totalMinutesListened} />}
          <div id="section-stats"><Heatmap data={s.heatmap} /></div>
          {s.genreBreakdown.length > 0 && <div id="section-genres"><GenreNetwork genres={s.genreBreakdown} /></div>}
          <div id="section-artists"><ArtistPortraits artists={s.topArtists} /></div>
          <div id="section-tracks"><TrackList tracks={s.topTracks} /></div>
          <div id="section-habits">
            <ActiveDays data={s.activeDays} />
            <div style={{ marginTop: 40 }}>
              <TimeOfDay hours={s.hourlyActivity} />
            </div>
          </div>
          <ListeningCircle />
          <MoodBoard personality={s.personality} topTracks={s.topTracks} />
        </div>

        <footer style={{ padding: '40px 0 20px', borderTop: '1px solid rgba(212,168,67,0.08)', marginTop: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>&copy; 2025 Statify Broadcasting Co.</span>
            <a href="/" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>&larr; Back to Home</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
