import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata = {
  title: "Gallery | Cafe Aarko",
  description: "Experience the warm, moody, and elegant atmosphere of Cafe Aarko through our gallery.",
};

export default function GalleryPage() {
  return (
    <div className="pt-24 min-h-screen bg-[var(--color-background)]">
      <section className="pt-8 pb-12 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl text-[var(--color-text)] mb-4">Our Environment</h1>
            <p className="text-[var(--color-text-muted)]">
              Immerse yourself in our beautifully crafted spaces, designed to offer a perfect blend of comfort and style.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <GalleryClient />
        </div>
      </section>
    </div>
  );
}
