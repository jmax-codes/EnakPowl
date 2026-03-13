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
              className="text-2xl font-bold tracking-tighter uppercase italic"
            >
              EnakPowl
            </motion.h1>
            <p className="text-sm mt-2 opacity-50 uppercase tracking-widest overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                Initializing Experience
              </motion.span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
