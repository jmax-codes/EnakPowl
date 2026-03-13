"use client";

import { motion } from "framer-motion";

export const CTASection = () => {
  return (
    <section className="relative h-[60vh] bg-brand-yellow overflow-hidden flex items-center justify-center">
      <div className="relative z-10 text-center px-8">
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-12 text-brand-red italic">
          Join the <br /> 
          <span className="text-white">PowlNation</span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 bg-brand-red text-white rounded-full text-2xl font-bold uppercase tracking-tighter hover:bg-black transition-colors shadow-2xl"
        >
          Get Your Bowl
        </motion.button>
      </div>
    </section>
  );
};
