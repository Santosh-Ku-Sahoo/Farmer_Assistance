import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ShieldAlert, CheckCircle2, ChevronRight, Sprout, Info, Award } from 'lucide-react';
import { CROP_GROWING_GUIDES } from '../data/cropGrowingGuides';

export default function CropGrowingGuide({ lang }) {
  const [selectedCrop, setSelectedCrop] = useState('Rice');

  const guide = CROP_GROWING_GUIDES[selectedCrop] || CROP_GROWING_GUIDES.Rice;

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଫସଲ ଚାଷ ପ୍ରଣାଳୀ ଓ କ୍ୟାଲେଣ୍ଡର (ବିହନ ରୁ ଅମଳ)' : 'Crop Cultivation Guide (Sowing to Harvest)'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଓଡ଼ିଶା କୃଷି ମାନକ ଅନୁଯାୟୀ ପ୍ରାମାଣିକ ପର୍ଯ୍ୟାୟଭିତ୍ତିକ ଚାଷ ମାର୍ଗଦର୍ଶିକା' : 'Verified stage-by-stage agronomic timeline based on Odisha state practices'}
            </p>
          </div>
        </div>
      </div>

      {/* Crop Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <button
          type="button"
          onClick={() => setSelectedCrop('Rice')}
          className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            selectedCrop === 'Rice'
              ? 'bg-[#1E4D2B] text-white shadow-xs'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#C8D4BA] hover:bg-[#EAF0E6]'
          }`}
        >
          <span>🌾</span>
          <span>{lang === 'or' ? 'ଧାନ (Rice)' : 'Rice / Paddy'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCrop('Tomato')}
          className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            selectedCrop === 'Tomato'
              ? 'bg-[#1E4D2B] text-white shadow-xs'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#C8D4BA] hover:bg-[#EAF0E6]'
          }`}
        >
          <span>🍅</span>
          <span>{lang === 'or' ? 'ଟମାଟୋ (Tomato)' : 'Tomato'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCrop('Potato')}
          className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            selectedCrop === 'Potato'
              ? 'bg-[#1E4D2B] text-white shadow-xs'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#C8D4BA] hover:bg-[#EAF0E6]'
          }`}
        >
          <span>🥔</span>
          <span>{lang === 'or' ? 'ଆଳୁ (Potato)' : 'Potato'}</span>
        </button>
      </div>

      {/* Crop Meta & Assumptions Banner */}
      <div className="bg-[#FAFDF8] border border-[#BAC8AA] rounded-xl p-3.5 mb-5 space-y-2 text-xs shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#E2EAD6] pb-2">
          <strong className="text-sm font-extrabold text-[#1E4D2B]">
            {lang === 'or' ? guide.crop_name_or : guide.crop_name_en}
          </strong>
          <span className="font-bold px-2.5 py-0.5 rounded-full bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA] text-[11px] flex items-center space-x-1">
            <Clock className="w-3 h-3 text-[#D97706]" />
            <span>{guide.total_duration}</span>
          </span>
        </div>

        <div className="text-[#5A4D41] leading-relaxed">
          <span className="font-bold text-[#2C221E] block mb-0.5">
            {lang === 'or' ? 'ମୁଖ୍ୟ ଧାରଣା ଓ କିସମ (Assumption):' : 'Regional Assumption:'}
          </span>
          <p>{lang === 'or' ? guide.variety_assumption_or : guide.variety_assumption_en}</p>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] text-[#7A6E62] pt-1 border-t border-[#EAF0E6]">
          <Award className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0" />
          <span><strong>{lang === 'or' ? 'ପ୍ରାମାଣିକ ଉତ୍ସ: ' : 'Source Citation: '}</strong>{guide.source_citation}</span>
        </div>
      </div>

      {/* Stage-by-Stage Timeline */}
      <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#BAC8AA]">
        {guide.stages.map((stage) => (
          <div key={stage.stage_num} className="relative group">
            
            {/* Timeline Circle Marker */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#1E4D2B] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
              {stage.stage_num}
            </div>

            {/* Stage Card */}
            <div className="bg-[#FAFDF8] border border-[#D5DEC9] rounded-xl p-3.5 sm:p-4 shadow-2xs hover:border-[#1E4D2B] transition-colors">
              
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 pb-2 border-b border-[#EAF0E6]">
                <h4 className="text-xs sm:text-sm font-extrabold text-[#2C221E]">
                  {lang === 'or' ? stage.title_or : stage.title_en}
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#EAF0E6] text-[#1E4D2B] whitespace-nowrap">
                  📅 {stage.timeframe}
                </span>
              </div>

              {/* Bulleted Action Points */}
              <ul className="space-y-1.5 text-xs text-[#382E28] leading-relaxed">
                {(lang === 'or' ? stage.actions_or : stage.actions_en).map((action, aIdx) => (
                  <li key={aIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4D2B] flex-shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>

            </div>

          </div>
        ))}
      </div>

      {/* Honesty & Extension Disclaimer */}
      <div className="mt-6 p-3.5 rounded-xl bg-[#FEF3C7]/60 border border-[#F59E0B]/40 text-xs text-[#92400E] flex items-start space-x-2">
        <Info className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{lang === 'or' ? 'ସୂଚନା ଓ ସତର୍କତା: ' : 'Agronomic Notice: '}</strong>
          {lang === 'or'
            ? 'ମୌସୁମୀ ଆଗମନ, ମାଟିର ପ୍ରକାର (ବେଲେଇ ବା ମଟାଳ) ଏବଂ ନିର୍ଦ୍ଦିଷ୍ଟ ବିହନ କିସମ ଅନୁଯାୟୀ ସମୟସୀମାରେ ସାମାନ୍ୟ ପରିବର୍ତ୍ତନ ହୋଇପାରେ। ଏହି ତଥ୍ୟ କେବଳ ସାଧାରଣ ମାର୍ଗଦର୍ଶନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ଏବଂ ସ୍ଥାନୀୟ ବ୍ଲକ କୃଷି ଅଧିକାରୀ (AAO) ବା KVK ବୈଜ୍ଞାନିକଙ୍କ ପ୍ରତ୍ୟକ୍ଷ ପରାମର୍ଶର ବିକଳ୍ପ ନୁହେଁ।'
            : 'Sowing, fertilization, and harvest timings shift based on monsoon arrival, soil texture (Sandy vs Heavy Clay), and specific seed duration. This static reference guide is for general planning and does not replace on-ground advice from your local Krishi Vigyan Kendra (KVK) or Assistant Agriculture Officer (AAO).'}
        </p>
      </div>

    </div>
  );
}
