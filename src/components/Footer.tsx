import React, { useState } from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'accessibility') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Aurelia Hotel & Residences',
        text: 'An architectural sanctuary born from a century-long tradition of understated European grandeur.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <footer className="w-full bg-[#f6f3ea] border-t border-[#d3c4b0]/40 pt-16 pb-10">
      <div className="w-full px-5 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#d3c4b0]/40">
          
          {/* Col 1: Brand & Socials (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#7b5500]/10 flex items-center justify-center border border-[#7b5500]/30 text-[#7b5500]">
                <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current">
                  <path d="M20 5 L32 34 L26 34 L23 26 L17 26 L14 34 L8 34 Z M18.5 21 L21.5 21 L20 15 Z" />
                  <path d="M12 18 Q20 14 28 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="font-serif text-[18px] text-[#1c1c17] tracking-[0.14em] uppercase font-semibold">
                The Aurelia
              </span>
            </div>

            <p className="font-sans text-[13px] leading-relaxed text-[#4f4536] max-w-sm">
              Luxury, comfort, and exceptional hospitality. A sanctuary of understated grandeur and bespoke attentiveness in the heart of the metropolis.
            </p>

            {/* Social / Utility Buttons */}
            <div className="flex items-center gap-2 mt-1 relative">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-[4px] border border-[#d3c4b0]/70 flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] hover:border-[#7b5500] transition-colors cursor-pointer"
                title="Share The Aurelia"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-[17px]">share</span>
              </button>
              
              <button
                onClick={() => onNavigate('rooms-and-suites')}
                className="w-9 h-9 rounded-[4px] border border-[#d3c4b0]/70 flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] hover:border-[#7b5500] transition-colors cursor-pointer"
                title="View Photo Gallery"
                aria-label="Photo Gallery"
              >
                <span className="material-symbols-outlined text-[17px]">photo_camera</span>
              </button>
              
              <button
                onClick={() => onNavigate('contact')}
                className="w-9 h-9 rounded-[4px] border border-[#d3c4b0]/70 flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] hover:border-[#7b5500] transition-colors cursor-pointer"
                title="Global Locations"
                aria-label="Locations"
              >
                <span className="material-symbols-outlined text-[17px]">public</span>
              </button>

              {shareCopied && (
                <span className="absolute -top-8 left-0 bg-[#1c1c17] text-white text-[11px] px-2 py-0.5 rounded shadow">
                  Link copied!
                </span>
              )}
            </div>
          </div>

          {/* Col 2: Navigation (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#7d570e] font-semibold">
              Navigation
            </span>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[13px] text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => { onNavigate('rooms-and-suites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[13px] text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
              >
                Rooms &amp; Suites
              </button>
              <button
                onClick={() => { onNavigate('amenities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[13px] text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
              >
                Amenities
              </button>
              <button
                onClick={() => { onNavigate('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[13px] text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
              >
                Guest Reviews
              </button>
              <button
                onClick={() => { onNavigate('about-us'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[13px] text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-[13px] text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Col 3: Concierge & Location (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#7d570e] font-semibold">
              Concierge &amp; Location
            </span>
            <div className="flex flex-col gap-2.5 text-[13px] text-[#4f4536]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#7b5500] shrink-0 mt-0.5">location_on</span>
                <span>108 Aurelia Boulevard, Grand Avenue, Heritage District</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#7b5500] shrink-0">call</span>
                <a href="tel:+18005550199" className="hover:text-[#7b5500] transition-colors">+1 (800) 555-0199</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#7b5500] shrink-0">mail</span>
                <a href="mailto:aafrin512@theaureliahotel.com" className="hover:text-[#7b5500] transition-colors truncate">
                  aafrin512@theaureliahotel.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#7d570e] text-[11px] uppercase tracking-wider mt-1 font-semibold">
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                <span>24/7 Dedicated Butler Service</span>
              </div>
            </div>
          </div>

          {/* Col 4: The Aurelia Journal (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#7d570e] font-semibold">
              The Aurelia Journal
            </span>
            <p className="text-[13px] text-[#4f4536] leading-relaxed">
              Receive bespoke travel journals, private salon invitations, and seasonal offers.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <div className="relative flex items-center border-b border-[#7b5500]/50 focus-within:border-[#7b5500] pb-1.5 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent text-[13px] text-[#1c1c17] placeholder:text-[#4f4536]/60 focus:outline-none pr-8"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Journal"
                  className="absolute right-0 text-[#7b5500] hover:text-[#9a6c02] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>

              {subscribed ? (
                <span className="text-[11px] text-[#7b5500] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  Thank you. Your invitation is recorded.
                </span>
              ) : (
                <span className="text-[10px] text-[#4f4536]/70">
                  Unsubscribe at any time. Respecting your privacy strictly.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#4f4536]/80 font-sans tracking-wide">
          <p>© 2026 The Aurelia Hotel Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#7b5500] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#7b5500] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegal('accessibility')}
              className="hover:text-[#7b5500] transition-colors cursor-pointer"
            >
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
