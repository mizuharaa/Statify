import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
}

export const ARTIST_IDS = [
  "3TVXtAsR1Inumwj472S9r4", // Drake
  "699OTQXzgjhIYAHMy9RyPD", // Playboi Carti
  "1uNFoZAHBGtllmzznpCI3s", // Justin Bieber
  "1Xyo4u8uXC1ZmMpatF05PJ", // The Weeknd
  "4SpbR6yFEvexJuaBpgAU5p", // LE SSERAFIM
  "0Y5tJX1MQlPlqiwlOH1tJY", // Travis Scott
  "06HL4z0CvFAxyc27GXpf02", // Taylor Swift
];

export function StatsArcadeStrip() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimatedRef = useRef(false);
  const isWindowLoadedRef = useRef(false);

  const options = {
    initRadius: 50,
    radiusDesktop: 200,
    radiusMobile: 120,
    flipCard: true,
  };

  useEffect(() => {
    const fetchArtists = async () => {
      let accessToken = localStorage.getItem('spotify_access_token');
      
      if (!accessToken) {
        const refreshToken = localStorage.getItem('spotify_refresh_token');
        if (refreshToken) {
          try {
            const refreshResponse = await fetch('http://127.0.0.1:5000/api/auth/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: refreshToken })
            });
            if (refreshResponse.ok) {
              const { access_token } = await refreshResponse.json();
              accessToken = access_token;
              localStorage.setItem('spotify_access_token', access_token);
            }
          } catch (e) {}
        }
      }

      if (!accessToken) {
        const fallbackArtists: Artist[] = ARTIST_IDS.map((id, idx) => ({
          id,
          name: ['Drake', 'Playboi Carti', 'Justin Bieber', 'The Weeknd', 'LE SSERAFIM', 'Travis Scott', 'Taylor Swift'][idx],
          images: [],
          external_urls: { spotify: `https://open.spotify.com/artist/${id}` }
        }));
        setArtists(fallbackArtists);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/api/artists/bulk?ids=${ARTIST_IDS.join(',')}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (response.status === 401) {
          const refreshToken = localStorage.getItem('spotify_refresh_token');
          if (refreshToken) {
            const refreshResponse = await fetch('http://127.0.0.1:5000/api/auth/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: refreshToken })
            });
            if (refreshResponse.ok) {
              const { access_token } = await refreshResponse.json();
              accessToken = access_token;
              localStorage.setItem('spotify_access_token', access_token);
              
              const retryResponse = await fetch(`http://127.0.0.1:5000/api/artists/bulk?ids=${ARTIST_IDS.join(',')}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
              });
              
              if (retryResponse.ok) {
                const data = await retryResponse.json();
                if (data.artists) {
                  const artistsData = data.artists
                    .filter((a: any) => a && a.id)
                    .map((artist: any) => ({
                      id: artist.id,
                      name: artist.name,
                      images: (artist.images || []).filter((img: any) => img && img.url),
                      external_urls: { spotify: artist.external_urls?.spotify || `https://open.spotify.com/artist/${artist.id}` }
                    }));
                  setArtists(artistsData);
                  setIsLoading(false);
                  return;
                }
              }
            }
          }
        } else if (response.ok) {
          const data = await response.json();
          if (data.artists) {
            const artistsData = data.artists
              .filter((a: any) => a && a.id)
              .map((artist: any) => ({
                id: artist.id,
                name: artist.name,
                images: (artist.images || []).filter((img: any) => img && img.url),
                external_urls: { spotify: artist.external_urls?.spotify || `https://open.spotify.com/artist/${artist.id}` }
              }));
            setArtists(artistsData);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error:', error);
        const fallbackArtists: Artist[] = ARTIST_IDS.map((id, idx) => ({
          id,
          name: ['Drake', 'Playboi Carti', 'Justin Bieber', 'The Weeknd', 'LE SSERAFIM', 'Travis Scott', 'Taylor Swift'][idx],
          images: [],
          external_urls: { spotify: `https://open.spotify.com/artist/${id}` }
        }));
        setArtists(fallbackArtists);
      }
      
      if (artists.length === 0) {
        const fallbackArtists: Artist[] = ARTIST_IDS.map((id, idx) => ({
          id,
          name: ['Drake', 'Playboi Carti', 'Justin Bieber', 'The Weeknd', 'LE SSERAFIM', 'Travis Scott', 'Taylor Swift'][idx],
          images: [],
          external_urls: { spotify: `https://open.spotify.com/artist/${id}` }
        }));
        setArtists(fallbackArtists);
      }
      
      setIsLoading(false);
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    if (artists.length === 0 || !imagesContainerRef.current) return;
    const images = imagesContainerRef.current.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;
    
    if (total === 0) {
      triggerAnimation();
      return;
    }

    images.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        loaded++;
        if (loaded === total) triggerAnimation();
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === total) triggerAnimation();
        };
        img.onerror = () => {
          loaded++;
          if (loaded === total) triggerAnimation();
        };
      }
    });
  }, [artists]);

  useEffect(() => {
    if (document.readyState === 'complete') {
      isWindowLoadedRef.current = true;
      triggerAnimation();
    } else {
      window.addEventListener('load', () => {
        isWindowLoadedRef.current = true;
        triggerAnimation();
      });
    }
  }, []);

  const triggerAnimation = () => {
    if (isAnimatedRef.current || !isWindowLoadedRef.current || !containerRef.current || !imagesContainerRef.current || artists.length === 0) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5) {
      if (!isAnimatedRef.current) {
        isAnimatedRef.current = true;
        container.classList.add('init');
        imageStackEntrance();
      }
    }
  };

  const imageStackEntrance = () => {
    if (!imagesContainerRef.current || !contentRef.current) return;
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const isDesktop = window.innerWidth >= 768;
    const cardContainers = Array.from(imagesContainerRef.current.children) as HTMLElement[];
    const content = contentRef.current;
    if (cardContainers.length === 0) return;

    const imageHeight = cardContainers[0].offsetHeight || 200;
    const count = cardContainers.length;
    const radius1 = options.initRadius + imageHeight / 2;
    const radius2 = (isDesktop ? options.radiusDesktop : options.radiusMobile) - options.initRadius;

    cardContainers.forEach((card) => {
      card.style.transformOrigin = `center ${radius1 + imageHeight / 2}px`;
      card.style.opacity = '1';
      card.style.visibility = 'visible';
    });

    imagesContainerRef.current.style.transformStyle = 'preserve-3d';
    imagesContainerRef.current.style.opacity = '1';
    imagesContainerRef.current.style.visibility = 'visible';

    const tl = gsap.timeline();
    tl.from(cardContainers, {
      y: (imagesContainerRef.current.offsetHeight || 0) / 2 + imageHeight * 1.5,
      rotateX: -180,
      stagger: 0.1,
      duration: 0.5,
      opacity: 1,
      scale: 3,
    })
    .to(cardContainers, {
      y: -radius1,
      opacity: 1,
      duration: 0.5,
      ease: 'power1.out',
    })
    .to(cardContainers, {
      rotationZ: (index: number) => index * 360 / count,
      rotateY: 15,
      duration: 1,
      ease: 'power1.out',
    }, '<')
    .to(cardContainers, {
      rotationZ: (index: number) => (index + 1) * (360 / count),
      x: (index: number) => radius2 * Math.sin((180 - (index + 1) * 360 / count) * Math.PI / 180),
      y: (index: number) => radius2 * Math.cos((180 - (index + 1) * 360 / count) * Math.PI / 180) - radius1,
      opacity: 1,
    })
    .from(content, {
      opacity: 0,
      filter: 'blur(60px)',
      duration: 1,
    }, '<')
    .to(cardContainers, {
      opacity: 1,
      repeat: -1,
      duration: 2,
      onRepeat: () => {
        if (options.flipCard && cardContainers.length > 0) {
          const randomIndex = Math.floor(Math.random() * cardContainers.length);
          const card = cardContainers[randomIndex];
          gsap.to(card, {
            rotateY: '+=180',
            opacity: 1,
            duration: 0.8,
          });
        }
      },
    })
    .to(imagesContainerRef.current, {
      rotationZ: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    }, '<-=2');
  };

  useEffect(() => {
    const handleScroll = () => triggerAnimation();
    const handleResize = () => { if (isAnimatedRef.current) triggerAnimation(); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [artists]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-6 relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl md:text-6xl lg:text-7xl anime-font pastel-gradient neon-glow mb-4">
            loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="mdw-rotating-image-effect relative py-16 md:py-24 px-4 md:px-6 min-h-screen"
      style={{ zIndex: 1, position: 'relative', overflow: 'visible' }}
    >
      <div 
        ref={contentRef} 
        className="mdw-rotating-image-content text-center mb-12 relative opacity-0" 
        style={{ zIndex: 2000, position: 'relative', marginBottom: '3rem' }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl anime-font pastel-gradient neon-glow mb-4"
        >
          2025 top artist
        </motion.h2>
        <p className="curvy-font text-base opacity-90" style={{ color: '#8B4513' }}>
          ★ DISCOVER YOUR FAVORITES ★
        </p>
      </div>

      <div 
        ref={imagesContainerRef}
        className="mdw-rotating-images relative"
        style={{
          perspective: '1000px',
          width: '100%',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1,
          visibility: 'visible',
          zIndex: 10,
          position: 'relative',
          marginTop: '-3rem',
        }}
      >
        {artists.map((artist, index) => {
          const frontImage = artist.images?.[0]?.url || '';
          const backImage = artist.images?.[1]?.url || artist.images?.[0]?.url || '';
          
          return (
            <a
              key={artist.id}
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="elementor-widget-image block absolute"
              style={{
                width: '200px',
                height: '250px',
                maxWidth: 'unset',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                opacity: 1,
                visibility: 'visible',
                zIndex: 10,
                display: 'block',
                position: 'absolute',
              }}
            >
              <div
                className="card-container relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  className="card-front absolute inset-0 rounded-lg shadow-2xl border-4 border-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    visibility: 'visible',
                  }}
                >
                  {frontImage && (
                    <img
                      src={frontImage}
                      alt={artist.name}
                      className="w-full h-full object-cover rounded-lg"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        opacity: 1,
                        visibility: 'visible',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-3 text-center text-white curvy-font text-xs font-bold"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      borderRadius: '0 0 8px 8px',
                      zIndex: 3,
                      pointerEvents: 'none',
                    }}
                  >
                    {artist.name}
                  </div>
                </div>

                <div
                  className="card-back absolute inset-0 rounded-lg shadow-2xl border-4 border-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    visibility: 'visible',
                  }}
                >
                  {backImage && (
                    <img
                      src={backImage}
                      alt={`${artist.name} - Back`}
                      className="w-full h-full object-cover rounded-lg"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        opacity: 1,
                        visibility: 'visible',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-3 text-center text-white curvy-font text-xs font-bold"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      borderRadius: '0 0 8px 8px',
                      zIndex: 3,
                      pointerEvents: 'none',
                    }}
                  >
                    {artist.name}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
