"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ShieldCheck, Lock, Eye, CheckCircle } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Introduction",
      icon: <ShieldCheck className="w-6 h-6 text-brand-yellow" />,
      content: "At EnakPowl, we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide when interacting with our delicious ricebowls and digital platforms."
    },
    {
      title: "Data Collection",
      icon: <Eye className="w-6 h-6 text-brand-yellow" />,
      content: "We collect information necessary to fulfill your cravings: your name, contact details, delivery address, and payment preferences. This happens when you order through our site or partner apps like GoFood, GrabFood, and ShopeeFood."
    },
    {
      title: "How We Use It",
      icon: <CheckCircle className="w-6 h-6 text-brand-yellow" />,
      content: "Your data helps us ensure every bowl reaches you hot and fresh. We also use it to improve our recipes, personalize your experience, and keep you in the loop about new signature flavors and special Pepowl-exclusive promos."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6 text-brand-yellow" />,
      content: "We implement robust security measures to protect your data from unauthorized access. We never sell your personal information to third parties; your data is shared only with trusted delivery partners to facilitate your orders."
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
            Privacy<br/>Policy.
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium tracking-wide uppercase">
            Your trust is our secret ingredient.
          </p>
        </motion.div>

        {/* Content Sections Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
          {sections.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-brand-yellow/30 transition-all group"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-black text-brand-yellow uppercase tracking-tight">{section.title}</h3>
              </div>
              <p className="text-lg text-white/80 leading-relaxed font-medium italic">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact info for policy */}
        <div className="text-center p-12 bg-white/5 rounded-[3rem] border border-white/10 max-w-3xl w-full">
           <h4 className="text-brand-yellow uppercase tracking-widest text-xs font-bold mb-4">Questions about your data?</h4>
           <a 
             href="mailto:contact@enakpowl.id" 
             className="text-3xl font-black hover:text-brand-yellow transition-colors"
           >
             contact@enakpowl.id
           </a>
        </div>

      </main>
      <Footer />
    </SmoothScroll>
  );
}
