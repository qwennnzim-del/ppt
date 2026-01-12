
import React from 'react';
import { motion } from 'framer-motion';

// Use React.FC to properly handle reserved props like 'key' in TypeScript
const Star: React.FC<{ size: number; top: string; left: string; duration: number }> = ({ size, top, left, duration }) => (
  <motion.svg
    animate={{ rotate: 360, opacity: [0.2, 0.5, 0.2] }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
    style={{ top, left, width: size, height: size }}
    className="absolute text-white/20 pointer-events-none"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
  </motion.svg>
);

// Use React.FC to properly handle reserved props like 'key' in TypeScript
const Particle: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
    animate={{ y: '-10vh', opacity: [0, 0.3, 0] }}
    transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay, ease: "linear" }}
    className="absolute w-1 h-1 bg-white rounded-full blur-[1px] pointer-events-none"
  />
);

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]">
      {/* Ambient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-indigo-900/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-fuchsia-900/10 rounded-full blur-[100px]"
      />

      {/* Decorative Stars */}
      <Star size={24} top="15%" left="10%" duration={20} />
      <Star size={18} top="65%" left="85%" duration={25} />
      <Star size={12} top="80%" left="20%" duration={18} />
      <Star size={32} top="10%" left="80%" duration={30} />

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <Particle key={i} delay={i * 0.8} />
      ))}
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
