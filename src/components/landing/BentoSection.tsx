"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

const menuItems = [
  /* SIZE = scale, UPPER/LOWER = y, LEFT/RIGHT = x */
  { name: "Cabe Garam",       file: "CabeGaram_Menu.png",       scale: 0.87, x: 0, y: 8 },
  { name: "Black Pepper",     file: "BlackPepper_Menu.png",     scale: 0.72, x: 0, y: 0 },
  { name: "Ayam Geprek",      file: "AyamGeprek_Menu.png",      scale: 0.75, x: 0, y: 4 },
  { name: "Asam Manis",       file: "AsamManis_Menu.png",       scale: 0.84, x: 6, y: 5 },
  { name: "Salted Egg",       file: "SaltedEgg_Menu.png",       scale: 0.778, x: 0, y: 0 },
  { name: "Truffle Mushroom", file: "TruffleMushroom_Menu.png", scale: 0.80, x: 0, y: 0 },
  { name: "Golden Curry",     file: "GoldenCurry_Menu.png",     scale: 0.71, x: 0, y: 6 },
];

const topRow    = menuItems.slice(0, 4);
const bottomRow = menuItems.slice(4, 7);

/** Optimized Video — pauses when off-screen, disabled PiP hooks */
const LazyVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
    />
  );
};

/** 
 * MOBILE-ONLY EDITABLE CONFIGURATION 
 * Adjust the scale, margins, and the specific stop distance (topOffset) for each card independently! 
 */
const mobileCardOverrides: Record<string, { scale: number, mt: number, ml: number, mr: number, topOffset: string }> = {
  "Cabe Garam":       { scale: 1.00, mt: 9, ml: 2, mr: 0, topOffset: "25vh" },
  "Black Pepper":     { scale: 0.80, mt: -9, ml: 1.5, mr: 0, topOffset: "28vh" },
  "Ayam Geprek":      { scale: 0.82, mt: -8, ml: 1, mr: 0, topOffset: "31vh" },
  "Asam Manis":       { scale: 0.93, mt: -8, ml: 7.4, mr: 0, topOffset: "34vh" },
  "Salted Egg":       { scale: 0.86, mt: -7, ml: 1, mr: 0, topOffset: "37vh" },
  "Truffle Mushroom": { scale: 0.86, mt: -7, ml: 0.75, mr: 0, topOffset: "40vh" },
  "Golden Curry":     { scale: 0.75, mt: -7, ml: 0, mr: 0, topOffset: "43vh" },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 100, scale: 0.85 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 1,
      duration: 0.8
    } 
  },
};

