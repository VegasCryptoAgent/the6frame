import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Navbar from '../components/Navbar';

const PROJECTS = [
  {
    id: 'bols',
    title: 'Bols',
    category: 'Cocktails Brand',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd96d1a77e000b9bbbae_3_BOLS cocktails-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd96d1a77e000b9bbbae_3_BOLS cocktails-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'crisp',
    title: 'Crisp',
    category: 'Commercial Ad',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecdd4ec61394f33311a88_1_Crisp TVC on Vimeo-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecdd4ec61394f33311a88_1_Crisp TVC on Vimeo-poster-00001.jpg',
    type: 'half'
  },
  {
    id: 'dancing',
    title: 'Dancing With Stars',
    category: 'Offline by Aerie TV',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640eca40be4a447bbd64798c_2_Offline by Aerie TV ad for Dancing With Stars-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640eca40be4a447bbd64798c_2_Offline by Aerie TV ad for Dancing With Stars-poster-00001.jpg',
    type: 'half'
  },
  {
    id: 'saloni',
    title: 'Saloni',
    category: 'Commercial Ad',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecb56637b80fa605d299a_7_SALONI - F-W19-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecb56637b80fa605d299a_7_SALONI - F-W19-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'people',
    title: 'People On The Sand',
    category: 'Music Video',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ece24a521a5fcb86da1c7_6_TRACA \'People On The Sand\' Music video-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ece24a521a5fcb86da1c7_6_TRACA \'People On The Sand\' Music video-poster-00001.jpg',
    type: 'half'
  },
  {
    id: 'swiss',
    title: 'Swiss Arabian',
    category: 'Campaign Film',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ea8b4062316b67616f46e_5_Swiss Arabian Campaign film-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ea8b4062316b67616f46e_5_Swiss Arabian Campaign film-poster-00001.jpg',
    type: 'half'
  },
  {
    id: 'leica',
    title: 'Leica M11',
    category: 'Behind the Scenes',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd5653155c1838650b64_4_Leica M11 x BTS on Vimeo-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecd5653155c1838650b64_4_Leica M11 x BTS on Vimeo-poster-00001.jpg',
    type: 'full'
  },
  {
    id: 'samsung',
    title: 'Samsung',
    category: 'Food Pics Made Epic',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecafd7577f69bc930067a_9_SAMSUNG \'Food pics made epic\' Spain-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecafd7577f69bc930067a_9_SAMSUNG \'Food pics made epic\' Spain-poster-00001.jpg',
    type: 'half'
  },
  {
    id: 'iriedaily',
    title: 'Iriedaily',
    category: 'Beware of the Monkey',
    video: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecaa9db18eb578a523d44_8_IRIEDAILY - Beware of the Monkey on Vimeo-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/640d124abc45fd23e3362055/640ecaa9db18eb578a523d44_8_IRIEDAILY - Beware of the Monkey on Vimeo-poster-00001.jpg',
    type: 'half'
  }
];

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => {
  return (
    <div className={project.type === 'full' ? 'frame-item frame-100' : 'frame-item frame-50'}>
      <div className="background-video-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster={project.poster}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      </div>
      <div className="block-project-text">
        <h6 className="heading-project">{project.title}</h6>
        <div className="subheading-project">{project.category}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83%"]);

  return (
    <div className="bg-[#0a0a0a] font-sans selection:bg-white selection:text-black">
      
      <div ref={containerRef} className="horizontal-container">
        <div className="sticky-wrapper">
          <motion.div style={{ x }} className="scrolling-frame">
            
            {/* Hero Section */}
            <div className="frame-item frame-hero">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <h1 className="heading-hero-large">
                    Witness the <br />
                    <span className="serif font-bold">Power</span> <span className="text-span">of Visual</span> <br />
                    <span className="serif">Storytelling</span>
                  </h1>
                  <p className="paragraph-hero">
                    Experienced high-end film director and writer based in Los Angeles.
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/80">Show more</div>
                  <div className="circle-hero">
                    <div className="yellow-circle-hero">
                      <div className="blue-circle-hero" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <ProjectCard project={PROJECTS[0]} />
            
            <div className="frame-item frame-50">
              <div className="grid grid-cols-1 gap-8 h-full">
                <ProjectCard project={PROJECTS[1]} />
                <ProjectCard project={PROJECTS[2]} />
              </div>
            </div>

            <ProjectCard project={PROJECTS[3]} />

            <div className="frame-item frame-50">
              <div className="grid grid-cols-1 gap-8 h-full">
                <ProjectCard project={PROJECTS[4]} />
                <ProjectCard project={PROJECTS[5]} />
              </div>
            </div>

            <ProjectCard project={PROJECTS[6]} />

            <div className="frame-item frame-50">
              <div className="grid grid-cols-1 gap-8 h-full">
                <ProjectCard project={PROJECTS[7]} />
                <ProjectCard project={PROJECTS[8]} />
              </div>
            </div>

            {/* CTA Section */}
            <div className="frame-item frame-100">
              <div className="flex flex-col justify-between h-full py-20">
                <div className="flex flex-col items-center text-center gap-12 mt-20">
                  <a href="#" className="group flex flex-col items-center gap-8">
                    <h2 className="text-7xl font-bold tracking-tighter leading-tight">
                      <span className="text-span">Got a project in mind?</span> <br />
                      Let’s talk
                    </h2>
                    <div className="circle-hero">
                      <div className="yellow-circle-hero">
                        <div className="blue-circle-hero" />
                      </div>
                    </div>
                  </a>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/10 pt-12">
                  <div className="flex gap-8">
                    <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Powered by Webflow</a>
                    <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Made by Maxim W.</a>
                  </div>
                  <div className="flex gap-8">
                    <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Licensing</a>
                    <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Style Guide</a>
                    <a href="#" className="text-[11px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Changelog</a>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
