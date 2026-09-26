import React from 'react';
import { IN_SUITE_MENU } from '../data/hotelData';

interface InSuiteMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderService: () => void;
}

export const InSuiteMenuModal: React.FC<InSuiteMenuModalProps> = ({
  isOpen,
  onClose,
  onOrderService
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-[#fcf9f0] border border-[#d3c4b0]/70 rounded-xl shadow-2xl w-full max-w-2xl my-auto overflow-hidden relative animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 bg-[#f6f3ea] border-b border-[#d3c4b0]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7b5500] text-[22px]">restaurant</span>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#7d570e] font-semibold block">
                Master Chef Gastronomy
              </span>
              <h2 className="font-serif text-[20px] text-[#1c1c17] font-semibold">In-Suite Dining &amp; Cellar</h2>
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

        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          <p className="text-[13px] text-[#4f4536] leading-relaxed italic border-l-2 border-[#7b5500] pl-3">
            “Each course is prepared à la minute by our brigade de cuisine and presented on hand-glazed French porcelain with sommelier pairings.”
          </p>

          {IN_SUITE_MENU.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-serif text-[16px] text-[#7b5500] font-semibold pb-1 border-b border-[#d3c4b0]/40">
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-4 p-2.5 rounded hover:bg-white transition-colors">
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#1c1c17]">{item.name}</h4>
                      <p className="text-[12px] text-[#605b53] mt-0.5 leading-snug">{item.description}</p>
                    </div>
                    <span className="font-serif font-bold text-[14px] text-[#7b5500] shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-[#d3c4b0]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-[#827564]">
              Available 24 hours daily. Please dial <strong>*4</strong> from your chamber phone or submit via concierge.
            </span>
            <button
              onClick={() => {
                onClose();
                onOrderService();
              }}
              className="bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-wider px-6 py-2.5 rounded shadow transition-colors cursor-pointer shrink-0"
            >
              Order via Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
