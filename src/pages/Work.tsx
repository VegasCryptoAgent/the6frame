import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Play, X, Volume2, VolumeX, Maximize2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data Model ---
const PROJECTS = [
  {
    id: 'crisp',
    title: 'Crisp',
    category: 'Commercial Ad',
    description: 'A high-energy commercial for the modern tech enthusiast.',
    previewVideo: 'https://player.vimeo.com/external/639635624.hd.mp4?s=73abd7e9e58bc0d81c0fcc5197236c91671253fe&profile_id=175',
    image: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecdd4ec61394f33311a88_1_Crisp TVC on Vimeo-poster-00001.jpg',
    videoUrl: 'https://vimeo.com/639635624',
    tags: ['Direction', 'Edit', 'Color'],
    runtime: ':30',
    size: 'large' // for masonry logic
  },
  {
    id: 'dancing',
    title: 'Dancing With Stars',
    category: 'Offline by Aerie TV',
    description: 'Capturing the rhythm and soul of the dance floor.',
    previewVideo: 'https://player.vimeo.com/external/677792486.hd.mp4?s=896b7792119a1502c6a3d4d30d0d0f19835ca256&profile_id=175',
    image: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640eca40be4a447bbd64798c_2_Offline by Aerie TV ad for Dancing With Stars-poster-00001.jpg',
    videoUrl: 'https://vimeo.com/677792486',
    tags: ['VFX', 'AI', 'Sound'],
    runtime: ':60',
    size: 'small'
  },
  {
    id: 'bols',
    title: 'Bols',
    category: 'Cocktails Brand',
    description: 'A vibrant journey through the world of craft cocktails.',
    previewVideo: 'https://player.vimeo.com/external/640277204.hd.mp4?s=b484d0d74f1059444771b19a15b8d796ddfd2e87&profile_id=175',
    image: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd96d1a77e000b9bbbae_3_BOLS cocktails-poster-00001.jpg',
    videoUrl: 'https://vimeo.com/640277204',
    tags: ['Direction', 'Color'],
    runtime: ':15',
    size: 'medium'
  },
  {
    id: 'people',
    title: 'People On The Sand',
    category: 'Music Video',
    description: 'An ethereal music video exploring human connection.',
    previewVideo: 'https://player.vimeo.com/external/127126984.hd.mp4?s=b2affdd84a895ac753a19051197c7d881fd92f38&profile_id=174',
    image: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ece24a521a5fcb86da1c7_6_TRACA \'People On The Sand\' Music video-poster-00001.jpg',
    videoUrl: 'https://vimeo.com/127126984',
    tags: ['Edit', 'Sound Design'],
    runtime: '3:45',
    size: 'large'
  },
  {
    id: 'swiss',
    title: 'Swiss Arabian',
    category: 'Campaign Film',
    description: 'Luxury and tradition blended into a cinematic experience.',
    previewVideo: 'https://player.vimeo.com/external/694553938.hd.mp4?s=dfeee0484f0e5af43355e8cf1deb35682a23e45c&profile_id=175',
    image: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ea8b4062316b67616f46e_5_Swiss Arabian Campaign film-poster-00001.jpg',
    videoUrl: 'https://vimeo.com/694553938',
    tags: ['Direction', 'AI Production'],
    runtime: ':45',
    size: 'medium'
  },
  {
    id: 'leica',
    title: 'Leica M11',
    category: 'Behind the Scenes',
    description: 'The art of photography through the lens of a legend.',
    previewVideo: 'https://player.vimeo.com/external/694744429.hd.mp4?s=8fd7fcdf64bd4d20ccf5e6c392196bab0d6a8a98&profile_id=175',
    image: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecb56637b80fa605d299a_7_SALONI - F-W19-poster-00001.jpg',
    videoUrl: 'https://vimeo.com/694744429',
    tags: ['Documentary', 'Edit'],
    runtime: '2:15',
    size: 'small'
  },
  {
    id: 'saloni',
    title: 'Saloni',
    category: 'Commercial Ad',
    description: 'Fashion forward storytelling for the modern woman.',
    previewVideo: 'https://player.vimeo.com/external/375618716.hd.mp4?s=ee3f6e900db8f9f415ab9667103a6857e197a374&profile_id=174',
    image: 'https://i.vimeocdn.com/video/834446228-ee3f6e900db8f9f415ab9667103a6857e197a374bb3375d2ea1222c0ff8438b3-d_1280',
    videoUrl: 'https://vimeo.com/375618716',
    tags: ['Direction', 'VFX'],
    runtime: ':30',
    size: 'large'
  },
  {
    id: 'iriedaily',
    title: 'Iriedaily',
    category: 'Beware of the Monkey',
    description: 'Streetwear culture meets cinematic grit.',
    previewVideo: 'https://player.vimeo.com/external/669829484.hd.mp4?s=a7b014d23cfa02a30c11840746df4f33440e2ae2&profile_id=175',
    image: 'https://i.vimeocdn.com/video/1467986151-a7b014d23cfa02a30c11840746df4f33440e2ae24aa58ad33fc1140a8ec57473-d_1280',
    videoUrl: 'https://vimeo.com/669829484',
    tags: ['Edit', 'Color', 'Sound'],
    runtime: ':60',
    size: 'medium'
  },
  {
    id: 'samsung',
    title: 'Samsung',
    category: 'Food Pics Made Epic',
    description: 'Elevating the everyday through visual storytelling.',
    previewVideo: 'https://player.vimeo.com/external/651570727.hd.mp4?s=00714a50498f6bafeff99be07a2824ba1d1b04d8&profile_id=175',
    image: 'https://i.vimeocdn.com/video/1314630025-00714a50498f6bafeff99be07a2824ba1d1b04d8a1b49db7fc59a6e08785a33f-d_1280',
    videoUrl: 'https://vimeo.com/651570727',
    tags: ['Direction', 'AI'],
    runtime: ':15',
    size: 'small'
  }
];

