"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = ({ isLoaded }: { isLoaded: boolean }) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setComplete(true), 2000); // Minimum duration for premium feel
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#C41E3A] text-white"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isLoaded ? "200px" : "100px" }}
              className="h-[1px] bg-white/30 mb-8"
            />
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase italic opacity-80"
            >
              EnakPowl
            </motion.h1>
            <p className="text-sm mt-2 font-bold uppercase tracking-[0.2em] overflow-hidden text-[#FFD700]">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                Young Pepolw's Favorite Ricebowl
              </motion.span>
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 text-center max-w-4xl"
            >
              <h2 className="text-[10vw] md:text-[6vw] font-black tracking-tighter uppercase leading-[0.85] text-white flex flex-col items-center">
                {["Experience the", "ultimate ricebowl", "scrollytelling."].map((line, lineIndex) => (
                  <div key={lineIndex} className="overflow-hidden h-fit flex justify-center">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ 
                        delay: 0.6 + (lineIndex * 0.1), 
                        duration: 1, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="inline-block"
                    >
                      {line}
                    </motion.span>
                  </div>
                ))}
              </h2>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
