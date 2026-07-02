"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const signatureDishes = [
  {
    id: 1,
    name: "Cafe Aarko Special Biryani",
    description: "A rich, aromatic blend of fragrant rice and tender meat, slow-cooked to perfection with our secret spice mix.",
    price: "৳ 450",
    image: "/images/generated/dish-aarko-special-biryani.jpg",
  },
  {
    id: 2,
    name: "Cafe Aarko Special Pizza",
    description: "Our signature handcrafted pizza loaded with premium toppings, melted mozzarella, and our house-made sauce.",
    price: "৳ 850",
    image: "/images/generated/dish-aarko-special-pizza.jpg",
  },
  {
    id: 3,
    name: "BBQ Pizza",
    description: "Smoky barbecue chicken, red onions, and a drizzle of tangy BBQ sauce on a crispy, golden crust.",
    price: "৳ 750",
    image: "/images/generated/dish-bbq-pizza.jpg",
  }
];

export function SignatureDishes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Staggered parallax for cards
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [200, -150]);
  
  const transforms = [y1, y2, y3];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[var(--color-background)] relative">
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
              <span className="text-[var(--color-brand)] uppercase tracking-widest text-sm font-medium">Culinary Excellence</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl text-[var(--color-text)]"
            >
              Signature Dishes
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Link href="/menu" className="inline-flex items-center gap-2 text-[var(--color-brand)] hover:text-[var(--color-brand-soft)] transition-colors font-medium border-b border-[var(--color-brand)]/30 hover:border-[var(--color-brand)] pb-1">
              View Full Menu <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pt-8">
          {signatureDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              style={{ y: transforms[index] }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl layered-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[0.215,0.61,0.355,1] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-4 right-4 bg-[var(--color-background)]/90 backdrop-blur-sm border border-[var(--color-border)]/50 text-[var(--color-brand)] px-4 py-1.5 rounded-full font-semibold text-sm shadow-lg">
                  {dish.price}
                </div>
              </div>
              <div className="pt-6">
                <h3 className="font-display text-2xl text-[var(--color-text)] mb-3 group-hover:text-[var(--color-brand)] transition-colors duration-300">{dish.name}</h3>
                <p className="text-[var(--color-text-muted)] text-base leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