// --- Components ---

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] overflow-hidden">
    <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
  </div>
);

const CursorFollower = ({ activeProject }: { activeProject: any }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 150 };
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
      style={{ x, y, translateX: 20, translateY: 20 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: activeProject ? 1 : 0.9, 
        opacity: activeProject ? 1 : 0 
      }}
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden lg:block"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest font-black text-white">
          Watch Film
        </span>
        {activeProject?.runtime && (
          <span className="text-[10px] text-white/40 font-mono">
            {activeProject.runtime}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const CinemaModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10001] bg-black flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute top-8 right-8 z-10 flex gap-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="w-full max-w-7xl aspect-video relative rounded-2xl overflow-hidden shadow-2xl shadow-white/5">
        <iframe
          src={`${project.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}?autoplay=1&muted=${isMuted ? 1 : 0}&background=0`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          title={project.title}
        />
      </div>

      <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/40 mb-2">{project.category}</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">{project.title}</h2>
          <p className="text-lg text-white/60 leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WorkItem = ({ project, onOpen, onHover }: { project: any; onOpen: () => void; onHover: (p: any) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, project.size === 'large' ? -30 : -15]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      onClick={onOpen}
      className={cn(
        "group relative cursor-none overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-900/50",
        project.size === 'large' ? "aspect-[4/5] md:aspect-[3/4]" : 
        project.size === 'medium' ? "aspect-square" : "aspect-[16/9]"
      )}
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[110%] -top-[5%]">
        {project.previewVideo ? (
          <video
            src={project.previewVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
        <motion.div
          initial={false}
          animate={{ y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-white/50 mb-2">
            {project.category}
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter leading-none">
            {project.title}
          </h3>
        </motion.div>
      </div>

      {project.runtime && (
        <div className="absolute top-6 right-6 px-2 py-1 bg-black/40 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-white/60">
          {project.runtime}
        </div>
      )}
    </motion.div>
  );
};

// --- Main Page ---

export default function Work() {
  const [activeProject, setActiveProject] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const featuredProject = PROJECTS[0];

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />
      <GrainOverlay />
      <CursorFollower activeProject={activeProject} />

      <AnimatePresence>
        {selectedProject && (
          <CinemaModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 md:px-12 max-w-[1800px] mx-auto">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-8xl md:text-[14vw] font-bold text-white tracking-tighter leading-[0.8] mb-8"
            >
              Work
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl text-white/40 max-w-2xl font-medium tracking-tight"
            >
              Films, commercials, trailers, and AI-driven visual experiences.
            </motion.p>
          </div>
        </section>

        {/* Featured Project Row */}
        <section className="px-6 md:px-12 mb-32 max-w-[1800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="group relative aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer"
            onClick={() => setSelectedProject(featuredProject)}
          >
            <video
              src={featuredProject.previewVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-white/50 mb-4">Featured Project</p>
              <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8">{featuredProject.title}</h2>
              <button className="flex items-center gap-4 px-8 py-4 bg-white rounded-full text-black text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">
                View Featured <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Cinematic Reel Grid (Masonry) */}
        <section className="px-6 md:px-12 mb-40 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 md:gap-10">
              {PROJECTS.filter((_, i) => i % 3 === 0).map((project) => (
                <WorkItem 
                  key={project.id} 
                  project={project} 
                  onOpen={() => setSelectedProject(project)}
                  onHover={setActiveProject}
                />
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-6 md:gap-10 mt-0 md:mt-20">
              {PROJECTS.filter((_, i) => i % 3 === 1).map((project) => (
                <WorkItem 
                  key={project.id} 
                  project={project} 
                  onOpen={() => setSelectedProject(project)}
                  onHover={setActiveProject}
                />
              ))}
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-6 md:gap-10 mt-0 lg:mt-40">
              {PROJECTS.filter((_, i) => i % 3 === 2).map((project) => (
                <WorkItem 
                  key={project.id} 
                  project={project} 
                  onOpen={() => setSelectedProject(project)}
                  onHover={setActiveProject}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Strip */}
        <section className="py-20 border-y border-white/5 bg-zinc-950/50 mb-40">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-8">
            {['Commercial Films', 'Trailers', 'Motion Graphics', 'AI Production'].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-sm md:text-lg uppercase tracking-[0.2em] font-bold text-white/40">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Client / Credibility */}
        <section className="px-6 md:px-12 mb-40 max-w-[1800px] mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.5em] font-bold text-white/20 mb-12">Trusted by Global Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12 opacity-20 grayscale">
            {/* Using text for logos to keep it minimal and monochrome */}
            {['SAMSUNG', 'LEICA', 'AERIE', 'SWISS ARABIAN', 'SALONI'].map((client) => (
              <span key={client} className="text-2xl md:text-4xl font-black tracking-tighter">{client}</span>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 md:px-12 pb-40 max-w-[1800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-[10vw] font-bold text-white tracking-tighter leading-[0.85] mb-12">
              Create Something<br />Cinematic
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button className="px-12 py-6 bg-white rounded-full text-black text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                Start a Project
              </button>
              <button className="px-12 py-6 border border-white/20 rounded-full text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                Contact
              </button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-12 py-12 border-t border-white/5 max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-12">
              {['Instagram', 'Vimeo', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="text-[10px] uppercase tracking-widest font-bold text-white/30 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-white/10">
              © 2026 6Frame Studios. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
