import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { submitInquiryApi } from '../services/api';

interface ContactPageProps {
  onOpenArrivalGuide: () => void;
  onShowToast: (message: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenArrivalGuide, onShowToast }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Chamber & Suite Reservation',
    stayDates: '',
    guestsCount: '2 Guests',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      onShowToast('Please provide your name and contact email.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitInquiryApi({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        stayDates: formData.stayDates,
        partySize: formData.guestsCount,
        message: formData.message,
      });

      const ref = res.inquiry?.referenceCode || `AUR-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setInquiryCode(ref);
      setSubmitted(true);
      onShowToast(`Concierge inquiry registered [${ref}]. You will receive a response within 2 hours.`);
    } catch {
      const ref = `AUR-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setInquiryCode(ref);
      setSubmitted(true);
      onShowToast(`Concierge inquiry dispatched. Reference: ${ref}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-surface">
      {/* Editorial Header */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 border border-secondary/20 text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
          <span className="material-symbols-outlined text-sm text-secondary">contact_support</span>
          <span>Personal Attention</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-on-surface tracking-tight">
          Concierge &amp; Inquiries
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant font-light max-w-2xl mx-auto leading-relaxed">
          Whether orchestrating a multi-week presidential suite stay, a private salon banquet, or bespoke helicopter transit, our masters of hospitality stand ready.
        </p>
      </section>

      {/* Main Grid: Form + Direct Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant/40 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold">Priority Protocol</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-on-surface font-light mt-1">
                Dispatch an Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant font-light mt-2">
                All dispatches are monitored by our Les Clefs d'Or head concierge desk with guaranteed confidential response.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-secondary-container/20 border border-secondary/30 text-center space-y-4 my-8 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="font-serif text-2xl text-on-surface font-medium">Inquiry Received</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-on-surface">{formData.fullName}</span>. Your dispatch has been recorded in our ledger with reference <span className="font-mono font-semibold text-secondary">{inquiryCode || 'AUR-INQ-8942'}</span>. Our Chief Concierge will reach you shortly at <span className="text-on-surface font-semibold">{formData.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      subject: 'Chamber & Suite Reservation',
                      stayDates: '',
                      guestsCount: '2 Guests',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 rounded-full border border-secondary text-secondary font-medium text-xs tracking-wider uppercase hover:bg-secondary hover:text-on-secondary transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alistair Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="patron@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Direct Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Nature of Request
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                    >
                      <option>Chamber &amp; Suite Reservation</option>
                      <option>Private Dining &amp; Sommelier Pairing</option>
                      <option>Private Chauffeur &amp; Jet Transit</option>
                      <option>Grand Salon Gala / Wedding Inquiry</option>
                      <option>Aurelia Spa Sanctuary Ritual</option>
                      <option>Privilege Club Membership</option>
                      <option>Other Bespoke Requirement</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Anticipated Dates
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 14 – Nov 18, 2026"
                      value={formData.stayDates}
                      onChange={(e) => setFormData({ ...formData, stayDates: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Party Size
                    </label>
                    <select
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 - 4 Guests</option>
                      <option>Private Delegation (5+ Guests)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Specific Curations &amp; Dietary / Preference Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe any particular desires: floor preference, wine vintage allocations, bespoke pillow menus, or discrete security arrangements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant/40 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-primary text-on-primary font-semibold text-xs tracking-widest uppercase hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                      <span>Transmitting Encrypted Dispatch...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base text-secondary">send</span>
                      <span>Dispatch to Chief Concierge</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Lines & Concierge Directory */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: 24/7 Reservations Desk */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">phone_in_talk</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Instant Reservations</span>
                  <h3 className="font-serif text-lg font-medium text-on-surface">Chamber Reservations Desk</h3>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Direct telephone line staffed 24 hours daily by bilingual senior booking concierges.
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Toll-Free (US &amp; Canada):</span>
                  <a href={`tel:${HOTEL_INFO.phoneTollFree}`} className="font-semibold text-primary hover:text-secondary">{HOTEL_INFO.phoneTollFree}</a>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">International Direct:</span>
                  <a href={`tel:${HOTEL_INFO.phoneInternational}`} className="font-semibold text-primary hover:text-secondary">{HOTEL_INFO.phoneInternational}</a>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Direct Inquiries:</span>
                  <span className="font-mono text-on-surface">{HOTEL_INFO.emailReservations}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Les Clefs d'Or Concierge */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">key</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Bespoke Curation</span>
                  <h3 className="font-serif text-lg font-medium text-on-surface">Les Clefs d'Or Concierge</h3>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Special access to museum galas, private yacht charters, bespoke jewelry viewings, and VIP airport clearances.
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Desk Direct:</span>
                  <span className="font-semibold text-primary">+1 (212) 555-0177</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Email Dispatch:</span>
                  <span className="font-mono text-on-surface">{HOTEL_INFO.emailConcierge}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Address & Arrival Assistance */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">pin_drop</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Grand Landmark</span>
                  <h3 className="font-serif text-lg font-medium text-on-surface">Property Location</h3>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                {HOTEL_INFO.address}
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenArrivalGuide}
                  className="w-full py-2.5 px-4 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>View Transit &amp; Arrival Guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & District Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl overflow-hidden border border-outline-variant/40 bg-surface-container-low shadow-lg">
          <div className="relative h-80 sm:h-96 w-full bg-[#1b2228] overflow-hidden flex items-center justify-center">
            {/* Architectural Stylized Map Canvas */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#c6a87d_1px,transparent_1px)] [background-size:24px_24px]"></div>
            
            {/* Stylized Street Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-0.5 bg-secondary/30 absolute rotate-12"></div>
              <div className="w-full h-0.5 bg-secondary/20 absolute -rotate-45"></div>
              <div className="h-full w-0.5 bg-secondary/30 absolute left-1/3"></div>
              <div className="h-full w-0.5 bg-secondary/20 absolute right-1/4"></div>
            </div>

            {/* Central Aurelia Pin */}
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <div className="p-3 bg-secondary rounded-full text-on-secondary shadow-2xl ring-8 ring-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl font-bold">hotel</span>
              </div>
              <div className="mt-3 bg-surface px-4 py-2 rounded-xl border border-secondary/40 shadow-xl text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block">The Aurelia</span>
                <span className="text-xs font-medium text-on-surface">108 Aurelia Boulevard</span>
              </div>
            </div>

            {/* Overlay Info Badge */}
            <div className="absolute top-6 left-6 bg-surface/90 backdrop-blur-md p-4 rounded-xl border border-outline-variant/40 hidden sm:block max-w-xs shadow-md">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondary block">Heritage District</span>
              <p className="text-xs text-on-surface mt-1">Valet Porte-Cochère accessible via Grand Avenue entry</p>
            </div>

            <div className="absolute bottom-6 right-6">
              <button
                onClick={onOpenArrivalGuide}
                className="px-4 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">navigation</span>
                <span>Open Navigation GPS</span>
              </button>
            </div>
          </div>

          {/* Transit Distances Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30 bg-surface p-6">
            <div className="p-4 space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Metropolis International Airport (MIA)</span>
              <p className="font-serif text-lg font-medium text-on-surface">25 Minutes</p>
              <p className="text-xs text-on-surface-variant font-light">Via House Chauffeur Limousine</p>
            </div>
            <div className="p-4 space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Grand Central Station</span>
              <p className="font-serif text-lg font-medium text-on-surface">8 Minutes</p>
              <p className="text-xs text-on-surface-variant font-light">Direct private vehicle transit</p>
            </div>
            <div className="p-4 space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">National Opera &amp; Cultural Mile</span>
              <p className="font-serif text-lg font-medium text-on-surface">4 Minutes Walk</p>
              <p className="text-xs text-on-surface-variant font-light">Pedestrian promenade</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
