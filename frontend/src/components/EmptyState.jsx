import React from 'react';
import { Camera, Sun, Focus, ScanLine } from 'lucide-react';
import { translations } from '../translations';

export default function EmptyState({ lang }) {
  const t = translations[lang];

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-5 sm:p-6 card-shadow text-left">
      <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-[#EAF0E6]">
        <ScanLine className="w-5 h-5 text-[#1E4D2B]" aria-hidden="true" />
        <h2 className="font-bold text-[#2C221E] text-base sm:text-lg">
          {t.empty_title}
        </h2>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm list-none p-0 m-0">
        {/* Step 1 */}
        <li className="flex items-start space-x-3 p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
          <div className="p-2 rounded-md bg-[#EAF0E6] text-[#1E4D2B] flex-shrink-0 mt-0.5" aria-hidden="true">
            <Focus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-xs text-[#1E4D2B] tracking-normal mb-1">
              {lang === 'or' ? 'ପଦକ୍ଷେପ ୧: ଫୋକସ୍' : 'Step 1: Direct Focus'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3E38] leading-relaxed">
              {t.empty_instruction_1}
            </p>
          </div>
        </li>

        {/* Step 2 */}
        <li className="flex items-start space-x-3 p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
          <div className="p-2 rounded-md bg-[#EAF0E6] text-[#D97706] flex-shrink-0 mt-0.5" aria-hidden="true">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-xs text-[#D97706] tracking-normal mb-1">
              {lang === 'or' ? 'ପଦକ୍ଷେପ ୨: ଆଲୋକ' : 'Step 2: Daylight'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3E38] leading-relaxed">
              {t.empty_instruction_2}
            </p>
          </div>
        </li>

        {/* Step 3 */}
        <li className="flex items-start space-x-3 p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
          <div className="p-2 rounded-md bg-[#EAF0E6] text-[#1E4D2B] flex-shrink-0 mt-0.5" aria-hidden="true">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-xs text-[#1E4D2B] tracking-normal mb-1">
              {lang === 'or' ? 'ପଦକ୍ଷେପ ୩: ଦୂରତା' : 'Step 3: Distance'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3E38] leading-relaxed">
              {t.empty_instruction_3}
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
