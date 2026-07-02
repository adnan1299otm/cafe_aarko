import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cafe Aarko | Expect the best and taste the myth",
  description: "A premium, animation-rich marketing + digital-menu website for Cafe Aarko, Sylhet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col selection:bg-[var(--color-brand)] selection:text-[#120E0C]">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <ScrollToTop />
          <Toaster position="bottom-center" />
        </SmoothScroll>
      </body>
    </html>
  );
}
