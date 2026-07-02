"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Farhan Ahmed",
    text: "The Cafe Aarko Special Pizza is genuinely one of the best in Sylhet. Great ambiance and very professional service.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sadia Rahman",
    text: "Loved the moody lighting and the aesthetic. It's a perfect place for evening hangouts. The BBQ Pizza was perfectly cooked.",
    rating: 4,
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    text: "Excellent coffee and the biryani is a must-try. The staff is courteous and the environment is very relaxing.",
    rating: 5,
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    text: "Premium quality food and a very cozy interior. Definitely coming back with my friends. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "Rakib Uddin",
    text: "A true hidden gem in Baruthkhana. The flavors are authentic, though the wait time was slightly long. Love the vibe.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="w-12 h-[1px] bg-[var(--color-brand)]" />
          <span className="text-[var(--color-brand)] uppercase tracking-widest text-sm font-medium">Guest Experiences</span>
          <div className="w-12 h-[1px] bg-[var(--color-brand)]" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-4xl md:text-5xl text-[var(--color-text)]"
        >
          Verified Google Reviews
        </motion.h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden flex-col gap-8">
        {/* Marquee Row 1 (Left to Right) */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[350px] md:w-[450px] mx-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl flex-shrink-0"
            >
              <div className="flex gap-1 mb-4 text-[var(--color-brand)]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-[var(--color-text)] text-lg mb-6 leading-relaxed">
                &quot;{review.text}&quot;
              </p>
              <p className="text-[var(--color-text-muted)] font-medium font-display">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
