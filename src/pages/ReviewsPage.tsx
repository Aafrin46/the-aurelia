import React, { useState, useMemo } from 'react';
import { Review } from '../types';

interface ReviewsPageProps {
  reviews: Review[];
  onOpenReviewModal: () => void;
  onVoteHelpful: (reviewId: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  onOpenReviewModal,
  onVoteHelpful
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('highest');
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  const handleVote = (id: string) => {
    onVoteHelpful(id);
    setVotedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const processedReviews = useMemo(() => {
    let list = reviews.filter((rev) => {
      if (selectedCategory === 'all') return true;
      return rev.categories.includes(selectedCategory);
    });

    if (sortBy === 'recent') {
      list.sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());
    } else if (sortBy === 'highest') {
      list.sort((a, b) => b.helpfulCount - a.helpfulCount);
    } else if (sortBy === 'longstay') {
      list.sort((a, b) => {
        const aLong = a.suiteType.toLowerCase().includes('penthouse') || a.suiteType.toLowerCase().includes('luxury');
        const bLong = b.suiteType.toLowerCase().includes('penthouse') || b.suiteType.toLowerCase().includes('luxury');
        return (bLong ? 1 : 0) - (aLong ? 1 : 0);
      });
    }

    return list;
  }, [reviews, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col w-full bg-[#fcf9f0] pb-20">
      {/* 1. Top Ambient Banner */}
      <section className="relative w-full overflow-hidden bg-[#f6f3ea] px-5 md:px-8 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f1eee5] rounded-full mb-3 shadow-xs">
            <span className="material-symbols-outlined text-[#7b5500] text-[15px] fill-1">verified</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#7b5500] font-bold">
              Verified Testimonials
            </span>
          </div>

          <h1 className="font-serif text-[40px] md:text-[50px] text-[#1c1c17] tracking-tight mb-2 max-w-3xl">
            What Our Guests Say
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#4f4536] max-w-2xl leading-relaxed">
            Read reflections from discerning global travelers, patrons, and long-term residents of The Aurelia. Genuine memoirs of tranquil indulgence and discreet hospitality.
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 opacity-40">
            <div className="w-16 h-px bg-[#7b5500]" />
            <span className="material-symbols-outlined text-[#7b5500] text-[14px]">diamond</span>
            <div className="w-16 h-px bg-[#7b5500]" />
          </div>
        </div>
      </section>

      {/* 2. Rating Overview & Accolades Dashboard */}
      <section className="w-full px-5 md:px-8 lg:px-16 -mt-8 relative z-20 pb-12">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border border-[#d3c4b0]/50 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score Column (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e5e2da] pb-6 lg:pb-0">
              <div className="inline-flex items-baseline gap-1">
                <span className="font-serif text-[52px] md:text-[60px] text-[#1c1c17] font-normal tracking-tight">4.95</span>
                <span className="text-[18px] text-[#827564] font-medium">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1 text-[#7b5500] my-2">
                {[1, 2, 3, 4].map((s) => (
                  <span key={s} className="material-symbols-outlined text-[22px] fill-1">star</span>
                ))}
                <span className="material-symbols-outlined text-[22px] fill-1">star_half</span>
              </div>

              <p className="text-[13px] text-[#4f4536] font-medium">
                Based on <strong className="text-[#1c1c17] font-semibold">850+ verified independent guest reviews</strong> across the globe.
              </p>

              <div className="flex flex-col gap-2 mt-5 w-full">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f6f3ea] rounded-lg">
                  <span className="material-symbols-outlined text-[#7d570e] text-[18px]">workspace_premium</span>
                  <span className="text-[11px] tracking-wider uppercase text-[#1c1c17] font-semibold">Prix Villégiature 2025 Winner</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f6f3ea] rounded-lg">
                  <span className="material-symbols-outlined text-[#7b5500] text-[18px] fill-1">hotel_class</span>
                  <span className="text-[11px] tracking-wider uppercase text-[#1c1c17] font-semibold">Forbes Travel Guide 5-Star Rated</span>
                </div>
              </div>
            </div>

            {/* Metric Bars (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4 pl-0 lg:pl-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                
                {/* Cleanliness */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[12px] font-semibold">
                    <span className="uppercase tracking-wider text-[#1c1c17]">Cleanliness &amp; Sanctuary</span>
                    <span className="font-bold text-[#7b5500]">5.0</span>
                  </div>
                  <div className="w-full bg-[#f1eee5] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#7b5500] h-full rounded-full w-full" />
                  </div>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[12px] font-semibold">
                    <span className="uppercase tracking-wider text-[#1c1c17]">Service &amp; Butler Care</span>
                    <span className="font-bold text-[#7b5500]">4.98</span>
                  </div>
                  <div className="w-full bg-[#f1eee5] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#7b5500] h-full rounded-full w-[99.6%]" />
                  </div>
                </div>

                {/* Comfort */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[12px] font-semibold">
                    <span className="uppercase tracking-wider text-[#1c1c17]">Comfort &amp; Suites</span>
                    <span className="font-bold text-[#7b5500]">4.95</span>
                  </div>
                  <div className="w-full bg-[#f1eee5] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#7b5500] h-full rounded-full w-[99%]" />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[12px] font-semibold">
                    <span className="uppercase tracking-wider text-[#1c1c17]">Location &amp; Seclusion</span>
                    <span className="font-bold text-[#7b5500]">4.97</span>
                  </div>
                  <div className="w-full bg-[#f1eee5] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#7b5500] h-full rounded-full w-[99.4%]" />
                  </div>
                </div>

                {/* Dining */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <div className="flex justify-between items-center text-[12px] font-semibold">
                    <span className="uppercase tracking-wider text-[#1c1c17]">Dining &amp; Amenities</span>
                    <span className="font-bold text-[#7b5500]">4.92</span>
                  </div>
                  <div className="w-full bg-[#f1eee5] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#7b5500] h-full rounded-full w-[98.4%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Chips & Sort Controls */}
      <section className="w-full px-5 md:px-8 lg:px-16 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#f6f3ea] p-4 rounded-xl border border-[#d3c4b0]/40">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#7b5500] text-white shadow-xs'
                  : 'bg-white hover:bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500]'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setSelectedCategory('suites')}
              className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'suites'
                  ? 'bg-[#7b5500] text-white shadow-xs'
                  : 'bg-white hover:bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500]'
              }`}
            >
              Suites &amp; Penthouses
            </button>
            <button
              onClick={() => setSelectedCategory('dining')}
              className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'dining'
                  ? 'bg-[#7b5500] text-white shadow-xs'
                  : 'bg-white hover:bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500]'
              }`}
            >
              Dining &amp; Spa
            </button>
            <button
              onClick={() => setSelectedCategory('executive')}
              className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'executive'
                  ? 'bg-[#7b5500] text-white shadow-xs'
                  : 'bg-white hover:bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500]'
              }`}
            >
              Executive Stays
            </button>
            <button
              onClick={() => setSelectedCategory('romantic')}
              className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === 'romantic'
                  ? 'bg-[#7b5500] text-white shadow-xs'
                  : 'bg-white hover:bg-[#f1eee5] text-[#4f4536] hover:text-[#7b5500]'
              }`}
            >
              Romantic Escapes
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="relative inline-block w-44">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white text-[#1c1c17] text-[11px] font-semibold uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-[#d3c4b0]/50 focus:outline-none cursor-pointer appearance-none pr-8"
              >
                <option value="highest">Highest Rated</option>
                <option value="recent">Most Recent</option>
                <option value="longstay">Verified Long Stays</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#827564] text-[18px]">
                expand_more
              </span>
            </div>

            <button
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-1.5 bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[11px] font-semibold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">rate_review</span>
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Review Cards Grid */}
      <section className="w-full px-5 md:px-8 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedReviews.map((rev) => (
            <article
              key={rev.id}
              className="flex flex-col justify-between bg-white rounded-xl p-6 shadow-xs hover:shadow-md border border-[#d3c4b0]/40 transition-shadow"
            >
              <div>
                {/* Header: Author & Verified Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f1eee5] flex items-center justify-center font-serif text-[18px] text-[#7b5500] font-semibold shrink-0">
                      {rev.avatarLetter}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-serif text-[15px] font-semibold text-[#1c1c17] truncate">
                        {rev.author}
                      </span>
                      <span className="text-[11px] text-[#827564]">{rev.location}</span>
                    </div>
                  </div>

                  {rev.isVerified && (
                    <span className="inline-flex items-center gap-0.5 text-[#7b5500] text-[10px] font-bold tracking-widest uppercase bg-[#f6f3ea] px-2 py-0.5 rounded">
                      <span className="material-symbols-outlined text-[12px] fill-1">verified</span>
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Suite details & Date */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] text-[#827564]">
                  <span className="bg-[#f6f3ea] px-2 py-0.5 rounded text-[#7d570e] font-semibold">
                    {rev.suiteType}
                  </span>
                  <span>•</span>
                  <span>{rev.stayDate}</span>
                </div>

                {/* Star display */}
                <div className="flex items-center gap-0.5 text-[#7b5500] mb-2.5">
                  {[...Array(Math.floor(rev.rating))].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[17px] fill-1">star</span>
                  ))}
                </div>

                {/* Quote & Narrative */}
                <p className="font-serif text-[16px] text-[#1c1c17] mb-2 italic font-medium leading-snug">
                  {rev.headline}
                </p>
                <p className="text-[13px] text-[#4f4536] leading-relaxed">
                  {rev.content}
                </p>
              </div>

              {/* Helpfulness footer */}
              <div className="mt-6 pt-3 flex items-center justify-between bg-[#f6f3ea]/50 p-2 rounded-lg">
                <span className="text-[11px] text-[#827564]">Was this helpful?</span>
                <button
                  onClick={() => handleVote(rev.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#f6f3ea] rounded text-[11px] font-semibold transition-colors cursor-pointer border border-[#d3c4b0]/40 ${
                    votedMap[rev.id] ? 'text-[#7b5500] border-[#7b5500]' : 'text-[#1c1c17]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">thumb_up</span>
                  <span>{rev.helpfulCount + (votedMap[rev.id] ? 1 : 0)} Patrons</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Editorial Visual Spotlight Banner */}
      <section className="w-full px-5 md:px-8 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-md border border-[#d3c4b0]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#ebe8df] items-stretch">
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-widest text-[#7d570e] font-bold mb-1">
                Private Estate Chronicles
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#1c1c17] mb-2 leading-tight">
                Quiet Splendor, Recorded by Those Who Know.
              </h2>
              <p className="text-[13px] text-[#4f4536] mb-5 leading-relaxed">
                Our guest book holds memories spanning sovereign dignitaries, world-renowned creators, and families celebrating private milestones under our gold-leaf colonnades.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#ebe8df] bg-[#dddad1] flex items-center justify-center font-bold text-[#7b5500] text-[10px]">EV</div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#ebe8df] bg-[#dddad1] flex items-center justify-center font-bold text-[#7b5500] text-[10px]">HM</div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#ebe8df] bg-[#dddad1] flex items-center justify-center font-bold text-[#7b5500] text-[10px]">DT</div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#ebe8df] bg-[#dddad1] flex items-center justify-center font-bold text-[#7b5500] text-[10px]">SA</div>
                </div>
                <span className="text-[11px] text-[#4f4536] font-medium">98.4% of guests return annually</span>
              </div>
            </div>

            <div className="lg:col-span-7 relative min-h-[300px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7RIFhpsbT9cShuzXCPVvlPevk4KiRB22o08tUA9oIYr2Z8BfJ3rO6dhY8fMrYzBmy6zb93JI7fFyB8wRRqtMn6sFH7_r-wJFeeXoP-CjDF7OqyoDP6Wqxx3joDSK1LZpHH71RvKusL041px4wn-HWXWZPKfCuqZStfwb_arIm8NDMS_yAAMjQiqFjI19Wam-GlxlpFQynXf5Hrat0KQ8MLkk-AAIIpWmORTDoyqPxYr0KFI3k9LLV6g"
                alt="The Aurelia twilight terrace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Share Your Experience Submission Banner */}
      <section className="w-full px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto bg-[#f6f3ea] rounded-xl p-8 md:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden border border-[#d3c4b0]/40">
          <div className="max-w-2xl flex flex-col items-center">
            <span className="material-symbols-outlined text-[#7b5500] text-[36px] mb-2">edit_note</span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1c1c17] mb-2">Share Your Experience</h2>
            <p className="text-[14px] text-[#4f4536] mb-6 leading-relaxed">
              Are you a verified patron of The Aurelia? We hold your impressions in the highest regard. Your reflections guide our continued pursuit of immaculate hospitality.
            </p>
            <button
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-2 bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-widest px-8 py-3 rounded-lg shadow-md transition-all cursor-pointer"
            >
              <span>Submit Verified Reflection</span>
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
