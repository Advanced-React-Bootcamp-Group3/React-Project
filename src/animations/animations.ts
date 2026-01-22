export const durations = {
  fast: 0.2,
  normal: 0.3,
} as const;

export const easings = {
  easeOut: [0.16, 1, 0.3, 1] as const,
} as const;

export const productCardAnimations = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
  transition: {
    duration: durations.normal,
    ease: easings.easeOut,
  },
  staggerDelay: 0.05,
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.fast,
    },
  },
} as const;

export const pageTransitions = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: durations.normal,
    },
  },
} as const;

export const getStaggerDelay = (
  index: number,
  delay: number = productCardAnimations.staggerDelay
): number => {
  return index * delay;
};
