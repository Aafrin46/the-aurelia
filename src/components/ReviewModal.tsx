import React, { useState } from 'react';
import { Review } from '../types';
import { submitReviewApi } from '../services/api';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [author, setAuthor] = useState('');
  const [suiteType, setSuiteType] = useState('Aurelia Luxury Suite');
  const [stayDate, setStayDate] = useState('October 2026');
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'suites' | 'dining' | 'executive' | 'romantic'>('suites');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const res = await submitReviewApi({
        author: author || 'Distinguished Patron',
        location: 'Resident Guest',
        suiteType,
        stayDate: `Stayed ${stayDate}`,
        rating,
        headline: `“${headline.replace(/^["“”]|["“”]$/g, '')}”`,
        content,
        category,
      });

      const serverRev = res.review;
      const newRev: Review = {
        id: serverRev?.id ? String(serverRev.id) : `rev-custom-${Date.now()}`,
        author: serverRev?.author || author || 'Distinguished Patron',
        location: serverRev?.location || 'Resident Guest',
        avatarLetter: (author ? author.charAt(0) : 'P').toUpperCase(),
        suiteType: serverRev?.suiteType || suiteType,
        stayDate: serverRev?.stayDate || `Stayed ${stayDate}`,
        rawDate: serverRev?.rawDate || new Date().toISOString().split('T')[0],
        rating: serverRev?.rating || rating,
        headline: serverRev?.headline || `“${headline.replace(/^["“”]|["“”]$/g, '')}”`,
        content: serverRev?.content || content,
        helpfulCount: serverRev?.helpfulCount || 1,
        category,
        categories: [category],
        isVerified: true
      };

      onSubmitReview(newRev);
    } catch {
      // Fallback
      const newRev: Review = {
        id: `rev-custom-${Date.now()}`,
        author: author || 'Distinguished Patron',
        location: 'Resident Guest',
        avatarLetter: (author ? author.charAt(0) : 'P').toUpperCase(),
        suiteType,
        stayDate: `Stayed ${stayDate}`,
        rawDate: new Date().toISOString().split('T')[0],
        rating,
        headline: `“${headline.replace(/^["“”]|["“”]$/g, '')}”`,
        content,
        helpfulCount: 1,
        category,
        categories: [category],
        isVerified: true
      };
      onSubmitReview(newRev);
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setAuthor('');
      setHeadline('');
      setContent('');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative border border-[#d3c4b0]/70"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f1eee5]">
          <div>
            <h3 className="font-serif text-[20px] text-[#1c1c17] font-semibold">Patron Reflection</h3>
            <p className="text-[12px] text-[#4f4536]">Please share your confidential stay experience.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1eee5] flex items-center justify-center text-[#1c1c17] hover:text-[#7b5500] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-[36px] text-[#7b5500] mb-2">check_circle</span>
            <p className="font-serif text-lg text-[#1c1c17]">Thank you for your reflection</p>
            <p className="text-[13px] text-[#4f4536] mt-1">Your review has been recorded in the Guest Ledger.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Lord Alistair Croft"
                className="w-full bg-[#f6f3ea] text-[#1c1c17] rounded-lg px-3.5 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#7b5500] border border-[#d3c4b0]/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold mb-1">
                  Suite / Residence
                </label>
                <select
                  value={suiteType}
                  onChange={(e) => setSuiteType(e.target.value)}
                  className="w-full bg-[#f6f3ea] text-[#1c1c17] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#7b5500] border border-[#d3c4b0]/50 cursor-pointer"
                >
                  <option value="Aurelia Luxury Suite">Aurelia Luxury Suite</option>
                  <option value="Penthouse Residence">Penthouse Residence</option>
                  <option value="Executive Suite">Executive Suite</option>
                  <option value="Premium Room">Premium Room</option>
                  <option value="Deluxe Room">Deluxe Room</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold mb-1">
                  Experience Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#f6f3ea] text-[#1c1c17] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#7b5500] border border-[#d3c4b0]/50 cursor-pointer"
                >
                  <option value="suites">Suites &amp; Penthouses</option>
                  <option value="dining">Dining &amp; Spa</option>
                  <option value="executive">Executive Stays</option>
                  <option value="romantic">Romantic Escapes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold mb-1">
                  Stay Period
                </label>
                <input
                  type="text"
                  required
                  value={stayDate}
                  onChange={(e) => setStayDate(e.target.value)}
                  placeholder="e.g. October 2026"
                  className="w-full bg-[#f6f3ea] text-[#1c1c17] rounded-lg px-3.5 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#7b5500] border border-[#d3c4b0]/50"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-1 text-[#7b5500] py-1.5 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <span className="material-symbols-outlined text-[22px] fill-1">
                        {star <= rating ? 'star' : 'star_outline'}
                      </span>
                    </button>
                  ))}
                  <span className="text-[12px] font-bold ml-1 text-[#1c1c17]">{rating}.0</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold mb-1">
                Headline *
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Brief summary of your time with us"
                className="w-full bg-[#f6f3ea] text-[#1c1c17] rounded-lg px-3.5 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#7b5500] border border-[#d3c4b0]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold mb-1">
                Your Narrative *
              </label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share specific moments of attentiveness, gastronomy, or atmosphere..."
                className="w-full bg-[#f6f3ea] text-[#1c1c17] rounded-lg px-3.5 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#7b5500] border border-[#d3c4b0]/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-widest py-3 rounded-lg transition-all shadow-[0_4px_14px_rgba(123,85,0,0.2)] cursor-pointer"
            >
              Submit to Concierge Registry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
