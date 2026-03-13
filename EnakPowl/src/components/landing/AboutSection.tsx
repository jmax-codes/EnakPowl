"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
}

const Word = ({ word, index, total, progress }: WordProps) => {
  // Words reveal faster: the entire text completes its reveal in the first 70% of the scroll
  const speedFactor = 0.7;
  const start = (index / total) * speedFactor;
  const end = ((index + 1) / total) * speedFactor;
  const opacity = useTransform(progress, [start, end], [0.1, 1]);

  return (
    <motion.span style={{ opacity }}>
      {word}
    </motion.span>
  );
};

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const text = "Traditional flavors meet modern vibes. We're not just serving ricebowls; we're serving the lifestyle of the young and the hungry. Every grain of rice, every slice of meat, and every drop of sauce is a testimony to our craft.";
  const words = text.split(" ");

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-brand-yellow text-brand-red px-8 py-32 md:px-24 flex items-center -mt-[100vh] z-10"
    >
      <div className="max-w-5xl">
        <h3 className="text-sm uppercase tracking-widest text-brand-red mb-12">Who We Are</h3>
        <p className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] uppercase flex flex-wrap gap-x-4 gap-y-2">
          {words.map((word, i) => (
            <Word 
              key={i} 
              word={word} 
              index={i} 
              total={words.length} 
              progress={scrollYProgress} 
            />
          ))}
        </p>
      </div>
    </section>
  );
};
