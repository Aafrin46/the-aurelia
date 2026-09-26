import React, { useState } from 'react';
import { Room } from '../types';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (roomId: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookRoom
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const images = room.galleryImages.length > 0 ? room.galleryImages : [room.imageUrl];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-[#fcf9f0] border border-[#d3c4b0]/70 rounded-xl shadow-2xl w-full max-w-4xl my-auto overflow-hidden relative animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#f6f3ea] border-b border-[#d3c4b0]/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#7d570e] font-semibold block">
              {room.chamberNumber} • {room.wing}
            </span>
            <h2 className="font-serif text-[22px] text-[#1c1c17] font-semibold">{room.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe8df] flex items-center justify-center text-[#4f4536] hover:text-[#7b5500] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto flex flex-col gap-6">
          {/* Main Visual Carousel */}
          <div className="flex flex-col gap-2">
            <div className="w-full h-80 sm:h-96 rounded-lg overflow-hidden bg-black relative">
              <img
                src={images[activeImageIndex]}
                alt={room.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded">
                {room.view}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-16 w-24 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#7b5500]' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-lg border border-[#d3c4b0]/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7b5500]">group</span>
              <div>
                <span className="text-[10px] uppercase text-[#827564] block">Occupancy</span>
                <span className="text-[13px] font-semibold text-[#1c1c17]">{room.maxGuests} Guests</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7b5500]">aspect_ratio</span>
              <div>
                <span className="text-[10px] uppercase text-[#827564] block">Spatial Size</span>
                <span className="text-[13px] font-semibold text-[#1c1c17]">{room.sizeSqm} m² / {Math.round(room.sizeSqm * 10.764)} sq.ft</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7b5500]">bed</span>
              <div>
                <span className="text-[10px] uppercase text-[#827564] block">Bedding</span>
                <span className="text-[13px] font-semibold text-[#1c1c17]">{room.bedConfig}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7b5500]">visibility</span>
              <div>
                <span className="text-[10px] uppercase text-[#827564] block">Orientation</span>
                <span className="text-[13px] font-semibold text-[#1c1c17]">{room.view}</span>
              </div>
            </div>
          </div>

          {/* Description & Inclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-serif text-[17px] text-[#1c1c17] font-semibold mb-2">Architectural Profile</h4>
              <p className="text-[14px] text-[#4f4536] leading-relaxed mb-4">
                {room.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {room.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-[#d3c4b0]/60 rounded text-[11px] font-medium text-[#7d570e]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-[17px] text-[#1c1c17] font-semibold mb-2">Chamber Privileges &amp; Features</h4>
              <ul className="space-y-2 text-[13px] text-[#4f4536]">
                {room.amenitiesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#7b5500] shrink-0 mt-0.5">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#d3c4b0]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl font-bold text-[#7b5500]">${room.pricePerNight}</span>
                <span className="text-[13px] text-[#827564]">/ night</span>
              </div>
              <span className="text-[11px] text-[#7d570e] italic block">{room.subPriceLabel}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room.id);
              }}
              className="w-full sm:w-auto bg-[#7b5500] hover:bg-[#9a6c02] text-white text-[12px] font-semibold uppercase tracking-[0.16em] px-8 py-3 rounded-[4px] shadow-md transition-all cursor-pointer"
            >
              Book {room.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
