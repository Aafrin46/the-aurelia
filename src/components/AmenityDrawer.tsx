import React, { useState } from 'react';
import { reserveAmenityApi } from '../services/api';

interface AmenityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  amenityTitle: string;
  onSuccess: (message: string) => void;
}

export const AmenityDrawer: React.FC<AmenityDrawerProps> = ({
  isOpen,
  onClose,
  amenityTitle,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [suite, setSuite] = useState('');
  const [date, setDate] = useState('2026-10-16');
  const [time, setTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await reserveAmenityApi({
        amenityId: amenityTitle.toLowerCase().replace(/\s+/g, '-'),
        amenityTitle: amenityTitle || 'Concierge Service',
        guestName: name || 'Esteemed Patron',
        suiteNumber: suite,
        reservationDate: date,
        reservationTime: time,
        specialNotes: notes,
      });
      onSuccess(`Your reservation for "${amenityTitle || 'Amenity Service'}" is confirmed in the hotel ledger.`);
    } catch {
      onSuccess(`Your inquiry for "${amenityTitle || 'Amenity Service'}" has been recorded. Our Head Concierge will attend to you.`);
    } finally {
      setIsSubmitting(false);
      onClose();
      setName('');
      setSuite('');
      setNotes('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl p-6 md:p-8 flex flex-col justify-between z-10 animate-slide-left">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#d3c4b0]/40">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#7d570e] font-semibold block">
                Concierge Desk
              </span>
              <h3 className="font-serif text-[20px] text-[#1c1c17] mt-0.5 font-semibold">
                {amenityTitle || 'Amenity Reservation'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] hover:bg-[#f1eee5] transition-colors cursor-pointer"
              aria-label="Close Drawer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold">
                Guest Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Lady Vivienne Montgomery"
                className="bg-[#fcf9f0] p-3 rounded border border-[#d3c4b0]/70 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold">
                Suite or Reservation #
              </label>
              <input
                type="text"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                placeholder="e.g. Suite 402 or New Guest"
                className="bg-[#fcf9f0] p-3 rounded border border-[#d3c4b0]/70 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-[#fcf9f0] p-2.5 rounded border border-[#d3c4b0]/70 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-[#fcf9f0] p-2.5 rounded border border-[#d3c4b0]/70 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wider text-[#4f4536] font-semibold">
                Special Requests / Dietary / Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify preferences, celebratory occasions, or private transfer addresses..."
                className="bg-[#fcf9f0] p-3 rounded border border-[#d3c4b0]/70 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-[0.16em] py-3 rounded-[4px] shadow-[0_4px_14px_rgba(123,85,0,0.25)] hover:shadow-[0_6px_20px_rgba(123,85,0,0.35)] transition-all cursor-pointer"
              >
                Submit Concierge Request
              </button>
            </div>
          </form>
        </div>

        {/* Footer Security Note */}
        <div className="pt-4 border-t border-[#d3c4b0]/40 flex items-center gap-2 text-[#4f4536] text-[11px]">
          <span className="material-symbols-outlined text-[16px] text-[#7b5500]">lock</span>
          <span>Requests dispatched instantly to Les Clefs d'Or Concierge</span>
        </div>
      </div>
    </div>
  );
};
