import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Player from '@vimeo/player';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  vimeoId: string;
  thumbnail: string;
  runtime: string;
  tags: string[];
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'The 27 Protocol',
    title: 'The 27 Protocol',
    category: 'AI Film Trailer',
    description: 'A high-energy commercial for the modern athlete.',
    vimeoId: '1164958969',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecdd4ec61394f33311a88_1_Crisp TVC on Vimeo-poster-00001.jpg',
    runtime: ':30',
    tags: ['Direction', 'Edit', 'Color'],
  },
  {
    id: 'The Thorne Recordings',
    title: 'The Thorne Recordings',
    category: 'AI Film Trailer',
    description: 'Capturing the rhythm and soul of the dance floor.',
    vimeoId: '1163094870',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640eca40be4a447bbd64798c_2_Offline by Aerie TV ad for Dancing With Stars-poster-00001.jpg',
    runtime: ':60',
    tags: ['VFX', 'Sound Design'],
  },
  {
    id: 'El Patron',
    title: 'El Patron',
    category: 'AI Film Trailer',
    description: 'The art of mixology captured in cinematic detail.',
    vimeoId: '1154404778',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd96d1a77e000b9bbbae_3_BOLS cocktails-poster-00001.jpg',
    runtime: ':15',
    tags: ['Macro', 'AI Production'],
  },
  {
    id: 'America F*ck Yeah!',
    title: 'America F*ck Yeah!',
    category: 'Tesla Commercial',
    description: 'A dreamlike journey across the coastal dunes.',
    vimeoId: '1152657713',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ece24a521a5fcb86da1c7_6_TRACA \'People On The Sand\' Music video-poster-00001.jpg',
    runtime: '3:45',
    tags: ['Music Video', 'Direction'],
  },
  {
    id: 'Manifest Nueve',
    title: 'Manifest Nueve',
    category: 'Fragrance Commercial',
    description: 'The essence of luxury in every frame.',
    vimeoId: '1127254270',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ea8b4062316b67616f46e_5_Swiss Arabian Campaign film-poster-00001.jpg',
    runtime: ':45',
    tags: ['Fashion', 'Cinematography'],
  },
  {
    id: '1810 History Rewritten',
    title: '1810 History Rewritten',
    category: 'Hollywood Studio Series Trailer',
    description: 'Behind the lens of the world\'s most iconic camera.',
    vimeoId: '1126892819',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd5653155c1838650b64_4_Leica M11 x BTS on Vimeo-poster-00001.jpg',
    runtime: '5:20',
    tags: ['Documentary', 'Edit'],
  },
  {
    id: 'America 250',
    title: 'America 250',
    category: 'National Interactive Experience',
    description: 'High fashion meets cinematic storytelling.',
    vimeoId: '1157653008',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecb56637b80fa605d299a_7_SALONI - F-W19-poster-00001.jpg',
    runtime: ':30',
    tags: ['Fashion', 'Color'],
  },
  {
    id: 'Belmont',
    title: 'Belmont',
    category: 'AI Horror Short Film',
    description: 'A gritty, urban exploration of street culture.',
    vimeoId: '1134025084',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecaa9db18eb578a523d44_8_IRIEDAILY - Beware of the Monkey on Vimeo-poster-00001.jpg',
    runtime: '1:45',
    tags: ['Street', 'Action'],
  },
  {
    id: 'Mojave Signal',
    title: 'Mojave Signal',
    category: 'AI Short Film',
    description: 'Making the everyday look extraordinary.',
    vimeoId: '1164968116',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecafd7577f69bc930067a_9_SAMSUNG \'Food pics made epic\' Spain-poster-00001.jpg',
    runtime: ':15',
    tags: ['Macro', 'Commercial'],
  },
  {
    id: 'Inner',
    title: 'Inner',
    category: 'AI Music Video',
    description: 'A cinematic journey through the lens of a visionary director.',
    vimeoId: '1116472001',
    thumbnail: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/6417ca7136dcd36eb2001eab_11_Director’s cut for Luca Santonastaso-poster-00001.jpg',
    runtime: '2:15',
    tags: ['Direction', 'Edit'],
  }
];

