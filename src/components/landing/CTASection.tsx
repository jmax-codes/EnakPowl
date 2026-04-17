"use client";

import { motion } from "framer-motion";
import { useOrder } from "../providers/OrderProvider";

export const CTASection = () => {
  const { openOrder } = useOrder();

  return (
    <section id="cta" className="relative h-[60vh] bg-brand-yellow overflow-hidden flex items-center justify-center">
      <div className="relative z-10 text-center px-8">
        <h2 className="max-md:text-[11.5vw] max-md:leading-none text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-12 text-brand-red italic">
          Join the <br /> 
          <span className="text-white">PowlNation</span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openOrder('right')}
          className="px-12 py-6 bg-brand-red text-white rounded-full text-2xl font-bold uppercase tracking-tighter hover:bg-black transition-colors shadow-2xl cursor-pointer"
        >
          Get Your Bowl
        </motion.button>
      </div>

      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
          h2 {
            font-size: 6.5rem !important;
            line-height: 0.9 !important;
          }
        }
      `}</style>
    </section>
  );
};
