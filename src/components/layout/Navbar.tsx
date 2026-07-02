"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";

const Facebook = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Instagram = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
import clsx from "clsx";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Visit Us", href: "/visit" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out flex flex-col">
      {/* Top Utility Bar */}
      <div className="hidden md:flex justify-between items-center px-6 lg:px-12 py-2 bg-[var(--color-surface)] text-[var(--color-text-muted)] text-[12px] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-6">
          <a href="tel:01719389009" className="flex items-center gap-2 hover:text-[var(--color-brand)] transition-colors">
            <Phone size={14} />
            01719-389009
          </a>
          <a href="mailto:cafeaarkobd@gmail.com" className="flex items-center gap-2 hover:text-[var(--color-brand)] transition-colors">
            <Mail size={14} />
            cafeaarkobd@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            Opens 11 AM daily
          </div>
          <div className="flex items-center gap-4 border-l border-[var(--color-border)] pl-6">
            <a href="https://www.facebook.com/Cafeaarko.bd/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand)] transition-colors">
              <Facebook size={14} />
            </a>
            <a href="https://www.instagram.com/cafeaarko.bd" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand)] transition-colors">
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={clsx(
          "w-full px-6 lg:px-12 py-4 flex justify-between items-center transition-all duration-300",
          scrolled ? "glass" : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/photos/logo.jpg" alt="Cafe Aarko" className="h-10 w-auto rounded-full object-cover" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-[15px] font-medium transition-colors hover:text-[var(--color-brand)]",
                pathname === link.href ? "text-[var(--color-brand)]" : "text-[var(--color-text)]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://foodpanda.com.bd/restaurant/s3ch/cafe-aarko?utm_source=google&utm_medium=organic&utm_campaign=google_reserve_place_order_action"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color-brand)] text-[#120E0C] px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#D70F64] hover:text-white transition-colors scale-100 hover:scale-[0.97] active:scale-95 ease-out duration-200"
          >
            Order on FoodPanda
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-[var(--color-text)]"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={clsx(
          "fixed inset-0 bg-[var(--color-background)] z-50 p-6 flex flex-col transition-transform duration-300 ease-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/photos/logo.jpg" alt="Cafe Aarko" className="h-10 w-auto rounded-full object-cover" />
          <button onClick={() => setMobileMenuOpen(false)} className="text-[var(--color-text)]">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                "text-2xl font-display transition-colors hover:text-[var(--color-brand)]",
                pathname === link.href ? "text-[var(--color-brand)]" : "text-[var(--color-text)]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 border-t border-[var(--color-border)] pt-8 flex flex-col gap-4">
            <a href="tel:01719389009" className="flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-brand)]">
              <Phone size={18} /> 01719-389009
            </a>
            <a href="mailto:cafeaarkobd@gmail.com" className="flex items-center gap-3 text-[var(--color-text-muted)] hover:text-[var(--color-brand)]">
              <Mail size={18} /> cafeaarkobd@gmail.com
            </a>
            <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
              <Clock size={18} /> Opens 11 AM daily
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/Cafeaarko.bd/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-brand)]">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/cafeaarko.bd" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-brand)]">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
