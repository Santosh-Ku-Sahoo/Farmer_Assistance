import React from 'react';
import { translations } from '../translations';

export default function CropSelectorFilter({ selectedCrop, onSelectCrop, lang }) {
  const t = translations[lang];

  const crops = [
    { id: 'all', labelEn: 'All Crops (Auto)', labelOr: 'ସ୍ୱୟଂଚାଳିତ (ସମସ୍ତ)' },
    { id: 'Rice', labelEn: 'Rice (Paddy)', labelOr: 'ଧାନ (Rice)' },
    { id: 'Tomato', labelEn: 'Tomato', labelOr: 'ବିଲାତି ବାଇଗଣ (Tomato)' },
    { id: 'Potato', labelEn: 'Potato', labelOr: 'ଆଳୁ (Potato)' },
  ];

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#5A4D41]">
          {t.select_crop_hint}
        </label>
        <span className="text-xs text-[#7A6E62]">
          {t.supported_crops}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {crops.map((crop) => {
          const isSelected = selectedCrop === crop.id;
          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id)}
              className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border text-center transition-all ${
                isSelected
                  ? 'bg-[#1E4D2B] text-white border-[#1E4D2B] shadow-sm font-semibold'
                  : 'bg-[#FDFCFA] text-[#2C221E] border-[#D5DEC9] hover:border-[#1E4D2B] hover:bg-[#F3F7EE]'
              }`}
            >
              {lang === 'or' ? crop.labelOr : crop.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
