"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const menuItems = [
  {
    name: "Cabe<br />Garam",
    image: "/Complete Menu EnakPowl/EnakPowl-CabeGaram.png",
    description: "The ultimate indonesian spicy salt and chili balance. Crispy chicken tossed in a fragrant mix of garlic, red chili, and sea salt.",
    tags: ["SIGNATURE", "SPICY"],
    color: "#FFD700"
  },
  {
    name: "Ayam<br />Geprek",
    image: "/Complete Menu EnakPowl/EnakPowl-AyamGeprek.png",
    description: "Authentic hearth-pushed spicy chicken with traditional sambal. A fiery explosion of flavor that defines modern street soul.",
    tags: ["AUTHENTIC", "HOT"],
    color: "#FFD700"
  },
  {
    name: "Salted<br />Egg",
    image: "/Complete Menu EnakPowl/EnakPowl-SaltedEgg.png",
    description: "Creamy, rich, and velvety salted egg yolk sauce with curry leaves. A golden masterpiece of savory goodness.",
    tags: ["CREAMY", "BESTSELLER"],
    color: "#FFD700"
  },
  {
    name: "Truffle<br />Mushroom",
    image: "/Complete Menu EnakPowl/EnakPowl-TruffleMushroom.png",
    description: "Luxurious truffle-infused creamy mushroom sauce. For when you want to treat your bowl like a five-star signature.",
    tags: ["PREMIUM", "LUXE"],
    color: "#FFD700"
  },
  {
    name: "Golden<br />Curry",
    image: "/Complete Menu EnakPowl/EnakPowl-GoldenCurry.png",
    description: "Hearty Japanese-inspired curry with a touch of Indonesian spices. Warm, comforting, and deeply satisfying.",
    tags: ["UMAMI", "COMFORT"],
    color: "#FFD700"
  },
  {
    name: "Asam<br />Manis",
    image: "/Complete Menu EnakPowl/EnakPowl-AsamManis.png",
    description: "The perfect tilt between sweet and tang. Vibrant pineapple and tomato base for a refreshing tropical punch.",
    tags: ["SWEET", "TANGY"],
    color: "#FFD700"
  },
  {
    name: "Black<br />Pepper",
    image: "/Complete Menu EnakPowl/EnakPowl-BlackPepper.png",
    description: "Bold and intense black pepper sauce with aromatic bell peppers. A sophisticated kick for serious flavor seekers.",
    tags: ["SAVORY", "BOLD"],
    color: "#FFD700"
  }
];

export default function MenuPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <SmoothScroll>
      <Navbar />
      <main className="bg-brand-red min-h-screen pt-[160px]">
        
        {/* Cinematic Header Section */}
        <section className="px-6 md:px-24 mb-24 flex flex-col items-start text-left">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-7xl"
            >
                <Link href="/" className="inline-flex items-center gap-2 text-brand-yellow/60 hover:text-brand-yellow transition-colors uppercase tracking-[0.3em] text-xs font-bold mb-12 ml-2">
                    <ArrowLeft size={16} /> Back to Homepage
                </Link>
                <h1 className="text-[12vw] md:text-[180px] font-black text-brand-yellow uppercase leading-[0.8] tracking-tighter mb-8 italic outline-text-yellow px-2">
                    OUR<br/>FLAVORS.
                </h1>
                <p className="text-xl md:text-4xl text-white/80 font-medium tracking-tight max-w-4xl italic px-2">
                    Every bowl is a story of spices, shared with heart and the soul of modern Indonesian street food.
                </p>
            </motion.div>
        </section>

        {/* Grid of Menu Cards — Inspired by Eat Hungry Tiger */}
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
                        {/* 60% Image Height Container */}
                        <div className="relative h-[60%] w-full overflow-hidden group flex-shrink-0">
                            <Image 
                                src={item.image} 
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        
                        {/* Content area — 40% minus button height */}
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

                            <p className="text-brand-red/70 text-sm md:text-base font-medium leading-tight italic line-clamp-2">
                                {item.description}
                            </p>
                        </div>

                        {/* Button — flush to the bottom, inset, rounded top */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                            <button 
                                className="w-[85%] py-6 bg-brand-red text-white text-lg font-black uppercase tracking-tighter hover:bg-black transition-all active:scale-[0.98] cursor-pointer rounded-t-[1.5rem]"
                            >
                                Experience Flavor
                            </button>
                        </div>
                    </motion.div>
                    );
                })}
            </div>
        </section>

        {/* Complete Menu Image Section */}
        <section className="w-full">
            <Image 
                src="/Complete Menu EnakPowl/Menu-EnakPowl.jpg" 
                alt="Enak Powl Full Menu"
                width={2480}
                height={3508}
                className="w-full h-auto block"
                quality={100}
            />
        </section>

      </main>
      <Footer />
    </SmoothScroll>
  );
}
