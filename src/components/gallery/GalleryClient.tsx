"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function GalleryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const transforms = [y1, y2, y3];
  const photos = [
    "/images/photos/Atmosphere.jpg",
    "/images/photos/atmosphere2.jpg",
    "/images/photos/atmosphere3.jpg",
    "/images/photos/atmosphere4.jpg",
    "/images/photos/atmosphere5.jpg",
    "/images/photos/atmosphere7.jpg",
    "/images/photos/environment-01.jpg",
    "/images/photos/environment-05.jpg",
    "/images/photos/environment-06.jpg",
  ];

  return (
    <div ref={containerRef} className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8 py-12">
      {photos.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: (index % 3) * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ y: transforms[index % 3] }}
          className="relative rounded-2xl overflow-hidden group break-inside-avoid bg-[var(--color-surface)] will-change-transform"
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            src={src}
            alt={`Cafe Aarko Environment ${index + 1}`}
            className="w-full h-auto object-cover block"
          />
        </motion.div>
      ))}
    </div>
  );
}
