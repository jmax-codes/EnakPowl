"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
}

const Word = ({ word, index, total, progress }: WordProps) => {
  // Words reveal faster: the entire text completes its reveal in the first 70% of the scroll
  // Words reveal sequence (dimmed to full bold highlight)
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }}>
      {word}
    </motion.span>
  );
};

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsCompact(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsCompact(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isCompact ? ["start 0.9", "start 0.35"] : ["start 0.95", "start 0.01"],
  });

  const text = "Traditional flavors meet modern vibes. We're not just serving ricebowls; we're serving the lifestyle of the young and the hungry. Every grain of rice, every slice of meat, and every drop of sauce is a testimony to our craft.";
  const words = text.split(" ");

  return (
    <section 
      id="about"
      className="relative min-h-screen bg-brand-yellow text-brand-red max-md:px-5 px-8 py-32 md:px-24 flex items-center -mt-[100vh] z-10"
    >
      <div className="max-w-5xl relative">
        <h3 className="text-sm uppercase tracking-widest text-brand-red mb-12">Who We Are</h3>
        <p ref={containerRef} className="max-md:text-[22px] max-md:leading-[1.2] max-md:tracking-tight max-md:gap-x-[0.35rem] max-md:gap-y-0 text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase flex flex-wrap gap-x-4 gap-y-2">
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

      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
          section {
            padding-top: 5rem !important;
            padding-bottom: 5rem !important;
          }
          p {
            font-size: 2.65rem !important;
            line-height: 0.95 !important;
            gap-x: 0.35rem !important;
            gap-y: 0.35rem !important;
          }
          h3 {
             margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
