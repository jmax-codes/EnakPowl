"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Food Blogger",
    content: "The best ricebowl in town, period. The flavors are just explosive!"
  },
  {
    name: "Sarah Chen",
    role: "Digital Nomad",
    content: "Affordable, healthy, and lightning fast delivery. My daily fuel."
  },
  {
    name: "Andy Lai Chun Kit",
    role: "Student",
    content: "EnakPowl is the only brand that actually understands what we like."
  }
];

export const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="h-screen bg-brand-red text-white flex flex-col justify-center px-8 md:px-24 overflow-hidden relative">
      <h3 className="text-sm uppercase tracking-widest text-brand-yellow mb-12">Testimonials</h3>
      
      <div className="relative h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <p className="text-4xl md:text-7xl font-bold tracking-tighter uppercase italic leading-[0.9] text-white">
              &quot;{testimonials[index].content}&quot;
            </p>
            <div className="mt-12">
              <p className="text-xl font-bold uppercase text-brand-yellow italic">{testimonials[index].name}</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">{testimonials[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-24 left-8 md:left-24 flex gap-4">
        {testimonials.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-24 bg-brand-yellow' : 'w-8 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
};
