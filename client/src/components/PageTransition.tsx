import { motion } from "framer-motion";
import React from "react";
import GradientBackground from "./GradientBackground";

interface PageTransitionProps {
  children: React.ReactNode;
  showBackground?: boolean;
}

// Animation variants for consistent page transitions
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Animation variants for children elements
const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export { childVariants };

export default function PageTransition({ children, showBackground = true }: PageTransitionProps) {
  return (
    <motion.div
      className="min-h-screen w-full relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {showBackground && <GradientBackground className="fixed inset-0 z-0" />}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}