import React from 'react';
import { AlertCircle, Camera, Sun, Focus, Layers, RotateCcw } from 'lucide-react';
import { translations } from '../translations';

export default function RetakeGuidance({ result, onRetake, lang }) {
  const t = translations[lang];
  const confidencePercent = Math.round((result?.confidence || 0) * 100);

  return (
    <div className="bg-[#FDFCFA] border-2 border-[#D97706]/50 rounded-xl overflow-hidden card-shadow-lg text-left mb-6">
      
      {/* Header Warning Banner */}
      <div className="bg-[#FFFBEB] p-4 sm:p-5 border-b border-[#FDE68A]">
        <div className="flex items-center space-x-2.5 mb-1.5">
          <div className="p-1.5 bg-[#FEF3C7] rounded-lg text-[#B45309]">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#92400E]">
              {t.uncertain_title}
            </h3>
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
              <Focus className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-xs text-[#1E4D2B] uppercase mb-0.5">
                  {lang === 'or' ? 'ଦୂରତା' : 'Proper Distance'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_distance}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <Sun className="w-4 h-4 text-[#D97706] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-xs text-[#D97706] uppercase mb-0.5">
                  {lang === 'or' ? 'ଆଲୋକ' : 'Adequate Light'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_light}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <Camera className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-xs text-[#1E4D2B] uppercase mb-0.5">
                  {lang === 'or' ? 'ଫୋକସ୍' : 'Tap to Focus'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_focus}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <Layers className="w-4 h-4 text-[#8B3A2B] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-xs text-[#8B3A2B] uppercase mb-0.5">
                  {lang === 'or' ? 'ଏକକ ପତ୍ର' : 'Single Leaf'}
                </strong>
                <p className="text-xs sm:text-sm text-[#4A3E38]">
                  {t.tip_single_leaf}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetake}
            className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#D97706] text-white text-sm sm:text-base font-bold hover:bg-[#B45309] transition-colors shadow-sm cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>{t.retake_now_button}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
