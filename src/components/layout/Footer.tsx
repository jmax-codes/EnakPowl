"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();
  return (
    <footer id="contact" className="bg-[#C41E3A] text-white px-8 py-24 md:px-24 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-8 italic">EnakPowl</h2>
          <p className="text-xl max-w-sm text-[#FFD700] italic font-medium italic">Young Pepowl&apos;s Favorite RiceBowl.</p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#FFD700] mb-6">Navigation</h4>
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <button 
                onClick={() => router.push('/')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/about')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/menu')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer"
              >
                Menu
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/contact')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#FFD700] mb-6">Social</h4>
          <ul className="flex flex-col gap-4 text-lg">
            <li><a href="https://www.instagram.com/enakpowl.id" target="_blank" className="hover:italic transition-all hover:text-[#FFD700]">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@enakpowl.id" target="_blank" className="hover:italic transition-all hover:text-[#FFD700]">TikTok</a></li>
            <li><a href="https://api.whatsapp.com/send/?phone=6281229289012&text&type=phone_number&app_absent=0" target="_blank" className="hover:italic transition-all hover:text-[#FFD700]">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/60 uppercase tracking-widest">© 2026 EnakPowl. All Rights Reserved.</p>
        <div className="flex gap-8 text-xs text-white/60 uppercase tracking-widest">
          <button onClick={() => router.push('/privacy')} className="hover:text-[#FFD700] cursor-pointer">Privacy Policy</button>
          <button onClick={() => router.push('/terms')} className="hover:text-[#FFD700] cursor-pointer">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};
