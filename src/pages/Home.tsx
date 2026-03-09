import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 'El Patron',
    title: 'El Patron',
    category: 'AI Film Trailer',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1154404778/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=d29d7127321c856c107613da77cebf0579f9f9c033120f26d5519a335704eed7',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd96d1a77e000b9bbbae_3_BOLS cocktails-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'The 27 Protocol',
    title: 'The 27 Protocol',
    category: 'AI Film Trailer',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1164958969/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=2e9eacb8e9e1f6e12b82309906984dd98a0df089a1fb64ab6a90ef073572fcb5',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecdd4ec61394f33311a88_1_Crisp TVC on Vimeo-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'The Thorne Recordings',
    title: 'The Thorne Recordings',
    category: 'AI Film Trailer',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1163094870/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=3299521bc24ad7f4a3efe5dc160d6f7afc443be64f4bf188ae4c71ed2a0099a2',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640eca40be4a447bbd64798c_2_Offline by Aerie TV ad for Dancing With Stars-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'America 250',
    title: 'American 250',
    category: 'National Interactive Experience',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1157653008/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=de3f5a203e29775fbcf683e3050ebf2a17916e354fbcbaba5164cf327ca0b66f',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecb56637b80fa605d299a_7_SALONI - F-W19-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'America F*ck Yeah!',
    title: 'America F*ck Yeah',
    category: 'Tesla Commercial',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1152657713/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=88f6fba20e22df9842a4241562aeace2486bca8c5ab191c7805a34b86f80e5f3',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ece24a521a5fcb86da1c7_6_TRACA \'People On The Sand\' Music video-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'Manifest Nueve',
    title: 'Manifest Nueve',
    category: 'Fragrance Commercial',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1127254270/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=661e477ace69b38971dac27971f9e364c65c3bc6c5b13de2d4ad7aef977a8070',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ea8b4062316b67616f46e_5_Swiss Arabian Campaign film-poster-00001.jpg',
    type: 'full'
  },
  {
    id: '1810 History Rewritten',
    title: '1810 History Rewritten',
    category: 'Hollywood Studio Series Trailer',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1126892819/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=1e7991bd2f53a519e962403f7711d6ab2c86801ad37abb3ded9765daace03bfa',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd5653155c1838650b64_4_Leica M11 x BTS on Vimeo-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'Mojave Signal',
    title: 'Mojave Signal',
    category: 'AI Film Short',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1164968116/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=c2e128c16fa9ac31b31484dbc252c2541deb048ea150eb5e82909e0155dfbb05',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecafd7577f69bc930067a_9_SAMSUNG \'Food pics made epic\' Spain-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'Belmont',
    title: 'Belmont',
    category: 'AI Horror Film Short',
    videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1134025084/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=7b6d9cf400d655a37b8c209332f32095ced07686cb959a1f99597b5d0b4966fe',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecaa9db18eb578a523d44_8_IRIEDAILY - Beware of the Monkey on Vimeo-poster-00001.jpg',
    type: 'full'
  }
];

interface ProjectCardProps {
  project: typeof PROJECTS[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
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
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${project.poster})`,
            opacity: isLoaded ? 0 : 1
          }}
        />
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleLoadedData}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="block-project-text">
        <h6 className="heading-project">{project.title}</h6>
        <div className="subheading-project">{project.category}</div>
      </div>

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

            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            <div className="frame-item frame-100">
              <div className="flex flex-col justify-between h-full py-20">
                <div className="flex flex-col items-center text-center gap-12 mt-20">
                  <Link to="/contact" className="group flex flex-col items-center gap-8">
                    <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] text-center">
                      <span className="text-span">Got a project in mind?</span> <br />
                      Let's talk
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
