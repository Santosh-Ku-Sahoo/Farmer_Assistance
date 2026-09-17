import React from 'react';
import { translations } from '../translations';

export default function CropSelectorFilter({ selectedCrop, onSelectCrop, lang }) {
  const t = translations[lang];

  const crops = [
    { id: 'all', labelEn: 'All Crops (Auto)', labelOr: 'ସ୍ୱୟଂଚାଳିତ (ସମସ୍ତ)', img: '/images/crop_all.jpg' },
    { id: 'Rice', labelEn: 'Rice (Paddy)', labelOr: 'ଧାନ (Rice)', img: '/samples/rice_healthy.jpg' },
    { id: 'Tomato', labelEn: 'Tomato', labelOr: 'ବିଲାତି ବାଇଗଣ', img: '/samples/tomato_healthy.jpg' },
    { id: 'Potato', labelEn: 'Potato', labelOr: 'ଆଳୁ (Potato)', img: '/samples/potato_healthy.jpg' },
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label={t.select_crop_hint}>
        {crops.map((crop) => {
          const isSelected = selectedCrop === crop.id;
          return (
            <button
              key={crop.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectCrop(crop.id)}
              className={`btn-tab border py-2 px-2.5 flex items-center justify-center space-x-2 ${
                isSelected
                  ? 'btn-tab-active border-[#1E4D2B]'
                  : 'bg-[#FDFCFA] text-[#2C221E] border-[#D5DEC9] hover:border-[#1E4D2B] hover:bg-[#F3F7EE]'
              }`}
            >
              <img
                src={crop.img}
                alt=""
                className="w-5 h-5 rounded-full object-cover border border-[#BAC8AA]/80 flex-shrink-0"
              />
              <span className="truncate text-xs font-bold">
                {lang === 'or' ? crop.labelOr : crop.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
