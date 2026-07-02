"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 bg-[var(--color-surface)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-[var(--color-brand)]" />
              <span className="text-[var(--color-brand)] uppercase tracking-widest text-sm font-medium">Our Story</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-display text-4xl md:text-5xl text-[var(--color-text)] mb-8 leading-tight"
            >
              A Legacy of Flavor, <br />
              <span className="italic text-[var(--color-text-muted)]">Rooted in Sylhet</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-6"
            >
              Since our inception, Cafe Aarko has been more than just a restaurant—it&apos;s a gathering place where culinary tradition meets modern execution. Our chefs meticulously select the finest ingredients to craft dishes that resonate with both local heritage and international standards.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-[var(--color-text-muted)] text-lg leading-relaxed"
            >
              Whether you&apos;re here for a quiet morning coffee, a lively family dinner, or a celebration with friends, our warm, moody ambiance provides the perfect backdrop for unforgettable memories.
            </motion.p>
          </div>

          {/* Image Collage */}
          <div className="relative h-[500px] md:h-[600px] w-full">
            <motion.div
              style={{ y: y1, opacity }}
              className="absolute top-0 left-0 w-3/4 h-[70%] z-10 rounded-2xl overflow-hidden layered-shadow border border-[var(--color-border)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img 
                 style={{ scale: scale1 }}
                 src="/images/photos/environment-01.jpg" 
                 alt="Cafe Aarko Interior" 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>

            <motion.div
              style={{ y: y2, opacity }}
              className="absolute bottom-0 right-0 w-2/3 h-[60%] z-20 rounded-2xl overflow-hidden layered-shadow border border-[var(--color-border)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img 
                 style={{ scale: scale2 }}
                 src="/images/photos/environment-04.webp" 
                 alt="Cafe Aarko Details" 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
