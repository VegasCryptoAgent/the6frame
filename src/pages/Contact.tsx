import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

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

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formState.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formState);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after success
    setFormState({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <FilmGrain />

      <main className="pt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[calc(100vh-200px)]">
            
            {/* Left Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center py-12 lg:pr-20"
            >
              <div className="mb-16">
                <h1 className="text-7xl md:text-8xl font-bold text-white tracking-tight leading-[0.95]">
                  Let’s make<br />
                  <span className="serif italic font-light text-white/90">something together.</span>
                </h1>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-12 max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-white/20">Name</label>
                    <input
                      type="text"
                      className={`bg-transparent border-b py-2 text-white focus:outline-none transition-colors ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-white/40'}`}
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-medium uppercase tracking-wider">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-white/20">Email</label>
                    <input
                      type="email"
                      className={`bg-transparent border-b py-2 text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-white/40'}`}
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({ ...formState, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-medium uppercase tracking-wider">{errors.email}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-white/20">Message</label>
                  <textarea
                    rows={1}
                    className={`bg-transparent border-b py-2 text-white focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-white/40'}`}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                  />
                  {errors.message && <span className="text-[10px] text-red-500 font-medium uppercase tracking-wider">{errors.message}</span>}
                </div>

                <div className="mt-4 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-[#111111] hover:bg-[#161616] text-white rounded-[2rem] font-bold text-sm transition-all border border-white/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : 'Submit'}
                  </button>
                  
                  {isSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4 bg-green-500/10 border border-green-500/20 rounded-2xl"
                    >
                      <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Message sent successfully</span>
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Right Column: Contact Cards Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 grid-rows-2 gap-4"
            >
              <a 
                href="mailto:lvbretteam@gmail.com"
                className="group relative bg-[#111111] rounded-[2.5rem] p-12 flex flex-col justify-end hover:bg-[#22c55e] transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10">
                  <h4 className="text-5xl font-bold text-white group-hover:text-black tracking-tight transition-colors duration-500">Email</h4>
                </div>
              </a>

              <a 
                href="https://www.instagram.com/6framestudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#111111] rounded-[2.5rem] p-12 flex flex-col justify-end hover:bg-[#ff6321] transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10">
                  <h4 className="text-5xl font-bold text-white group-hover:text-black tracking-tight transition-colors duration-500">Instagram</h4>
                </div>
              </a>

              <a 
                href="https://twitter.com/6framestudios"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#111111] rounded-[2.5rem] p-12 flex flex-col justify-end hover:bg-[#0047ff] transition-all duration-500 overflow-hidden col-span-2"
              >
                <div className="relative z-10">
                  <h4 className="text-5xl font-bold text-white tracking-tight transition-colors duration-500">Twitter</h4>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
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
  );
}
