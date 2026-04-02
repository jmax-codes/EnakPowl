"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Instagram, ArrowUpRight, Heart, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Floating text component for interactive scroll
const FloatingText = ({ children, speed = 1, className = "" }: { children: React.ReactNode, speed?: number, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

export default function AboutPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero transformations
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0vh", "20vh"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  // Parallax elements for the story section
  const storyX1 = useTransform(scrollYProgress, [0.1, 0.4], ["-20%", "0%"]);
  const storyX2 = useTransform(scrollYProgress, [0.1, 0.4], ["20%", "0%"]);

  return (
    <SmoothScroll>
      <Navbar />
      <main ref={containerRef} className="bg-brand-red min-h-[500vh] text-white">
        
        {/* Cinematic Sticky Hero — Original Style with Continuous Overlap Scrolling */}
        <section className="sticky top-0 h-screen w-full bg-brand-red flex items-center justify-center overflow-hidden z-0">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="text-center px-6"
          >
            <h1 className="text-[18vw] font-black text-brand-yellow uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">
              Our<br/>Story.
            </h1>
            <p className="mt-8 text-xl md:text-3xl font-medium tracking-[0.1em] uppercase italic text-white/60">
              The soul of Indonesian comfort.
            </p>
          </motion.div>
          
          {/* Background Decorative Element */}
          <motion.div 
            style={{ 
              rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
              opacity: useTransform(scrollYProgress, [0, 0.2], [0.1, 0])
            }}
            className="absolute inset-0 flex items-center justify-center -z-10"
          >
             <div className="w-[80vw] h-[80vw] border-[1px] border-brand-yellow/20 rounded-full" />
             <div className="absolute w-[60vw] h-[60vw] border-[1px] border-brand-yellow/10 rounded-full" />
          </motion.div>
        </section>

        {/* The Vision - Parallax Content SURPASSING the Hero (Contact Style) */}
        <section className="relative min-h-screen py-32 bg-brand-red flex flex-col items-center justify-center px-6 md:px-24 z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div style={{ x: storyX1 }} className="space-y-8">
              <h2 className="text-5xl md:text-8xl font-black text-brand-yellow uppercase leading-none tracking-tighter italic">
                The<br/>Vision.
              </h2>
              <p className="text-xl md:text-2xl font-medium text-white/80 leading-relaxed italic">
                Enak Powl was born from a hunger for more—more flavor, more soul, and more authenticity in the fast-paced life of our generation.
              </p>
            </motion.div>
            <motion.div style={{ x: storyX2 }} className="relative aspect-square">
               <div className="absolute inset-0 bg-white/5 rounded-[4rem] border border-white/10 flex items-center justify-center group overflow-hidden shadow-2xl backdrop-blur-sm">
                  {/* Tilted Background Text — matching reference */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-white/10 text-[12vw] md:text-[180px] font-black uppercase tracking-tighter -rotate-12 leading-[0.7] -translate-x-12 -translate-y-8">
                      ENAK
                    </p>
                    <p className="text-white/10 text-[12vw] md:text-[180px] font-black uppercase tracking-tighter -rotate-12 leading-[0.7] translate-x-12 translate-y-8">
                      POWL
                    </p>
                  </div>
                  
                  {/* Centralized Bowl Image */}
                  <motion.img 
                    src="/bowl-front.png" 
                    alt="Authentic Bowl" 
                    className="relative w-[85%] h-auto object-contain transition-transform duration-1000 group-hover:scale-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                  />
               </div>
            </motion.div>
          </div>
        </section>

        {/* Scrollytelling Values Section - FIXED OVERFLOW */}
        <section className="relative min-h-[150vh] py-40 bg-brand-yellow text-brand-red flex flex-col items-center px-6 overflow-hidden">
          <div className="sticky top-1/2 -translate-y-1/2 text-center w-full z-10">
            <FloatingText speed={2.5}>
              <h3 className="text-7xl md:text-[15vw] font-black uppercase tracking-tighter leading-[0.8] mb-8">
                Crafted.
              </h3>
            </FloatingText>
            <FloatingText speed={1.8}>
              <h3 className="text-7xl md:text-[15vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 italic outline-text-red">
                Soulful.
              </h3>
            </FloatingText>
            <FloatingText speed={1.2}>
              <h3 className="text-7xl md:text-[15vw] font-black uppercase tracking-tighter leading-[0.8]">
                Authentic.
              </h3>
            </FloatingText>
          </div>
          
          {/* Decorative background shapes for "fuller" look */}
          <div className="absolute top-1/4 left-10 w-32 h-32 border-4 border-brand-red/10 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-20 w-64 h-64 border-8 border-brand-red/5 rounded-full" />
        </section>

        {/* NEW: Meet the Founders Section (Sisters) */}
        <section className="relative min-h-screen py-32 bg-white text-brand-red flex flex-col items-center justify-center px-6 md:px-24 overflow-hidden">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[3/4] bg-brand-red/5 rounded-[3rem] overflow-hidden border border-brand-red/10 group"
            >
               {/* Real Founders Image */}
               <motion.img 
                 src="/FOUNDERS.png" 
                 alt="EnakPowl Founders" 
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-red/40 to-transparent" />
               <div className="absolute bottom-10 left-10 right-10">
                 <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-white">
                   Stefanie & Selvi
                 </h4>
                 <p className="text-sm md:text-base font-bold tracking-widest uppercase text-white/90">
                   Founders / Two Sisters
                 </p>
               </div>
            </motion.div>

            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand-red/5 rounded-full text-brand-red font-black text-xs uppercase tracking-widest">
                <Heart size={14} fill="currentColor" /> Meet The Founders
              </div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic">
                Sisters<br/>In Soul.
              </h2>
              <div className="space-y-6 text-xl md:text-2xl font-medium leading-relaxed opacity-90">
                <p>
                  Enak Powl isn't just a business; it's a family bond. Managed by two sisters, <span className="bg-brand-yellow text-brand-red px-2 py-0.5 rounded-md font-black">Stefanie Agracia</span> and <span className="bg-brand-yellow text-brand-red px-2 py-0.5 rounded-md font-black">Selvi Oktavianie</span>, the brand carries the warmth of home-style cooking with a bold, modern edge.
                </p>
                <p>
                  They believe that every ricebowl should tell a story—of flavors, of heritage, and of the shared joy of a perfect meal.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 -mt-6.5">
                <Link 
                  href="https://www.instagram.com/stefanieagracia" 
                  target="_blank"
                  className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-brand-red text-brand-red rounded-2xl hover:bg-brand-red hover:text-white transition-all font-black text-sm tracking-widest uppercase"
                >
                  <Instagram size={18} /> @stefanieagracia
                </Link>
                <Link 
                  href="https://www.instagram.com/selviioktavianie" 
                  target="_blank"
                  className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-brand-red text-brand-red rounded-2xl hover:bg-brand-red hover:text-white transition-all font-black text-sm tracking-widest uppercase"
                >
                  <Instagram size={18} /> @selviioktavianie
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final Outro */}
        <section className="relative h-screen flex flex-col items-center justify-center bg-brand-red px-6 text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="max-w-4xl"
           >
              <h2 className="text-5xl md:text-8xl font-black text-brand-yellow uppercase tracking-tighter leading-none mb-12">
                Join the<br/>Pepowl.
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Link 
                  href="/menu"
                  className="px-12 py-6 bg-brand-yellow text-brand-red font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-2xl flex items-center justify-center"
                >
                  Explore Menu
                </Link>
                <Link 
                  href="https://maps.app.goo.gl/33vpxSk7CUysWk7C7"
                  target="_blank"
                  className="flex items-center justify-center px-12 py-6 border-2 border-brand-yellow text-brand-yellow font-black uppercase tracking-widest rounded-full hover:bg-brand-yellow hover:text-brand-red transition-all"
                >
                  Locate Us
                </Link>
              </div>
           </motion.div>
        </section>

        {/* Bottom Contact Section */}
        <div className="w-full py-24 bg-brand-red text-center border-t border-white/10 relative z-20">
          <p className="text-brand-yellow/60 text-xs font-bold tracking-[0.4em] uppercase mb-4">Want to have a website like this?</p>
          <a 
            href="https://api.whatsapp.com/send/?phone=6287868898855" 
            target="_blank"
            className="text-3xl md:text-5xl font-black text-white hover:text-brand-yellow transition-all uppercase tracking-tighter"
          >
            Contact +62 87868898855
          </a>
        </div>

      </main>
      <Footer />
      
      {/* Red Outline Style specifically for the yellow section */}
      <style jsx global>{`
        .outline-text-red {
          color: transparent;
          -webkit-text-stroke: 1.5px #C41E3A;
        }
        @media (min-width: 768px) {
          .outline-text-red {
            -webkit-text-stroke: 3px #C41E3A;
          }
        }
      `}</style>
    </SmoothScroll>
  );
}
