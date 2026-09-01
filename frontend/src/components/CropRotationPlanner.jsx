import React, { useState } from 'react';
import { Sprout, RefreshCcw, ShieldCheck, TrendingUp, Sparkles, Droplets, CheckCircle } from 'lucide-react';
import { translations } from '../translations';

const ROTATION_DATABASE = {
  Rice: {
    rabi: {
      crop_en: "Green Gram / Moong (Mung Bean) - IPM-02-14",
      crop_or: "ମୁଗ (Green Gram - IPM-02-14 / ସମ୍ରାଟ୍)",
      n_fixation: "35-40 kg N / hectare",
      cost_saving_en: "Saves ~30% urea cost for next season",
      cost_saving_or: "ପରବର୍ତ୍ତୀ ଫସଲ ପାଇଁ ୩୦% ୟୁରିଆ ସାର ଖର୍ଚ୍ଚ କମାଏ",
      disease_benefit_en: "Breaks life cycle of Rice Blast and Sheath Blight fungal spores in wet soil.",
      disease_benefit_or: "ଧାନର ପତ୍ର ମହିଷା ଏବଂ ଖୋଳପୋଡ଼ା ରୋଗ ଜୀବାଣୁ ଚକ୍ରକୁ ମାଟିରୁ ନଷ୍ଟ କରେ।",
      duration_days: "60-65 days",
      est_yield_profit: "₹35,000 - ₹45,000 / acre"
    },
    summer: {
      crop_en: "Dhanicha Green Manure (Sesbania aculeata)",
      crop_or: "ଧନିଚା ସବୁଜ ଖତ (Dhanicha / Sesbania)",
      n_fixation: "60-80 kg N / hectare + 20t biomass",
      cost_saving_en: "Replaces 2 bags of synthetic Urea + improves water holding capacity",
      cost_saving_or: "୨ ବସ୍ତା ୟୁରିଆର ସମତୁଲ୍ୟ ଯବକ୍ଷାରଜାନ ଯୋଗାଏ ଓ ଜମିର ଉର୍ବରତା ବଢ଼ାଏ",
      disease_benefit_en: "Suppresses soil nematodes and bacterial wilt pathogens.",
      disease_benefit_or: "ମାଟିରେ ଥିବା କ୍ଷତିକାରକ କୃମି ଓ ଜୀବାଣୁ ଦମନ କରେ।",
      duration_days: "45 days (incorporate into soil)",
      est_yield_profit: "Cuts ₹3,000/acre fertilizer expenditure"
    }
  },
  Tomato: {
    rabi: {
      crop_en: "French Bean / Cowpea (Jhudanga) or Maize",
      crop_or: "ଝୁଡ଼ଙ୍ଗ (Cowpea) କିମ୍ବା ମକା (Maize)",
      n_fixation: "25-30 kg N / hectare",
      cost_saving_en: "Restores heavy phosphorus and potassium uptake",
      cost_saving_or: "ମାଟିର ପୋଷକ ତତ୍ତ୍ୱ ସନ୍ତୁଳନ ଫେରାଇ ଆଣେ",
      disease_benefit_en: "Breaks Solanaceous Bacterial Wilt (Ralstonia) & Root-Knot Nematode buildup.",
      disease_benefit_or: "ବାଇଗଣ ଜାତୀୟ ଫସଲର ଜୀବାଣୁ ଝାଉଁଳା ଓ ମୂଳ ଗଣ୍ଠି ରୋଗରୁ ମୁକ୍ତି ଦିଏ।",
      duration_days: "70-75 days",
      est_yield_profit: "₹50,000 / acre"
    }
  },
  Potato: {
    summer: {
      crop_en: "Black Gram / Biri (PU-31) or Maize",
      crop_or: "ବିରି (Black Gram - PU-31 / ସାରଳା)",
      n_fixation: "30-35 kg N / hectare",
      cost_saving_en: "Loosens compacted soil ridges left after potato tuber digging",
      cost_saving_or: "ଆଳୁ ଖୋଳିବା ପରେ କଠିନ ମାଟିକୁ ପୁନର୍ବାର ହାଲୁକା ଓ ଉର୍ବର କରେ",
      disease_benefit_en: "Starves resting Late Blight zoospores and Streptomyces scab bacteria.",
      disease_benefit_or: "ମାଟିରେ ସୁପ୍ତ ଥିବା ଆଳୁ ପଛୁଆ ପତ୍ରପୋଡ଼ା (Late Blight) ଜୀବାଣୁକୁ ନଷ୍ଟ କରେ।",
      duration_days: "65-70 days",
      est_yield_profit: "₹30,000 - ₹40,000 / acre"
    }
  }
};

