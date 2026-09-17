import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ShieldAlert, CheckCircle2, ChevronRight, Sprout, Info, Award, Leaf } from 'lucide-react';
import { CROP_GROWING_GUIDES } from '../data/cropGrowingGuides';

const STAGE_IMAGES = {
  Rice: {
    1: '/images/stage_ploughing.jpg',
    2: '/images/stage_nursery.jpg',
    3: '/images/stage_transplanting.jpg',
    4: '/images/stage_vegetative.jpg',
    5: '/images/stage_vegetative.jpg',
    6: '/images/stage_flowering.jpg',
    7: '/images/stage_harvest.jpg'
  },
  Tomato: {
    1: '/images/stage_nursery.jpg',
    2: '/images/stage_ploughing.jpg',
    3: '/images/stage_transplanting.jpg',
    4: '/images/stage_vegetative.jpg',
    5: '/images/stage_flowering.jpg',
    6: '/images/stage_tomato_fruit.jpg',
    7: '/images/stage_harvest.jpg'
  },
  Potato: {
    1: '/images/stage_potato_tubers.jpg',
    2: '/images/stage_ploughing.jpg',
    3: '/images/stage_transplanting.jpg',
    4: '/images/stage_vegetative.jpg',
    5: '/images/stage_potato_tubers.jpg',
    6: '/images/stage_ploughing.jpg',
    7: '/images/stage_harvest.jpg'
  }
};

