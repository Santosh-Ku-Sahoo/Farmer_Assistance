import React, { useState } from 'react';
import { TestTube2, Scale, AlertTriangle, CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { translations } from '../translations';

export default function SoilPhLimeCalculator({ lang }) {
  const [soilPh, setSoilPh] = useState(5.2);
  const [landArea, setLandArea] = useState(10);
  const [landUnit, setLandUnit] = useState('decimal'); // 'decimal' | 'acre'

  // Conversion: 1 Acre = 100 Decimals
  const getAcres = () => {
    const val = parseFloat(landArea) || 0;
    return landUnit === 'decimal' ? val / 100 : val;
  };

  const acres = getAcres();

  // OUAT Odisha Lime recommendation for Acid Soils (pH < 6.5):
  // pH < 4.8: Severe Acidity -> 10 Quintals (1,000 kg) Lime / Acre
  // pH 4.8 - 5.5: Moderate Acidity -> 6 Quintals (600 kg) Lime / Acre
  // pH 5.6 - 6.4: Mild Acidity -> 3 Quintals (300 kg) Lime / Acre
  // pH 6.5 - 7.5: Neutral / Optimal -> 0 kg Lime
  // pH > 7.8: Saline/Alkaline -> Requires Gypsum (400 kg/Acre)
  
  let limePerAcreKg = 0;
  let statusType = "OPTIMAL";
  let statusTextEn = "Optimal Soil pH (6.5 - 7.5)";
  let statusTextOr = "ମାଟିର pH ସମ୍ପୂର୍ଣ୍ଣ ଉପଯୁକ୍ତ ଓ ସମତୁଲ (୬.୫ - ୭.୫)";

  if (soilPh < 4.8) {
    limePerAcreKg = 1000;
    statusType = "SEVERE_ACID";
    statusTextEn = "Strongly Acidic Soil (pH < 4.8) — Severe Nutrient Locking";
    statusTextOr = "ଅତ୍ୟଧିକ ଅମ୍ଳିଆ ମାଟି (pH < ୪.୮) — ଖତସାର ଉପଲବ୍ଧ ହୁଏ ନାହିଁ";
  } else if (soilPh <= 5.5) {
    limePerAcreKg = 600;
    statusType = "MOD_ACID";
    statusTextEn = "Moderately Acidic Soil (pH 4.8 - 5.5) — Phosphorus Fixed";
    statusTextOr = "ମଧ୍ୟମ ଅମ୍ଳିଆ ମାଟି (pH ୪.୮ - ୫.୫) — ଫସଫରସ୍ ଅପଚୟ";
  } else if (soilPh < 6.5) {
    limePerAcreKg = 300;
    statusType = "MILD_ACID";
    statusTextEn = "Slightly Acidic Soil (pH 5.6 - 6.4)";
    statusTextOr = "ସାମାନ୍ୟ ଅମ୍ଳିଆ ମାଟି (pH ୫.୬ - ୬.୪)";
  } else if (soilPh > 7.8) {
    statusType = "ALKALINE";
    statusTextEn = "Alkaline / Saline Soil (pH > 7.8) — Requires Gypsum";
    statusTextOr = "କ୍ଷାରିଆ ମାଟି (pH > ୭.୮) — କୃଷି ଜିପ୍ସମ୍ ଆବଶ୍ୟକ";
  }

  const totalLimeKg = (limePerAcreKg * acres).toFixed(1);
  const limeBags50kg = (totalLimeKg / 50).toFixed(1);

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <TestTube2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ମାଟିର ଅମ୍ଳତା (pH) ଓ କୃଷି ଚୂନ ହିସାବ' : 'Soil pH & Agricultural Lime Calculator'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଓଡ଼ିଶାର ଅମ୍ଳିଆ ମାଟି ସଂଶୋଧନ କରି ସାରର ଶତକଡ଼ା ୧୦୦% ଫଳ ପାଆନ୍ତୁ' : 'Reclaim acid soils with Agricultural Lime (Dolomite) to unlock fixed nutrients'}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            🧪 {lang === 'or' ? `ମାଟିର pH ମାନ (${soilPh}):` : `Soil pH Value (${soilPh}):`}
          </label>
          <input
            type="range"
            min="4.0"
            max="8.5"
            step="0.1"
            value={soilPh}
            onChange={(e) => setSoilPh(parseFloat(e.target.value))}
            className="w-full accent-[#1E4D2B] cursor-pointer mt-1"
          />
          <div className="flex justify-between text-[10px] font-bold text-[#7A6E62] mt-0.5">
            <span className="text-red-700">4.0 (Acid)</span>
            <span className="text-green-700">6.5 (Ideal)</span>
            <span className="text-blue-700">8.5 (Alkali)</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଜମି ମାପ ଏକକ:' : 'Land Unit:'}
          </label>
          <select
            value={landUnit}
            onChange={(e) => setLandUnit(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E]"
          >
            <option value="decimal">{lang === 'or' ? 'ଡେସିମିଲ୍ (Decimals)' : 'Decimals'}</option>
            <option value="acre">{lang === 'or' ? 'ଏକର (Acres)' : 'Acres'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଜମି ପରିମାଣ:' : 'Land Size:'}
          </label>
          <input
            type="number"
            min="1"
            value={landArea}
            onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] font-bold"
          />
        </div>
      </div>

      {/* Output Card */}
      <div className={`p-4 rounded-xl border-2 space-y-3 shadow-2xs ${
        statusType === 'OPTIMAL'
          ? 'bg-[#F0FDF4] border-[#22C55E]'
          : statusType === 'ALKALINE'
          ? 'bg-[#EFF6FF] border-[#3B82F6]'
          : 'bg-[#FEF2F2] border-[#EF4444]'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-black/10 pb-2">
          <strong className="text-sm sm:text-base font-extrabold text-[#2C221E]">
            {lang === 'or' ? statusTextOr : statusTextEn}
          </strong>
        </div>

        {limePerAcreKg > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/60 p-3 rounded-lg border border-black/5">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7A6E62] block">
                {lang === 'or' ? 'ଦରକାରୀ କୃଷି ଚୂନ / ଡୋଲୋମାଇଟ୍ (Agricultural Lime):' : 'Required Agricultural Lime (Dolomite):'}
              </span>
              <p className="text-2xl font-extrabold text-[#1E4D2B]">
                {totalLimeKg} <span className="text-xs font-medium text-[#2C221E]">kg</span>
              </p>
            </div>

            <div className="bg-[#1E4D2B] text-white px-3 py-1.5 rounded-lg text-xs font-bold self-start sm:self-auto shadow-xs">
              📦 ≈ {limeBags50kg} {lang === 'or' ? 'ବସ୍ତା (୫୦ କେଜି)' : 'Bags (50kg)'}
            </div>
          </div>
        ) : (
          <p className="text-xs font-semibold text-[#15803D]">
            {lang === 'or' 
              ? '✅ ଆପଣଙ୍କ ମାଟିର pH ସମ୍ପୂର୍ଣ୍ଣ ଅନୁକୂଳ। କୌଣସି ଚୂନ ପ୍ରୟୋଗ କରିବାର ଆବଶ୍ୟକତା ନାହିଁ।' 
              : '✅ Your soil pH is optimal. No liming material is required.'}
          </p>
        )}

        <div className="text-[11px] text-[#4A3E38] leading-relaxed pt-1">
          💡 <strong>{lang === 'or' ? 'ପ୍ରୟୋଗ ବିଧି:' : 'Application Guideline:'}</strong>{' '}
          {lang === 'or' 
            ? 'ଶେଷ କାଦୁଅ ଚାଷ ବା ରୁଆ/ବୁଣିବାର ୧୫-୨୦ ଦିନ ପୂର୍ବରୁ କୃଷି ଚୂନକୁ ମାଟିରେ ଭଲ ଭାବେ ଗୁଣ୍ଡ କରି ମିଶାନ୍ତୁ। ଚୂନ ଦେବା ଦିନ ରାସାୟନିକ ସାର ଦିଅନ୍ତୁ ନାହିଁ।' 
            : 'Broadcast finely powdered lime across ploughed soil 15-20 days BEFORE transplanting/fertilizer application. Never apply chemical fertilizers on the same day as lime.'}
        </div>
      </div>

    </div>
  );
}
