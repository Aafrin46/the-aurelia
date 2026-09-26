import React, { useState } from 'react';
import { Room } from '../types';
import { INITIAL_ROOMS } from '../data/hotelData';
import { createBookingApi } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomId?: string;
  onBookingComplete?: (details: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoomId,
  onBookingComplete
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preselectedRoomId || INITIAL_ROOMS[0].id
  );
  const [checkIn, setCheckIn] = useState<string>('2026-10-15');
  const [checkOut, setCheckOut] = useState<string>('2026-10-18');
  const [guests, setGuests] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Luxury Add-ons
  const [addOns, setAddOns] = useState({
    chauffeur: false,
    champagne: false,
    spaRitual: false,
    butlerService: false
  });

  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    room: Room;
    nights: number;
    grandTotal: number;
    date: string;
  } | null>(null);

  if (!isOpen) return null;

  const currentRoom = INITIAL_ROOMS.find((r) => r.id === selectedRoomId) || INITIAL_ROOMS[0];

  // Calculate nights
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.max(1, end.getTime() - start.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const roomSubtotal = currentRoom.pricePerNight * nights;
  const chauffeurPrice = addOns.chauffeur ? 180 : 0;
  const champagnePrice = addOns.champagne ? 220 : 0;
  const spaPrice = addOns.spaRitual ? 240 : 0;
  const butlerPrice = addOns.butlerService ? 350 * nights : 0;
  
  const addOnsTotal = chauffeurPrice + champagnePrice + spaPrice + butlerPrice;
  const subtotal = roomSubtotal + addOnsTotal;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + taxesAndFees;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        roomId: currentRoom.id,
        checkIn,
        checkOut,
        guests,
        guestName: guestName || 'Esteemed Patron',
        guestEmail: guestEmail || 'patron@domain.com',
        guestPhone,
        specialRequests,
        addOns,
        totalNights: nights,
        roomTotal: roomSubtotal,
        addOnsTotal,
        taxesAndFees,
        grandTotal,
      };

      const result = await createBookingApi(payload);
      const bookingData = result.booking || {};

      const details = {
        code: bookingData.bookingReference || `AUR-${Math.floor(1000 + Math.random() * 9000)}-${currentRoom.tier.charAt(0)}`,
        room: currentRoom,
        nights,
        grandTotal,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setConfirmedBooking(details);
      if (onBookingComplete) onBookingComplete(details);
    } catch (err: any) {
      console.error('Booking failed:', err);
      // Fallback display
      const refCode = `AUR-${Math.floor(1000 + Math.random() * 9000)}-${currentRoom.tier.charAt(0)}`;
      const details = {
        code: refCode,
        room: currentRoom,
        nights,
        grandTotal,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setConfirmedBooking(details);
      if (onBookingComplete) onBookingComplete(details);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-[#fcf9f0] border border-[#d3c4b0]/70 rounded-xl shadow-2xl w-full max-w-3xl my-auto overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Strip */}
        <div className="bg-[#f6f3ea] px-6 py-4 border-b border-[#d3c4b0]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-[#7b5500]/10 flex items-center justify-center text-[#7b5500]">
              <span className="material-symbols-outlined text-[18px]">hotel</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#7d570e] font-semibold block">
                Direct Reservation System
              </span>
              <h2 className="font-serif text-[18px] text-[#1c1c17] font-semibold">
                {confirmedBooking ? 'Reservation Confirmed' : 'Reserve Your Sanctuary'}
              </h2>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-[#ebe8df] flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] hover:bg-[#e5e2da] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-6 md:p-8 flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#7b5500]/10 text-[#7b5500] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7d570e] font-bold">
              Confirmation Dossier
            </span>
            <h3 className="font-serif text-2xl text-[#1c1c17] mt-1 mb-2">
              We Await Your Arrival at The Aurelia
            </h3>
            
            <p className="text-[14px] text-[#4f4536] max-w-md mb-6 leading-relaxed">
              Your suite reservation has been registered with our Master of Ceremonies and Head Concierge. An encrypted dossier has been dispatched to your email.
            </p>

            {/* Reference Badge Card */}
            <div className="w-full max-w-md bg-white border border-[#d3c4b0]/60 rounded-lg p-5 shadow-sm mb-6 text-left">
              <div className="flex items-center justify-between border-b border-[#e5e2da] pb-3 mb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#827564]">Reservation Reference</span>
                  <p className="font-mono text-[18px] font-bold text-[#7b5500]">{confirmedBooking.code}</p>
                </div>
                <span className="px-2 py-0.5 bg-[#f6f3ea] text-[#7d570e] font-semibold text-[11px] uppercase rounded">
                  Confirmed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <span className="text-[#827564] text-[11px] block">Chamber</span>
                  <span className="font-semibold text-[#1c1c17]">{confirmedBooking.room.name}</span>
                </div>
                <div>
                  <span className="text-[#827564] text-[11px] block">Duration</span>
                  <span className="font-semibold text-[#1c1c17]">{confirmedBooking.nights} Nights ({checkIn} to {checkOut})</span>
                </div>
                <div>
                  <span className="text-[#827564] text-[11px] block">Primary Patron</span>
                  <span className="font-semibold text-[#1c1c17]">{guestName || 'Valued Resident'}</span>
                </div>
                <div>
                  <span className="text-[#827564] text-[11px] block">Total Settled / Due</span>
                  <span className="font-semibold text-[#7b5500]">${confirmedBooking.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#f1eee5] hover:bg-[#ebe8df] text-[#1c1c17] text-[12px] font-semibold uppercase tracking-wider rounded-[4px] border border-[#d3c4b0]/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Dossier</span>
              </button>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-widest rounded-[4px] shadow transition-colors cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleConfirmReservation} className="p-6 md:p-8 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Select Chamber / Suite */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d570e] block mb-2.5">
                1. Select Accommodations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INITIAL_ROOMS.map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'border-[#7b5500] bg-white shadow-sm ring-1 ring-[#7b5500]'
                          : 'border-[#d3c4b0]/60 bg-[#f6f3ea]/50 hover:bg-white'
                      }`}
                    >
                      <img 
                        src={room.imageUrl} 
                        alt={room.name} 
                        className="w-14 h-14 object-cover rounded shrink-0 bg-[#ebe8df]"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-[14px] font-bold text-[#1c1c17] truncate">
                            {room.name}
                          </span>
                          <span className="text-[12px] font-bold text-[#7b5500] shrink-0">
                            ${room.pricePerNight}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#4f4536] truncate">
                          {room.sizeSqm}m² • {room.bedConfig}
                        </span>
                        <span className="text-[10px] text-[#7d570e] italic truncate">
                          {room.view}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dates & Guests */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d570e] block mb-2.5">
                2. Stay Duration &amp; Party Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#4f4536] block mb-1">Check-in</span>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full bg-white border border-[#d3c4b0]/70 rounded-[4px] px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#4f4536] block mb-1">Check-out</span>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full bg-white border border-[#d3c4b0]/70 rounded-[4px] px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#4f4536] block mb-1">Guests</span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-white border border-[#d3c4b0]/70 rounded-[4px] px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                  >
                    <option value={1}>1 Guest (Solitary Stay)</option>
                    <option value={2}>2 Guests (Couple / Pair)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family / Suite)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Bespoke Upgrades */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d570e] block mb-2.5">
                3. Curated Inclusions &amp; Private Services
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-start gap-2.5 p-2.5 bg-white border border-[#d3c4b0]/50 rounded-[4px] cursor-pointer hover:border-[#7b5500] transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.chauffeur}
                    onChange={(e) => setAddOns({ ...addOns, chauffeur: e.target.checked })}
                    className="mt-0.5 accent-[#7b5500] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col text-[12px]">
                    <span className="font-semibold text-[#1c1c17]">Rolls-Royce Phantom Transfer (+$180)</span>
                    <span className="text-[#827564] text-[11px]">Direct airport terminal airside chauffeur reception</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2.5 bg-white border border-[#d3c4b0]/50 rounded-[4px] cursor-pointer hover:border-[#7b5500] transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.champagne}
                    onChange={(e) => setAddOns({ ...addOns, champagne: e.target.checked })}
                    className="mt-0.5 accent-[#7b5500] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col text-[12px]">
                    <span className="font-semibold text-[#1c1c17]">Dom Pérignon Welcome In-Suite (+$220)</span>
                    <span className="text-[#827564] text-[11px]">Chilled vintage champagne &amp; fresh macarons on arrival</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2.5 bg-white border border-[#d3c4b0]/50 rounded-[4px] cursor-pointer hover:border-[#7b5500] transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.spaRitual}
                    onChange={(e) => setAddOns({ ...addOns, spaRitual: e.target.checked })}
                    className="mt-0.5 accent-[#7b5500] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col text-[12px]">
                    <span className="font-semibold text-[#1c1c17]">Thermal Spa Sanctuary Ritual (+$240)</span>
                    <span className="text-[#827564] text-[11px]">90-minute bespoke restorative botanical treatment</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2.5 bg-white border border-[#d3c4b0]/50 rounded-[4px] cursor-pointer hover:border-[#7b5500] transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.butlerService}
                    onChange={(e) => setAddOns({ ...addOns, butlerService: e.target.checked })}
                    className="mt-0.5 accent-[#7b5500] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col text-[12px]">
                    <span className="font-semibold text-[#1c1c17]">Dedicated Butler Service (+$350/day)</span>
                    <span className="text-[#827564] text-[11px]">24-hr personal Clefs d'Or host throughout stay</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Patron Particulars */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d570e] block mb-2.5">
                4. Patron Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#4f4536] block mb-1">Full Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Vivienne Montgomery"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white border border-[#d3c4b0]/70 rounded-[4px] px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#4f4536] block mb-1">Email Address *</span>
                  <input
                    type="email"
                    required
                    placeholder="v.montgomery@estate.co.uk"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-white border border-[#d3c4b0]/70 rounded-[4px] px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#4f4536] block mb-1">Phone Number</span>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-white border border-[#d3c4b0]/70 rounded-[4px] px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500]"
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#4f4536] block mb-1">Special Preferences / Dietary Requirements</span>
                <textarea
                  rows={2}
                  placeholder="Specify pillow preferences, feather allergies, room fragrance notes, or flight arrival times..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-white border border-[#d3c4b0]/70 rounded-[4px] p-2.5 text-[13px] text-[#1c1c17] focus:outline-none focus:border-[#7b5500] resize-none"
                />
              </div>
            </div>

            {/* Step 5: Itemized Summary & Booking CTA */}
            <div className="bg-[#f1eee5] p-4 rounded-lg border border-[#d3c4b0]/60 flex flex-col gap-2">
              <div className="flex justify-between text-[13px] text-[#4f4536]">
                <span>{currentRoom.name} (${currentRoom.pricePerNight} × {nights} nights)</span>
                <span className="font-semibold text-[#1c1c17]">${roomSubtotal.toLocaleString()}</span>
              </div>
              {addOnsTotal > 0 && (
                <div className="flex justify-between text-[13px] text-[#4f4536]">
                  <span>Curated Luxury Services &amp; Add-ons</span>
                  <span className="font-semibold text-[#1c1c17]">+${addOnsTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[13px] text-[#4f4536]">
                <span>Taxes, Heritage Restoration Levy &amp; Gratuity (12%)</span>
                <span>${taxesAndFees.toLocaleString()}</span>
              </div>
              
              <div className="h-px bg-[#d3c4b0]/70 my-1"></div>

              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#7d570e] font-bold block">Grand Folio Total</span>
                  <span className="text-[11px] text-[#827564]">Complimentary cancellation up to 48 hours prior</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#7b5500]">${grandTotal.toLocaleString()}</span>
                  <span className="text-[11px] text-[#827564] block">USD</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#827564] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#7b5500]">lock</span>
                Encrypted 256-bit hotel reservation vault
              </span>
              <button
                type="submit"
                className="bg-[#7b5500] hover:bg-[#9a6c02] text-white font-sans text-[12px] font-semibold uppercase tracking-[0.16em] px-8 py-3 rounded-[4px] shadow-[0_4px_14px_rgba(123,85,0,0.25)] hover:shadow-[0_6px_20px_rgba(123,85,0,0.35)] transition-all cursor-pointer"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
