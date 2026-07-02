"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Link from "next/link";

const heroSlides = [
  { 
    headline: "Bold Flavours. Warm Hospitality. Every Visit.", 
    divider: "DINE-IN · DRIVE-THROUGH · DELIVERY",
    bg: "/images/photos/bg_1.jpg"
  },
  { 
    headline: "Twenty-Three Cuisines. One Kitchen.", 
    divider: "PIZZA · BIRIYANI · STEAK · MORE",
    bg: "/images/photos/bg_2.jpg"
  }
];

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 250]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-[var(--color-background)]"
      id="hero"
    >
      {/* Background Images Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
          style={{ scale: bgScale, opacity: bgOpacity }}
        >
          <motion.div
             initial={{ scale: 1.15 }}
             animate={{ scale: 1.0 }}
             transition={{ duration: 6.5, ease: "linear" }}
             className="w-full h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSlides[currentBg].bg}
              alt="Cafe Aarko Environment"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#120E0C]/35 via-[#120E0C]/55 to-[#120E0C]/90" />

      {/* Content */}
      <motion.div 
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative z-10 container mx-auto px-[6vw] flex flex-col items-center text-center mt-8 h-full justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-body font-bold text-[11px] tracking-[0.16em] text-[var(--color-brand)] border border-[rgba(227,162,60,0.55)] px-4 py-1.5 rounded-full mb-6 uppercase"
        >
          Cafe Aarko Restaurant
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${currentBg}`}
            className="font-display font-semibold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.01em] text-white max-w-[900px]"
          >
            {heroSlides[currentBg].headline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`divider-${currentBg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 my-7 text-[var(--color-brand-soft)] text-xs tracking-[0.14em] font-semibold uppercase"
          >
            <span className="w-12 h-[1px] bg-[rgba(227,162,60,0.5)]" />
            {heroSlides[currentBg].divider}
            <span className="w-12 h-[1px] bg-[rgba(227,162,60,0.5)]" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`ctas-${currentBg}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex flex-row items-center gap-3.5"
          >
            <Link
              href="/menu"
              className="bg-[var(--color-brand)] text-[#2A1B06] px-6 py-3.5 rounded-[var(--radius-sm)] text-[14px] font-semibold hover:bg-[var(--color-brand-soft)] transition-all flex items-center gap-2 active:scale-97"
            >
              View menu
            </Link>
            <a
              href="https://foodpanda.com.bd/restaurant/s3ch/cafe-aarko"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[rgba(245,239,230,0.35)] text-[var(--color-text)] bg-transparent px-6 py-3.5 rounded-sm text-[14px] font-semibold hover:bg-[#D70F64] hover:border-[#D70F64] hover:text-white transition-all active:scale-97"
            >
              Order on FoodPanda ↗
            </a>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentBg(i)}
            className={`h-2 transition-all duration-300 ${
              currentBg === i ? "w-6.5 rounded bg-[var(--color-brand)]" : "w-2 rounded-full bg-[rgba(245,239,230,0.35)]"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`scroll-${currentBg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 text-[10.5px] tracking-[0.14em] text-[var(--color-text-muted)]"
        >
          SCROLL
          <motion.svg 
            animate={{ y: [0, 5, 0] }} 
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-3.5 h-3.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.7"
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
