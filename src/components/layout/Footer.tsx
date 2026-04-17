"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();
  return (
    <footer id="contact" className="bg-[#C41E3A] text-white px-8 py-24 md:px-24 lg:py-8 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-y-8">
        <div className="md:col-span-2 lg:col-span-12 lg:flex lg:flex-col lg:items-center">
          <h2 className="text-5xl md:text-8xl lg:text-[14vw] lg:leading-[0.75] lg:mb-0 lg:text-center lg:w-full font-bold tracking-tighter uppercase mb-8 italic">EnakPowl</h2>
          <p className="text-xl max-w-sm text-[#FFD700] italic font-medium lg:text-5xl lg:max-w-none lg:text-center lg:mb-4">Young Pepowl&apos;s Favorite RiceBowl.</p>
        </div>
        
        <div className="lg:col-start-4 lg:col-span-3">
          <h4 className="text-xs uppercase tracking-widest text-[#FFD700] mb-6 footer-heading lg:text-2xl lg:mb-4 lg:text-center">Navigation</h4>
          <ul className="flex flex-col gap-4 text-lg lg:text-4xl lg:gap-2 lg:items-center">
            <li>
              <button 
                onClick={() => router.push('/')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer footer-link"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/about')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer footer-link"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/menu')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer footer-link"
              >
                Menu
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/contact')}
                className="hover:italic transition-all hover:text-[#FFD700] cursor-pointer footer-link"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className="lg:col-start-7 lg:col-span-3">
          <h4 className="text-xs uppercase tracking-widest text-[#FFD700] mb-6 footer-heading lg:text-2xl lg:mb-4 lg:text-center">Social</h4>
          <ul className="flex flex-col gap-4 text-lg lg:text-4xl lg:gap-2 lg:items-center">
            <li><a href="https://www.instagram.com/enakpowl.id" target="_blank" className="hover:italic transition-all hover:text-[#FFD700] footer-link">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@enakpowl.id" target="_blank" className="hover:italic transition-all hover:text-[#FFD700] footer-link">TikTok</a></li>
            <li><a href="https://api.whatsapp.com/send/?phone=6281229289012&text&type=phone_number&app_absent=0" target="_blank" className="hover:italic transition-all hover:text-[#FFD700] footer-link">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-24 lg:mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/60 uppercase tracking-widest footer-bottom-text">© 2026 EnakPowl. All Rights Reserved.</p>
        <div className="flex gap-8 text-xs text-white/60 uppercase tracking-widest footer-bottom-text">
          <button onClick={() => router.push('/privacy')} className="hover:text-[#FFD700] cursor-pointer footer-bottom-text">Privacy Policy</button>
          <button onClick={() => router.push('/terms')} className="hover:text-[#FFD700] cursor-pointer footer-bottom-text">Terms of Service</button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-heading {
            font-size: 1.25rem !important;
            margin-bottom: 2rem !important;
          }
          .footer-link {
            font-size: 2.75rem !important;
            line-height: 1 !important;
            font-weight: 900 !important;
            letter-spacing: -0.05em !important;
            text-transform: uppercase !important;
          }
          .footer-bottom-text {
            font-size: 0.875rem !important;
            text-align: center !important;
          }
        }

        /* ============================================
           TABLET PORTRAIT ONLY
           (min-width: 768px) and (max-width: 1024px) and (orientation: portrait)
           iPad Mini / Air / standard / Pro 11" / Pro 12.9" — vertical hold only
           ============================================ */
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
          #contact {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
          #contact > div:first-child {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
            gap: 4rem !important;
          }
          #contact h2 {
            font-size: 5rem !important;
            line-height: 1 !important;
            margin-bottom: 1rem !important;
            text-align: left !important;
          }
          #contact p {
            font-size: 1.5rem !important;
            max-width: 100% !important;
            text-align: left !important;
            margin-bottom: 0 !important;
          }
          #contact div[class*="lg:col-start"], 
          #contact div[class*="md:col-span"] {
            margin: 0 !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            grid-column: span 1 / span 1 !important;
          }
          .footer-heading {
            font-size: 1.5rem !important;
            margin-bottom: 1.5rem !important;
            text-align: left !important;
          }
          .footer-link {
            font-size: 4rem !important;
            line-height: 1.1 !important;
            font-weight: 900 !important;
            letter-spacing: -0.05em !important;
            text-transform: uppercase !important;
            text-align: left !important;
            display: block !important;
          }
          #contact ul {
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
