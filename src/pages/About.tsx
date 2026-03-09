import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Player from '@vimeo/player';

const revealVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const About = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    let player: Player | null = null;
    let isDestroyed = false;

    if (videoContainerRef.current) {
      player = new Player(videoContainerRef.current, {
        id: 1130711211,
        autoplay: true,
        loop: true,
        muted: true,
        responsive: true,
        controls: false,
        playsinline: true,
      });

      playerRef.current = player;
      
      player.ready().then(() => {
        if (!isDestroyed && isMounted.current && playerRef.current === player) {
          return player.play();
        }
      }).catch((err) => {
        // Silently handle expected errors during unmounting/destruction
        const errStr = String(err);
        const isExpectedError = isDestroyed || !isMounted.current || !err || 
                              errStr.includes('Unknown player') || 
                              errStr.includes('unloaded');
        
        if (!isExpectedError) {
          console.warn('Vimeo player error in About:', err);
        }
      });

      return () => {
        isDestroyed = true;
        isMounted.current = false;
        if (playerRef.current === player) {
          playerRef.current = null;
        }
        player.destroy().catch(() => {});
      };
    }
    return () => {
      isDestroyed = true;
      isMounted.current = false;
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const player = playerRef.current;
    if (player && isMounted.current) {
      player.ready().then(() => {
        if (isMounted.current && playerRef.current === player) {
          return player.getMuted();
        }
        throw new Error('Unloaded');
      }).then((muted) => {
        if (isMounted.current && playerRef.current === player) {
          const newMutedState = !muted;
          player.setMuted(newMutedState).catch(() => {});
          if (!newMutedState) {
            player.setVolume(1).catch(() => {});
          }
          setIsMuted(newMutedState);
        }
      }).catch((err) => {
        const errStr = String(err);
        const isExpectedError = !err || 
                              errStr.includes('Unknown player') || 
                              errStr.includes('unloaded') ||
                              errStr.includes('Unloaded');
        if (!isExpectedError) {
          console.warn('Error toggling mute in About:', err);
        }
      });
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {/* Hero Section with Fixed Parallax */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.6]"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000")',
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[18vw] font-bold tracking-tighter leading-none text-white drop-shadow-2xl"
          >
            About
          </motion.h1>
        </div>
      </div>

      {/* Scrolling Content Section - Slides OVER the hero */}
      <main className="relative z-10 bg-black pt-20 pb-20 px-2 md:px-4">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {/* Intro Section with Reveal */}
          <motion.section 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-40 border-t border-white/10 pt-16"
          >
            <div className="md:col-span-4">
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-white/40">Intro</span>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl md:text-4xl leading-[1.2] text-white tracking-tight font-medium">
                6Frame Studios creates cinematic films using advanced artificial intelligence and bold visual storytelling. The studio blends creative imagination with emerging technology to produce striking visuals and immersive narratives. From concept to final frame, every project explores new possibilities in digital filmmaking. The goal is simple: push the boundaries of what modern cinema can become.
              </p>
            </div>
          </motion.section>

          {/* Details Section with Reveal */}
          <motion.section 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-48"
          >
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold tracking-tight">Creative Vision and Innovation</h2>
            </div>
            <div className="md:col-span-8 space-y-10">
              <p className="text-xl text-white/50 leading-relaxed font-light">
                At 6Frame Studios, ideas are transformed into cinematic experiences through innovative AI-driven production. Every project begins with a concept and evolves into a fully realized visual world. The studio focuses on atmosphere, story, and powerful imagery, creating films that feel both futuristic and deeply human.
              </p>
              <p className="text-xl text-white/50 leading-relaxed font-light">
                The creative process combines technology and artistry, allowing filmmakers to build worlds that would once require massive production teams. Through this approach, 6Frame Studios continues to explore new forms of storytelling, redefining how films can be imagined, created, and experienced.
              </p>
            </div>
          </motion.section>

          {/* Infinite Scroll Section */}
          <section className="relative w-full overflow-hidden py-8 md:py-12 mb-48 -mx-2 md:-mx-4">
            <div className="flex whitespace-nowrap">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 60, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex items-center"
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-6xl md:text-[14vw] font-bold text-white tracking-tighter leading-none">
                      CLICK&nbsp;&nbsp;HERE
                    </span>
                    <div className="mx-8 md:mx-16 w-3 h-3 md:w-6 md:h-6 bg-[#FF6321] rounded-full shrink-0" />
                  </div>
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={i + 8} className="flex items-center">
                    <span className="text-6xl md:text-[14vw] font-bold text-white tracking-tighter leading-none">
                      CLICK&nbsp;&nbsp;HERE
                    </span>
                    <div className="mx-8 md:mx-16 w-3 h-3 md:w-6 md:h-6 bg-[#FF6321] rounded-full shrink-0" />
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Recognition & Creative Focus Section with Reveal */}
          <motion.section 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-48 border-t border-white/10 pt-16"
          >
            <div className="md:col-span-4">
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-white/40">Recognition & Creative Focus</span>
            </div>
            <div className="md:col-span-8">
              <div className="space-y-0">
                {[
                  'Cinematic AI Filmmaking',
                  'Visual Storytelling Innovation',
                  'Experimental Film & Narrative',
                  'AI-Driven Film Production',
                  'Next-Generation Digital Cinema'
                ].map(item => (
                  <div key={item} className="text-2xl md:text-3xl font-bold border-b border-white/10 py-8 first:pt-0 last:border-0 tracking-tight hover:pl-4 transition-all duration-300 cursor-default">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-48 mx-4 md:mx-12 h-[calc(60vh+96px)] md:h-[calc(90vh+96px)] overflow-hidden rounded-[2rem] md:rounded-[3rem] relative cursor-pointer group"
          onClick={toggleMute}
        >
          <div ref={videoContainerRef} className="background-video-container pointer-events-none" />
          
          {/* Audio Toggle Indicator */}
          <div className="absolute top-10 right-10 z-20 bg-black/40 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            )}
          </div>
        </motion.section>

        <div className="max-w-[1600px] mx-auto px-6 md:px-10">

          {/* CTA Section with Reveal */}
          <motion.section 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-32 border-t border-white/10 text-center"
          >
            <Link to="/contact" className="inline-block group">
              <motion.div whileHover={{ scale: 1.02 }}>
                <h2 className="text-4xl md:text-8xl font-bold mb-8 group-hover:text-white/70 transition-colors tracking-tighter leading-none">
                  Got a project in mind?<br />Let's talk
                </h2>
                <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold border-b border-white pb-1">
                  Contact Us
                </div>
              </motion.div>
            </Link>
          </motion.section>

          {/* Footer */}
          <footer className="mt-20 pt-12 border-t border-white/10">
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
    </div>
  );
};

export default About;

