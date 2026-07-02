import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { SignatureDishes } from "@/components/home/SignatureDishes";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { VisitUs } from "@/components/home/VisitUs";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <BrandStory />
      <SignatureDishes />
      <GalleryTeaser />
      <Testimonials />
      <VisitUs />
    </div>
  );
}
