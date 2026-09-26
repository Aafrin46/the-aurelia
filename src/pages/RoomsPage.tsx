import React, { useState, useMemo } from 'react';
import { Room, PageType } from '../types';
import { INITIAL_ROOMS } from '../data/hotelData';

interface RoomsPageProps {
  onInspectRoom: (room: Room) => void;
  onOpenBooking: (preselectedRoomId?: string) => void;
  onNavigate: (page: PageType) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  onInspectRoom,
  onOpenBooking,
  onNavigate
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGuests, setSelectedGuests] = useState<string>('any');
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<string>('curated');

  // Feature filters
  const [filterBalcony, setFilterBalcony] = useState(false);
  const [filterOceanView, setFilterOceanView] = useState(false);
  const [filterKingBed, setFilterKingBed] = useState(false);
  const [filterJacuzzi, setFilterJacuzzi] = useState(false);

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    let result = INITIAL_ROOMS.filter((room) => {
      // Type
      if (selectedType !== 'all') {
        if (room.tier.toLowerCase() !== selectedType.toLowerCase()) return false;
      }
      // Guests
      if (selectedGuests === '1-2' && room.maxGuests < 2) return false;
      if (selectedGuests === '3+' && room.maxGuests < 3) return false;
      if (selectedGuests === '4+' && room.maxGuests < 4) return false;

      // Price
      if (room.pricePerNight > maxPrice) return false;

      // Features
      if (filterBalcony && !room.hasBalcony) return false;
      if (filterOceanView && !room.hasOceanView) return false;
      if (filterKingBed && !room.hasKingBed) return false;
      if (filterJacuzzi && !room.hasPrivateJacuzzi) return false;

      return true;
    });

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'size-desc') {
      result.sort((a, b) => b.sizeSqm - a.sizeSqm);
    }

    return result;
  }, [
    selectedType,
    selectedGuests,
    maxPrice,
    sortBy,
    filterBalcony,
    filterOceanView,
    filterKingBed,
    filterJacuzzi
  ]);

  return (
    <div className="flex flex-col w-full bg-[#fcf9f0] pb-20">
      {/* 1. Header Strip */}
      <section className="w-full pt-12 pb-10 px-5 md:px-8 lg:px-16 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-8 h-[1px] bg-[#7b5500]/40" />
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7b5500]">
            Accommodations &amp; Suites
          </span>
          <span className="w-8 h-[1px] bg-[#7b5500]/40" />
        </div>

        <h1 className="font-serif text-[40px] sm:text-[48px] text-[#1c1c17] tracking-tight">
          Rooms &amp; Suites
        </h1>

        <p className="font-sans text-[15px] sm:text-[16px] text-[#4f4536] max-w-2xl mx-auto mt-2 leading-relaxed">
          Thoughtfully designed spaces for a comfortable and memorable stay. Every chamber balances architectural purity, tailored tactile linens, and quiet horizon views.
        </p>

        {/* Small decorative ornament */}
        <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
          <span className="material-symbols-outlined text-[#7b5500] text-[14px]">expand_less</span>
          <span className="material-symbols-outlined text-[#7b5500] text-[14px]">diamond</span>
          <span className="material-symbols-outlined text-[#7b5500] text-[14px]">expand_more</span>
        </div>
      </section>

      {/* 2. Interactive Filter Bar (Matches Stitch Design) */}
      <section className="w-full px-5 md:px-8 lg:px-16 mb-12">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-[#d3c4b0]/50 p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-[#e5e2da]">
            {/* Room Type */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e] block mb-1.5">
                Room Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#f6f3ea] border border-[#d3c4b0]/60 rounded px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500] cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="deluxe">Deluxe</option>
                <option value="premium">Premium</option>
                <option value="executive">Executive</option>
                <option value="grand penthouse">Grand Penthouse</option>
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e] block mb-1.5">
                Guests
              </label>
              <select
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(e.target.value)}
                className="w-full bg-[#f6f3ea] border border-[#d3c4b0]/60 rounded px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500] cursor-pointer"
              >
                <option value="any">Any Capacity</option>
                <option value="1-2">Up to 2 Guests</option>
                <option value="3+">3 Guests</option>
                <option value="4+">4+ Guests (Penthouse)</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e]">
                  Price / Night
                </label>
                <span className="text-[11px] font-semibold text-[#7b5500]">
                  ${maxPrice >= 1500 ? '$300 – $1,500+' : `$300 – $${maxPrice}`}
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#7b5500] cursor-pointer mt-1"
              />
            </div>

            {/* Sort Selection */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#7d570e] block mb-1.5">
                Sort Selection
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#f6f3ea] border border-[#d3c4b0]/60 rounded px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500] cursor-pointer"
              >
                <option value="curated">Curated Recommendation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="size-desc">Size: Spacious First</option>
              </select>
            </div>
          </div>

          {/* Feature Filters Strip & Counter */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#827564] mr-1 font-semibold">
                Feature Filters:
              </span>

              <button
                onClick={() => setFilterBalcony(!filterBalcony)}
                className={`px-3 py-1.5 rounded text-[11px] font-medium tracking-wide flex items-center gap-1.5 border transition-all cursor-pointer ${
                  filterBalcony
                    ? 'bg-[#7b5500] text-white border-[#7b5500]'
                    : 'bg-[#f6f3ea] text-[#4f4536] border-[#d3c4b0]/60 hover:bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">balcony</span>
                <span>Balcony</span>
              </button>

              <button
                onClick={() => setFilterOceanView(!filterOceanView)}
                className={`px-3 py-1.5 rounded text-[11px] font-medium tracking-wide flex items-center gap-1.5 border transition-all cursor-pointer ${
                  filterOceanView
                    ? 'bg-[#7b5500] text-white border-[#7b5500]'
                    : 'bg-[#f6f3ea] text-[#4f4536] border-[#d3c4b0]/60 hover:bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">water</span>
                <span>Ocean View</span>
              </button>

              <button
                onClick={() => setFilterKingBed(!filterKingBed)}
                className={`px-3 py-1.5 rounded text-[11px] font-medium tracking-wide flex items-center gap-1.5 border transition-all cursor-pointer ${
                  filterKingBed
                    ? 'bg-[#7b5500] text-white border-[#7b5500]'
                    : 'bg-[#f6f3ea] text-[#4f4536] border-[#d3c4b0]/60 hover:bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">bed</span>
                <span>King Bed</span>
              </button>

              <button
                onClick={() => setFilterJacuzzi(!filterJacuzzi)}
                className={`px-3 py-1.5 rounded text-[11px] font-medium tracking-wide flex items-center gap-1.5 border transition-all cursor-pointer ${
                  filterJacuzzi
                    ? 'bg-[#7b5500] text-white border-[#7b5500]'
                    : 'bg-[#f6f3ea] text-[#4f4536] border-[#d3c4b0]/60 hover:bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">hot_tub</span>
                <span>Private Jacuzzi</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[12px] text-[#4f4536] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#7b5500]" />
              <span>Showing {filteredRooms.length} curated luxury suites</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Rooms Showcase Stack (Exact Stitch Layout) */}
      <section className="w-full px-5 md:px-8 lg:px-16 mb-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {filteredRooms.length === 0 ? (
            <div className="bg-white p-12 rounded-xl text-center border border-[#d3c4b0]/60">
              <span className="material-symbols-outlined text-[36px] text-[#7b5500] mb-2">bed</span>
              <h3 className="font-serif text-xl text-[#1c1c17]">No suites match your specific filters</h3>
              <p className="text-[13px] text-[#4f4536] mt-1 mb-4">Try relaxing the price slider or unchecking feature filters.</p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedGuests('any');
                  setMaxPrice(1500);
                  setFilterBalcony(false);
                  setFilterOceanView(false);
                  setFilterKingBed(false);
                  setFilterJacuzzi(false);
                }}
                className="bg-[#7b5500] text-white text-[12px] font-semibold uppercase px-5 py-2 rounded cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredRooms.map((room) => {
              const isSignature = room.tier === 'Grand Penthouse';

              return (
                <article
                  key={room.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border transition-all ${
                    isSignature ? 'border-[#7b5500]/50 ring-1 ring-[#7b5500]/30' : 'border-[#d3c4b0]/50'
                  }`}
                >
                  {/* Signature Top Banner if applicable */}
                  {isSignature && (
                    <div className="bg-[#7b5500] text-white px-5 py-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        <span>Signature Experience</span>
                      </div>
                      <span className="opacity-90">{room.badge || 'Grand Penthouse Collection'}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Visual Photo (7 cols) */}
                    <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px] bg-[#ebe8df] overflow-hidden group">
                      <img
                        src={room.imageUrl}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-[#fcf9f0]/90 backdrop-blur-md px-2.5 py-1 rounded text-[#7b5500] text-[10px] font-bold uppercase tracking-widest">
                        {room.wing}
                      </div>
                    </div>

                    {/* Editorial Details & Pricing (5 cols) */}
                    <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between gap-5 bg-white">
                      <div>
                        {/* Chamber Index & Price */}
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d570e]">
                            {room.chamberNumber}
                          </span>
                          <div className="text-right">
                            <span className="font-serif text-[26px] font-bold text-[#7b5500] leading-none">
                              ${room.pricePerNight}
                            </span>
                            <span className="text-[11px] text-[#827564] block mt-0.5">/ night</span>
                          </div>
                        </div>

                        <h2 className="font-serif text-2xl md:text-3xl text-[#1c1c17] mb-1 font-normal">
                          {room.name}
                        </h2>
                        
                        {room.subPriceLabel && (
                          <p className="text-[11px] text-[#7d570e] italic mb-3">
                            {room.subPriceLabel}
                          </p>
                        )}

                        {/* Specs Matrix */}
                        <div className="grid grid-cols-2 gap-2 p-3 bg-[#f6f3ea] rounded-lg text-[12px] text-[#4f4536] mb-4">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#7b5500]">group</span>
                            <span>{room.maxGuests} Guests</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#7b5500]">bed</span>
                            <span>{room.bedConfig}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#7b5500]">aspect_ratio</span>
                            <span>{room.sizeSqm} m²</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#7b5500]">nature</span>
                            <span className="truncate">{room.view}</span>
                          </div>
                        </div>

                        <p className="text-[13px] text-[#4f4536] leading-relaxed mb-4">
                          {room.description}
                        </p>

                        {/* Feature Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {room.features.map((feat, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[#f6f3ea] border border-[#d3c4b0]/50 rounded text-[11px] text-[#7d570e] font-medium"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-[#e5e2da] grid grid-cols-2 gap-3">
                        <button
                          onClick={() => onInspectRoom(room)}
                          className="w-full bg-[#f1eee5] hover:bg-[#ebe8df] text-[#1c1c17] text-[12px] font-semibold uppercase tracking-wider py-2.5 rounded-[4px] border border-[#d3c4b0]/60 transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onOpenBooking(room.id)}
                          className="w-full bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-wider py-2.5 rounded-[4px] shadow transition-colors cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* 4. Seasonal Residence / Multi-Room Advisory Banner */}
      <section className="w-full px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto bg-[#f1eee5] rounded-xl p-8 md:p-10 border border-[#d3c4b0]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7b5500] block mb-1">
              Tailored Living
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1c1c17] mb-2">
              Seeking interconnected configurations or an extended seasonal residence?
            </h3>
            <p className="text-[13px] text-[#4f4536] leading-relaxed mb-4">
              Our dedicated Head Concierge and reservation curators orchestrate multi-room family floors, private culinary arrangements, and discrete personalized itineraries.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-wider text-[#7d570e] font-semibold">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                Direct Booking Privileges
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                Flexible Early Check-In
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">security</span>
                Complete Discretion &amp; Security
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-[0.16em] px-6 py-3 rounded-[4px] shadow transition-all cursor-pointer whitespace-nowrap"
            >
              Contact Concierge
            </button>
            <a
              href="tel:+18005550199"
              className="text-[12px] text-[#7d570e] hover:text-[#7b5500] font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>Direct: +1 (800) 555-0199</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
