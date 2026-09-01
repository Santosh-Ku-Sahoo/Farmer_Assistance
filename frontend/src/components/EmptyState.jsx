import React from 'react';
import { Camera, Sun, Focus, ScanLine } from 'lucide-react';
import { translations } from '../translations';

export default function EmptyState({ lang }) {
  const t = translations[lang];

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-5 sm:p-6 card-shadow text-left">
      <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-[#EAF0E6]">
        <ScanLine className="w-5 h-5 text-[#1E4D2B]" />
        <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
          {t.empty_title}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        {/* Step 1 */}
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
          <div className="p-2 rounded-md bg-[#EAF0E6] text-[#1E4D2B] flex-shrink-0 mt-0.5">
            <Focus className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#1E4D2B] uppercase tracking-wide mb-1">
              {lang === 'or' ? 'ପଦକ୍ଷେପ ୧: ଫୋକସ୍' : 'Step 1: Direct Focus'}
            </h4>
            <p className="text-xs sm:text-sm text-[#4A3E38] leading-relaxed">
              {t.empty_instruction_1}
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
          <div className="p-2 rounded-md bg-[#EAF0E6] text-[#D97706] flex-shrink-0 mt-0.5">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#D97706] uppercase tracking-wide mb-1">
              {lang === 'or' ? 'ପଦକ୍ଷେପ ୨: ଆଲୋକ' : 'Step 2: Daylight'}
            </h4>
            <p className="text-xs sm:text-sm text-[#4A3E38] leading-relaxed">
              {t.empty_instruction_2}
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
          <div className="p-2 rounded-md bg-[#EAF0E6] text-[#1E4D2B] flex-shrink-0 mt-0.5">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#1E4D2B] uppercase tracking-wide mb-1">
              {lang === 'or' ? 'ପଦକ୍ଷେପ ୩: ଦୂରତା' : 'Step 3: Distance'}
            </h4>
            <p className="text-xs sm:text-sm text-[#4A3E38] leading-relaxed">
              {t.empty_instruction_3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
