import React from 'react';
import { AlertCircle, Camera, Sun, Focus, Layers } from 'lucide-react';
import { translations } from '../translations';

export default function RetakeGuidance({ result, onRetake, lang }) {
  const t = translations[lang];
  const confidencePercent = Math.round((result?.confidence || 0) * 100);

  return (
    <div className="bg-[#FDFCFA] border-2 border-[#D97706]/50 rounded-xl overflow-hidden card-shadow-lg text-left mb-6">
      
      {/* Header Warning Banner */}
      <div className="bg-[#FFFBEB] p-4 sm:p-5 border-b border-[#FDE68A]">
        <div className="flex items-center space-x-2.5 mb-1.5">
          <div className="p-1.5 bg-[#FEF3C7] rounded-lg text-[#B45309]" aria-hidden="true">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#92400E]">
              {t.uncertain_title}
            </h2>
            <span className="inline-block mt-0.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FDE68A] text-[#78350F]">
              {t.uncertain_badge} (Score: {confidencePercent}%)
            </span>
          </div>
        </div>

        <p className="text-sm text-[#78350F] mt-2 leading-relaxed">
          {result?.retake_guidance 
            ? (lang === 'or' ? result.retake_guidance.reason_or : result.retake_guidance.reason_en)
            : t.uncertain_explanation}
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        
        {/* Why this happened & checklist */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#92400E] mb-3">
            {t.tips_header}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <Focus className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <strong className="block text-xs text-[#1E4D2B] mb-0.5">
                  {lang === 'or' ? 'ଦୂରତା' : 'Proper Distance'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_distance}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <Sun className="w-4 h-4 text-[#D97706] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <strong className="block text-xs text-[#D97706] mb-0.5">
                  {lang === 'or' ? 'ଆଲୋକ' : 'Adequate Light'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_light}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <Camera className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <strong className="block text-xs text-[#1E4D2B] mb-0.5">
                  {lang === 'or' ? 'ଫୋକସ୍' : 'Tap to Focus'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_focus}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <Layers className="w-4 h-4 text-[#8B3A2B] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <strong className="block text-xs text-[#8B3A2B] mb-0.5">
                  {lang === 'or' ? 'ଏକକ ପତ୍ର' : 'Single Leaf'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_single_leaf}
                </p>
              </div>
            </div>
          </div>

          {/* Real Leaf Diagnostic Quality Comparison */}
          <div className="mt-4 pt-3.5 border-t border-[#E2EAD6]">
              <h5 className="text-[11px] font-bold text-[#92400E] uppercase tracking-wider mb-2">
                {lang === 'or' ? 'ଫଟୋ ଗୁଣବତ୍ତା ତୁଳନା' : 'Diagnostic Photo Quality Comparison'}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="rounded-lg border border-[#86EFAC] bg-[#F0FDF4] p-2 flex items-center space-x-2.5">
                  <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0 border border-[#86EFAC]">
                    <img src="/samples/rice_blast.jpg" alt="Good" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-[#166534] text-white text-[8px] font-bold text-center">✓ {lang === 'or' ? 'ଠିକ୍' : 'Good'}</span>
                  </div>
                  <span className="text-[11px] text-[#166534] font-medium leading-tight">
                    {lang === 'or' ? 'ପତ୍ରର ଦାଗ ସ୍ପଷ୍ଟ ଓ ଫୋକସରେ' : 'Sharp leaf lesion in focus with daylight'}
                  </span>
                </div>
                <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] p-2 flex items-center space-x-2.5">
                  <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0 border border-[#FCA5A5]">
                    <img src="/samples/unclear_photo.jpg" alt="Blurry" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-[#991B1B] text-white text-[8px] font-bold text-center">✗ {lang === 'or' ? 'ଭୁଲ୍' : 'Avoid'}</span>
                  </div>
                  <span className="text-[11px] text-[#991B1B] font-medium leading-tight">
                    {lang === 'or' ? 'କ୍ୟାମେରା ହଲିଯିବା ବା ଛାଇ ପଡ଼ିବା' : 'Blurry, distant, or shadowed capture'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetake}
            className="btn-primary w-full py-3.5 text-sm sm:text-base font-bold min-h-[48px]"
          >
            <Camera className="w-5 h-5" aria-hidden="true" />
            <span>{t.retake_now_button}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
