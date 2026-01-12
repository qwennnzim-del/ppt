
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlideContent, AnimationType } from '../types';

interface SlideProps {
  content: SlideContent;
  isActive: boolean;
  direction: number;
}

const getVariants = (type: AnimationType) => {
  switch (type) {
    case 'corner-tl':
      return {
        initial: { x: -500, y: -500, opacity: 0, scale: 0.9 },
        animate: { x: 0, y: 0, opacity: 1, scale: 1 },
        exit: { x: 500, y: 500, opacity: 0, scale: 0.9 }
      };
    case 'corner-br':
      return {
        initial: { x: 500, y: 500, opacity: 0, scale: 0.9 },
        animate: { x: 0, y: 0, opacity: 1, scale: 1 },
        exit: { x: -500, y: -500, opacity: 0, scale: 0.9 }
      };
    case 'side-l':
      return {
        initial: { x: -500, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 500, opacity: 0 }
      };
    case 'side-r':
      return {
        initial: { x: 500, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -500, opacity: 0 }
      };
    case 'zoom-in':
      return {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.2, opacity: 0 }
      };
    case 'fade-up':
    default:
      return {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -50, opacity: 0 }
      };
  }
};

const LiveWidget = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-3 right-3 md:top-8 md:right-8 p-1.5 md:p-4 bg-black/40 backdrop-blur-md rounded-lg md:rounded-2xl border border-white/10 shadow-2xl z-30">
      <div className="flex items-center space-x-1.5 mb-0.5 md:mb-1">
        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
        <span className="text-[6px] md:text-[9px] uppercase font-black tracking-widest text-cyan-400">Live</span>
      </div>
      <div className="text-[10px] md:text-xl font-mono font-bold text-white leading-none">
        {time}
      </div>
    </div>
  );
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
      transition={{ type: "spring", damping: 25, stiffness: 100 }}
      className="absolute inset-0 flex items-center justify-center px-4 py-24 md:p-8 lg:p-20"
    >
      <div className={`relative w-full max-w-7xl h-full max-h-[62vh] md:max-h-[85vh] bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col ${content.layoutType === 'split' ? 'md:flex-row' : ''}`}>
        
        {/* Layout Focus */}
        {content.layoutType === 'focus' && (
          <div className="relative flex-1 flex flex-col h-full">
            <div className="absolute inset-0 z-0">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
                src={content.image} 
                className="w-full h-full object-cover opacity-30 md:opacity-40 grayscale-[20%]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 flex flex-col justify-end p-6 md:p-20 h-full max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                 <span className={`px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] bg-gradient-to-r ${content.accent} text-white shadow-lg inline-block mb-3 md:mb-6`}>
                  {content.subtitle}
                </span>
                <h1 className="text-2xl md:text-6xl lg:text-8xl font-display font-bold text-white mb-3 md:mb-6 leading-[1.1] tracking-tight">
                  {content.title}
                </h1>
                <p className="text-xs md:text-xl text-white/60 leading-relaxed font-light max-w-2xl line-clamp-3 md:line-clamp-none">
                  {content.description}
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Layout Split */}
        {content.layoutType === 'split' && (
          <>
            <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col justify-center space-y-3 md:space-y-8 z-10">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <span className={`px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] bg-gradient-to-r ${content.accent} text-white shadow-lg inline-block`}>
                  {content.subtitle}
                </span>
              </motion.div>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                {content.title}
              </h1>
              <p className="text-white/50 text-xs md:text-lg leading-relaxed max-w-md line-clamp-2 md:line-clamp-none">
                {content.description}
              </p>
              
              {content.stats && (
                <div className="flex gap-4 md:gap-10 pt-1 md:pt-4">
                  {content.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-lg md:text-4xl font-bold text-white">{stat.value}</div>
                      <div className="text-[6px] md:text-[10px] uppercase tracking-widest text-white/30 font-bold">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden md:block flex-1 relative overflow-hidden group">
               <motion.img 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                src={content.image} 
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent"></div>
            </div>
            {/* Mobile Image (Smaller at bottom) */}
            <div className="md:hidden h-32 relative overflow-hidden shrink-0">
               <img src={content.image} className="w-full h-full object-cover grayscale-[30%]" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            </div>
          </>
        )}

        {/* Layout Modern */}
        {content.layoutType === 'modern' && (
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-1 relative overflow-hidden">
               <img src={content.image} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0a]"></div>
               <div className="absolute bottom-0 left-0 p-4 md:p-12 w-full">
                  <span className="text-[6px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block mb-0.5 md:mb-2">Subject Matter</span>
                  <h1 className="text-xl md:text-5xl lg:text-6xl font-display font-bold text-white">{content.title}</h1>
               </div>
            </div>
            <div className="p-4 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/[0.03] backdrop-blur-sm shrink-0">
              <p className="text-white/60 max-w-xl text-[10px] md:text-lg mb-3 md:mb-0 italic leading-relaxed line-clamp-2 md:line-clamp-none">
                "{content.description}"
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-4">
                {content.features?.map((f, i) => (
                  <span key={i} className="px-2 py-1 md:px-5 md:py-3 bg-white/10 rounded-md md:rounded-2xl text-[6px] md:text-xs font-bold text-white/80 border border-white/5 whitespace-nowrap">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <LiveWidget />
      </div>
    </motion.div>
  );
};

export default Slide;
