"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Clock, Phone } from "lucide-react";

export function VisitUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mapY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Information */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[1px] bg-[var(--color-brand)]" />
              <span className="text-[var(--color-brand)] uppercase tracking-widest text-sm font-medium">Location</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl text-[var(--color-text)] mb-12"
            >
              Visit Cafe Aarko
            </motion.h2>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex items-start gap-6"
              >
                <div className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-brand)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[var(--color-text)] mb-2">Address</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    Besides Brac Bank, Ahmed Trade Centre,<br />
                    Baruthkhana Rd, Sylhet 3100
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex items-start gap-6"
              >
                <div className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-brand)]">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[var(--color-text)] mb-2">Opening Hours</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    Monday - Sunday<br />
                    11:00 AM - 11:30 PM
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="flex items-start gap-6"
              >
                <div className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-brand)]">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[var(--color-text)] mb-2">Contact</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    <a href="tel:01719389009" className="hover:text-[var(--color-brand)] transition-colors">01719-389009</a><br />
                    <a href="mailto:cafeaarkobd@gmail.com" className="hover:text-[var(--color-brand)] transition-colors">cafeaarkobd@gmail.com</a>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Map Embed - One Map Policy */}
          <motion.div
            style={{ y: mapY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="w-full h-[500px] relative rounded-2xl overflow-hidden border border-[var(--color-border)] layered-shadow"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.0768481245054!2d91.8720444!3d24.8953602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375055a9a1b6ac19%3A0xe83e9c6f0ac4236c!2sCafe%20Aarko!5e0!3m2!1sen!2sbd!4v1782935900657!5m2!1sen!2sbd"
              style={{ border: 0, width: "100%", height: "100%", position: "absolute", inset: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Cafe Aarko Exact Location"
              className="grayscale-[0.3] contrast-[1.1]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
