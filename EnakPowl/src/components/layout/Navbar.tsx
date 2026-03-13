"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the element currently under the navbar
      const navbarHeight = 80;
      const elements = document.elementsFromPoint(window.innerWidth / 2, navbarHeight / 2);
      
      // Check if any element in the stack has a white background class or is the bento section
      const overWhite = elements.some(el => 
        el.classList.contains('bg-brand-white') || 
        el.closest('.bg-brand-white')
      );
      
      setIsDark(overWhite);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Menu", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const textColor = isDark ? "text-black" : "text-white";
  const borderColor = isDark ? "border-black/20" : "border-white/20";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[80] flex justify-between items-center p-8 transition-colors duration-300 ${isDark ? "text-black" : "text-white"}`}>
        <div className="text-2xl font-bold tracking-tighter uppercase italic">
          EnakPowl
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 group"
        >
          <span className="text-sm uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity">Menu</span>
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${isDark ? "border-black/20" : "border-white/20"}`}>
            <Menu size={20} />
          </div>
        </button>
      </nav>

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
                  <a 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-6xl md:text-8xl font-bold tracking-tighter uppercase hover:italic transition-all inline-block"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-brand-yellow text-xs uppercase tracking-widest mb-4">Socials</p>
                <div className="flex flex-col gap-2">
                  <a href="#" className="hover:text-blue-400">Instagram</a>
                  <a href="#" className="hover:text-blue-400">TikTok</a>
                </div>
              </div>
              <div>
                <p className="text-brand-yellow text-xs uppercase tracking-widest mb-4">Address</p>
                <p className="text-sm">Sunset Boulevard 42,<br />Jakarta, Indonesia</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
