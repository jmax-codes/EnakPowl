"use client";

import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { BentoSection } from "@/components/landing/BentoSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock loading state for demonstration - in production this would be linked to assets loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <Preloader isLoaded={isLoaded} />
      <Navbar />
      <FloatingActions />
      <main className="relative">
        <Hero />
        <AboutSection />
        <BentoSection />
        <StatsSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
