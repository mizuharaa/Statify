import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export function CallbackPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    if (accessToken && refreshToken) {
      localStorage.setItem('spotify_access_token', accessToken);
      localStorage.setItem('spotify_refresh_token', refreshToken);
      setLoading(false);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0F0D0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="reel-spin" style={{ width: 48, height: 48, border: '2px solid rgba(212,168,67,0.15)', borderTopColor: 'var(--gold)', borderRadius: '50%', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold)' }}>RECEIVING SIGNAL</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.15em', marginTop: 8 }}>ESTABLISHING SPOTIFY CONNECTION</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F0D0B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="card" style={{ textAlign: 'center', maxWidth: 440, width: '100%', padding: 48 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 24px',
          background: 'rgba(212,168,67,0.08)', border: '1.5px solid rgba(212,168,67,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CheckCircle2 size={28} stroke="var(--gold)" strokeWidth={1.5} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--text-primary)', marginBottom: 8 }}>CONNECTED</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>Your Spotify account is linked.</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.15em', marginBottom: 32 }}>
          SIGNAL LOCKED // READY TO BROADCAST
        </p>

        <div style={{
          borderRadius: 100, padding: '8px 20px', margin: '0 auto 32px',
          background: 'rgba(77,189,181,0.06)', border: '1px solid rgba(77,189,181,0.15)',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--teal)' }}>ONLINE</span>
        </div>

        <div>
          <button onClick={() => navigate('/dashboard')} className="btn-gold" style={{ width: '100%', padding: '14px 28px' }}>
            &#9654; See Your Stats
          </button>
        </div>
      </div>
    </div>
  );
}
