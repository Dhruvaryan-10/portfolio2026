export const opacity = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 }
  }
};

// Animate with transform (not "top") so the exit doesn't count as layout shift
export const slideUp = {
  initial: {
    y: 0
  },
  exit: {
    y: '-100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};