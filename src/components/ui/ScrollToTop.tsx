"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollY / docHeight : 0;

      setVisible(scrollY > 400);
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // Use native smooth scroll — Lenis intercepts and smooths it automatically
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG ring dimensions
  const size = 48;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="fixed bottom-8 right-6 z-40 group"
        >
          {/* Glassmorphism backdrop */}
          <span className="absolute inset-0 rounded-full glass group-hover:border-[var(--color-brand)]/40 transition-colors duration-300" />

          {/* Progress ring SVG */}
          <svg
            width={size}
            height={size}
            className="relative block rotate-[-90deg]"
            aria-hidden="true"
          >
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(245,239,230,0.08)"
              strokeWidth={strokeWidth}
            />
            {/* Animated progress arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-[stroke-dashoffset] duration-100"
            />
          </svg>

          {/* Arrow icon — centred over the ring */}
          <span className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] transition-colors duration-300">
            <motion.span
              animate={{ y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </motion.span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
