"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      const hash = window.location.hash;
      if (hash) {
        // If there's a hash, wait a bit for the DOM to be ready then scroll to it
        setTimeout(() => {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(hash, { immediate: true });
          } else {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView();
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose lenis instance globally for reliable one-click navigation from other components
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return <>{children}</>;
};
