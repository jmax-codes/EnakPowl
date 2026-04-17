"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ArrowUpRight, Instagram, MessageCircle, MapPin, Globe } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactPage() {
  const containerRef = useRef(null);
  
  // Mobile/tablet layout detection
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
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0vh", "20vh"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  const sisterX = useTransform(scrollYProgress, [0.1, 0.4], ["-20vw", "0vw"]);
  const infoX = useTransform(scrollYProgress, [0.1, 0.4], ["20vw", "0vw"]);

  // 3D Transforms for Mobile Awwwards-style interaction
  const rotateY = useTransform(scrollYProgress, [0.1, 0.4], [15, 0]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.4], [10, 0]);
  const translateZ = useTransform(scrollYProgress, [0.1, 0.4], [-100, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.35, 0.5], [0.8, 1.05, 1]);
  const rotateYReverse = useTransform(scrollYProgress, [0.1, 0.4], [-15, 0]);
  
  // High-Fidelity "Awwwards" style mobile transforms (Vertical emphasize, zero sideways tilt)
  const classyY = useTransform(scrollYProgress, [0.1, 0.35], ["150px", "0px"]);
  const classyScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1]);
  const classyOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  
  // Mobile-specific vertical movement and opacity for a unique approach
  const sisterY = useTransform(scrollYProgress, [0.1, 0.4], ["80px", "0px"]);
  const infoY = useTransform(scrollYProgress, [0.1, 0.4], ["120px", "0px"]);
  const contactOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const infoYClassy = useTransform(scrollYProgress, [0.12, 0.37], ["160px", "0px"]);
  
  // Hoisted Promo Banner Transforms to fix Rules of Hooks violation
  const bannerScale = useTransform(scrollYProgress, [0.8, 1], [0.85, 1]);
  const bannerOpacity = useTransform(scrollYProgress, [0.85, 1], [0.5, 1]);

  const socialLinks = [
    {
      name: "Location Maps",
      href: "https://maps.app.goo.gl/33vpxSk7CUysWk7C7",
      icon: <MapPin className="w-6 h-6" />,
      label: "Find Us",
    },
    {
      name: "WhatsApp",
      href: "https://api.whatsapp.com/send/?phone=6281229289012&text&type=phone_number&app_absent=0",
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Chat Now",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/enakpowl.id",
      icon: <Instagram className="w-6 h-6" />,
      label: "@enakpowl.id",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@enakpowl.id",
      icon: <Globe className="w-6 h-6" />,
      label: "@enakpowl.id",
    },
  ];

  return (
    <SmoothScroll>
      <Navbar />
      <main ref={containerRef} className="bg-brand-red min-h-[300vh] text-white pt-[30vh] pb-20 px-6 md:px-12 flex flex-col items-center">
        
        {/* Animated Hero Section */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="text-center mb-40 max-w-6xl w-full sticky top-[30vh]"
        >
          <div className="relative group select-none">
            <h1 className="text-[14vw] md:text-[14vw] font-black text-brand-yellow uppercase leading-[0.85] tracking-[-0.02em] mb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
              Get In
            </h1>
            <h1 className="text-[14vw] md:text-[20vw] font-black text-white uppercase leading-[0.8] tracking-[-0.04em] italic outline-text">
              Touch.
            </h1>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-brand-yellow/30" />
            <p className="text-lg md:text-2xl font-medium text-brand-yellow/80 tracking-[0.2em] uppercase italic">
              Authentic Indonesian flavors, shared with heart.
            </p>
            <div className="h-px w-12 bg-brand-yellow/30" />
          </div>
        </motion.div>

        {/* Sisters / Business Story Section */}
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-24 mb-48 items-center bg-brand-red relative z-10 perspective-[1000px]">
          <motion.div 
            style={{ 
              x: isCompact ? 0 : sisterX,
              y: isCompact ? classyY : 0,
              rotateY: 0,
              rotateX: 0,
              z: isCompact ? 0 : translateZ,
              scale: isCompact ? classyScale : 1,
              opacity: isCompact ? classyOpacity : 1
            }}
          >
            <div className="relative aspect-[4/5] bg-black/20 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
               <div className="absolute inset-0 flex items-center justify-center p-12 text-center transition-transform duration-700 group-hover:scale-110">
                 <p className="text-brand-yellow/30 text-[10vw] font-black uppercase tracking-tighter rotate-12 select-none pointer-events-none">
                   ENAK<br/>POWL
                 </p>
                 <img src="/bowl-front.png" className="absolute w-[80%] brightness-75 transition-all group-hover:brightness-100" />
               </div>
               <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                 <h3 className="text-4xl font-black text-brand-yellow uppercase tracking-tighter">Two Sisters, One Dream</h3>
                 <p className="text-white font-black mt-2 tracking-widest text-sm uppercase">Stefanie Agracia & Selvi Oktavianie</p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ 
              x: isCompact ? 0 : infoX,
              y: isCompact ? infoYClassy : 0,
              rotateY: 0,
              z: isCompact ? 0 : translateZ,
              scale: isCompact ? classyScale : 1,
              opacity: isCompact ? classyOpacity : 1
            }} 
            className="flex flex-col gap-10"
          >
            <h2 className="text-5xl md:text-7xl font-black text-brand-yellow uppercase tracking-tighter italic leading-none">
              Behind<br/>The Bowl.
            </h2>
            <div className="space-y-6 text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
              <p>
                Enak Powl started from a shared passion for authentic Indonesian comfort food, reimagined for the modern lifestyle.
              </p>
              <p>
                Founded and managed by two sisters, <span className="text-brand-yellow font-black">Stefanie Agracia</span> and <span className="text-brand-yellow font-black">Selvi Oktavianie</span>.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="https://www.instagram.com/stefanieagracia" 
                  target="_blank"
                  className="flex items-center gap-2 px-8 py-4 bg-white/5 rounded-2xl border border-white/20 hover:bg-brand-yellow hover:text-brand-red hover:scale-105 transition-all font-black text-sm tracking-widest uppercase"
                >
                  <Instagram size={18} /> @stefanieagracia
                </Link>
                <Link 
                  href="https://www.instagram.com/selviioktavianie" 
                  target="_blank"
                  className="flex items-center gap-2 px-8 py-4 bg-white/5 rounded-2xl border border-white/20 hover:bg-brand-yellow hover:text-brand-red hover:scale-105 transition-all font-black text-sm tracking-widest uppercase"
                >
                  <Instagram size={18} /> @selviioktavianie
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Social Links Grid */}
        <div className="w-full max-w-6xl flex flex-col gap-8 mb-48 z-10">
          <h4 className="text-xs font-bold tracking-[0.4em] text-brand-yellow/50 uppercase text-center mb-4">Connect with us</h4>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative flex flex-col p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-brand-yellow/50 transition-all shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:text-brand-yellow transition-all">
                  <ArrowUpRight size={28} />
                </div>
                <div className="mb-8 text-brand-yellow bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
                  {link.icon}
                </div>
                <h3 className="text-brand-yellow font-bold text-[10px] uppercase tracking-[0.3em] mb-4">{link.name}</h3>
                <p className="text-2xl font-black text-white uppercase tracking-tight leading-none italic">{link.label}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Interactive Promo Banner */}
        <motion.div 
          style={{ 
            scale: bannerScale,
            opacity: bannerOpacity
          }}
          className="w-full max-w-4xl text-center p-10 md:p-16 bg-brand-yellow rounded-[3rem] md:rounded-[4rem] border-[4px] md:border-[6px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.5)] mb-32 group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[10px] md:h-[15px]" style={{ backgroundImage: "linear-gradient(to right, #C41E3A 50%, transparent 50%)", backgroundSize: "20px 100%" }} />
          
          <h2 className="text-2xl md:text-5xl font-black text-brand-red uppercase tracking-tighter mb-4 md:mb-6 leading-tight">
            Elevate your brand<br/>with a website like this
          </h2>
          <motion.a 
            href="https://api.whatsapp.com/send/?phone=6287868898855&text=I%27m%20interested%20in%20a%20website%20like%20EnakPowl&type=phone_number&app_absent=0"
            whileHover={{ scale: 1.05 }}
            className="text-2xl md:text-5xl font-black text-white block tracking-tight drop-shadow-md hover:text-brand-red transition-colors"
          >
            +62 87868898855
          </motion.a>

          <div className="absolute bottom-0 left-0 w-full h-[10px] md:h-[15px]" style={{ backgroundImage: "linear-gradient(to right, #C41E3A 50%, transparent 50%)", backgroundSize: "20px 100%" }} />
        </motion.div>

      </main>
      <Footer />
    </SmoothScroll>
  );
}
