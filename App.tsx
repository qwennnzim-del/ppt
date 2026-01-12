
import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SLIDES as INITIAL_SLIDES } from './constants';
import { SlideContent } from './types';
import Slide from './Slide';
import AnimatedBackground from './AnimatedBackground';
import Editor from './Editor';

const GlitchFooter: React.FC = () => {
  return (
    <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center group"
      >
        <span className="text-[9px] md:text-[11px] font-black tracking-[0.8em] text-white/20 group-hover:text-white/60 transition-all duration-700 uppercase">
          HEZELL <span className="italic font-light">Atelier</span>
        </span>
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-3 group-hover:w-16 transition-all duration-700"></div>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [slides, setSlides] = useState<SlideContent[]>(() => {
    const saved = localStorage.getItem('hzel_ppt_data');
    return saved ? JSON.parse(saved) : INITIAL_SLIDES;
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('hzel_ppt_data', JSON.stringify(slides));
  }, [slides]);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  }, [slides.length]);

  const updateCurrentSlide = (updatedSlide: SlideContent) => {
    const newSlides = [...slides];
    newSlides[currentIndex] = updatedSlide;
    setSlides(newSlides);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return;
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, isEditing]);

  return (
    <main className="relative h-screen w-screen bg-[#050505] overflow-hidden select-none flex flex-col font-sans">
      <AnimatedBackground />

      {/* Elegant Header */}
      <header className="fixed top-0 left-0 right-0 p-6 md:p-12 z-40 flex justify-between items-center pointer-events-none">
        <div className="flex items-center space-x-4 pointer-events-auto">
          <div className="relative group">
            <div className="w-8 h-8 md:w-10 md:h-10 border border-white/20 rotate-45 flex items-center justify-center group-hover:border-white/60 transition-colors duration-500">
               <div className="w-4 h-4 md:w-5 md:h-5 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-white">HZEL</span>
            <span className="text-[7px] md:text-[8px] font-medium text-white/30 tracking-[0.3em] uppercase">Creative CMS</span>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2 pointer-events-auto">
          <div className="flex space-x-1">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ 
                  width: i === currentIndex ? 24 : 4,
                  backgroundColor: i === currentIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)"
                }}
                className="h-[2px] rounded-full transition-all duration-500"
              />
            ))}
          </div>
          <span className="text-[8px] md:text-[9px] font-mono text-white/20 tracking-widest">
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      {/* Content Area */}
      <div className="relative flex-1">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <Slide 
            key={currentIndex}
            content={slides[currentIndex]}
            isActive={true}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* Minimal Controls */}
      <div className="fixed bottom-6 md:bottom-12 left-0 right-0 px-8 md:px-16 z-40 flex justify-between items-center pointer-events-none">
        <div className="flex space-x-6 pointer-events-auto items-center">
           <button
            onClick={() => paginate(-1)}
            className="group flex items-center space-x-2 text-white/30 hover:text-white transition-colors duration-300"
          >
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Prev</span>
            <div className="w-6 h-px bg-white/10 group-hover:w-10 group-hover:bg-white transition-all duration-300"></div>
          </button>
          
          {/* Edit Toggle Button */}
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-500 ${isEditing ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/40'}`}
          >
            <motion.div
              animate={isEditing ? { rotate: 90 } : { rotate: 0 }}
              className="w-3 h-3"
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" /></svg>
            </motion.div>
            <span className="text-[9px] font-black uppercase tracking-widest">{isEditing ? 'Close Editor' : 'Edit Slide'}</span>
          </button>

          <button
            onClick={() => paginate(1)}
            className="group flex items-center space-x-2 text-white/30 hover:text-white transition-colors duration-300"
          >
            <div className="w-6 h-px bg-white/10 group-hover:w-10 group-hover:bg-white transition-all duration-300"></div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Next</span>
          </button>
        </div>

        <div className="hidden md:block pointer-events-auto">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right"
          >
            <div className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/20 mb-1">Current Subject</div>
            <div className="text-sm font-display italic text-white/60">
              {slides[currentIndex].title}
            </div>
          </motion.div>
        </div>
      </div>

      <GlitchFooter />

      {/* Side Editor Panel */}
      <AnimatePresence>
        {isEditing && (
          <Editor 
            slide={slides[currentIndex]} 
            onUpdate={updateCurrentSlide} 
            onClose={() => setIsEditing(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-12 opacity-20">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
        <div className="[writing-mode:vertical-lr] text-[7px] uppercase tracking-[0.8em] font-bold rotate-180">AUTONOMOUS_SYSTEM</div>
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>
    </main>
  );
};

export default App;
