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

      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm list-none p-0 m-0 mb-5">
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

      {/* Real Photography Guide: Correct vs Incorrect Leaf Photo */}
      <div className="border-t border-[#EAF0E6] pt-4">
        <h3 className="text-xs font-bold text-[#2C221E] uppercase tracking-wider mb-2.5 flex items-center space-x-2">
          <span>{lang === 'or' ? 'ଫଟୋ ନମୁନା ମାର୍ଗଦର୍ଶିକା' : 'Leaf Photography Quality Guide'}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Correct Photo */}
          <div className="flex items-center space-x-3 p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0 border border-[#86EFAC]">
              <img
                src="/samples/rice_blast.jpg"
                alt="Correct clear leaf photo"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-[#15803D] text-white text-[9px] font-bold text-center py-0.5">
                {lang === 'or' ? 'ଠିକ୍ ✓' : 'Correct ✓'}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#166534]">
                {lang === 'or' ? 'ସ୍ପଷ୍ଟ ଓ ସୂର୍ଯ୍ୟାଲୋକରେ ଫଟୋ' : 'Clear & Well-Lit'}
              </h4>
              <p className="text-[11px] text-[#15803D] mt-0.5 leading-relaxed">
                {lang === 'or' ? 'ପତ୍ରର ଦାଗ ସ୍ପଷ୍ଟ ଦେଖାଯାଉଛି। AI ୯୫% ରୁ ଅଧିକ ସଠିକତା ଦେଇପାରିବ।' : 'Lesions clearly in focus without blur or shadows for >95% accuracy.'}
              </p>
            </div>
          </div>

          {/* Incorrect Photo */}
          <div className="flex items-center space-x-3 p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0 border border-[#FCA5A5]">
              <img
                src="/samples/unclear_photo.jpg"
                alt="Blurry unclear photo"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-[#B91C1C] text-white text-[9px] font-bold text-center py-0.5">
                {lang === 'or' ? 'ଭୁଲ୍ ✗' : 'Avoid ✗'}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#991B1B]">
                {lang === 'or' ? 'ଅସ୍ପଷ୍ଟ ବା ଅନ୍ଧକାର ଫଟୋ' : 'Blurry or Too Far'}
              </h4>
              <p className="text-[11px] text-[#B91C1C] mt-0.5 leading-relaxed">
                {lang === 'or' ? 'କ୍ୟାମେରା ହଲିଯିବା ବା ଛାଇ ପଡ଼ିଲେ AI ପତ୍ର ଚିହ୍ନିପାରିବ ନାହିଁ।' : 'Out of focus, heavy shadows, or whole plant photographed from too far.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