/** MenuItem — uses next/image for auto WebP + optimal sizing */
const MenuItem = ({ name, file, scale, x, y }: { name: string; file: string; scale?: number; x?: number; y?: number }) => (
  <div className="flex flex-col overflow-hidden rounded-2xl bg-brand-red h-full shadow-lg">
    {/* Parent 'relative' is required for next/image 'fill' prop */}
    <div className="relative w-full aspect-square overflow-hidden">
      <Image
        src={`/EnakPowl-Menu/${file}`}
        alt={name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover object-center transition-transform duration-700 hover:scale-110"
        style={{ transform: `scale(${scale || 1}) translateX(${x || 0}px) translateY(${y || 0}px)` }}
      />
    </div>
    <div className="bg-brand-red h-14 flex items-center justify-center px-2 text-center border-t border-white/10">
      <p className="text-white font-black text-xs md:text-sm uppercase tracking-tight leading-tight">
        {name}
      </p>
    </div>
  </div>
);

export const BentoSection = () => {
  const [mapActive, setMapActive] = useState(false);

  return (
    <section id="signatures" className="max-md:overflow-visible px-8 py-32 md:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header — Static */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-red/60 font-semibold">Signatures</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-brand-red mt-2 leading-none">
            Our Collection
          </h2>
        </div>

        {/* Grid Container */}
        <div className="flex flex-col gap-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[340px] md:auto-rows-[400px]">

            {/* THE OG BOWL */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={revealVariants}
              className="md:col-span-2 relative overflow-hidden rounded-3xl bg-brand-red shadow-2xl"
            >
              <LazyVideo src="/TheOGBowl_Video/Enak Powl Final video to EzGif.mp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
                <span className="text-xs uppercase tracking-[0.3em] text-brand-yellow font-bold">Bestseller</span>
                <div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                    The OG Bowl
                  </h3>
                  <p className="text-white/80 mt-4 text-base md:text-lg font-medium max-w-md">Our signature recipe that started it all.</p>
                </div>
              </div>
            </motion.div>

            {/* Service & Location Column */}
            <div className="grid grid-rows-2 gap-4">
              {/* SERVICE CARD */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={revealVariants}
                className="rounded-3xl bg-brand-yellow p-6 md:p-8 flex flex-col justify-between shadow-xl overflow-hidden"
              >
                <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#C41E3A" }}>SERVICE</span>
                <div>
                  <h4 className="text-xl font-black tracking-tighter uppercase text-white leading-none">Available On</h4>
                  <div className="flex items-center gap-1 mt-4">
                    {["GoFood", "GrabFood", "ShopeeFood", "WhatsApp"].map((platform, i) => {
                      const links = [
                        "https://gofood.co.id/jakarta/restaurant/enakpowl-alam-sutera-966b24a9-418b-4964-bfd7-2696a2ff3e35",
                        "https://food.grab.com/id/en/restaurant/online-delivery/6-C7LVG3J3E7ABC6?sourceID=20250820_011823_6aa5f2730ddc4cefa7cb7d5dda06666e_MEXMPS",
                        "https://shopee.co.id/now-food/shop/22326595?stm_medium=referral&stm_source=rw&uls_trackid=557eubid00k0",
                        "https://api.whatsapp.com/send/?phone=6281229289012&text&type=phone_number&app_absent=0"
                      ];
                      const icons = ["GoFood_Icon.png", "GrabFood_Icon.png", "ShopeeFood_Icon.png", "BulkOrder_ICON.png"];
                      return (
                        <a key={platform} href={links[i]} target="_blank" rel="noopener noreferrer" className="h-16 w-16 md:h-20 md:w-20 hover:scale-110 transition-transform">
                          <Image src={`/Icons/${icons[i]}`} alt={platform} width={80} height={80} className="w-full h-full object-contain" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* MAP CARD */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={revealVariants}
                className="rounded-3xl bg-brand-red shadow-xl overflow-hidden relative group"
              >
                {!mapActive ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => setMapActive(true)}
                    style={{ background: "linear-gradient(135deg, #C41E3A 0%, #a01828 100%)" }}
                  >
                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)" }} />
                    
                    {/* Ambient Glow */}
                    <motion.div 
                      animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-48 h-48 bg-brand-yellow rounded-full blur-[100px]"
                    />

                    <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
                      <div className="flex items-center justify-center gap-4 md:gap-6">
                        <motion.div 
                          animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="text-4xl md:text-5xl"
                        >
                          📍
                        </motion.div>
                        <h4 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-brand-yellow leading-[0.85] drop-shadow-2xl text-left">
                          TAP FOR<br />THE MAP.
                        </h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-brand-yellow/80 font-black mb-1">
                          Explore Our Spot
                        </p>
                        <div className="h-0.5 w-12 bg-brand-yellow/30 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <iframe
                      src="https://www.google.com/maps?q=EnakPowl%20Alam%20Sutera&output=embed"
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="eager"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <button
                      onClick={() => setMapActive(false)}
                      className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full z-10"
                    >
                      ✕ Close
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* MENU CARD */}
          <motion.div
            id="desktop-menu-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={revealVariants}
            className="max-md:hidden rounded-3xl bg-brand-yellow p-8 md:p-12 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-bold">Flavors</span>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none mt-2">
                  The Menu
                </h3>
              </div>
              <p className="text-brand-red text-sm md:text-base font-bold max-w-xs md:text-right">7 legendary bowls. Each a masterpiece.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {topRow.map((item, idx) => <MenuItem key={item.file} {...item} />)}
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-6">
              {bottomRow.map((item, idx) => (
                <div key={item.file} className="w-[calc(50%-8px)] md:w-[calc(25%-18px)]">
                  <MenuItem {...item} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* MOBILE AWWWARDS STACK EXPERENCE */}
          <div id="mobile-menu-stack" className="md:hidden rounded-[2rem] bg-brand-yellow px-5 pb-[25vh] mt-4 relative">
            <div className="flex flex-col sticky top-0 bg-brand-yellow pt-[6vh] pb-2 z-[50] -mx-5 px-5 rounded-t-[2rem]">
              <span className="text-xs uppercase tracking-[0.3em] text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">Flavors</span>
              <h3 className="mobile-menu-title text-5xl font-black tracking-tighter uppercase text-white leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] mt-2">
                The Menu
              </h3>
              <p className="text-brand-red text-sm font-bold mt-1 text-shadow-sm max-w-[200px]">7 legendary bowls. Each a masterpiece.</p>
            </div>

            <div className="mobile-menu-items-container flex flex-col pt-[12vh] -mt-1 gap-[35vh] pb-[5vh] relative z-10">
              {menuItems.map((item, i) => {
                const config = mobileCardOverrides[item.name] || { scale: 1.1, mt: 0, ml: 0, mr: 0, topOffset: `calc(24vh + ${i * 20}px)` };
                return (
                  <div
                    key={item.file}
                    className="sticky w-full rounded-[2rem] flex flex-col overflow-hidden shadow-xl"
                    style={{ 
                      height: '65vh', 
                      top: config.topOffset, 
                      background: 'linear-gradient(180deg, #A71C2E 0%, #7a0f1a 100%)',
                      zIndex: i + 10 
                    }}
                  >
                    <div className="h-[80px] w-full flex flex-col items-center justify-center bg-gradient-to-b from-black/60 to-transparent pt-4">
                      <h4 className="text-white max-md:text-[23px] text-center font-black uppercase tracking-tighter drop-shadow-xl">{item.name}</h4>
                    </div>
                    <div className="flex-1 w-full relative">
                       <Image 
                         src={`/EnakPowl-Menu/${item.file}`} 
                         alt={item.name} 
                         fill 
                         priority={i === 0}
                         className="object-contain object-center pb-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                         style={{ 
                           transform: `scale(${config.scale})`,
                           marginTop: `${config.mt}px`,
                           marginLeft: `${config.ml}px`,
                           marginRight: `${config.mr}px`
                         }}
                       />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <style jsx>{`
            @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
              :global(#signatures) {
                overflow: visible !important;
              }
              :global(#desktop-menu-grid) {
                display: none !important;
              }
              :global(#mobile-menu-stack) {
                display: block !important;
                padding-bottom: 20vh !important;
              }
              :global(.mobile-menu-title) {
                font-size: 6rem !important;
              }
              :global(.mobile-menu-items-container) {
                gap: 20vh !important;
              }
              :global(#mobile-menu-stack h4) {
                font-size: 3.5rem !important;
                line-height: 1.1 !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};
