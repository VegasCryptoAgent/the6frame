import React from 'react';
import { motion } from 'motion/react';

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
                Nulla sed faucibus sit enim diam etiam porttitor augue vestibulum. Fermentum mi diam vulputate massa ipsum elit interdum. Amet morbi in in ac nullam. A eget augue est integer morbi scelerisque a sed porttitor. Nulla est viverra ut venenatis sagittis arcu.
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
              <h2 className="text-3xl font-bold tracking-tight">Pharetra venenatis integer</h2>
            </div>
            <div className="md:col-span-8 space-y-10">
              <p className="text-xl text-white/50 leading-relaxed font-light">
                Condimentum enim ut nunc, sed magna scelerisque quam nec. Ullamcorper ullamcorper sed erat enim. Pellentesque sit nibh faucibus nunc amet hendrerit rhoncus, phasellus eros. Tincidunt blandit sed sagittis, lectus massa ipsum cras vestibulum. Ac aliquet et, venenatis massa in.
              </p>
              <p className="text-xl text-white/50 leading-relaxed font-light">
                At consectetur ullamcorper in integer quam viverra. Pharetra venenatis integer in dignissim aenean vivamus non id. Ultrices pharetra tellus id sed aliquam faucibus. Tincidunt laoreet amet sodales etiam. Convallis tincidunt id nam auctor. Sit velit, molestie nunc.
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

          {/* Awards Section with Reveal */}
          <motion.section 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-48 border-t border-white/10 pt-16"
          >
            <div className="md:col-span-4">
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-white/40">Awards</span>
            </div>
            <div className="md:col-span-8">
              <div className="space-y-0">
                {[
                  'National Film Awards',
                  'London Film Critics Circle',
                  'Gotham Awards',
                  'Cannes Film Festival',
                  'Louis Delluc Prize'
                ].map(award => (
                  <div key={award} className="text-2xl md:text-3xl font-bold border-b border-white/10 py-8 first:pt-0 last:border-0 tracking-tight hover:pl-4 transition-all duration-300 cursor-default">
                    {award}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Bottom Image Section with Fixed Parallax */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-48 w-full h-[50vh] md:h-[80vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] relative"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2000")',
                backgroundAttachment: 'fixed'
              }}
            />
          </motion.section>

          {/* CTA Section with Reveal */}
          <motion.section 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-32 border-t border-white/10 text-center"
          >
            <motion.a 
              href="#"
              whileHover={{ scale: 1.02 }}
              className="inline-block group"
            >
              <h2 className="text-4xl md:text-8xl font-bold mb-8 group-hover:text-white/70 transition-colors tracking-tighter leading-none">
                Got a project in mind?<br />Let's talk
              </h2>
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold border-b border-white pb-1">
                Contact Us
              </div>
            </motion.a>
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

