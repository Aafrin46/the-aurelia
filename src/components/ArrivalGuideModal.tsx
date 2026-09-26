import React from 'react';

interface ArrivalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArrivalGuideModal: React.FC<ArrivalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-[#fcf9f0] border border-[#d3c4b0]/70 rounded-xl shadow-2xl w-full max-w-xl my-auto overflow-hidden relative animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 bg-[#f6f3ea] border-b border-[#d3c4b0]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7b5500] text-[22px]">flight_takeoff</span>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#7d570e] font-semibold block">
                Pre-Arrival Dossier
              </span>
              <h2 className="font-serif text-[18px] text-[#1c1c17] font-semibold">Arrival &amp; Transit Guide</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe8df] flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-5 text-[13px] text-[#4f4536]">
          <div className="bg-white p-4 rounded border border-[#d3c4b0]/50 space-y-2">
            <h4 className="font-semibold text-[#1c1c17] text-[14px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#7b5500] text-[18px]">navigation</span>
              GPS &amp; Physical Address
            </h4>
            <p className="font-mono text-[12px] text-[#7b5500]">
              40°42'46.2"N 74°00'21.8"W<br />
              108 Aurelia Boulevard, Grand Avenue, Heritage District
            </p>
            <p className="text-[12px] text-[#827564]">
              Private Porte-Cochère accessible via East Gate with automated license plate recognition and climate-controlled subterranean turnaround.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-[#1c1c17] text-[14px]">Private Aviation &amp; Heliport Frequencies</h4>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div className="p-2.5 bg-white rounded border border-[#d3c4b0]/40">
                <span className="font-semibold text-[#1c1c17] block">Teterboro (TEB)</span>
                <span className="text-[#827564]">FBO: Meridian / Jet Aviation</span>
                <span className="text-[#7b5500] block mt-1 font-mono">Chauffeur: 22 Mins</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-[#d3c4b0]/40">
                <span className="font-semibold text-[#1c1c17] block">East River Heliport (JRB)</span>
                <span className="text-[#827564]">Coordinates: 40.7011° N, 74.0016° W</span>
                <span className="text-[#7b5500] block mt-1 font-mono">Shuttle: 8 Mins</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[#1c1c17] text-[14px]">Underground Valet &amp; Superchargers</h4>
            <p className="text-[12px] text-[#4f4536] leading-relaxed">
              Complimentary 350kW DC Fast Charging (Tesla, Porsche Taycan, Lucid Air) available for all resident patrons. Overnight security and detailing available upon request.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                alert('Pre-Arrival Dossier PDF downloaded to your device.');
                onClose();
              }}
              className="bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-wider px-5 py-2.5 rounded shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download PDF Guide</span>
            </button>
            <button
              onClick={onClose}
              className="text-[12px] text-[#4f4536] hover:text-[#7b5500] uppercase font-semibold tracking-wider cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