export default function CropGrowingGuide({ lang }) {
  const [selectedCrop, setSelectedCrop] = useState('Rice');

  const guide = CROP_GROWING_GUIDES[selectedCrop] || CROP_GROWING_GUIDES.Rice;

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-6 card-shadow text-left mb-6">
      
      {/* Top Section Header with proper H2 level */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3.5 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-[#2C221E] text-base sm:text-lg leading-tight">
              {lang === 'or' ? 'ଫସଲ ଚାଷ ପ୍ରଣାଳୀ ଓ କ୍ୟାଲେଣ୍ଡର (ବିହନ ରୁ ଅମଳ)' : 'Crop Cultivation Guide (Sowing to Harvest)'}
            </h2>
            <p className="text-xs text-[#7A6E62] mt-0.5 normal-case tracking-normal">
              {lang === 'or' ? 'ଓଡ଼ିଶା କୃଷି ମାନକ ଅନୁଯାୟୀ ପ୍ରାମାଣିକ ପର୍ଯ୍ୟାୟଭିତ୍ତିକ ଚାଷ ମାର୍ଗଦର୍ଶିକା' : 'Verified stage-by-stage agronomic timeline based on Odisha state practices'}
            </p>
          </div>
        </div>
      </div>

      {/* Unified Crop Selector & Connected Summary Panel */}
      <div className="mb-6">
        
        {/* Crop Selector Tabs with cohesive line-art icons and direct panel attachment */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#D5DEC9]/50 rounded-t-xl border border-[#BAC8AA] border-b-0">
          <button
            type="button"
            onClick={() => setSelectedCrop('Rice')}
            className={`btn-tab py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              selectedCrop === 'Rice'
                ? 'btn-tab-active shadow-sm'
                : 'text-[#5A4D41] hover:text-[#1E4D2B]'
            }`}
          >
            <img src="/samples/rice_healthy.jpg" alt="Rice" className="w-5 h-5 rounded-full object-cover border border-[#BAC8AA] flex-shrink-0" />
            <span className="truncate">{lang === 'or' ? 'ଧାନ (Rice)' : 'Rice / Paddy'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCrop('Tomato')}
            className={`btn-tab py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              selectedCrop === 'Tomato'
                ? 'btn-tab-active shadow-sm'
                : 'text-[#5A4D41] hover:text-[#1E4D2B]'
            }`}
          >
            <img src="/samples/tomato_healthy.jpg" alt="Tomato" className="w-5 h-5 rounded-full object-cover border border-[#BAC8AA] flex-shrink-0" />
            <span className="truncate">{lang === 'or' ? 'ଟମାଟୋ (Tomato)' : 'Tomato'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCrop('Potato')}
            className={`btn-tab py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              selectedCrop === 'Potato'
                ? 'btn-tab-active shadow-sm'
                : 'text-[#5A4D41] hover:text-[#1E4D2B]'
            }`}
          >
            <img src="/samples/potato_healthy.jpg" alt="Potato" className="w-5 h-5 rounded-full object-cover border border-[#BAC8AA] flex-shrink-0" />
            <span className="truncate">{lang === 'or' ? 'ଆଳୁ (Potato)' : 'Potato'}</span>
          </button>
        </div>

        {/* Crop Meta Summary Box directly attached to tab group */}
        <div className="bg-[#FAFDF8] border border-[#BAC8AA] rounded-b-xl p-4 sm:p-5 space-y-3.5 text-xs shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2EAD6] pb-3">
            <strong className="text-sm sm:text-base font-extrabold text-[#1E4D2B]">
              {lang === 'or' ? guide.crop_name_or : guide.crop_name_en}
            </strong>
            {/* Non-button, clear static duration label */}
            <div className="text-xs font-semibold text-[#5A4D41] flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{guide.total_duration}</span>
            </div>
          </div>

          <div className="text-[#5A4D41] leading-relaxed">
            <span className="font-bold text-[#2C221E] block mb-1">
              {lang === 'or' ? 'ମୁଖ୍ୟ ଧାରଣା ଓ କିସମ (Assumption):' : 'Regional Assumption:'}
            </span>
            <p className="text-xs text-[#4A3E38]">{lang === 'or' ? guide.variety_assumption_or : guide.variety_assumption_en}</p>
          </div>

          {/* Source Citation with ample vertical breathing room and minimum 12px copy */}
          <div className="flex items-center space-x-2 text-xs text-[#5A4D41] pt-3.5 border-t border-[#E2EAD6]">
            <Award className="w-4 h-4 text-[#D97706] flex-shrink-0" />
            <span><strong>{lang === 'or' ? 'ପ୍ରାମାଣିକ ଉତ୍ସ: ' : 'Source Citation: '}</strong>{guide.source_citation}</span>
          </div>
        </div>

      </div>

      {/* Stage-by-Stage Timeline with enhanced high-contrast sequence connector */}
      <div className="relative pl-7 space-y-6 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-1 before:bg-[#2C6E3B]/60 before:rounded-full">
        {guide.stages.map((stage) => (
          <div key={stage.stage_num} className="relative group">
            
            {/* Timeline Circle Marker */}
            <div className="absolute -left-7 top-1 w-6 h-6 rounded-full bg-[#1E4D2B] text-white text-xs font-bold flex items-center justify-center shadow-xs">
              {stage.stage_num}
            </div>

            {/* Stage Card with Real Field Stage Photo */}
            <div className="bg-[#FAFDF8] border border-[#D5DEC9] rounded-2xl overflow-hidden shadow-2xs hover:border-[#1E4D2B] transition-all group">
              
              {/* Real Agronomic Stage Photo */}
              <div className="relative h-24 sm:h-32 w-full overflow-hidden bg-[#15381F]">
                <img
                  src={STAGE_IMAGES[selectedCrop]?.[stage.stage_num] || '/images/stage_vegetative.jpg'}
                  alt={lang === 'or' ? stage.title_or : stage.title_en}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-white">
                  <span className="text-xs sm:text-sm font-extrabold drop-shadow-sm truncate mr-2">
                    {lang === 'or' ? `ପର୍ଯ୍ୟାୟ ${stage.stage_num}: ${stage.title_or}` : `Stage ${stage.stage_num}: ${stage.title_en}`}
                  </span>
                  <span className="text-[11px] font-bold bg-[#1E4D2B]/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/20 whitespace-nowrap flex-shrink-0">
                    {stage.timeframe}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4">

              {/* Bulleted Action Points with proper hanging indent */}
              <ul className="space-y-2 text-xs text-[#382E28] leading-relaxed">
                {(lang === 'or' ? stage.actions_or : stage.actions_en).map((action, aIdx) => (
                  <li key={aIdx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E4D2B] flex-shrink-0 mt-0.5" />
                    <span className="flex-1 normal-case tracking-normal">{action}</span>
                  </li>
                ))}
              </ul>

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Disclaimer Notice with min 12px text */}
      <div className="mt-7 p-4 rounded-xl bg-[#FEF3C7]/60 border border-[#F59E0B]/40 text-xs text-[#92400E] flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed flex-1">
          <strong>{lang === 'or' ? 'ସୂଚନା ଓ ସତର୍କତା: ' : 'Agronomic Notice: '}</strong>
          {lang === 'or'
            ? 'ମୌସୁମୀ ଆଗମନ, ମାଟିର ପ୍ରକାର (ବେଲେଇ ବା ମଟାଳ) ଏବଂ ନିର୍ଦ୍ଦିଷ୍ଟ ବିହନ କିସମ ଅନୁଯାୟୀ ସମୟସୀମାରେ ସାମାନ୍ୟ ପରିବର୍ତ୍ତନ ହୋଇପାରେ। ଏହି ତଥ୍ୟ କେବଳ ସାଧାରଣ ମାର୍ଗଦର୍ଶନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ଏବଂ ସ୍ଥାନୀୟ ବ୍ଲକ କୃଷି ଅଧିକାରୀ (AAO) ବା KVK ବୈଜ୍ଞାନିକଙ୍କ ପ୍ରତ୍ୟକ୍ଷ ପରାମର୍ଶର ବିକଳ୍ପ ନୁହେଁ।'
            : 'Sowing, fertilization, and harvest timings shift based on monsoon arrival, soil texture (Sandy vs Heavy Clay), and specific seed duration. This static reference guide is for general planning and does not replace on-ground advice from your local Krishi Vigyan Kendra (KVK) or Assistant Agriculture Officer (AAO).'}
        </p>
      </div>

    </div>
  );
}
