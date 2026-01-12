
import React from 'react';
import { motion } from 'framer-motion';
import { SlideContent, AnimationType } from './types';

interface SlideProps {
  content: SlideContent;
  isActive: boolean;
  direction: number;
}

const CardStar = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className="text-white/30"
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  </motion.div>
);

const getVariants = (type: AnimationType) => {
  switch (type) {
    case 'corner-tl':
      return {
        initial: { x: -300, y: -300, opacity: 0, scale: 0.95, rotate: -2 },
        animate: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 },
        exit: { x: 300, y: 300, opacity: 0, scale: 0.95 }
      };
    case 'corner-br':
      return {
        initial: { x: 300, y: 300, opacity: 0, scale: 0.95, rotate: 2 },
        animate: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 },
        exit: { x: -300, y: -300, opacity: 0, scale: 0.95 }
      };
    case 'side-l':
      return {
        initial: { x: -200, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 200, opacity: 0 }
      };
    case 'side-r':
      return {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -200, opacity: 0 }
      };
    case 'zoom-in':
      return {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.1, opacity: 0 }
      };
    default:
      return {
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -40, opacity: 0 }
      };
  }
};

const Slide: React.FC<SlideProps> = ({ content, isActive }) => {
  const variants = getVariants(content.animationType);
  if (!isActive) return null;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", damping: 22, stiffness: 80 }}
      className="absolute inset-0 flex items-center justify-center px-4 py-20 md:p-12 lg:p-24"
    >
      <div className={`relative w-full max-w-6xl h-full max-h-[56vh] md:max-h-[80vh] bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col ${content.layoutType === 'split' ? 'md:flex-row' : ''}`}>
        
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20"><CardStar /></div>
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20"><CardStar /></div>

        {content.layoutType === 'focus' && (
          <div className="relative flex-1 flex flex-col h-full">
            <div className="absolute inset-0 z-0">
              <motion.img 
                key={content.image} // Force re-render on image change
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity }}
                src={content.image} 
                className="w-full h-full object-cover opacity-20 md:opacity-30 grayscale" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 md:p-20 h-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4 md:mb-8"
              >
                <div className="h-px w-12 bg-white/20 mx-auto mb-4"></div>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block">
                  {content.subtitle}
                </span>
              </motion.div>
              <h1 className="text-3xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 md:mb-8 leading-none tracking-tight">
                {content.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? "italic font-normal" : ""}>{word} </span>
                ))}
              </h1>
              <p className="text-[10px] md:text-lg text-white/40 max-w-xl font-light leading-relaxed uppercase tracking-widest">
                {content.description}
              </p>
            </div>
          </div>
        )}

        {content.layoutType === 'split' && (
          <>
            <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center space-y-4 md:space-y-10 z-10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-px bg-gradient-to-r from-white/40 to-transparent"></div>
                <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{content.subtitle}</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-display font-bold text-white leading-[1.1]">
                {content.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "italic font-normal" : ""}>{word} </span>
                ))}
              </h1>
              <p className="text-white/40 text-[10px] md:text-base leading-relaxed max-w-sm">
                {content.description}
              </p>
              {content.stats && (
                <div className="grid grid-cols-2 gap-8 pt-4">
                  {content.stats.map((stat, i) => (
                    <div key={i} className="border-l border-white/10 pl-4">
                      <div className="text-xl md:text-3xl font-display italic text-white">{stat.value}</div>
                      <div className="text-[6px] md:text-[8px] uppercase tracking-widest text-white/20 font-bold mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden md:block flex-1 relative overflow-hidden">
               <img 
                key={content.image}
                src={content.image} 
                className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-[10s] hover:scale-110" 
               />
               <div className="absolute inset-0 bg-gradient-to-l from-[#0d0d0d] to-transparent"></div>
            </div>
          </>
        )}

        {content.layoutType === 'modern' && (
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-1 relative overflow-hidden group">
               <img 
                key={content.image}
                src={content.image} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0d0d0d]"></div>
               <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
                  <h1 className="text-2xl md:text-6xl font-display font-bold text-white tracking-tighter">
                    {content.title} <span className="italic font-normal text-white/40">Perspective</span>
                  </h1>
               </div>
            </div>
            <div className="p-6 md:p-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/30 text-[9px] md:text-sm italic max-w-lg text-center md:text-left">
                "{content.description}"
              </p>
              <div className="flex gap-2">
                {content.features?.map((f, i) => (
                  <span key={i} className="px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/10 text-[6px] md:text-[9px] uppercase tracking-widest text-white/60 font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Slide;
