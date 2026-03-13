"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-[#C41E3A] text-white px-8 py-24 md:px-24 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-8 italic">EnakPowl</h2>
          <p className="text-xl max-w-sm text-[#FFD700] italic font-medium italic">Young Pepowl&apos;s Favorite RiceBowl.</p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#FFD700] mb-6">Navigation</h4>
          <ul className="flex flex-col gap-4 text-lg">
            <li><a href="#" className="hover:italic transition-all hover:text-[#FFD700]">Home</a></li>
            <li><a href="#" className="hover:italic transition-all hover:text-[#FFD700]">About</a></li>
            <li><a href="#" className="hover:italic transition-all hover:text-[#FFD700]">Menu</a></li>
            <li><a href="#" className="hover:italic transition-all hover:text-[#FFD700]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#FFD700] mb-6">Social</h4>
          <ul className="flex flex-col gap-4 text-lg">
            <li><a href="#" className="hover:italic transition-all hover:text-[#FFD700]">Instagram</a></li>
            <li><a href="#" className="hover:italic transition-all hover:text-[#FFD700]">TikTok</a></li>
            <li><a href="#" className="hover:italic transition-all hover:text-[#FFD700]">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/60 uppercase tracking-widest">© 2026 EnakPowl. All Rights Reserved.</p>
        <div className="flex gap-8 text-xs text-white/60 uppercase tracking-widest">
          <a href="#" className="hover:text-[#FFD700]">Privacy Policy</a>
          <a href="#" className="hover:text-[#FFD700]">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
