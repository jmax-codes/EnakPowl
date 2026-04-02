"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PanelSide = "left" | "right" | null;

interface OrderOverlayProps {
  activePanel: PanelSide;
  onClose: () => void;
}

type MenuLink = {
  label: string;
  href: string;
  icon: { type: "emoji"; value: string } | { type: "image"; src: string };
};

const MENU_LINKS: MenuLink[] = [
  {
    label: "LOCATION MAPS",
    href: "https://maps.app.goo.gl/JssFXQRph3BUnswg9",
    icon: { type: "emoji", value: "📍" },
  },
  {
    label: "GO FOOD",
    href: "https://gofood.co.id/jakarta/restaurant/enakpowl-alam-sutera-966b24a9-418b-4964-bfd7-2696a2ff3e35",
    icon: { type: "image", src: "/Icons/GoFood_Icon.png" },
  },
  {
    label: "GRAB FOOD",
    href: "https://food.grab.com/id/en/restaurant/online-delivery/6-C7LVG3J3E7ABC6?sourceID=20250820_011823_6aa5f2730ddc4cefa7cb7d5dda06666e_MEXMPS",
    icon: { type: "image", src: "/Icons/GrabFood_Icon.png" },
  },
  {
    label: "SHOPEE FOOD",
    href: "https://shopee.co.id/now-food/shop/22326595?stm_medium=referral&stm_source=rw&uls_trackid=557eubid00k0",
    icon: { type: "image", src: "/Icons/ShopeeFood_Icon.png" },
  },
  {
    label: "BULK ORDER",
    href: "https://api.whatsapp.com/send/?phone=6281229289012&text&type=phone_number&app_absent=0",
    icon: { type: "image", src: "/Icons/BulkOrder_ICON.png" },
  },
  {
    label: "REVIEW ON GMAPS",
    href: "https://google.com/maps/place//data=!4m3!3m2!1s0x2e69fbbc49f5e813:0xa86d958e19d2dbf0!12e1?source=g.page.m._&laa=merchant-review-solicitation",
    icon: { type: "emoji", value: "⭐" },
  },
];

// --- Panel slide — spring physics for the "glide" feel ---
const panelVariants: Variants = {
  hidden: (side: "left" | "right") => ({
    x: side === "left" ? "-100%" : "100%",
  }),
  show: {
    x: 0,
    transition: {
      duration: 1.25,
      ease: [0.76, 0, 0.24, 1], // Cinematic Awwwards-favorite ease
    },
  },
  exit: (side: "left" | "right") => ({
    x: side === "left" ? "-100%" : "100%",
    transition: {
      duration: 0.9, // Shorter duration for a faster "snap-out"
      ease: [0.32, 0, 0.67, 0], // Exponential In ease for zero lingering tail off-screen
    },
  }),
};

// --- Container stagger ---
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.45,
    },
  },
};

// --- Each link child ---
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
       duration: 0.5,
       ease: [0.32, 0, 0.67, 0],
    },
  },
};

// --- Close button animates in last ---
const closeBtnVariants: Variants = {
  hidden: { opacity: 0, rotate: -45, scale: 0.6 },
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.45,
    },
  },
};

export const OrderOverlay = ({ activePanel, onClose }: OrderOverlayProps) => {
  return (
    <AnimatePresence mode="wait">
      {activePanel && (
        <div className="fixed inset-0 z-[100] pointer-events-auto">

          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 backdrop-blur-xl bg-black/60"
            onClick={onClose}
          />

          {/* ── Floating Panel ── */}
          <motion.div
            custom={activePanel}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={`
              absolute top-4 bottom-4 md:top-6 md:bottom-6
              w-[88vw] md:w-[38vw]
              bg-[#C41E3A]
              flex flex-col
              rounded-[2rem] md:rounded-[2.5rem]
              shadow-[0_0_40px_rgba(0,0,0,0.3)]
              overflow-hidden
              ${activePanel === "left" ? "left-4 md:left-6" : "right-4 md:right-6"}
            `}
          >

            {/* ── Close Button (animates last) ── */}
            <motion.button
              variants={closeBtnVariants}
              initial="hidden"
              animate="show"
              onClick={onClose}
              className="
                absolute top-6 right-6 z-10
                w-10 h-10 flex items-center justify-center
                rounded-full text-[#FFD700]
                hover:bg-[#FFD700]/15 hover:rotate-90
                transition-all duration-300
              "
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </motion.button>

            {/* ── Top Label ── */}
            <div className="px-8 md:px-12 pt-10 pb-3">
              <p className="text-[#FFD700]/50 text-[10px] font-bold tracking-[0.35em] uppercase select-none">
                Order Now
              </p>
            </div>

            {/* ── Hairline Divider ── */}
            <div className="w-full h-px bg-[#FFD700]/10" />

            {/* ── Links — scrollable area ── */}
            <div className="flex-1 overflow-y-auto px-8 md:px-12 py-4">
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col"
              >
                {MENU_LINKS.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group flex items-center gap-4 py-4
                        border-b border-[#FFD700]/10
                        hover:border-[#FFD700]/30
                        transition-colors duration-300
                      "
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center">
                        {item.icon.type === "emoji" ? (
                          <span className="text-2xl md:text-3xl leading-none select-none">
                            {item.icon.value}
                          </span>
                        ) : (
                          <Image
                            src={item.icon.src}
                            alt={item.label}
                            width={44}
                            height={44}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      {/* Label */}
                      <span className="
                        flex-1
                        text-[#FFD700] font-black
                        text-xl md:text-2xl
                        uppercase tracking-tight
                        group-hover:text-white
                        transition-colors duration-300
                      ">
                        {item.label}
                      </span>

                      {/* Arrow */}
                      <ArrowUpRight
                        className="
                          w-5 h-5 flex-shrink-0
                          text-[#FFD700]/25
                          group-hover:text-white
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          transition-all duration-300
                        "
                        strokeWidth={2}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </div>

            {/* ── Footer ── */}
            <div className="px-8 md:px-12 py-5 border-t border-[#FFD700]/10">
              <p className="text-[#FFD700]/60 text-[10px] font-semibold tracking-[0.2em] uppercase leading-snug">
                WANT TO HAVE WEBSITE LIKE THIS?
              </p>
              <p className="text-[#FFD700] text-[11px] font-black tracking-[0.15em] uppercase mt-0.5">
                CONTACT +62 87868898855
              </p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
