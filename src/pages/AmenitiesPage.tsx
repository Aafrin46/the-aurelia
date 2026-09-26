import React, { useState } from 'react';
import { AMENITIES_LIST, HOTEL_INFO } from '../data/hotelData';

interface AmenitiesPageProps {
  onOpenAmenityDrawer: (amenityTitle: string) => void;
  onOpenMenuModal: () => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({
  onOpenAmenityDrawer,
  onOpenMenuModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAmenities = AMENITIES_LIST.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.categories.includes(selectedCategory);
  });

  return (
    <div className="flex flex-col w-full bg-[#fcf9f0]">
      {/* 1. Immersive Editorial Header Strip */}
      <section className="relative w-full bg-[#f6f3ea] px-5 md:px-8 lg:px-16 py-16 overflow-hidden">
        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-[#7b5500]/5 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#fdc977]/20 blur-2xl pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-[#7b5500]/40" />
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#7b5500] uppercase">
              Exclusive Offerings
            </span>
            <span className="w-8 h-[1px] bg-[#7b5500]/40" />
          </div>

          <h1 className="font-serif text-[38px] md:text-[54px] text-[#1c1c17] font-normal tracking-tight max-w-3xl mb-3">
            Everything You Need, <span className="italic font-normal text-[#7b5500]">Under One Roof</span>
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#4f4536] max-w-2xl text-center leading-relaxed">
            Curated spaces and bespoke services engineered for total rejuvenation, intellectual stimulation, and effortless comfort.
          </p>

          {/* Key Figures Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-10 pt-8 border-t border-[#d3c4b0]/40">
            {HOTEL_INFO.keyFigures.map((fig, idx) => (
              <div key={idx} className="flex flex-col items-center p-1">
                <span className="font-serif text-3xl md:text-4xl text-[#7b5500] font-normal">
                  {fig.figure}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#4f4536] mt-1 font-semibold">
                  {fig.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Filter Bar */}
      <section className="sticky top-20 z-40 w-full bg-[#fcf9f0]/95 backdrop-blur-md border-b border-[#d3c4b0]/40 py-3 px-5 md:px-8 lg:px-16 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-[12px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#7b5500] text-white shadow-[0_2px_8px_rgba(123,85,0,0.25)]'
                  : 'bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500] hover:bg-[#ebe8df]'
              }`}
            >
              All Inclusions
            </button>

            <button
              onClick={() => setSelectedCategory('wellness')}
              className={`px-4 py-2 rounded-lg text-[12px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'wellness'
                  ? 'bg-[#7b5500] text-white shadow-[0_2px_8px_rgba(123,85,0,0.25)]'
                  : 'bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500] hover:bg-[#ebe8df]'
              }`}
            >
              Wellness &amp; Spa
            </button>

            <button
              onClick={() => setSelectedCategory('recreation')}
              className={`px-4 py-2 rounded-lg text-[12px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'recreation'
                  ? 'bg-[#7b5500] text-white shadow-[0_2px_8px_rgba(123,85,0,0.25)]'
                  : 'bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500] hover:bg-[#ebe8df]'
              }`}
            >
              Recreation &amp; Leisure
            </button>

            <button
              onClick={() => setSelectedCategory('services')}
              className={`px-4 py-2 rounded-lg text-[12px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'services'
                  ? 'bg-[#7b5500] text-white shadow-[0_2px_8px_rgba(123,85,0,0.25)]'
                  : 'bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500] hover:bg-[#ebe8df]'
              }`}
            >
              Bespoke Services
            </button>

            <button
              onClick={() => setSelectedCategory('business')}
              className={`px-4 py-2 rounded-lg text-[12px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'business'
                  ? 'bg-[#7b5500] text-white shadow-[0_2px_8px_rgba(123,85,0,0.25)]'
                  : 'bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500] hover:bg-[#ebe8df]'
              }`}
            >
              Business &amp; Salons
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[#4f4536] text-[11px] uppercase tracking-widest font-semibold shrink-0">
            <span className="material-symbols-outlined text-[16px] text-[#7b5500]">verified</span>
            <span>All amenities complimentary for resident guests</span>
          </div>
        </div>
      </section>

      {/* 3. Main Showcase Grid Section (9 Cards) */}
      <section className="w-full px-5 md:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAmenities.map((amenity) => (
              <article
                key={amenity.id}
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl border border-[#d3c4b0]/40 transition-all duration-300"
              >
                {/* Visual Thumbnail or Mesh Graphic */}
                {amenity.isMeshVisual ? (
                  <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-[#ebe8df] via-[#f6f3ea] to-[#e5e2da] flex flex-col justify-end p-5">
                    {/* Technical Elegance Mesh Graphic */}
                    <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
                      <svg className="text-[#7b5500] animate-pulse" height="240" viewBox="0 0 200 200" width="240">
                        <circle cx="100" cy="100" fill="none" r="80" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                        <circle cx="100" cy="100" fill="none" r="55" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="100" cy="100" fill="none" r="30" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" />
                        <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="0.75" />
                      </svg>
                    </div>

                    <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[#7b5500] font-serif text-[22px] font-bold">1,000 Mbps</div>
                          <div className="text-[11px] uppercase tracking-wider text-[#4f4536] font-medium">Symmetric Ultra-Low Latency</div>
                        </div>
                        <span className="material-symbols-outlined text-[32px] text-[#7b5500]">wifi</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-64 w-full overflow-hidden bg-[#ebe8df]">
                    <img
                      src={amenity.imageUrl}
                      alt={amenity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Location Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-white/90 backdrop-blur-md text-[#7b5500] text-[10px] font-bold uppercase tracking-widest">
                        {amenity.location}
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                      <span className="tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-[#f6bd57]">schedule</span>
                        <span>{amenity.hours}</span>
                      </span>
                      <span className="uppercase tracking-widest text-[#f6bd57] font-bold">
                        {amenity.highlightTag}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-serif text-[21px] text-[#1c1c17] font-normal">{amenity.title}</h3>
                      <span className="material-symbols-outlined text-[#7b5500] text-[22px]">{amenity.iconName}</span>
                    </div>
                    <p className="text-[13px] text-[#4f4536] leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#d3c4b0]/40 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#7d570e] text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[15px]">{amenity.metricIcon}</span>
                      <span>{amenity.metricLabel}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (amenity.id === 'room-service') {
                          onOpenMenuModal();
                        } else {
                          onOpenAmenityDrawer(amenity.actionPayload);
                        }
                      }}
                      className="text-[#7b5500] hover:text-[#9a6c02] text-[12px] font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{amenity.actionText}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Editorial Highlight / Signature Experience Feature */}
      <section className="w-full bg-[#f6f3ea] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#7b5500] text-[20px]">diamond</span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7b5500] font-bold">Signature Standard</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-[#1c1c17]">
              An Unhurried Philosophy <span className="italic font-normal text-[#7b5500]">of Service</span>
            </h2>

            <p className="text-[15px] text-[#4f4536] leading-relaxed">
              At The Aurelia, amenities are not merely line items in a directory; they are seamless orchestrations tailored to your natural rhythm. Whether commissioning a midnight feast through private in-suite dining or coordinating a private morning swim as the sun rises over the capital, every encounter is handled with quiet competence and authentic warmth.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#d3c4b0]/40">
              <div className="flex flex-col">
                <span className="font-serif text-[17px] text-[#1c1c17] font-semibold">Effortless Arrival</span>
                <span className="text-[13px] text-[#4f4536] mt-1">Direct curbside in-suite check-in without queue or formality.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[17px] text-[#1c1c17] font-semibold">Curated Wellness</span>
                <span className="text-[13px] text-[#4f4536] mt-1">Bespoke pillow menus, circadian lighting, and organic teas.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWP_OII0KrYxzkxPleU7_2gGe4OVGpQdJXeaMfaWO8b9FaQmGyAhd3iH2AdMLpFesvlc9f8lKsKkOKspaqw-3Q0tSBTL9S7wdYNynxxtjMfnDKY6tp_2l8wFCeEfUQn05fdEHsIyXPzTZrwThZV4kEwhbZayXj4RSX8paI655zN1f4WUtPGScs10lamAtJjpRstfG85ZfDNjvwYOrB2sarR1mYtLBWIAR2LEyw674DZdpSrrb2duKonw"
                alt="Aristocratic hotel lounge interior"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#f6bd57] font-bold">The Aurelia Protocol</span>
                <p className="font-serif text-[22px] italic mt-1 font-normal">“Luxury is the absence of unnecessary friction.”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bespoke Concierge Consultation Banner */}
      <section className="w-full px-5 md:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto rounded-xl bg-gradient-to-r from-[#ebe8df] via-[#f1eee5] to-[#f6f3ea] p-8 md:p-12 relative overflow-hidden shadow-md border border-[#d3c4b0]/40">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#7b5500]">
                <span className="material-symbols-outlined text-[18px]">hotel_class</span>
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold">Personalized Attention</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#1c1c17]">
                Have a Specific Requirement or Private Itinerary?
              </h2>
              <p className="text-[14px] text-[#4f4536] leading-relaxed">
                Our Head Concierge and Master of Ceremonies are poised to coordinate bespoke transfers, private museum viewings, custom dietary provisions, or exclusive salon bookings before your arrival.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => onOpenAmenityDrawer('Head Concierge Consultation')}
                className="w-full sm:w-auto bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-widest py-3 px-6 rounded-[4px] shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Inquire With Head Concierge
              </button>
              <a
                href="tel:+18005550199"
                className="w-full sm:w-auto bg-white hover:bg-[#f6f3ea] text-[#1c1c17] text-[12px] font-semibold uppercase tracking-widest py-3 px-5 rounded-[4px] border border-[#d3c4b0]/60 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[17px] text-[#7b5500]">phone_in_talk</span>
                <span>Direct Line</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
