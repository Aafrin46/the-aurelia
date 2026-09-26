import React, { useState } from 'react';
import { PageType, Room } from '../types';
import { HOTEL_INFO, INITIAL_ROOMS } from '../data/hotelData';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (preselectedRoomId?: string) => void;
  onInspectRoom: (room: Room) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onInspectRoom
}) => {
  const [quickCheckIn, setQuickCheckIn] = useState('2026-10-15');
  const [quickCheckOut, setQuickCheckOut] = useState('2026-10-18');
  const [quickGuests, setQuickGuests] = useState('2');
  const [quickRoomTier, setQuickRoomTier] = useState('all');

  const handleQuickAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickRoomTier !== 'all') {
      const matched = INITIAL_ROOMS.find((r) => r.tier.toLowerCase() === quickRoomTier);
      onOpenBooking(matched ? matched.id : undefined);
    } else {
      onOpenBooking();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Grand Neoclassical Hero Section */}
      <section className="relative w-full min-h-[90vh] bg-[#e5e2da] overflow-hidden flex flex-col justify-end">
        {/* Background Image with warm architectural lighting */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDs8NBZrTd5nGn_rEGaF4QC3o-pfIq3OANgfGrWTGps6Edeb2OzqwH8MTZtBOKf56zHjqtzi2M4Ad7HieQg-CWC94bTwKwV-r7YA5y5kaVBZUHMlxuUbq_2x5dU409ZkFmxVwsxoz7pqvKiwSdMBTefZZQuYMXWmzBDHsCX_Q2Wsx9qGnYTlBLTNxLVnQOMVPE-kNwf_k7JkdyYDXdcIV8xZ177KHAngSCCAU-VtKxbdty5W8K5xm3fA')`
          }}
        >
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f0] via-[#fcf9f0]/40 to-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pt-36 pb-20 max-w-7xl mx-auto flex flex-col justify-end">
          <div className="max-w-3xl flex flex-col gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#7b5500]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7b5500]">
                Est. 1928 • Heritage Landmark
              </span>
            </div>

            <h1 className="font-serif text-[42px] sm:text-[54px] lg:text-[68px] text-[#1c1c17] leading-[1.08] tracking-tight">
              An Architectural Sanctuary <br />
              <span className="italic font-normal text-[#7b5500]">of Understated Grandeur</span>
            </h1>

            <p className="font-sans text-[16px] sm:text-[18px] text-[#4f4536] max-w-2xl leading-relaxed mt-1">
              Conceived in 1928 for sovereign travelers, artists, and diplomats. Where timeless neoclassical proportions meet acoustic stillness and bespoke European hospitality.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => onOpenBooking()}
                className="bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-[0.16em] px-8 py-3.5 rounded-[4px] shadow-[0_4px_14px_rgba(123,85,0,0.25)] hover:shadow-[0_6px_20px_rgba(123,85,0,0.35)] transition-all cursor-pointer"
              >
                Reserve Your Stay
              </button>

              <button
                onClick={() => onNavigate('rooms-and-suites')}
                className="bg-white/80 hover:bg-white text-[#1c1c17] text-[12px] font-semibold uppercase tracking-[0.14em] px-6 py-3.5 rounded-[4px] border border-[#d3c4b0]/70 backdrop-blur-sm transition-all cursor-pointer"
              >
                Explore Accommodations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Reservation Bar Strip */}
      <section className="relative z-30 w-full px-5 md:px-8 lg:px-16 -mt-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border border-[#d3c4b0]/60 p-4 md:p-6">
          <form onSubmit={handleQuickAvailability} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e] block mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full bg-[#f6f3ea] border border-[#d3c4b0]/60 rounded px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e] block mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={quickCheckOut}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                className="w-full bg-[#f6f3ea] border border-[#d3c4b0]/60 rounded px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e] block mb-1">
                Guests
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="w-full bg-[#f6f3ea] border border-[#d3c4b0]/60 rounded px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500] cursor-pointer"
              >
                <option value="1">1 Guest (Solo)</option>
                <option value="2">2 Guests (Couple)</option>
                <option value="3">3 Guests (Executive)</option>
                <option value="4">4+ Guests (Penthouse)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e] block mb-1">
                Accommodations
              </label>
              <select
                value={quickRoomTier}
                onChange={(e) => setQuickRoomTier(e.target.value)}
                className="w-full bg-[#f6f3ea] border border-[#d3c4b0]/60 rounded px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500] cursor-pointer"
              >
                <option value="all">All Chambers &amp; Suites</option>
                <option value="deluxe">Deluxe Room ($420)</option>
                <option value="premium">Premium Room ($650)</option>
                <option value="executive">Executive Suite ($890)</option>
                <option value="grand penthouse">Aurelia Luxury Suite ($1,250)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-[0.16em] py-2.5 rounded shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Check Dates</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Key Figures Strip */}
      <section className="w-full py-16 px-5 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-b border-[#d3c4b0]/40 py-10">
          {HOTEL_INFO.keyFigures.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="font-serif text-3xl sm:text-4xl text-[#7b5500] font-normal">
                {item.figure}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4f4536] mt-1.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Accommodations Spotlight (Matches Stitch Design) */}
      <section className="w-full py-12 px-5 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-px bg-[#7b5500]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7d570e]">
                Chambers &amp; Residencies
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1c1c17] mt-1">
              Curated Accommodations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('rooms-and-suites')}
            className="text-[#7b5500] hover:text-[#9a6c02] text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1 self-start md:self-auto cursor-pointer"
          >
            <span>View All 4 Suites</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Suite Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_ROOMS.slice(0, 2).map((room) => (
            <article 
              key={room.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-[#d3c4b0]/40 flex flex-col transition-all group"
            >
              <div className="relative h-72 w-full overflow-hidden bg-[#ebe8df]">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#fcf9f0]/90 backdrop-blur-md px-2.5 py-1 rounded text-[#7b5500] text-[10px] font-bold uppercase tracking-widest">
                  {room.wing}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded text-[13px] font-serif font-bold">
                  ${room.pricePerNight} <span className="text-[10px] font-sans font-normal opacity-80">/ night</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#7d570e] font-semibold uppercase tracking-wider block mb-1">
                    {room.chamberNumber}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1c1c17] mb-2">{room.name}</h3>
                  <p className="text-[13px] text-[#4f4536] leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d3c4b0]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[12px] text-[#827564]">
                    <span>{room.sizeSqm} m²</span>
                    <span>•</span>
                    <span>{room.maxGuests} Guests</span>
                    <span>•</span>
                    <span>{room.view}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onInspectRoom(room)}
                      className="text-[#4f4536] hover:text-[#7b5500] text-[11px] font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[11px] font-semibold uppercase tracking-widest px-4 py-2 rounded shadow transition-all cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. The Hotel Experience (Atrium, Library Salon, Rooftop) */}
      <section className="w-full py-20 bg-[#f1eee5]">
        <div className="px-5 md:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7b5500]">
              Spatial Elegance
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1c1c17] mt-1">
              The Hotel Experience
            </h2>
            <p className="text-[14px] text-[#4f4536] mt-2">
              Glimpses into the understated corners where timeless design inspires contemplative moments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC2JgohWaGQUCrMWrVeyoKXsU4sF7mwF_8H_krIrGDl08s8pVG9Cb5yBpUFdYzV2Y5_GXRpJUms2JaGIp--PTh4R8jySR17P3g-IpMOEy_ovSKGHYycdHRjmGAMEWQDOimKEhn4vof9D3QGrjuZYZKfZbnF265GxS2i2cvZSCZSmoKIEwfR1_TNTvo6m6kfJqXdicZm8W6GdOauJA9EyMnYuusWV0z349YRwzkn4qOKHSM_K23HwpG9g"
                  alt="The Grand Atrium"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#fcf9f0]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[#7b5500] text-[10px] tracking-widest uppercase font-semibold">
                  The Grand Atrium
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] text-[#7d570e] uppercase tracking-widest font-semibold">Arrival</span>
                  <h3 className="font-serif text-[18px] text-[#1c1c17] mt-0.5 mb-2">The Lobby Atrium</h3>
                  <p className="text-[13px] text-[#4f4536] leading-relaxed">
                    Bathed in soft natural skylight, our central court balances monumental Italian marble arches with intimate conversational alcoves.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#d3c4b0]/30 text-[11px] uppercase tracking-wider text-[#827564]">
                  Morning to Midnight
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt-enAreVzoTC4pPbUKGvh0WZDooqnRjdBbZ0RJAC1--LWLmzyCllldN3-oWCsHUGq4On73Lc-OIMTreXBER0YK_mFxKBWMtDgaYLyPKLHGfK8WnzMa8TDRioffy1AHtRpXYTeT0kHU3oWahykU5w-LuFLp_XutgKBDNMmdnSPlZcN8jO-zCTZVouBExZDNYLuMecU-etQwRQ-wbzugsdkf9X8SB_LoSWWwWgP9LP3H4v91RFmnRJjog"
                  alt="The Sovereign Salon"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#fcf9f0]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[#7b5500] text-[10px] tracking-widest uppercase font-semibold">
                  The Sovereign Salon
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] text-[#7d570e] uppercase tracking-widest font-semibold">Sanctuary</span>
                  <h3 className="font-serif text-[18px] text-[#1c1c17] mt-0.5 mb-2">The Library Salon</h3>
                  <p className="text-[13px] text-[#4f4536] leading-relaxed">
                    Home to over 4,000 rare volumes, bespoke teas, and single-estate cognacs beside an ever-present travertine hearth.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#d3c4b0]/30 text-[11px] uppercase tracking-wider text-[#827564]">
                  Private Curated Hours
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNm-tlodayXAf9tMfolfXqdLOpwFkUTgEgD5F2cPvBqIxYJfltMkUSLoLIZ5YTZ6ZogUBve2tFKYGs5_GlIhAuTfMHh8yaIiouNR2q2AGTHQsviIMPnb6m3Mojg6uxJtH9cq-LaCwzOfXnvrH482XSa-KXcw5dt6gOhoKBV8Cg3-ICxg4ZQBrJECCNdN2kf_oqnqiyJcJRSbgB3micYn6pVEEHkMWOknT9qJmhbQSO883tYFV0PF3PdQ"
                  alt="The Skyline Terrace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#fcf9f0]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[#7b5500] text-[10px] tracking-widest uppercase font-semibold">
                  The Skyline Terrace
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] text-[#7d570e] uppercase tracking-widest font-semibold">Panorama</span>
                  <h3 className="font-serif text-[18px] text-[#1c1c17] mt-0.5 mb-2">The Twilight Rooftop</h3>
                  <p className="text-[13px] text-[#4f4536] leading-relaxed">
                    Unrivaled vistas across the historic metropolis paired with botanical aperitifs and low firelight as dusk settles over the city.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#d3c4b0]/30 text-[11px] uppercase tracking-wider text-[#827564]">
                  Reservations Essential
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Philosophy & Sovereign Standard Banner */}
      <section className="w-full py-20 px-5 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="bg-[#f6f3ea] rounded-xl p-8 md:p-14 border border-[#d3c4b0]/50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7b5500]">
              The Sovereign Difference
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1c1c17]">
              “Luxury is the absence of unnecessary friction.”
            </h2>
            <p className="text-[14px] text-[#4f4536] leading-relaxed">
              At The Aurelia, amenities are not merely line items in a directory; they are seamless orchestrations tailored to your natural rhythm. Whether commissioning a midnight feast through private in-suite dining or coordinating a private morning swim as the sun rises over the capital.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('about-us')}
                className="text-[#7b5500] hover:text-[#9a6c02] text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <span>Read Our Heritage Lineage</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-[#d3c4b0]/50 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7b5500]/10 flex items-center justify-center text-[#7b5500]">
                <span className="material-symbols-outlined text-[20px]">hotel_class</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#1c1c17]">4.95 / 5.0</span>
                <span className="text-[11px] text-[#827564] block">850+ Verified Global Reviews</span>
              </div>
            </div>

            <div className="text-[13px] text-[#4f4536] italic">
              “The concierge organized a private gallery viewing at midnight. Unrivaled serenity in the city center. Every subtle detail was curated with flawless precision.”
            </div>

            <div className="text-[11px] uppercase tracking-wider text-[#7d570e] font-semibold">
              — Eleanor Vance-Sterling, London
            </div>

            <button
              onClick={() => onNavigate('reviews')}
              className="w-full text-center bg-[#f6f3ea] hover:bg-[#ebe8df] text-[#1c1c17] py-2 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Browse Guest Reflections
            </button>
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action */}
      <section className="w-full py-20 px-5 md:px-8 lg:px-16 pb-28">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7b5500] mb-2">
            Your Journey Begins
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1c1c17] mb-3">
            Experience The Aurelia
          </h2>
          <p className="text-[15px] text-[#4f4536] max-w-xl mb-8 leading-relaxed">
            Reserve your bespoke sanctuary today or consult our reservations concierge for tailored residential suites and exclusive access.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-[0.16em] px-8 py-3.5 rounded-[4px] shadow-lg transition-all cursor-pointer"
            >
              Book Your Stay
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-white hover:bg-[#f6f3ea] text-[#1c1c17] text-[12px] font-semibold uppercase tracking-[0.14em] px-8 py-3.5 rounded-[4px] border border-[#d3c4b0]/70 transition-all cursor-pointer"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
