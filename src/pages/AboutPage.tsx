import React from 'react';
import { PageType } from '../types';
import { HOTEL_INFO } from '../data/hotelData';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="pt-24 pb-20 bg-surface">
      {/* Editorial Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 border border-secondary/20 text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm text-secondary">history_edu</span>
            <span>The Aurelia Story</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-on-surface tracking-tight leading-tight">
            A Legacy of Elegance <br />
            <span className="italic text-primary font-normal">Since 1928</span>
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
            An architectural sanctuary born from a century-long tradition of understated European grandeur, discreet service, and refined quiet luxury.
          </p>
        </div>

        {/* Hero Archival Panoramic Image Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 relative group overflow-hidden rounded-2xl border border-outline-variant/30 shadow-2xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_N-KlCypkJMasgJwxhABLUStU-7W2pAmkhtMXkVsRe8gmjZrGEbMzEFQ_wwWl1aD0TEpioC8QSfAJLvtq-C43V18yZWO9KDt86NaIOwWKVrxT_AiTxbMcG7HDKTz9N74Y7lw9vYuvHbvpCptxedja2XqRAzxa6eE7DpN3hO-KAPkMj0KkBMcYroAvzkiDTCR5kI1cdt3J7nOOKEx0SvILpiBuP1tiD1Eqm8ye_yGKMAgQJ1VM4ASyQw" 
              alt="The Aurelia Grand Entrance & Facade"
              className="w-full h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold">1928 Neoclassical Landmark</span>
              <h3 className="font-serif text-2xl font-light">The Grand Porte-Cochère & West Colonnade</h3>
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="relative group overflow-hidden rounded-2xl border border-outline-variant/30 shadow-lg">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_DrMeiFVJQbVc1nZ7HIYLTv45tgWwhrkLHPc7uQBoFDb8jXSxV2B5vBzbbp0blOw27210RsFmzVzoUp6h2gFVqjFDoXeiqLs4kV1DP4-F9KBe6o8janL4Su-K1V-4MBXdsj1snft1o8VdE8bdht1_qaljSHWm5h3v6JwaYHvOWQP5G07nHAqwZ58EikqiqRaBwJPOrYAubx0ANaKnAVPqcdMj7jzS0UtiyCOsnFs-zV7olk-Cc7JkTA" 
                alt="Curated Library Salon"
                className="w-full h-[205px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 text-white">
                <p className="text-xs font-serif italic text-white/90">The Aurelia Reading Salon & Rare Monograph Archive</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/40 space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl">verified</span>
                <h4 className="font-serif text-lg font-medium text-on-surface">Registered Heritage Foundation</h4>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Awarded continuous preservation status by the National Architectural Conservacy for restoring original 1920s hand-carved stone reliefs and Bohemian crystal chandeliers.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-secondary font-semibold">
                <span>Preservation Charter No. 892-A</span>
                <span>Restored 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Lineage */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold">
                <span className="h-px w-6 bg-secondary"></span>
                <span>Chapter One</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-light leading-snug">
                Where Aristocratic Grace <br />
                <span className="italic font-normal text-primary">Meets Contemporary Solace</span>
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-light">
                Commissioned in the autumn of 1928 by financier and cultural patron Julian Sterling, The Aurelia was conceived as an enclave where European heads of state, artists, and literary figures could convene beyond public gaze.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-light">
                Across nearly a century, our walls have absorbed the quiet murmurings of history: treaties drafted over aperitifs in The Gilded Bar, symphonies previewed on our salon grand piano, and generations of travelers finding sanctuary in our meticulously proportioned chambers.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-outline-variant/40">
                <div>
                  <span className="font-serif text-3xl font-light text-on-surface block">98</span>
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider">Years of Lineage</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-light text-on-surface block">64</span>
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider">Restored Chambers</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-light text-on-surface block">100%</span>
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider">Renewable Powered</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-outline-variant/40 shadow-xl">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUYS1d4aSq3GaH0hU_mhZh85cVYWq9mTO0e0Ok0DfjPa6BWANC2o4T3sV70cOBcuPcndGX4KaLBClEYG4RjPhJuqmof8oYd4n1okP7UgdOzdeh50cdRP0M5gN-nvR-EjRheUGRwJlpRO1YY1kVsj8js2jFF_e0ZnkqJl30UW2LFtdRoVJUF_VjEZDP2_KDWEoJyuJhSJkLgmSmI7m89YQ9NjAz_32I2TWLxx1tfXoj7DPfY_oF-3evZw" 
                  alt="Historic Aurelia Grand Foyer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface p-6 rounded-2xl border border-outline-variant/40 shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-secondary">workspace_premium</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-on-surface">Prix Villégiature</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Named Best Heritage Grand Hotel by international hospitality critics for three consecutive years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose The Aurelia - 4 Distinction Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold">
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>The Aurelia Distinction</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-light">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="text-sm text-on-surface-variant font-light">
            Crafted pillars that elevate your stay from merely luxurious to entirely peerless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/40 hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">location_city</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-1">01 / LOCATION</span>
              <h3 className="font-serif text-xl font-medium text-on-surface mb-3">Prime Heritage Quarter</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Positioned on grand Aurelia Boulevard with direct proximity to premier opera houses, high fashion ateliers, and national art galleries.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center text-xs text-secondary font-medium">
              <span>99 Walkability Score</span>
              <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/40 hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-1">02 / GASTRONOMY</span>
              <h3 className="font-serif text-xl font-medium text-on-surface mb-3">Two Michelin Stars</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Led by Chef Laurent Duval, Le Miroir celebrates heritage French culinary methods with hyper-seasonal micro-farm produce and 4,000 vintage cellar bottles.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center text-xs text-secondary font-medium">
              <span>Grand Cru Cellar</span>
              <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/40 hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">directions_car</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-1">03 / CONCIERGE & FLEET</span>
              <h3 className="font-serif text-xl font-medium text-on-surface mb-3">Rolls-Royce Chauffeurs</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Our house fleet of bespoke Rolls-Royce Phantom VIII and electric Porsche sedans provides seamless airport reception and metropolitan transfers.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center text-xs text-secondary font-medium">
              <span>Clefs d'Or Protocol</span>
              <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/40 hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-1">04 / RESPONSIBILITY</span>
              <h3 className="font-serif text-xl font-medium text-on-surface mb-3">Sustainable Stewardship</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                LEED Platinum heritage standard: 100% clean hydro power, zero single-use plastic, and rainwater conservation supporting botanical courtyards.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center text-xs text-secondary font-medium">
              <span>LEED Platinum</span>
              <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Master Hoteliers */}
      <section className="py-20 bg-surface-container border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-secondary font-semibold">The Custodians</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-light">
              Master Hoteliers & Custodians
            </h2>
            <p className="text-sm text-on-surface-variant font-light">
              The seasoned stewards responsible for upholding The Aurelia's ninety-eight year standard of hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUYS1d4aSq3GaH0hU_mhZh85cVYWq9mTO0e0Ok0DfjPa6BWANC2o4T3sV70cOBcuPcndGX4KaLBClEYG4RjPhJuqmof8oYd4n1okP7UgdOzdeh50cdRP0M5gN-nvR-EjRheUGRwJlpRO1YY1kVsj8js2jFF_e0ZnkqJl30UW2LFtdRoVJUF_VjEZDP2_KDWEoJyuJhSJkLgmSmI7m89YQ9NjAz_32I2TWLxx1tfXoj7DPfY_oF-3evZw" 
                  alt="Lady Camilla Sterling"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Managing Director</span>
                <h3 className="font-serif text-xl font-medium text-on-surface">Lady Camilla Sterling</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                  Third-generation custodian preserving the Sterling family philosophy of uncompromising gentility and bespoke European hospitality.
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf2CTGJ9Ldf2IRJ8ZzYltWFVs6vp9zL0gPMHd5kOq6giz8qsul4DSJBwhb-6JoZIv0KpARLC0GWfFvD17UpJHMnX59OPXE08voKKU0PVzZ05B20RWjkQv9mZ9wUN2NnvztkW6gUjrUyvHwT6hHzQ9b_CYSDgeE_VM3ikUbVG7hZ8uwAtpOYEi1ej5FcqK4qSKyCrorXr6hYRxFTIkmsmyd3NVMzipra-GigWBgpOglhAGaLq1SfgwlYA" 
                  alt="Chef Laurent Duval"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Executive Chef & Culinary Director</span>
                <h3 className="font-serif text-xl font-medium text-on-surface">Chef Laurent Duval</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                  Trained across three-star Michelin houses in Lyon and Paris, directing our signature restaurant Le Miroir and the grand subterranean wine cellars.
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_N-KlCypkJMasgJwxhABLUStU-7W2pAmkhtMXkVsRe8gmjZrGEbMzEFQ_wwWl1aD0TEpioC8QSfAJLvtq-C43V18yZWO9KDt86NaIOwWKVrxT_AiTxbMcG7HDKTz9N74Y7lw9vYuvHbvpCptxedja2XqRAzxa6eE7DpN3hO-KAPkMj0KkBMcYroAvzkiDTCR5kI1cdt3J7nOOKEx0SvILpiBuP1tiD1Eqm8ye_yGKMAgQJ1VM4ASyQw" 
                  alt="Jean-Luc Moreau"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Head Concierge, Clefs d'Or</span>
                <h3 className="font-serif text-xl font-medium text-on-surface">Jean-Luc Moreau</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                  President Emeritus of the International Clefs d'Or Chapter, opening unreachable doors and orchestrating seamless moments for our patrons for over 30 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-primary text-on-primary p-8 sm:p-12 lg:p-16 border border-primary-container shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-secondary font-semibold">Your Next Chapter</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light">
              Experience The Aurelia Heritage in Person
            </h2>
            <p className="text-sm text-on-primary/80 font-light leading-relaxed">
              Reserve your chamber or suite directly through our reservation concierge to receive complimentary daily artisanal breakfast, late checkout privileges, and estate credits.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-secondary text-on-secondary font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-lg cursor-pointer"
            >
              Reserve A Chamber
            </button>
            <button
              onClick={() => onNavigate('rooms-and-suites')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/10 transition-colors cursor-pointer"
            >
              Explore Suites
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
