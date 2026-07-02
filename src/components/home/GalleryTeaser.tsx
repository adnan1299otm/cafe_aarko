"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GalleryTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Staggered parallax for gallery images - softened for premium feel
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y4 = useTransform(scrollYProgress, [0, 1], [110, -110]);
  
  const transforms = [y1, y2, y3, y4];

  const images = [
    "/images/photos/Atmosphere.jpg",
    "/images/photos/atmosphere2.jpg",
    "/images/photos/atmosphere3.jpg",
    "/images/photos/atmosphere4.jpg",
    "/images/photos/atmosphere5.jpg",
    "/images/photos/atmosphere7.jpg",
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[var(--color-surface)] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[1px] bg-[var(--color-brand)]" />
              <span className="text-[var(--color-brand)] uppercase tracking-widest text-sm font-medium">Atmosphere</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl text-[var(--color-text)]"
            >
              Step Into Our World
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[var(--color-brand)] hover:text-[var(--color-brand-soft)] transition-colors font-medium border-b border-[var(--color-brand)]/30 hover:border-[var(--color-brand)] pb-1">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="columns-2 lg:columns-4 gap-6 md:gap-8 pt-12 pb-12 space-y-6 md:space-y-8">
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              style={{ y: transforms[index % 4] }}
              className="group relative overflow-hidden rounded-2xl break-inside-avoid will-change-transform"
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={src}
                alt={`Cafe Aarko Atmosphere ${index + 1}`}
                className="w-full h-auto object-cover block"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
