"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { menuData } from "@/data/menu";
import { CategoryIcon } from "./CategoryIcon";

export function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);

      // Scroll spy
      if (searchQuery) return; // Disable scroll spy while searching

      const scrollPosition = window.scrollY + 200; // Offset for header + tabs
      
      let currentCategory = activeCategory;
      for (const category of menuData) {
        const element = sectionRefs.current[category.id];
        if (element && element.offsetTop <= scrollPosition) {
          currentCategory = category.id;
        }
      }

      if (currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory, searchQuery]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = sectionRefs.current[id];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 140, // Offset for sticky headers
        behavior: "smooth"
      });
    }
  };

  const filteredData = menuData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <>
      {/* Header section */}
      <section className="pt-8 pb-12 px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-[var(--color-text)] mb-4">Our Menu</h1>
              <p className="text-[var(--color-text-muted)] max-w-xl">
                Explore our diverse selection of culinary creations, from artisan pizzas to rich, aromatic biryanis.
              </p>
            </div>
            
            <div className="w-full md:w-72 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
              <input 
                type="text" 
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full py-3 pl-12 pr-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand)] transition-colors placeholder:text-[var(--color-text-muted)]/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Category Tabs */}
      <div className={`sticky top-[72px] z-40 bg-[var(--color-background)]/90 backdrop-blur-md border-y border-[var(--color-border)] transition-all ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex overflow-x-auto py-4 gap-2 items-center">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id 
                    ? "bg-[var(--color-brand)] text-[#120E0C] font-semibold" 
                    : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] border border-[var(--color-border)]"
                }`}
              >
                <CategoryIcon id={category.id} active={activeCategory === category.id} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu List */}
      <section className="py-12 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 text-[var(--color-text-muted)]">
              No dishes found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="space-y-24">
              {filteredData.map((category) => (
                <div 
                  key={category.id} 
                  id={category.id}
                  ref={(el) => {
                    sectionRefs.current[category.id] = el;
                  }}
                  className="scroll-mt-[180px]"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-display text-3xl text-[var(--color-text)]">{category.name}</h2>
                    <div className="h-[1px] flex-1 bg-[var(--color-border)]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="group bg-[var(--color-surface)]/50 p-6 rounded-2xl hover:bg-[var(--color-surface)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                      >
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="font-display text-lg text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors">
                            {item.name}
                          </h3>
                          
                          <div className="text-right whitespace-nowrap">
                            {item.price !== undefined ? (
                              <span className="font-bold text-[var(--color-brand)] text-lg">
                                {typeof item.price === 'number' ? `৳ ${item.price}` : item.price}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {item.description && (
                          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                            {item.description}
                          </p>
                        )}

                        {item.prices && (
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-4 border-t border-[var(--color-border)]/30">
                            {item.prices.map((p, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{p.label}</span>
                                <span className="font-medium text-[var(--color-text)]">৳ {p.price}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
