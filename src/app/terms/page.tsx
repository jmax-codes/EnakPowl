"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Scale, FileText, ShoppingCart, AlertCircle } from "lucide-react";

export default function TermsPage() {
  const terms = [
    {
      title: "Agreement",
      icon: <FileText className="w-6 h-6 text-brand-yellow" />,
      content: "By using our website, ordering through our platforms, or enjoying our delicious ricebowls, you agree to these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "Ordering & Delivery",
      icon: <ShoppingCart className="w-6 h-6 text-brand-yellow" />,
      content: "EnakPowl provides ordering services directly and through third-party partners like GoFood, GrabFood, and ShopeeFood. While we ensure every bowl is perfect, we are not responsible for delivery delays caused by partner drivers or external traffic conditions."
    },
    {
      title: "Payment & Pricing",
      icon: <Scale className="w-6 h-6 text-brand-yellow" />,
      content: "All prices are subject to change without notice. In Indonesia, local taxes (PB1) may apply. Delivery fees are determined by our third-party logistics partners at the time of your order."
    },
    {
      title: "Cancellations",
      icon: <CheckCircle className="w-6 h-6 text-brand-yellow" />,
      content: "Once we start crafting your signature bowl, orders cannot be cancelled or refunded through our direct channels. For issues with orders through our delivery partners, please use their respective resolution systems."
    },
    {
      title: "Liability",
      icon: <ShieldAlert className="w-6 h-6 text-brand-yellow" />,
      content: "EnakPowl is not liable for any allergic reactions if dietary warnings are not reviewed. We take every precaution, but please inform us of any specific dietary needs when ordering."
    }
  ];

  return (
    <SmoothScroll>
      <Navbar />
      <main className="bg-brand-red min-h-screen text-white pt-48 pb-20 px-6 md:px-12 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 max-w-4xl"
        >
          <h1 className="text-[12vw] md:text-8xl font-black text-brand-yellow uppercase tracking-tighter leading-none mb-6 italic">
            Terms Of<br/>Service.
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium tracking-wide uppercase">
            The Rules for the Hungry.
          </p>
        </motion.div>

        {/* Content Sections Area */}
        <div className="w-full max-w-5xl flex flex-col gap-8 mb-32">
          {terms.map((term, index) => (
            <motion.div 
              key={term.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:border-brand-yellow/30 transition-all flex flex-col md:flex-row gap-8 items-start group"
            >
              <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-yellow/10 transition-colors">
                {term.icon}
              </div>
              <div className="flex-1 lg:max-w-[70%]">
                <h3 className="text-3xl font-black text-brand-yellow uppercase tracking-tight mb-4">{term.title}</h3>
                <p className="text-lg text-white/80 leading-relaxed font-medium italic">
                  {term.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last update tag */}
        <div className="p-6 bg-brand-yellow text-brand-red rounded-full font-black text-sm uppercase tracking-widest px-10 shadow-2xl">
           Last Updated: April 2026
        </div>

      </main>
      <Footer />
    </SmoothScroll>
  );
}

// Custom icons based on lucide
const CheckCircle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ShieldAlert = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);