export default function CropRotationPlanner({ lang }) {
  const [currentCrop, setCurrentCrop] = useState('Rice');
  const [season, setSeason] = useState('rabi');

  const cropData = ROTATION_DATABASE[currentCrop] || ROTATION_DATABASE.Rice;
  const rotationInfo = cropData[season] || cropData.rabi || Object.values(cropData)[0];

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଫସଲ ପର୍ଯ୍ୟାୟ ଓ ମାଟି ଉର୍ବରତା ଯୋଜନା' : 'Crop Rotation & Soil Health Planner'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଅମଳ ପରେ ଡାଲି ଜାତୀୟ ଫସଲ ଲଗାଇ ସାର ଖର୍ଚ୍ଚ କମାନ୍ତୁ ଓ ରୋଗ ଦୂର କରନ୍ତୁ' : 'Scientific post-harvest rotation to fix atmospheric N2 and starve disease pathogens'}
            </p>
          </div>
        </div>
      </div>

      {/* Selector Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'କଟାଯାଇଥିବା ମୁଖ୍ୟ ଫସଲ (Harvested Crop):' : 'Harvested Crop:'}
          </label>
          <select
            value={currentCrop}
            onChange={(e) => setCurrentCrop(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            <option value="Rice">{lang === 'or' ? '🌾 ଧାନ (Rice / Paddy)' : '🌾 Rice / Paddy'}</option>
            <option value="Tomato">{lang === 'or' ? '🍅 ବିଲାତି ବାଇଗଣ (Tomato)' : '🍅 Tomato'}</option>
            <option value="Potato">{lang === 'or' ? '🥔 ଆଳୁ (Potato)' : '🥔 Potato'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ପରବର୍ତ୍ତୀ ଋତୁ (Upcoming Season):' : 'Upcoming Season:'}
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            <option value="rabi">{lang === 'or' ? 'ରବି ଋତୁ (Rabi - Winter/Spring)' : 'Rabi (Winter/Spring)'}</option>
            <option value="summer">{lang === 'or' ? 'ଖରାଟିଆ / ଜାଇଦ୍ (Summer / Zaid)' : 'Summer / Zaid'}</option>
          </select>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="bg-[#FAFDF8] border-2 border-[#1E4D2B]/30 rounded-xl p-4 space-y-3 shadow-2xs">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2EAD6] pb-2.5">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7A6E62] block">
              {lang === 'or' ? 'ସର୍ବୋତ୍ତମ ପର୍ଯ୍ୟାୟ ଫସଲ (Best Rotation Crop)' : 'Recommended Rotation Crop'}
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-[#1E4D2B]">
              {lang === 'or' ? rotationInfo.crop_or : rotationInfo.crop_en}
            </h4>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA]">
            ⏱️ {rotationInfo.duration_days}
          </span>
        </div>

        {/* 3 Metric Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          
          <div className="p-2.5 bg-[#FDFCFA] rounded-lg border border-[#E2EAD6]">
            <span className="text-[10px] font-bold text-[#1E4D2B] flex items-center space-x-1 mb-0.5">
              <Sparkles className="w-3 h-3 text-[#D97706]" />
              <span>{lang === 'or' ? 'ପ୍ରାକୃତିକ ଯବକ୍ଷାରଜାନ' : 'Nitrogen Fixed'}</span>
            </span>
            <p className="font-extrabold text-[#2C221E] text-xs sm:text-sm">
              {rotationInfo.n_fixation}
            </p>
          </div>

          <div className="p-2.5 bg-[#FDFCFA] rounded-lg border border-[#E2EAD6]">
            <span className="text-[10px] font-bold text-[#1E4D2B] flex items-center space-x-1 mb-0.5">
              <TrendingUp className="w-3 h-3 text-[#1E4D2B]" />
              <span>{lang === 'or' ? 'ସାର ଖର୍ଚ୍ଚ ସଞ୍ଚୟ' : 'Fertilizer Saving'}</span>
            </span>
            <p className="font-semibold text-[#2C221E] text-xs">
              {lang === 'or' ? rotationInfo.cost_saving_or : rotationInfo.cost_saving_en}
            </p>
          </div>

          <div className="p-2.5 bg-[#FDFCFA] rounded-lg border border-[#E2EAD6]">
            <span className="text-[10px] font-bold text-[#1E4D2B] flex items-center space-x-1 mb-0.5">
              <CheckCircle className="w-3 h-3 text-[#0284C7]" />
              <span>{lang === 'or' ? 'ଅନୁମାନିତ ଆୟ' : 'Est. Income/Value'}</span>
            </span>
            <p className="font-bold text-[#0284C7] text-xs">
              {rotationInfo.est_yield_profit}
            </p>
          </div>

        </div>

        {/* Pathogen Break Explanation */}
        <div className="bg-[#F2F7ED] p-3 rounded-lg border border-[#BAC8AA] text-xs text-[#2C221E] flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#1E4D2B] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1E4D2B] block">
              {lang === 'or' ? 'ରୋଗ ଜୀବାଣୁ ଦମନ ଲାଭ (Pathogen Suppression):' : 'Disease Suppression Benefit:'}
            </strong>
            <p className="text-[#4A3E38] mt-0.5 leading-relaxed">
              {lang === 'or' ? rotationInfo.disease_benefit_or : rotationInfo.disease_benefit_en}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
