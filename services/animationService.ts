
/**
 * Animation orchestration helpers for high-fidelity transitions
 */
export const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

export const slowSpring = {
  type: "spring",
  stiffness: 100,
  damping: 30
};

export const staggerItems = (index: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay: 0.5 + (index * 0.1)
    }
  }
});
