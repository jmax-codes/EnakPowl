"use client";

import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { SequenceScroll } from "@/components/landing/SequenceScroll";
import { AboutSection } from "@/components/landing/AboutSection";
import { BentoSection } from "@/components/landing/BentoSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";

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
      <main>
        <SequenceScroll frameCount={233} />
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
