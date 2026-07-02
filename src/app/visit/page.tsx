import { MapPin, Clock, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Visit Us | Cafe Aarko",
  description: "Find location, opening hours, and contact details for Cafe Aarko in Sylhet.",
};

export default function VisitPage() {
  return (
    <div className="pt-24 min-h-screen bg-[var(--color-background)]">
      <section className="pt-8 pb-12 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-[var(--color-text)] mb-4">Visit Us</h1>
            <p className="text-[var(--color-text-muted)] max-w-2xl">
              We look forward to welcoming you. Find our exact location, opening hours, and contact details below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Information Panel */}
            <div className="flex flex-col gap-12">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-[var(--color-surface)] rounded-2xl text-[var(--color-brand)] border border-[var(--color-border)]">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[var(--color-text)] mb-3">Address</h3>
                  <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                    Besides Brac Bank, Ahmed Trade Centre,<br />
                    Baruthkhana Rd, Sylhet 3100<br />
                    <span className="text-sm">(Located inside Sylco Tower Shopping Mall)</span>
                  </p>
                  <p className="mt-4 text-[var(--color-brand)] text-sm">Plus Code: VVWC+4R Sylhet</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-[var(--color-surface)] rounded-2xl text-[var(--color-brand)] border border-[var(--color-border)]">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[var(--color-text)] mb-3">Opening Hours</h3>
                  <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                    Monday - Sunday<br />
                    11:00 AM - 11:30 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-[var(--color-surface)] rounded-2xl text-[var(--color-brand)] border border-[var(--color-border)]">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[var(--color-text)] mb-3">Contact</h3>
                  <div className="text-[var(--color-text-muted)] text-lg leading-relaxed space-y-2 flex flex-col">
                    <a href="tel:01719389009" className="hover:text-[var(--color-brand)] transition-colors w-max">
                      01719-389009
                    </a>
                    <a href="mailto:cafeaarkobd@gmail.com" className="hover:text-[var(--color-brand)] transition-colors w-max flex items-center gap-2">
                      <Mail size={18} /> cafeaarkobd@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--color-border)]">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=24.8953602,91.8720444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-brand)] text-[#120E0C] px-8 py-4 rounded-full text-base font-semibold hover:bg-[var(--color-brand-soft)] transition-colors inline-block scale-100 hover:scale-[0.98] active:scale-95 ease-out duration-200"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map Embed Container */}
            <div className="relative w-full aspect-square lg:aspect-auto rounded-3xl overflow-hidden border border-[var(--color-border)] layered-shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.0768481245054!2d91.8720444!3d24.8953602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375055a9a1b6ac19%3A0xe83e9c6f0ac4236c!2sCafe%20Aarko!5e0!3m2!1sen!2sbd!4v1782935900657!5m2!1sen!2sbd"
                style={{ border: 0, width: "100%", height: "100%", position: "absolute", inset: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Cafe Aarko Exact Location"
                className="grayscale-[0.3] contrast-[1.1]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
