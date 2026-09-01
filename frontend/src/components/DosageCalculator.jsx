import React, { useState } from 'react';
import { Calculator, Droplets, Sparkles, Check, Layers } from 'lucide-react';
import { translations } from '../translations';

export default function DosageCalculator({ rec, lang }) {
  const t = translations[lang];
  const [landArea, setLandArea] = useState(10); // e.g. 10 decimals default
  const [landUnit, setLandUnit] = useState('decimal'); // 'decimal' | 'guntha' | 'acre'
  const [tankSize, setTankSize] = useState(15); // 15 Liters standard knapsack pump

  const dosagePerLiter = rec?.dosage_per_liter_g_ml || 2.0;
  const unit = rec?.dosage_unit || 'g';

  // Calculations
  // Standard agronomy: 1 acre = 100 decimals = 25 guntha = ~150 to 200 Liters of water
  let acres = 0.1;
  if (landUnit === 'decimal') {
    acres = landArea / 100.0;
  } else if (landUnit === 'guntha') {
    acres = landArea / 25.0;
  } else {
    acres = landArea;
  }

  const totalWaterLiters = Math.max(10, Math.round(acres * 160)); // ~160L water/acre for foliar spray
  const totalChemical = Math.round(totalWaterLiters * dosagePerLiter * 10) / 10;
  const chemicalPerTank = Math.round(tankSize * dosagePerLiter * 10) / 10;
  const numTanks = Math.ceil(totalWaterLiters / tankSize);
  const scoopsCount = Math.max(1, Math.round(chemicalPerTank / 10)); // ~10g per standard ag measuring scoop

  return (
    <div className="bg-[#FAFDF8] border border-[#C8D4BA] rounded-xl p-4 sm:p-5 text-left card-shadow">
      
      {/* Title */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#E2EAD6]">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#1E4D2B] uppercase tracking-wide">
              {lang === 'or' ? 'ସ୍ପ୍ରେ ଟାଙ୍କି ଓ ସାର-ଔଷଧ କାଲକୁଲେଟର' : 'Spray Tank & Dosage Calculator'}
            </h4>
            <p className="text-[11px] text-[#7A6E62]">
              {lang === 'or' ? 'ଆପଣଙ୍କ ଜମି ଓ ସ୍ପ୍ରେୟାର ଅନୁସାରେ ସଠିକ୍ ପରିମାଣ' : 'Exact measurement for your land and knapsack pump'}
            </p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-[#1E4D2B] bg-[#EAF0E6] px-2.5 py-1 rounded-full border border-[#BAC8AA]">
          {dosagePerLiter} {unit}/L
        </span>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        
        {/* Land Area Input */}
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଜମିର ପରିମାଣ (Land Size):' : 'Land Size:'}
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="1"
              max="1000"
              value={landArea}
              onChange={(e) => setLandArea(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-20 text-xs sm:text-sm font-bold bg-[#FDFCFA] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
            />
            <select
              value={landUnit}
              onChange={(e) => setLandUnit(e.target.value)}
              className="flex-1 text-xs sm:text-sm font-medium bg-[#FDFCFA] border border-[#BAC8AA] rounded-lg px-2 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
            >
              <option value="decimal">{lang === 'or' ? 'ଡେସିମିଲ୍ (Decimals)' : 'Decimals'}</option>
              <option value="guntha">{lang === 'or' ? 'ଗୁଣ୍ଠ (Guntha)' : 'Guntha'}</option>
              <option value="acre">{lang === 'or' ? 'ଏକର (Acres)' : 'Acres'}</option>
            </select>
          </div>
        </div>

        {/* Knapsack Pump Size */}
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ସ୍ପ୍ରେ ଟାଙ୍କି କ୍ଷମତା (Tank Volume):' : 'Knapsack Sprayer Tank:'}
          </label>
          <select
            value={tankSize}
            onChange={(e) => setTankSize(parseInt(e.target.value))}
            className="w-full text-xs sm:text-sm font-medium bg-[#FDFCFA] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            <option value={15}>{lang === 'or' ? '୧୫ ଲିଟର ଟାଙ୍କି (15L Standard Pump)' : '15-Liter Standard Pump'}</option>
            <option value={16}>{lang === 'or' ? '୧୬ ଲିଟର ବ୍ୟାଟେରୀ ସ୍ପ୍ରେୟାର (16L Battery)' : '16-Liter Battery Sprayer'}</option>
            <option value={10}>{lang === 'or' ? '୧୦ ଲିଟର ବାଲ୍ଟି (10L Bucket)' : '10-Liter Bucket'}</option>
          </select>
        </div>

      </div>

      {/* Calculated Output Cards */}
      <div className="grid grid-cols-3 gap-2 bg-[#F1F6EC] p-3 rounded-xl border border-[#D5DEC9]">
        
        {/* Chemical per tank */}
        <div className="text-center p-2 bg-[#FDFCFA] rounded-lg border border-[#BAC8AA]">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#7A6E62] block leading-tight">
            {lang === 'or' ? 'ପ୍ରତି ଟାଙ୍କିରେ ଔଷଧ' : 'Per Full Tank'}
          </span>
          <p className="text-sm sm:text-base font-extrabold text-[#1E4D2B] mt-0.5">
            {chemicalPerTank} <span className="text-xs font-semibold">{unit}</span>
          </p>
          <span className="text-[9px] text-[#8C8074]">
            {lang === 'or' ? `(~${scoopsCount} ଚାମଚ)` : `(~${scoopsCount} scoops)`}
          </span>
        </div>

        {/* Number of Tanks */}
        <div className="text-center p-2 bg-[#FDFCFA] rounded-lg border border-[#BAC8AA]">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#7A6E62] block leading-tight">
            {lang === 'or' ? 'ସମୁଦାୟ ଟାଙ୍କି' : 'Total Refills'}
          </span>
          <p className="text-sm sm:text-base font-extrabold text-[#D97706] mt-0.5">
            {numTanks} <span className="text-xs font-semibold">{lang === 'or' ? 'ଟାଙ୍କି' : 'Tanks'}</span>
          </p>
          <span className="text-[9px] text-[#8C8074]">
            {totalWaterLiters} L {lang === 'or' ? 'ପାଣି' : 'Water'}
          </span>
        </div>

        {/* Total Chemical Needed */}
        <div className="text-center p-2 bg-[#FDFCFA] rounded-lg border border-[#BAC8AA]">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#7A6E62] block leading-tight">
            {lang === 'or' ? 'ଜମି ପାଇଁ ମୋଟ' : 'Total Needed'}
          </span>
          <p className="text-sm sm:text-base font-extrabold text-[#8B3A2B] mt-0.5">
            {totalChemical} <span className="text-xs font-semibold">{unit}</span>
          </p>
          <span className="text-[9px] text-[#8C8074]">
            {lang === 'or' ? 'ଦୋକାନରୁ ଆଣିବେ' : 'To buy'}
          </span>
        </div>

      </div>

    </div>
  );
}
