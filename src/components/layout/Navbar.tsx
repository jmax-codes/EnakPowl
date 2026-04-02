"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeBg, setActiveBg] = useState<"red" | "yellow" | "white">("red");
  
  // Dynamic Scroll Visibility
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      // Find the element currently under the top part of the page
      const elements = document.elementsFromPoint(window.innerWidth / 4, pathname === '/about' ? 100 : 40);
      
      let section = elements.find(el => 
        el.tagName === 'SECTION' || 
        el.tagName === 'FOOTER' || 
        el.tagName === 'MAIN' ||
        el.classList.contains('bg-brand-red') ||
        el.classList.contains('bg-brand-yellow') ||
        el.classList.contains('bg-white')
      ) as HTMLElement | undefined;

      // If we found a section but it's transparent, try to find a background on its parents
      if (section) {
        let current: HTMLElement | null = section;
        let bg = window.getComputedStyle(current).backgroundColor;
        
        while (current && (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent')) {
          current = current.parentElement;
          if (current) bg = window.getComputedStyle(current).backgroundColor;
        }

        const hasRedClass = current?.classList.contains('bg-brand-red');
        const hasYellowClass = current?.classList.contains('bg-brand-yellow');
        const hasWhiteClass = current?.classList.contains('bg-white');

        if (bg === 'rgb(196, 30, 58)' || hasRedClass) {
          setActiveBg("red");
        } else if (bg === 'rgb(255, 215, 0)' || hasYellowClass) {
          setActiveBg("yellow");
        } else if (bg === 'rgb(255, 255, 255)' || hasWhiteClass) {
          setActiveBg("white");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about-page" },
    { name: "Menu", id: "menu-page" },
    { name: "Contact", id: "contact" },
  ];

  const pillBg = activeBg === "red" ? "#FFD700" : "#C41E3A";
  const pillText = "#1a1a1a";

  // --- UPDATED NAVIGATION FUNCTION ---
  const navigateTo = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Close mobile menu if open
    setIsOpen(false);

    // If we want to go to contact page
    if (id === 'contact') {
      router.push('/contact');
      return;
    }

    // If we want to go to about page (only from menu/footer)
    if (id === 'about-page') {
      router.push('/about');
      return;
    }

    // New Menu Page
    if (id === 'menu-page') {
      router.push('/menu');
      return;
    }

    // If we are NOT on home page, go to home with hash
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    // Use current scrollToSection logic for home page
    scrollToSection(id, e);
  };

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    // Current scrollToSection logic (Lenis based)
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { 
        immediate: true,
        force: true,
        lock: true
      });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const targetRect = el.getBoundingClientRect();
      const targetY = targetRect.top + window.scrollY;
      window.scrollTo({
        top: targetY,
        behavior: "auto"
      });
    }
  };

  return (
    <>
      <motion.nav 
        variants={{ visible: { y: 0 }, hidden: { y: "-150px" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[80] flex justify-between items-center p-6 md:px-8 transition-colors duration-300`}
      >
        <div className="hidden md:flex gap-4 items-center">
          {[
            { name: "ABOUT", id: "about" },
            { name: "SIGNATURES", id: "signatures" },
            { name: "TESTIMONIALS", id: "testimonials" }
          ].map((link) => (
            <button
              key={link.name}
              onClick={(e) => navigateTo(link.id, e)}
              style={{ backgroundColor: pillBg, color: pillText }}
              className="px-8 py-5 rounded-full text-[11px] font-black tracking-widest hover:opacity-70 active:scale-95 transition-all shadow-lg uppercase leading-none cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Top Center Logo with Perfectly Flush White Circular Border */}
        <div className="absolute left-[50%] top-1.5 transform -translate-x-1/2">
          <button 
            onClick={(e) => navigateTo("home", e)}
            className="hover:opacity-70 active:scale-95 transition-all block w-15 h-15 md:w-22 md:h-22 rounded-full border-[3px] border-white shadow-xl overflow-hidden relative cursor-pointer"
          >
            <img 
              src="/logo_EnakPowl.png" 
              alt="EnakPowl Logo" 
              className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
            />
          </button>
        </div>

        {/* Top Right Actions — Restored Liquid Fluid Glass (Subtle Depth, No Sharp Lights) */}
        <div className="flex items-center gap-4">
          {/* Chat / Contact icon */}
          <button
            onClick={(e) => navigateTo("contact", e)}
            title="Contact"
            className="hidden md:flex w-12 h-12 items-center justify-center rounded-full transition-all hover:opacity-70 active:scale-95 group relative overflow-hidden cursor-pointer"
            style={{
              color: "#1a1a1a",
              background: "linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(50px) saturate(220%) brightness(1.15)",
              WebkitBackdropFilter: "blur(50px) saturate(220%) brightness(1.15)",
              border: "0.5px solid rgba(255, 255, 255, 0.5)",
              boxShadow: `
                0 15px 35px rgba(0, 0, 0, 0.15),
                inset 0 2px 2px rgba(255, 255, 255, 0.3),
                inset 0 8px 15px rgba(255, 255, 255, 0.1),
                inset 0 -4px 10px rgba(0, 0, 0, 0.05)
              `,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative z-10 antialiased">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          {/* Menu button */}
          <button
            onClick={() => setIsOpen(true)}
            className="hidden md:flex w-12 h-12 items-center justify-center rounded-full transition-all hover:opacity-70 active:scale-95 group relative overflow-hidden"
            style={{
              color: "#1a1a1a",
              background: "linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(50px) saturate(220%) brightness(1.15)",
              WebkitBackdropFilter: "blur(50px) saturate(220%) brightness(1.15)",
              border: "0.5px solid rgba(255, 255, 255, 0.5)",
              boxShadow: `
                0 15px 35px rgba(0, 0, 0, 0.15),
                inset 0 2px 2px rgba(255, 255, 255, 0.3),
                inset 0 8px 15px rgba(255, 255, 255, 0.1),
                inset 0 -4px 10px rgba(0, 0, 0, 0.05)
              `,
            }}
          >
            <Menu size={20} className="relative z-10 antialiased" />
          </button>
        </div>

        {/* Dotted border line — integrated into Navbar for unified animation */}
        <div className="absolute top-[100px] left-0 w-full z-[-1] pointer-events-none">
          <div 
            className="w-full h-[14px]" 
            style={{ 
              backgroundImage: "linear-gradient(to right, #FFD700 50%, transparent 50%)", 
              backgroundSize: "28px 100%" 
            }}
          ></div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#C41E3A] text-white flex flex-col justify-center px-12 md:px-24"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-4">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="overflow-hidden"
                >
                  <button 
                    onClick={(e) => {
                      navigateTo(item.id, e);
                    }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter uppercase hover:italic transition-all inline-block cursor-pointer"
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-brand-yellow text-xs uppercase tracking-widest mb-4">Socials</p>
                <div className="flex flex-col gap-3">
                  <a href="https://www.instagram.com/enakpowl.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors text-lg">Instagram</a>
                  <a href="https://www.tiktok.com/@enakpowl.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors text-lg">TikTok</a>
                </div>
              </div>
              <div>
                <p className="text-brand-yellow text-xs uppercase tracking-widest mb-4">Address</p>
                <p className="text-sm">Alam Sutera Pacific Garden Square,<br />EnakPowl Outlet, Banten, Indonesia</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};