const FilmGrain = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const CursorFollower = ({ active, text }: { active: boolean; text: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mousePos.x, springConfig);
  const y = useSpring(mousePos.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden lg:block"
      style={{ x, y }}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, x: 20, y: 20 }}
            animate={{ scale: 1, opacity: 1, x: 20, y: 20 }}
            exit={{ scale: 0.8, opacity: 0, x: 20, y: 20 }}
            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-widest text-white uppercase"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CinemaModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const isMounted = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    let player: Player | null = null;
    let isDestroyed = false;

    if (containerRef.current) {
      try {
        // Initialize with muted: true to guarantee autoplay, then try to unmute
        player = new Player(containerRef.current, {
          id: project.vimeoId,
          autoplay: true,
          loop: true,
          muted: true, // Start muted to ensure it plays
          responsive: true,
          controls: true,
          playsinline: true,
        });

        playerRef.current = player;
        
        player.ready().then(() => {
          if (!isDestroyed && isMounted.current && playerRef.current === player) {
            // Once ready, try to unmute and play
            player.setMuted(false).catch(() => {
              // If unmuting fails (autoplay policy), stay muted but keep playing
            });
            return player.play();
          }
        }).catch((err) => {
          // Silently handle expected errors during unmounting/destruction
          const errStr = String(err);
          const isExpectedError = isDestroyed || !isMounted.current || !err || 
                                errStr.includes('Unknown player') || 
                                errStr.includes('unloaded');
          
          if (!isExpectedError) {
            console.warn('Vimeo player error in modal:', err);
          }
        });
      } catch (error) {
        console.warn('Failed to initialize Vimeo player in modal:', error);
      }

      return () => {
        isDestroyed = true;
        if (player) {
          if (playerRef.current === player) {
            playerRef.current = null;
          }
          player.destroy().catch(() => {});
        }
      };
    }
  }, [project.vimeoId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-7xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Background Thumbnail while loading */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${project.thumbnail})` }}
        />
        
        <div ref={containerRef} className="w-full h-full relative z-10" />
        
        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute top-6 right-6 flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="absolute bottom-10 left-10 text-white pointer-events-none">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/50 mb-2">{project.category}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{project.title}</h2>
          <p className="text-lg text-white/70 max-w-2xl mb-6">{project.description}</p>
          <div className="flex gap-3">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
  onHover: (active: boolean, text: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpen, onHover }) => {
  const isMounted = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      onHover(true, isMuted ? "CLICK TO UNMUTE" : "CLICK TO MUTE");
    }
  }, [isMuted, isHovered, onHover]);

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
        rootMargin: '200px 0px 200px 0px'
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
              console.warn('Vimeo player error in Work:', err);
            }
          });
        } catch (error) {
          console.warn('Failed to initialize Vimeo player:', error);
        }
      }, 200); // Increased delay to 200ms
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

  const toggleMute = (e: React.MouseEvent) => {
    // Prevent modal from opening when clicking to unmute
    e.stopPropagation();
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-screen overflow-hidden group cursor-none border-b border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(false, "");
      }}
      onClick={toggleMute}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Poster Image Fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${project.thumbnail})`,
            opacity: isLoaded ? 0 : 1 
          }}
        />
        <div ref={containerRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
      </div>

      {/* Mute/Unmute Indicator */}
      <div className="absolute top-10 right-10 z-20 bg-black/40 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isMuted ? (
          <VolumeX size={20} className="text-white" />
        ) : (
          <Volume2 size={20} className="text-white" />
        )}
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 z-10 pointer-events-none">
        <div className="max-w-[1800px] mx-auto w-full">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-white/60 mb-4"
          >
            {project.category}
          </motion.p>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-[8vw] font-bold tracking-tighter text-white leading-[0.85]"
          >
            {project.title}
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex items-center gap-6"
          >
            <span className="text-[10px] font-bold tracking-widest text-white/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {project.runtime}
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <div className="flex gap-4 pointer-events-auto">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(project);
                }}
                className="text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-white transition-colors px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-md"
              >
                View Details
              </button>
              {project.tags.map(tag => (
                <span key={tag} className="text-[9px] uppercase tracking-widest font-bold text-white/30 flex items-center">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursor, setCursor] = useState({ active: false, text: "" });
  const [activeFilter, setActiveFilter] = useState('All');

  const handleHover = React.useCallback((active: boolean, text: string) => {
    setCursor({ active, text });
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => {
        const category = project.category.toLowerCase();
        const filter = activeFilter.toLowerCase();
        
        if (filter === 'short film') {
          return category.includes('short film') || category.includes('trailer');
        }
        return category.includes(filter);
      });

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <FilmGrain />
      <CursorFollower active={cursor.active} text={cursor.text} />

      <main className="pt-40 pb-40">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          
          {/* Hero Section */}
          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-8xl md:text-[14vw] font-bold text-white tracking-tighter leading-[0.8] mb-12">
                Work
              </h1>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-white/10 pt-8">
                <p className="text-lg md:text-xl text-white/40 max-w-md font-medium leading-relaxed">
                  A selection of our latest films, commercials, and cinematic experiences.
                </p>
                <div className="flex gap-4">
                  {['All', 'Commercial', 'Music Video', 'Short Film'].map(filter => (
                    <button 
                      key={filter} 
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "text-[10px] uppercase tracking-widest font-bold transition-colors",
                        activeFilter === filter ? "text-white" : "text-white/40 hover:text-white"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Cinematic Reel Grid (Full Width) */}
          <section className="mb-40 -mx-6 md:-mx-12">
            <div className="flex flex-col">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index} 
                    onOpen={setSelectedProject}
                    onHover={handleHover}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Capabilities Strip */}
          <section className="py-20 border-y border-white/10 mb-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-between gap-10"
            >
              {['Commercial Films', 'Trailers', 'Motion Graphics', 'AI Production'].map((cap) => (
                <div key={cap} className="flex items-center gap-4 group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                  <span className="text-xl md:text-2xl font-bold text-white/40 group-hover:text-white transition-colors tracking-tight">
                    {cap}
                  </span>
                </div>
              ))}
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="py-40 border-t border-white/10 text-center">
            <Link to="/contact" className="group inline-block">
              <h2 className="text-7xl md:text-[10vw] font-bold tracking-tighter leading-[0.85] mb-12 group-hover:text-white/80 transition-colors">
                <span className="text-white/40 font-serif italic font-light">Got a project in mind?</span> <br />
                Let’s talk
              </h2>
              <div className="flex justify-center">
                <div className="circle-hero">
                  <div className="yellow-circle-hero">
                    <div className="blue-circle-hero" />
                  </div>
                </div>
              </div>
            </Link>
          </section>

          <footer className="pt-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex gap-8">
                <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Vimeo</a>
                <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">LinkedIn</a>
              </div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-white/20">
                © 2024 6Frame Studio. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <CinemaModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
