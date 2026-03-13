"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const CountUp = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const StatsSection = () => {
  const stats = [
    { label: "Bowls Sold", value: 150000, suffix: "+" },
    { label: "Outlets", value: 42, suffix: "" },
    { label: "Rating", value: 5, suffix: "/5" },
    { label: "Happy Pepolw", value: 98, suffix: "%" },
  ];

  return (
    <section className="px-8 py-32 md:px-24 bg-brand-red text-white text-center">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-brand-yellow">
              <CountUp value={stat.value} />{stat.suffix}
            </div>
            <p className="text-xs uppercase tracking-widest text-white/60 mt-4">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
