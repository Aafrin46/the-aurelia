import React from 'react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'accessibility' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: "Privacy & Confidentiality Charter",
      subtitle: "The Aurelia Discretion Standard",
      body: (
        <>
          <p>
            At The Aurelia Hotel &amp; Residences, discretion and privacy are foundational tenets of our hospitality heritage dating back to 1928.
          </p>
          <p>
            We collect personal reservation details strictly for the curation of your stay, concierge logistics, and personalized residential preferences. We do not sell, rent, or distribute guest registries to third-party marketing entities.
          </p>
          <p>
            Private itineraries, discreet dining reservations, and biometric access configurations are maintained within encrypted 256-bit hotel databases and purged according to your written preference.
          </p>
        </>
      )
    },
    terms: {
      title: "Terms of Residency & Reservation",
      subtitle: "Patron Protocol & Standards",
      body: (
        <>
          <p>
            <strong>Guaranteed Check-in:</strong> 15:00. Members of the Aurelia Privilege Club enjoy guaranteed late check-out until 15:00.
          </p>
          <p>
            <strong>Cancellation &amp; Flexibility:</strong> Reservations may be amended or cancelled with zero penalty up to 48 hours prior to arrival, unless reserved under non-refundable special salon privileges.
          </p>
          <p>
            <strong>Quietude &amp; Sanctuary:</strong> To preserve the acoustic tranquility of the heritage district, public corridors and residential wings maintain quiet hours between 23:00 and 07:00 daily.
          </p>
        </>
      )
    },
    accessibility: {
      title: "Accessibility & Physical Dignity",
      subtitle: "Universal Architectural Welcome",
      body: (
        <>
          <p>
            The Aurelia is committed to ensuring full physical accessibility and dignity across our neoclassical property.
          </p>
          <p>
            Our master renovation included zero-threshold grand portico entrances, wide-door automatic residential elevators, visual fire alarms, tactile braille signage, and ADA-compliant marble bathroom suites with roll-in rainfall showers.
          </p>
          <p>
            Please inform our concierge prior to arrival of any specific mobility, auditory, or sensory requirements.
          </p>
        </>
      )
    }
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-[#fcf9f0] border border-[#d3c4b0]/70 rounded-xl shadow-2xl w-full max-w-xl my-auto overflow-hidden relative animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 bg-[#f6f3ea] border-b border-[#d3c4b0]/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#7d570e] font-semibold block">
              {current.subtitle}
            </span>
            <h2 className="font-serif text-[18px] text-[#1c1c17] font-semibold">{current.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe8df] flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-4 text-[13px] leading-relaxed text-[#4f4536]">
          {current.body}
          <div className="pt-4 border-t border-[#d3c4b0]/40 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-wider px-6 py-2.5 rounded transition-colors cursor-pointer"
            >
              Acknowledged
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
