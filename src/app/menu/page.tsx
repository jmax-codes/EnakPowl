"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ArrowLeft, ArrowRight, ArrowLeft as ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    name: "Cabe<br />Garam",
    image: "/Complete Menu EnakPowl/EnakPowl-CabeGaram.png",
    thumb: "/EnakPowl-Menu/CabeGaram_Menu.png",
    description: "The ultimate Indonesian spicy salt and chili balance. Crispy chicken tossed in a mix of garlic, red chili, and sea salt.",
    tags: ["SIGNATURE", "SPICY"],
    color: "#FFD700"
  },
  {
    name: "Ayam<br />Geprek",
    image: "/Complete Menu EnakPowl/EnakPowl-AyamGeprek.png",
    thumb: "/EnakPowl-Menu/AyamGeprek_Menu.png",
    description: "Authentic spicy chicken with traditional sambal. A fiery explosion of flavor that defines modern street soul.",
    tags: ["AUTHENTIC", "HOT"],
    color: "#FFD700"
  },
  {
    name: "Salted<br />Egg",
    image: "/Complete Menu EnakPowl/EnakPowl-SaltedEgg.png",
    thumb: "/EnakPowl-Menu/SaltedEgg_Menu.png",
    description: "Creamy, rich, and velvety salted egg yolk sauce with curry leaves. A golden masterpiece of savory goodness.",
    tags: ["CREAMY", "BESTSELLER"],
    color: "#FFD700"
  },
  {
    name: "Truffle<br />Mushroom",
    image: "/Complete Menu EnakPowl/EnakPowl-TruffleMushroom.png",
    thumb: "/EnakPowl-Menu/TruffleMushroom_Menu.png",
    description: "Luxurious truffle-infused creamy mushroom sauce. For when you want to treat your bowl like a five-star signature.",
    tags: ["PREMIUM", "LUXE"],
    color: "#FFD700"
  },
  {
    name: "Golden<br />Curry",
    image: "/Complete Menu EnakPowl/EnakPowl-GoldenCurry.png",
    thumb: "/EnakPowl-Menu/GoldenCurry_Menu.png",
    description: "Hearty Japanese-inspired curry with a touch of Indonesian spices. Warm, comforting, and deeply satisfying.",
    tags: ["UMAMI", "COMFORT"],
    color: "#FFD700"
  },
  {
    name: "Asam<br />Manis",
    image: "/Complete Menu EnakPowl/EnakPowl-AsamManis.png",
    thumb: "/EnakPowl-Menu/AsamManis_Menu.png",
    description: "The perfect tilt between sweet and tang. Vibrant pineapple and tomato base for a refreshing tropical punch.",
    tags: ["SWEET", "TANGY"],
    color: "#FFD700"
  },
  {
    name: "Black<br />Pepper",
    image: "/Complete Menu EnakPowl/EnakPowl-BlackPepper.png",
    thumb: "/EnakPowl-Menu/BlackPepper_Menu.png",
    description: "Bold and intense black pepper sauce with aromatic bell peppers. A sophisticated kick for serious flavor seekers.",
    tags: ["SAVORY", "BOLD"],
    color: "#FFD700"
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.5,
    rotate: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.5,
    rotate: direction < 0 ? 45 : -45,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

/** 
 * MOBILE SLIDER THUMBNAIL OVERRIDES
 * Edit these values to adjust the Ricebowl image size and position 
 * INSIDE the white circles at the bottom of the mobile slider.
 */
const mobileThumbOverrides: Record<string, { scale: number, x: number, y: number }> = {
  "Cabe Garam":       { scale: 1.4, x: 0, y: 2 },
  "Ayam Geprek":      { scale: 1.2, x: 0, y: 0 },
  "Salted Egg":       { scale: 1.2, x: 0, y: 0 },
  "Truffle Mushroom": { scale: 1.2, x: 0, y: 0 },
  "Golden Curry":     { scale: 1.1, x: 0, y: 0 },
  "Asam Manis":       { scale: 1.3, x: 0.7, y: 0 },
  "Black Pepper":     { scale: 1.1, x: 0, y: 0 },
};

export default function MenuPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [[page, direction], setPage] = useState([0, 0]);

  const currentIndex = ((page % menuItems.length) + menuItems.length) % menuItems.length;

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  const activeItem = menuItems[currentIndex];

  return (
    <SmoothScroll>
      <Navbar />
      <main className="bg-brand-red min-h-screen font-sans">
        
        {/* ========================================== */}
        {/* DESKTOP VIEW (EXACTLY AS BEFORE)           */}
        {/* ========================================== */}
        <div className="hidden md:block pt-[160px]">
          <section className="px-6 md:px-24 mb-24 flex flex-col items-start text-left">
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-7xl"
              >
                  <Link href="/" className="inline-flex items-center gap-2 text-brand-yellow/60 hover:text-brand-yellow transition-colors uppercase tracking-[0.3em] text-xs font-bold mb-12 ml-2">
                      <ArrowLeftIcon size={16} /> Back to Homepage
                  </Link>
                  <h1 className="text-[12vw] md:text-[180px] font-black text-brand-yellow uppercase leading-[0.8] tracking-tighter mb-8 italic px-2">
                      OUR<br/>FLAVORS.
                  </h1>
                  <p className="text-xl md:text-4xl text-white/80 font-medium tracking-tight max-w-4xl italic px-2">
                      Every bowl is a story of spices, shared with heart and the soul of modern Indonesian street food.
                  </p>
              </motion.div>
          </section>

          <section className="px-6 md:px-12 pb-40">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1700px] mx-auto">
                  {menuItems.map((item, idx) => {
                      const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;

                      return (
                      <motion.div
                          key={item.name}
                          initial={{ opacity: 0, scale: 0.95, y: 50 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          onMouseEnter={() => setHoveredIndex(idx)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className={`bg-brand-yellow rounded-[3rem] overflow-hidden flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative h-[750px] transition-all duration-500 ease-out ${
                              isOtherHovered ? "blur-[4px] opacity-60" : "opacity-100 blur-none"
                          }`}
                      >
                          <div className="relative h-[60%] w-full overflow-hidden group flex-shrink-0">
                              <Image 
                                  src={item.image} 
                                  alt={item.name.replace('<br />', ' ')}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                              />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                          </div>
                          <div className="p-8 pb-28 flex flex-col gap-4">
                              <div className="flex gap-2 flex-wrap">
                                  {item.tags.map(tag => (
                                      <span key={tag} className="px-4 py-1.5 bg-brand-red text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-full">
                                          {tag}
                                      </span>
                                  ))}
                              </div>
                              <h3 
                                  className="text-4xl md:text-4xl font-black text-brand-red uppercase tracking-tighter leading-[0.9]"
                                  dangerouslySetInnerHTML={{ __html: item.name }}
                              />
                              <p className="text-brand-red/70 text-sm md:text-[13px] font-medium leading-tight italic line-clamp-3">
                                  {item.description}
                              </p>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                              <button className="w-[85%] py-6 bg-brand-red text-white text-lg font-black uppercase tracking-tighter hover:bg-black transition-all active:scale-[0.98] cursor-pointer rounded-t-[1.5rem]">
                                  Experience Flavor
                              </button>
                          </div>
                      </motion.div>
                      );
                  })}
              </div>
          </section>
        </div>

        {/* ========================================== */}
        {/* MOBILE VIEW (REVOLUTION SLIDER STYLE)      */}
        {/* ========================================== */}
        <div className="md:hidden pt-32 flex flex-col min-h-screen bg-brand-red">
          
          {/* Main Mobile Hero Block (Static & Solid) */}
          <div className="relative z-20 bg-brand-red">
            {/* Static Header */}
            <div className="px-6 py-10 flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-brand-yellow/60 hover:text-brand-yellow flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all mb-2"
              >
                 <ArrowLeft size={12} strokeWidth={3} />
                 Back to Homepage
              </Link>
              <h1 className="text-5xl font-black text-brand-yellow uppercase italic tracking-tighter leading-[0.8]">
                OUR<br/>FLAVORS.
              </h1>
            </div>

            {/* Tinder-Style Slider Section */}
            <section className="relative px-4 pb-0 z-10 flex flex-col gap-6">
               <div className="relative h-[80vh] w-full">
                  <AnimatePresence initial={false} custom={direction}>
                     <motion.div
                       key={currentIndex}
                       custom={direction}
                       variants={{
                         enter: (direction: number) => ({
                           x: direction > 0 ? "100%" : "-100%",
                           opacity: 0,
                           scale: 0.8,
                           rotate: direction > 0 ? 10 : -10
                         }),
                         center: {
                           zIndex: 1,
                           x: 0,
                           opacity: 1,
                           scale: 1,
                           rotate: 0
                         },
                         exit: (direction: number) => ({
                           zIndex: 0,
                           x: direction < 0 ? "100%" : "-100%",
                           opacity: 0,
                           scale: 0.8,
                           rotate: direction < 0 ? -10 : 10
                         }),
                       }}
                       initial="enter"
                       animate="center"
                       exit="exit"
                       transition={{
                         x: { type: "spring", stiffness: 300, damping: 30 },
                         opacity: { duration: 0.2 },
                         scale: { duration: 0.3 }
                       }}
                       drag="x"
                       dragConstraints={{ left: 0, right: 0 }}
                       dragElastic={1}
                       onDragEnd={(e, { offset, velocity }) => {
                         const swipe = swipePower(offset.x, velocity.x);
                         if (swipe < -swipeConfidenceThreshold) paginate(1);
                         else if (swipe > swipeConfidenceThreshold) paginate(-1);
                       }}
                       className="absolute inset-0 bg-brand-yellow rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex flex-col cursor-grab active:cursor-grabbing"
                     >
                        {/* Image Area - 85% of Card Height */}
                        <div className="relative h-[85%] w-full overflow-hidden">
                           <Image 
                              src={activeItem.image} 
                              alt={activeItem.name.replace('<br />', ' ')}
                              fill
                              className={`w-full h-full ${activeItem.name.includes('Golden') ? 'object-contain scale-125 pt-8' : 'object-cover'} ${activeItem.name.includes('Cabe') ? 'object-bottom' : 'object-center'}`}
                              priority
                           />
                           <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 px-8 pb-4 pt-6 flex flex-col gap-1 relative z-20">
                            <div className="flex gap-2">
                                {activeItem.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-brand-red text-white text-[8px] font-black tracking-widest uppercase rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-2xl font-black text-brand-red uppercase tracking-tighter leading-none italic mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                {activeItem.name.replace('<br />', ' ').replace('<br/>', ' ')}
                            </h2>
                            <p className="text-brand-red/80 text-[10px] font-bold italic leading-snug max-w-[95%] line-clamp-2">
                                {activeItem.description}
                            </p>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>

               {/* Isolated Slider Controls (Navigation Rail stays fixed) */}
               <div className="px-0 flex justify-center pb-6">
                  <div className="w-full px-6 py-6 flex flex-col items-center gap-4">
                     <div className="flex items-center justify-between w-full h-12">
                        <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={() => paginate(-1)}
                          className="text-white hover:text-brand-yellow transition-colors flex items-center justify-center"
                        >
                          <ArrowLeft size={24} strokeWidth={3} />
                        </motion.button>
                        
                        <div className="flex items-center gap-3">
                          {[ -2, -1, 0, 1, 2 ].map((offset) => {
                             const itemIndex = ((currentIndex + offset) % menuItems.length + menuItems.length) % menuItems.length;
                             const item = menuItems[itemIndex];
                             const isActive = offset === 0;

                             const nameKey = item.name.replace('<br />', ' ').replace('<br/>', ' ').trim();
                             const thumbConfig = mobileThumbOverrides[nameKey] || { scale: 1, x: 0, y: 0 };
 
                             return (
                               <motion.div 
                                  key={`${itemIndex}-${offset}`}
                                  onClick={() => {
                                    if (offset !== 0) paginate(offset);
                                  }}
                                  initial={false}
                                  animate={{
                                    scale: isActive ? 1.25 : 1,
                                    opacity: isActive ? 1 : 0.4,
                                    filter: isActive ? "grayscale(0%)" : "grayscale(80%)",
                                  }}
                                  className={`w-10 h-10 rounded-full border-2 border-white flex-shrink-0 overflow-hidden relative cursor-pointer z-10 ${isActive ? 'border-brand-yellow ring-2 ring-brand-yellow/30' : 'border-white'}`}
                               >
                                  <Image 
                                    src={item.thumb || item.image} 
                                    alt="" 
                                    fill 
                                    className="object-cover" 
                                    style={{ 
                                      transform: `scale(${thumbConfig.scale}) translateX(${thumbConfig.x}px) translateY(${thumbConfig.y}px)` 
                                    }}
                                  />
                               </motion.div>
                             );
                          })}
                        </div>

                        <motion.button 
                           whileTap={{ scale: 0.8 }}
                           onClick={() => paginate(1)}
                           className="text-white hover:text-brand-yellow transition-colors flex items-center justify-center"
                        >
                          <ArrowRight size={24} strokeWidth={3} />
                        </motion.button>
                     </div>
                  </div>
               </div>
            </section>
          </div>

          {/* Vertical Parallax Content Continuation (Full Menu) */}
          <section className="w-full mt-10">
              <div className="px-6 py-10 bg-brand-red">
                 <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-center">Full Menu Details</h4>
                 <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-inner">
                    <Image 
                        src="/Complete Menu EnakPowl/Menu-EnakPowl.jpg" 
                        alt="Enak Powl Full Menu"
                        width={2480}
                        height={3508}
                        className="w-full h-auto block"
                        quality={75}
                    />
                 </div>
              </div>
          </section>

        </div>

        {/* Global Common Section (Desktop Full Menu - hidden on mobile as it's repetitive there) */}
        <div className="hidden md:block">
          <section className="w-full overflow-hidden">
              <Image 
                  src="/Complete Menu EnakPowl/Menu-EnakPowl.jpg" 
                  alt="Enak Powl Full Menu"
                  width={2480}
                  height={3508}
                  className="w-full h-auto block"
                  quality={100}
              />
          </section>
        </div>

      </main>
      <Footer />
      
      <style jsx global>{`
        .outline-text-yellow {
          color: transparent;
          -webkit-text-stroke: 1.5px #FFD700;
        }
        @media (min-width: 768px) {
          .outline-text-yellow {
            -webkit-text-stroke: 3px #FFD700;
          }
        }

        /* ============================================
           TABLET PORTRAIT ONLY
           (min-width: 768px) and (max-width: 1024px) and (orientation: portrait)
           iPad Mini / Air / standard / Pro 11" / Pro 12.9" — vertical hold only
           ============================================ */
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
          /* 1. Hide Desktop Grid Layer */
          main > div:nth-child(1) {
            display: none !important;
          }
          
          /* 2. Show Mobile Swipe Slider Layer */
          main > div:nth-child(2) {
            display: flex !important;
            padding-top: 160px !important;
          }
          
          /* 3. Scale Title appropriately and Inject the missing Subtitle Text */
          main > div:nth-child(2) h1 {
            font-size: 6rem !important;
            line-height: 0.8 !important;
          }
          
          /* Injecting the requested "Every bowl is a story..." text via pure CSS */
          main > div:nth-child(2) h1::after {
            content: "Every bowl is a story of spices, shared with heart and the soul of modern Indonesian street food.";
            display: block;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.5rem !important;
            font-weight: 500;
            letter-spacing: -0.025em;
            font-style: italic;
            margin-top: 2rem;
            text-transform: none;
            max-width: 90%;
            white-space: normal;
          }

          /* ======== CARD AND SLIDER ADJUSTMENTS ======== */
          
          /* 1. Make cards look tall not wide by reducing width */
          main > div:nth-child(2) div:first-child > section > div:first-child {
            max-width: 600px !important;
            margin: 0 auto !important;
          }

          /* 1b. Fix Golden Curry 'space gaps' to make image stretch full */
          main > div:nth-child(2) div:first-child > section > div:first-child img {
            object-fit: cover !important;
            transform: none !important;
            padding-top: 0 !important;
          }
          
          /* 2. Text Sizes: scaled down slightly to prevent truncation */
          main > div:nth-child(2) div:first-child > section h2 {
            font-size: 2.75rem !important;
            line-height: 1 !important;
          }
          main > div:nth-child(2) div:first-child > section p {
            font-size: 1.15rem !important;
            line-height: 1.4 !important;
            max-width: 100% !important;
            margin-top: 0.5rem !important;
          }
          main > div:nth-child(2) div:first-child > section .flex.gap-2 span {
            font-size: 0.75rem !important;
            padding: 0.35rem 0.85rem !important;
          }

          /* 3. Awwwards Style Floating Container for Slider (LONGER AND BIGGER) */
          main > div:nth-child(2) div:first-child > section > div:nth-child(2) > div {
            background: rgba(0, 0, 0, 0.4) !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            border-radius: 100px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5) !important;
            padding: 1.5rem 3.5rem !important;  /* BIGGER vertically and horizontally */
            max-width: 700px !important;        /* LONGER horizontally */
            width: 95% !important;
            margin: 0 auto !important;
          }

          main > div:nth-child(2) div:first-child > section > div:nth-child(2) .rounded-full {
            width: 4.75rem !important;  /* BIGGER THUMBNAILS */
            height: 4.75rem !important;
            border-width: 4px !important;
          }
          main > div:nth-child(2) div:first-child > section > div:nth-child(2) svg {
            width: 3rem !important;     /* BIGGER ARROWS */
            height: 3rem !important;
          }
          main > div:nth-child(2) div:first-child > section > div:nth-child(2) .h-12 {
            min-height: auto !important;
            height: auto !important;
          }
          main > div:nth-child(2) div:first-child > section > div:nth-child(2) .gap-3 {
            gap: 2rem !important;       /* WIDER GAP -> LONGER slider */
          }
          
          /* 4. Show Full Menu Board and make it fill the screen gaps */
          main > div:nth-child(3) {
            display: none !important;
          }
          
          main > div:nth-child(2) > section {
            margin-top: 8rem !important;
            width: 100vw !important;
          }

          main > div:nth-child(2) > section > div {
            padding: 0 !important;
            background: transparent !important;
          }

          main > div:nth-child(2) > section h4 {
            display: none !important;
          }

          main > div:nth-child(2) > section > div > div {
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          main > div:nth-child(2) > section img {
            width: 100% !important;
            height: auto !important;
          }
        }

        /* ============================================
           TABLET LANDSCAPE ONLY
           (min-width: 900px) and (max-width: 1366px) and (orientation: landscape)
           iPad Mini / Air / standard / Pro 11" / Pro 12.9" — horizontal hold only
           ============================================ */
        @media (min-width: 900px) and (max-width: 1366px) and (orientation: landscape) {
          /* 1. Scale down Flavor Titles further */
          main .grid > div h3 {
            font-size: 1.9rem !important;
            letter-spacing: -0.05em !important;
          }

          /* 2. Scale down Descriptions */
          main .grid > div p {
            font-size: 10px !important;
            line-height: 1.9 !important;
          }

          /* 3. Force tags to single line row and scale down */
          main .grid > div .flex.gap-2.flex-wrap {
            flex-wrap: nowrap !important;
          }
          main .grid > div .flex.gap-2 span {
            font-size: 9px !important;
            padding: 0.3rem 0.6rem !important;
            letter-spacing: 0.1em !important;
            white-space: nowrap !important;
          }
        }
      `}</style>
    </SmoothScroll>
  );
}
