import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import Player from '@vimeo/player';

const PROJECTS = [
  {
    id: 'El Patron',
    title: 'El Patron',
    category: 'AI Film Trailer',
    vimeoId: '1154404778',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd96d1a77e000b9bbbae_3_BOLS cocktails-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'The 27 Protocol',
    title: 'The 27 Protocol',
    category: 'AI Film Trailer',
    vimeoId: '1164958969',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecdd4ec61394f33311a88_1_Crisp TVC on Vimeo-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'The Thorne Recordings',
    title: 'The Thorne Recordings',
    category: 'AI Film Trailer',
    vimeoId: '1163094870',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640eca40be4a447bbd64798c_2_Offline by Aerie TV ad for Dancing With Stars-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'America 250',
    title: 'American 250',
    category: 'National Interactive Experience',
    vimeoId: '1157653008',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecb56637b80fa605d299a_7_SALONI - F-W19-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'America F*ck Yeah!',
    title: 'America F*ck Yeah',
    category: 'Tesla Commercial',
    vimeoId: '1152657713',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ece24a521a5fcb86da1c7_6_TRACA \'People On The Sand\' Music video-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'Manifest Nueve',
    title: 'Manifest Nueve',
    category: 'Fragrance Commercial',
    vimeoId: '1127254270',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ea8b4062316b67616f46e_5_Swiss Arabian Campaign film-poster-00001.jpg',
    type: 'full'
  },
  {
    id: '1810 History Rewritten',
    title: '1810 History Rewritten',
    category: 'Hollywood Studio Series Trailer',
    vimeoId: '1126892819',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd5653155c1838650b64_4_Leica M11 x BTS on Vimeo-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'Mojave Signal',
    title: 'Mojave Signal',
    category: 'AI Film Short',
    vimeoId: '1164968116',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecafd7577f69bc930067a_9_SAMSUNG \'Food pics made epic\' Spain-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'Belmont',
    title: 'Belmont',
    category: 'AI Horror Film Short',
    vimeoId: '1134025084',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecaa9db18eb578a523d44_8_IRIEDAILY - Beware of the Monkey on Vimeo-poster-00001.jpg',
    type: 'full'
  }
];

interface ProjectCardProps {
  project: typeof PROJECTS[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isMounted = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.01,
        rootMargin: '0px 200px 0px 200px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let player: Player | null = null;
    let isDestroyed = false;

    let timeoutId: number;

    if (isInView && containerRef.current) {
      timeoutId = window.setTimeout(() => {
        if (!isMounted.current || !isInView) return;
        
        try {
          player = new Player(containerRef.current!, {
            id: project.vimeoId,
            autoplay: true,
            loop: true,
            muted: true,
            background: true,
            responsive: true,
            controls: false,
            playsinline: true,
          });

          playerRef.current = player;
          
          // Ensure player is ready and playing
          player.ready().then(() => {
            if (!isDestroyed && isMounted.current && playerRef.current === player) {
              setIsLoaded(true);
              return player.play();
            }
          }).catch((err) => {
            // Silently handle expected errors during unmounting/destruction
            const errStr = String(err);
            const isExpectedError = isDestroyed || !isMounted.current || !err || 
                                  errStr.includes('Unknown player') || 
                                  errStr.includes('unloaded');
            
            if (!isExpectedError) {
              console.warn('Vimeo player error in Home:', err);
            }
          });
        } catch (error) {
          console.warn('Failed to initialize Vimeo player:', error);
        }
      }, 200); // Increased delay to 200ms to avoid rapid cycling
    }

    return () => {
      isDestroyed = true;
      setIsLoaded(false);
      window.clearTimeout(timeoutId);
      if (player) {
        if (playerRef.current === player) {
          playerRef.current = null;
        }
        player.destroy().catch(() => {});
      }
    };
  }, [isInView, project.vimeoId]);

  const toggleMute = () => {
    const player = playerRef.current;
    if (player && isMounted.current) {
      // Check if player is still valid before calling methods
      player.ready().then(() => {
        if (playerRef.current === player && isMounted.current) {
          return player.getMuted();
        }
        throw new Error('Player changed or unmounted');
      }).then((muted) => {
        if (playerRef.current === player && isMounted.current) {
          player.setMuted(!muted).catch(() => {});
          setIsMuted(!muted);
        }
      }).catch((err) => {
        // Silently handle expected errors during unmounting/destruction
        const errStr = String(err);
        const isExpectedError = !err || 
                              errStr.includes('Unknown player') || 
                              errStr.includes('unloaded') ||
                              errStr.includes('Player changed or unmounted');
        
        if (!isExpectedError) {
          console.warn('Error toggling mute:', err);
        }
      });
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={project.type === 'full' ? 'frame-item frame-100 group cursor-pointer' : 'frame-item frame-50 group cursor-pointer'}
      onClick={toggleMute}
    >
      <div className="background-video-container pointer-events-none">
        {/* Poster Image Fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${project.poster})`,
            opacity: isLoaded ? 0 : 1 
          }}
        />
        <div ref={containerRef} className="w-full h-full" />
      </div>
      <div className="block-project-text">
        <h6 className="heading-project">{project.title}</h6>
        <div className="subheading-project">{project.category}</div>
      </div>
      
      {/* Mute/Unmute Indicator */}
      <div className="absolute top-10 right-10 z-20 bg-black/40 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        )}
      </div>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90.91%"]);

  return (
    <div className="bg-[#0a0a0a] font-sans selection:bg-white selection:text-black">
      
      <div ref={containerRef} className="horizontal-container relative">
        <div className="sticky-wrapper">
          <motion.div style={{ x }} className="scrolling-frame">
            
            {/* Hero Section */}
            <div className="frame-item frame-hero">
              <div className="relative w-full h-full flex flex-col justify-center z-10">
                <Link to="/work" className="absolute bottom-10 right-[8vw] flex items-center gap-6 group/btn cursor-pointer">
                  <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/60 group-hover/btn:text-white transition-colors">SHOW MORE</div>
                  <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center relative">
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-cyan-400/40"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center bg-cyan-400/10 group-hover/btn:bg-cyan-400/20 transition-colors">
                      <motion.div 
                        className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Projects */}
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* CTA Section */}
            <div className="frame-item frame-100">
              <div className="flex flex-col justify-between h-full py-20">
                <div className="flex flex-col items-center text-center gap-12 mt-20">
                  <Link to="/contact" className="group flex flex-col items-center gap-8">
                    <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] text-center">
                      <span className="text-span">Got a project in mind?</span> <br />
                      Let’s talk
                    </h2>
                    <div className="circle-hero">
                      <div className="yellow-circle-hero">
                        <div className="blue-circle-hero" />
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-12" />
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
