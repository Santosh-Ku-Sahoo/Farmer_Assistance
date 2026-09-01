import React, { useState } from 'react';
import { Sparkles, Package, Scale, IndianRupee, CheckCircle2, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { translations } from '../translations';

export default function VermicompostCalculator({ lang }) {
  const [pitLength, setPitLength] = useState(10); // Length in ft
  const [pitWidth, setPitWidth] = useState(3);   // Width in ft
  const [pitHeight, setPitHeight] = useState(2);  // Height in ft

  const volumeCuFt = pitLength * pitWidth * pitHeight;
  
  // Standard agronomic ratios:
  // 1 cu ft holds approx 15 kg of mixed semi-decomposed biomass (cow dung + dry straw)
  const rawBiomassKg = volumeCuFt * 15;
  
  // Earthworm rate: 1 kg of Eisenia Fetida worms per 100 kg of biomass (approx 1,000 worms/kg)
  const wormKgNeeded = Math.max(1, (rawBiomassKg / 100).toFixed(1));
  
  // Harvest conversion: 60-70% recovery as fine vermicompost every 45-60 days
  const harvestKg = (rawBiomassKg * 0.65).toFixed(0);
  const bags50kg = (harvestKg / 50).toFixed(1);
  
  // Vermiwash liquid extract (collected from drainage pipe): ~15-20 Liters per pit per cycle
  const vermiwashLiters = (volumeCuFt * 0.35).toFixed(0);

  // Financial Value @ ₹9/kg
  const marketRevenue = harvestKg * 9;

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଜିଆ ଖତ କୁଣ୍ଡ ଉତ୍ପାଦନ ଓ ଲାଭ କ୍ୟାଲକୁଲେଟର' : 'Vermicompost Pit & Earthworm Bio-Yield Calculator'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'କୁଣ୍ଡ ଆକାର ଅନୁସାରେ ଗୋବର, ଜିଆ ପରିମାଣ ଓ ଖତ ଉତ୍ପାଦନ ହିସାବ' : 'Compute cow dung capacity, Eisenia Fetida worm kg & monthly organic compost revenue'}
            </p>
          </div>
        </div>
      </div>

      {/* Input Pit Dimensions */}
      <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#D5DEC9] mb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] mb-2.5">
          📐 {lang === 'or' ? 'ଜିଆ ଖତ କୁଣ୍ଡର ମାପ (Pit Dimensions in Feet):' : 'Vermicompost Pit Dimensions (Feet):'}
        </h4>

        <div className="grid grid-cols-3 gap-2.5 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଲମ୍ବ (Length ft):' : 'Length (ft):'}
            </label>
            <input
              type="number"
              min="2"
              step="1"
              value={pitLength}
              onChange={(e) => setPitLength(parseFloat(e.target.value) || 1)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-bold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଓସାର (Width ft):' : 'Width (ft):'}
            </label>
            <input
              type="number"
              min="1"
              step="0.5"
              value={pitWidth}
              onChange={(e) => setPitWidth(parseFloat(e.target.value) || 1)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-bold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଉଚ୍ଚତା (Depth ft):' : 'Depth/Height (ft):'}
            </label>
            <input
              type="number"
              min="1"
              max="3"
              step="0.5"
              value={pitHeight}
              onChange={(e) => setPitHeight(parseFloat(e.target.value) || 1)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-bold"
            />
          </div>
        </div>
      </div>

      {/* Output Calculations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        
        {/* Raw Biomass */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#BAC8AA] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#7A6E62] block mb-0.5">
            {lang === 'or' ? 'ଦରକାରୀ ଗୋବର ଓ ନଡ଼ା (Biomass)' : 'Raw Dung & Biomass Capacity'}
          </span>
          <p className="text-xl font-extrabold text-[#2C221E]">
            {rawBiomassKg} <span className="text-xs font-normal">kg</span>
          </p>
          <span className="text-[11px] text-[#5A4D41] mt-0.5 block">
            ≈ {(rawBiomassKg / 100).toFixed(1)} {lang === 'or' ? 'କୁଇଣ୍ଟାଲ' : 'Quintals'}
          </span>
        </div>

        {/* Earthworms needed */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#D97706]/40 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#D97706] block mb-0.5">
            {lang === 'or' ? 'ଦରକାରୀ ଜିଆ (Eisenia Fetida)' : 'Earthworms Required'}
          </span>
          <p className="text-xl font-extrabold text-[#D97706]">
            {wormKgNeeded} <span className="text-xs font-normal text-[#2C221E]">kg</span>
          </p>
          <span className="text-[11px] text-[#92400E] font-semibold mt-0.5 block">
            ≈ {wormKgNeeded * 1000} {lang === 'or' ? 'ଜିଆ ସଂଖ୍ୟା' : 'Worms'}
          </span>
        </div>

        {/* 45-Day Harvest */}
        <div className="p-3.5 rounded-xl bg-[#EAF0E6] border border-[#2C6E3B] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#1E4D2B] block mb-0.5">
            {lang === 'or' ? '୪୫-୬୦ ଦିନରେ ଅମଳ (Harvest)' : 'Harvest (Every 45-60 Days)'}
          </span>
          <p className="text-xl font-extrabold text-[#1E4D2B]">
            {harvestKg} <span className="text-xs font-normal">kg</span>
          </p>
          <span className="text-[11px] font-bold text-[#1E4D2B] mt-0.5 block">
            📦 ≈ {bags50kg} {lang === 'or' ? 'ବସ୍ତା (୫୦ କେଜି)' : 'Bags (50kg)'}
          </span>
        </div>

      </div>

      {/* Financial & Soil Value Footer */}
      <div className="p-3 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#78350F]">
        <div>
          <strong>💰 {lang === 'or' ? 'ଆନୁମାନିକ ବଜାର ମୂଲ୍ୟ:' : 'Estimated Market Value:'}</strong>{' '}
          {lang === 'or' ? `ପ୍ରତି ଅମଳରେ ₹ ${marketRevenue.toLocaleString('en-IN')} ଆୟ (ଦର ₹୯/କେଜି ହିସାବରେ) + ${vermiwashLiters} ଲିଟର ତରଳ ଜିଆପାଣି (Vermiwash)` : `₹ ${marketRevenue.toLocaleString('en-IN')} revenue per cycle (@ ₹9/kg) + ${vermiwashLiters}L Vermiwash liquid.`}
        </div>
      </div>

    </div>
  );
}
