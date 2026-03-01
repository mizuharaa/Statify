import { useEffect, useState, useRef } from 'react';
import { Radio, Disc3, Clock, Users, Music, Headphones, ArrowRight, LogOut } from 'lucide-react';

const API_BASE = `http://${typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1'}:5000`;

interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string; height: number; width: number }>;
  external_urls: { spotify: string };
}

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string; height: number; width: number }> };
  external_urls: { spotify: string };
  duration_ms: number;
}

interface UserStats {
  profile: { display_name: string; images: Array<{ url: string }> };
  topArtists: Artist[];
  topTracks: Track[];
  stats: { totalMinutesListened: number; uniqueArtistsCount: number; totalTracksPlayed: number };
}

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

function getArtistImage(artist: Artist, preferredSize = 320): string | null {
  if (!artist.images || artist.images.length === 0) return null;
  const sorted = [...artist.images].sort((a, b) => (b.height || 0) - (a.height || 0));
  const match = sorted.find(img => (img.height || 640) >= preferredSize);
  return match?.url || sorted[0]?.url || null;
}

function getTrackImage(track: Track): string | null {
  if (!track.album?.images || track.album.images.length === 0) return null;
  return track.album.images[0]?.url || null;
}

function SessionTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { const id = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(id); }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>SESSION {h}:{m}:{s}</span>;
}

function WaveformBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} style={{
          width: 2.5, borderRadius: 2,
          height: `${30 + Math.sin(i * 0.5) * 50 + Math.cos(i * 0.8) * 20}%`,
          background: '#D4A843', opacity: 0.15 + Math.sin(i * 0.3) * 0.1,
          animation: `wavePulse ${2 + (i % 4) * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.06}s`,
        }} />
      ))}
    </div>
  );
}

/* ═══ DASHBOARD HEADER ═══ */
function DashHeader({ displayName, avatarUrl }: { displayName: string; avatarUrl?: string }) {
  return (
    <header className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)', letterSpacing: '0.04em', textDecoration: 'none' }}>STATIFY FM</a>
        <span className="hidden-md" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)' }}>— YOUR SESSION</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span className="hidden-md"><SessionTimer /></span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, borderRadius: 100,
          padding: '4px 12px 4px 4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(212,168,67,0.2)' }} />
          ) : (
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={14} stroke="var(--text-secondary)" />
            </div>
          )}
          <span className="hidden-sm" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>{displayName}</span>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
          title="Disconnect"
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}>
          <LogOut size={18} />
        </button>
      </div>
      <style>{`
        .hidden-md { display: inline; }
        .hidden-sm { display: inline; }
        @media(max-width:768px) { .hidden-md { display: none !important; } }
        @media(max-width:480px) { .hidden-sm { display: none !important; } }
      `}</style>
    </header>
  );
}

