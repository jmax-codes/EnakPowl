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

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 100, scale: 0.85, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: "blur(0px)",
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
    <section id="signatures" className="px-8 py-32 md:px-24 bg-white overflow-hidden">
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
              className="md:col-span-2 relative overflow-hidden rounded-3xl bg-brand-red shadow-2xl will-change-transform"
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
                className="rounded-3xl bg-brand-yellow p-6 md:p-8 flex flex-col justify-between shadow-xl overflow-hidden will-change-transform"
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
                className="rounded-3xl bg-brand-red shadow-xl overflow-hidden relative will-change-transform"
              >
                {!mapActive ? (
                  <div
                    className="absolute inset-0 flex items-end cursor-pointer"
                    onClick={() => setMapActive(true)}
                    style={{ background: "linear-gradient(135deg, #a01828 0%, #7a0f1a 100%)" }}
                  >
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px)" }} />
                    <div className="relative z-10 p-4 w-full">
                      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full w-fit">
                        <span className="text-brand-yellow text-xs">📍</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-yellow font-bold">Tap for Map</span>
                      </div>
                    </div>
                  </div>
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={revealVariants}
            className="rounded-3xl bg-brand-yellow p-8 md:p-12 shadow-2xl will-change-transform"
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
        </div>
      </div>
    </section>
  );
};
