import React, { useState } from 'react';
import { PageType, UserProfile } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  user: UserProfile | null;
  onSignOut: () => void;
  onOpenBooking: (preselectedRoomId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  user,
  onSignOut,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Rooms & Suites', page: 'rooms-and-suites' },
    { label: 'Amenities', page: 'amenities' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'About Us', page: 'about-us' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fcf9f0]/95 backdrop-blur-md border-b border-[#d3c4b0]/40 shadow-[0_4px_20px_-2px_rgba(23,23,23,0.04)]">
      <div className="h-20 w-full px-5 md:px-8 lg:px-16 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Zone: Logo + Name */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            aria-label="The Aurelia Hotel & Residences Home"
          >
            {/* Custom SVG Monogram Logo matching Image 1 */}
            <div className="w-10 h-10 rounded-sm bg-[#7b5500]/10 flex items-center justify-center border border-[#7b5500]/20 text-[#7b5500] shrink-0 group-hover:bg-[#7b5500] group-hover:text-white transition-all">
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 5 L32 34 L26 34 L23 26 L17 26 L14 34 L8 34 Z M18.5 21 L21.5 21 L20 15 Z" />
                <path d="M12 18 Q20 14 28 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="18" y="24" width="4" height="4" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col select-none">
              <span className="font-serif text-[19px] tracking-[0.12em] text-[#1c1c17] uppercase group-hover:text-[#7b5500] transition-colors leading-tight font-semibold">
                The Aurelia
              </span>
              <span className="text-[10px] text-[#7d570e] tracking-[0.25em] uppercase font-sans font-medium">
                Hotel &amp; Residences
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`text-[12px] font-semibold tracking-[0.14em] uppercase py-2 transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-[#7b5500] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#7b5500]'
                    : 'text-[#4f4536] hover:text-[#7b5500]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone: Sign In & Book Now */}
        <div className="flex items-center gap-3 md:gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLinkClick('sign-in')}
                className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#7b5500] hover:text-[#9a6c02] px-2 py-1.5 rounded transition-colors"
                title="View Privilege Club Membership"
              >
                <span className="material-symbols-outlined text-[17px] text-[#7b5500]">stars</span>
                <span className="truncate max-w-[120px]">{user.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={onSignOut}
                className="text-[11px] text-[#827564] hover:text-[#1c1c17] uppercase tracking-wider py-1 px-1.5 transition-colors cursor-pointer"
                title="Sign Out"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleLinkClick('sign-in')}
              className={`text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4f4536] hover:text-[#7b5500] transition-colors py-2 px-1 cursor-pointer ${
                currentPage === 'sign-in' ? 'text-[#7b5500] font-bold' : ''
              }`}
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center justify-center bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-[0.16em] py-2 px-4 md:px-5 rounded-[4px] shadow-[0_4px_14px_rgba(123,85,0,0.2)] hover:shadow-[0_6px_20px_rgba(123,85,0,0.32)] transition-all cursor-pointer shrink-0"
          >
            Book Now
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#1c1c17] hover:text-[#7b5500] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f0] border-b border-[#d3c4b0]/40 px-6 py-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`text-left text-[14px] font-semibold tracking-widest uppercase py-2 border-b border-[#e5e2da] transition-colors ${
                  currentPage === item.page ? 'text-[#7b5500] font-bold pl-2 border-[#7b5500]' : 'text-[#4f4536]'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('sign-in')}
                className="text-left text-[13px] uppercase tracking-wider text-[#7d570e] font-semibold py-1"
              >
                {user ? `Signed in as ${user.name} (Privilege Club)` : 'Sign In / Aurelia Privilege Club'}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full text-center bg-[#7b5500] text-white py-3 rounded text-[12px] font-semibold uppercase tracking-widest shadow-md"
              >
                Book Your Stay
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
