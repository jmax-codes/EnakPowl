"use client";

import { motion } from "framer-motion";

export const BentoSection = () => {
  const cards = [
    {
      title: "The OG Bowl",
      category: "Bestseller",
      className: "md:col-span-2 md:row-span-2 bg-brand-red text-white",
      content: "Our signature recipe that started it all."
    },
    {
      title: "Eco Friendly",
      category: "Vibe",
      className: "bg-brand-yellow text-white",
      content: "100% Compostable packaging."
    },
    {
      title: "24/7 Delivery",
      category: "Service",
      className: "bg-brand-red text-white",
      content: "Anytime, anywhere."
    },
    {
      title: "Secret Sauce",
      category: "Flavor",
      className: "md:col-span-2 bg-brand-yellow text-white",
      content: "Legendary mix of 12 spices."
    }
  ];

  return (
    <section className="px-8 py-32 md:px-24 bg-brand-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-8 rounded-3xl flex flex-col justify-between ${card.className}`}
          >
            <div>
              <span className="text-xs uppercase tracking-widest opacity-50 font-medium">{card.category}</span>
              <h4 className="text-3xl font-bold tracking-tighter uppercase mt-2">{card.title}</h4>
            </div>
            <p className="text-lg opacity-80">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