/* ═══ HERO ARTIST CARD ═══ */
function HeroArtistCard({ artist, minutes }: { artist: Artist; minutes: number }) {
  const reveal = useReveal();
  const imgUrl = getArtistImage(artist, 640);

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }} className="hero-artist-layout">
          {/* Photo */}
          <div className="hero-artist-photo" style={{ width: 280, flexShrink: 0 }}>
            <div className="photo-frame" style={{ width: '100%', height: '100%', minHeight: 280, borderRadius: 0, border: 'none', borderRight: '1px solid rgba(212,168,67,0.15)' }}>
              {imgUrl ? (
                <img src={imgUrl} alt={artist.name} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)' }}>
                  <Music size={48} stroke="var(--text-secondary)" strokeWidth={1} />
                </div>
              )}
            </div>
          </div>
          {/* Info */}
          <div style={{ flex: 1, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="hero-artist-info">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: 8 }}>♪ TOP ARTIST</div>
            <a href={artist.external_urls?.spotify} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
                color: 'var(--text-primary)', lineHeight: 0.95, marginBottom: 16, transition: 'color 0.2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}>
                {artist.name.toUpperCase()}
              </h2>
            </a>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{minutes.toLocaleString()}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>MINUTES ON TAPE</span>
            </div>
            <WaveformBar />
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px) {
          .hero-artist-layout { flex-direction: column !important; }
          .hero-artist-photo { width: 100% !important; }
          .hero-artist-photo .photo-frame { min-height: 220px !important; border-right: none !important; border-bottom: 1px solid rgba(212,168,67,0.15) !important; }
          .hero-artist-info { padding: 28px 24px !important; text-align: center; }
        }
      `}</style>
    </div>
  );
}

/* ═══ STATS ROW — 4 columns ═══ */
function StatsRow({ stats }: { stats: UserStats['stats'] }) {
  const reveal = useReveal();
  const items = [
    { Icon: Clock, value: stats.totalMinutesListened.toLocaleString(), label: 'Total Minutes' },
    { Icon: Users, value: stats.uniqueArtistsCount.toString(), label: 'Unique Artists' },
    { Icon: Disc3, value: stats.totalTracksPlayed.toString(), label: 'Tracks Played' },
    { Icon: Headphones, value: Math.ceil(stats.totalMinutesListened / 60).toString(), label: 'Hours Listened' },
  ];
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="stats-grid">
        {items.map((item, i) => {
          const Icon = item.Icon;
          return (
            <div key={i} className="card" style={{ textAlign: 'center', borderTopWidth: 2, borderTopColor: 'var(--gold)' }}>
              <Icon size={24} stroke="var(--gold)" strokeWidth={1.5} style={{ margin: '0 auto 12px', display: 'block' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 6 }}>{item.value}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)' }}>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ ARTIST GRID — 2 columns ═══ */
function ArtistGrid({ artists }: { artists: Artist[] }) {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="section-eyebrow">♪ TONIGHT'S LINEUP</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text-primary)', marginBottom: 20, marginTop: 8 }}>YOUR TOP ARTISTS</h2>
      <div className="artist-grid">
        {artists.map((artist, i) => {
          const imgUrl = getArtistImage(artist, 160);
          return (
            <a key={artist.id} href={artist.external_urls?.spotify} target="_blank" rel="noopener noreferrer"
              className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600, color: 'rgba(212,168,67,0.2)', width: 40, textAlign: 'center', flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {imgUrl ? (
                <img src={imgUrl} alt={artist.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(212,168,67,0.2)', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Music size={22} stroke="var(--text-secondary)" strokeWidth={1} />
                </div>
              )}
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{artist.name}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ TRACK LIST ═══ */
function TrackList({ tracks }: { tracks: Track[] }) {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.visible ? 'visible' : ''}`}>
      <div className="section-eyebrow">♫ THE TRACKLIST</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text-primary)', marginBottom: 20, marginTop: 8 }}>YOUR TOP TRACKS</h2>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {tracks.map((track, i) => {
          const imgUrl = getTrackImage(track);
          const dur = track.duration_ms ? `${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}` : '';
          return (
            <a key={track.id} href={track.external_urls?.spotify} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', textDecoration: 'none',
                borderBottom: i < tracks.length - 1 ? '1px solid rgba(212,168,67,0.1)' : 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,168,67,0.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              <div style={{ width: 36, flexShrink: 0, textAlign: 'center', position: 'relative' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: i === 0 ? 'rgba(212,168,67,0.5)' : 'rgba(122,110,96,0.3)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i === 0 && (
                  <span className="reel-spin" style={{
                    position: 'absolute', width: 16, height: 16, top: -1, right: -6,
                    border: '1.5px solid rgba(212,168,67,0.3)', borderTopColor: 'var(--gold)', borderRadius: '50%',
                  }} />
                )}
              </div>
              {imgUrl ? (
                <img src={imgUrl} alt={track.name} style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 44, height: 44, borderRadius: 6, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Disc3 size={16} stroke="var(--text-secondary)" />
                </div>
              )}
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {track.artists?.map(a => a.name).join(', ')}
                </div>
              </div>
              {dur && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)', flexShrink: 0 }}>{dur}</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ DASHBOARD FOOTER ═══ */
function DashFooter() {
  return (
    <footer style={{ padding: '40px 0', borderTop: '1px solid var(--gold-border)', marginTop: 80 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>&copy; 2024 Statify Broadcasting Co.</span>
        <a href="/" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>&larr; Back to Home</a>
      </div>
    </footer>
  );
}

/* ═══ DASHBOARD ROOT ═══ */
export function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const accessToken = localStorage.getItem('spotify_access_token');
      if (!accessToken) { setError('No signal detected. Please connect your Spotify account.'); setLoading(false); return; }

      try {
        const response = await fetch(`${API_BASE}/api/user/stats`, { headers: { 'Authorization': `Bearer ${accessToken}` } });

        if (response.status === 401) {
          const refreshToken = localStorage.getItem('spotify_refresh_token');
          if (refreshToken) {
            const refreshResponse = await fetch(`${API_BASE}/api/auth/refresh`, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: refreshToken }),
            });
            if (refreshResponse.ok) {
              const { access_token, refresh_token } = await refreshResponse.json();
              localStorage.setItem('spotify_access_token', access_token);
              if (refresh_token) localStorage.setItem('spotify_refresh_token', refresh_token);
              const retry = await fetch(`${API_BASE}/api/user/stats`, { headers: { 'Authorization': `Bearer ${access_token}` } });
              if (retry.ok) setStats(await retry.json()); else setError('Broadcast interrupted. Please try again.');
            } else { setError('Session expired. Please reconnect your Spotify account.'); }
          } else { setError('Session expired. Please reconnect.'); }
        } else if (response.ok) {
          setStats(await response.json());
        } else { setError('Broadcast interrupted. Please try again.'); }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Connection lost. Make sure the backend is running on port 5000.');
      } finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0F0D0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="reel-spin" style={{ width: 48, height: 48, marginBottom: 24, border: '2px solid rgba(212,168,67,0.15)', borderTopColor: 'var(--gold)', borderRadius: '50%', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold)' }}>TUNING IN</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.15em', marginTop: 8 }}>RECEIVING YOUR BROADCAST DATA</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0F0D0B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="card" style={{ textAlign: 'center', padding: 48, maxWidth: 440 }}>
          <Radio size={32} stroke="var(--red)" strokeWidth={1.5} style={{ margin: '0 auto 20px', display: 'block' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)', marginBottom: 12 }}>SIGNAL LOST</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>{error}</p>
          <a href="/" className="btn-gold" style={{ fontSize: 14, padding: '12px 24px' }}>Return Home <ArrowRight size={16} /></a>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div style={{ backgroundColor: '#0F0D0B', color: '#EDE3D0', minHeight: '100vh' }}>
      <DashHeader displayName={stats.profile.display_name} avatarUrl={stats.profile.images?.[0]?.url} />

      <main style={{ paddingTop: 64 + 40 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {stats.topArtists[0] && <HeroArtistCard artist={stats.topArtists[0]} minutes={stats.stats.totalMinutesListened} />}
          <StatsRow stats={stats.stats} />
          <ArtistGrid artists={stats.topArtists} />
          <TrackList tracks={stats.topTracks} />
        </div>
      </main>

      <DashFooter />
    </div>
  );
}
