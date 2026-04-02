"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "../providers/OrderProvider";

const RiceBowlIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 11c0 5.515 4.029 10 9 10s9-4.485 9-10H3z" />
    <path d="M6 11l1-3c.5-1.5 2-2.5 3.5-2.5h3c1.5 0 3 1 3.5 2.5l1 3" />
    <path d="M10 11V8" />
    <path d="M14 11V8" />
  </svg>
);

export const FloatingActions = () => {
  const router = useRouter();
  const { openOrder } = useOrder();
  const [iconColorHex, setIconColorHex] = useState("#FFD700"); // default on red bg
  const [btnBgHex, setBtnBgHex] = useState("#FFD700");
  const [btnTextHex, setBtnTextHex] = useState("#C41E3A");
  const { scrollYProgress, scrollY } = useScroll();

  // Hide on scroll down, show on scroll up (matching Navbar)
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  // Hide bottom floating actions entirely when on CTA or Footer
  const [isBottomHidden, setIsBottomHidden] = useState(false);

  useEffect(() => {
    const detectColor = () => {
      const x = window.innerWidth - 60;
      const y = window.innerHeight - 60;

      const allElements = document.elementsFromPoint(x, y);
      const section = allElements.find(el => el.tagName === 'SECTION') as HTMLElement | undefined;

      if (section) {
        const bg = window.getComputedStyle(section).backgroundColor;
        if (bg === 'rgb(196, 30, 58)') {
          setIconColorHex('#FFD700');
          setBtnBgHex('#FFD700');
          setBtnTextHex('#C41E3A');
        } else if (bg === 'rgb(255, 215, 0)' || bg === 'rgb(255, 255, 255)') {
          setIconColorHex('#C41E3A');
          setBtnBgHex('#C41E3A');
          setBtnTextHex('#FFD700');
        }
      }
    };

    window.addEventListener('scroll', detectColor, { passive: true });
    detectColor();
    return () => window.removeEventListener('scroll', detectColor);
  }, []);

  // Hide actions completely when reaching footer or CTA sections
  useEffect(() => {
    const hiddenElements = document.querySelectorAll('footer, #cta');
    if (!hiddenElements.length) return;

    const visibleElements = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleElements.add(entry.target);
          } else {
            visibleElements.delete(entry.target);
          }
        });
        setIsBottomHidden(visibleElements.size > 0);
      },
      { threshold: 0.05 }
    );

    hiddenElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[75] transition-all duration-500"
        style={{ opacity: isBottomHidden ? 0 : 1, visibility: isBottomHidden ? 'hidden' : 'visible' }}
      >
        {/* Bottom Left: BUY NOW */}
        <motion.div 
          variants={{ visible: { y: 0 }, hidden: { y: "150px" } }}
          animate={navHidden ? "hidden" : "visible"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 left-8 pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openOrder('left')}
            style={{ backgroundColor: btnBgHex, color: btnTextHex }}
            className="px-8 py-3 rounded-full font-black uppercase tracking-tighter text-sm md:text-base shadow-xl transition-all duration-300 cursor-pointer"
          >
            Buy Now
          </motion.button>
        </motion.div>

        {/* Bottom Right: Icons */}
        <div
          className="absolute bottom-8 right-8 flex gap-6 pointer-events-auto transition-all duration-500"
        >
          <motion.button
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/menu')}
            style={{ color: iconColorHex }}
            className="flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <RiceBowlIcon className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
          </motion.button>
          <motion.button
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openOrder('right')}
            style={{ color: iconColorHex }}
            className="flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ShoppingBasket className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
