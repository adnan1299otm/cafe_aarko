import Link from "next/link";
import { Globe } from "lucide-react";

const Facebook = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Instagram = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/photos/logo.jpg" alt="Cafe Aarko" className="h-16 w-auto rounded-full object-cover mb-6" />
          <p className="text-[var(--color-text-muted)] text-sm mb-6">
            &quot;Expect the best and taste the myth.&quot;
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/Cafeaarko.bd/" target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--color-background)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/cafeaarko.bd" target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--color-background)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6 text-[var(--color-text)]">Visit Us</h4>
          <address className="not-italic text-[var(--color-text-muted)] text-sm space-y-4">
            <p>Besides Brac Bank, Ahmed Trade Centre,<br/>Baruthkhana Rd, Sylhet 3100</p>
            <p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=24.8953602,91.8720444" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-teal)] hover:underline flex items-center gap-1 w-max">
                Get Directions
              </a>
            </p>
          </address>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6 text-[var(--color-text)]">Contact</h4>
          <div className="text-[var(--color-text-muted)] text-sm space-y-4">
            <p>
              <a href="tel:01719389009" className="hover:text-[var(--color-brand)] transition-colors">01719-389009</a>
            </p>
            <p>
              <a href="mailto:cafeaarkobd@gmail.com" className="hover:text-[var(--color-brand)] transition-colors">cafeaarkobd@gmail.com</a>
            </p>
            <p className="pt-2">Opens daily from 11 AM</p>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6 text-[var(--color-text)]">Explore</h4>
          <nav className="flex flex-col gap-4 text-sm text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-brand)] transition-colors w-max">Home</Link>
            <Link href="/menu" className="hover:text-[var(--color-brand)] transition-colors w-max">Menu</Link>
            <Link href="/gallery" className="hover:text-[var(--color-brand)] transition-colors w-max">Gallery</Link>
            <Link href="/visit" className="hover:text-[var(--color-brand)] transition-colors w-max">Visit Us</Link>
            <a href="https://foodpanda.com.bd/restaurant/s3ch/cafe-aarko?utm_source=google&utm_medium=organic&utm_campaign=google_reserve_place_order_action" target="_blank" rel="noopener noreferrer" className="hover:text-[#D70F64] transition-colors w-max">Order on FoodPanda</a>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[var(--color-text-muted)] text-xs">
          © {new Date().getFullYear()} Cafe Aarko. All rights reserved. Identifies as women-owned.
        </p>
        <p className="text-[var(--color-text-muted)] text-xs">
          Site by{" "}
          <a
            href="https://optiflow-beta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-brand)] hover:text-[var(--color-brand-soft)] transition-colors underline-offset-2 hover:underline"
          >
            OptiFlow
          </a>
        </p>
      </div>
    </footer>
  );
}
