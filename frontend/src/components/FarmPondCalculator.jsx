import React, { useState } from 'react';
import { Waves, Droplets, Fish, Sparkles, Scale, CheckCircle2, ShieldCheck, Sun } from 'lucide-react';
import { translations } from '../translations';

export default function FarmPondCalculator({ lang }) {
  const [pondLengthFt, setPondLengthFt] = useState(50); // Length top in ft (approx 5 Decimals)
  const [pondWidthFt, setPondWidthFt] = useState(40);   // Width top in ft
  const [pondDepthFt, setPondDepthFt] = useState(8);    // Depth in ft

  // Prismoidal Volume formula for trapezoidal farm ponds with 1.5:1 side slope:
  // Top Area = L * W
  // Bottom Area = (L - 2*1.5*D) * (W - 2*1.5*D)
  const topArea = pondLengthFt * pondWidthFt;
  const botL = Math.max(5, pondLengthFt - 2 * 1.5 * pondDepthFt);
  const botW = Math.max(5, pondWidthFt - 2 * 1.5 * pondDepthFt);
  const botArea = botL * botW;
  const midArea = ((pondLengthFt + botL) / 2) * ((pondWidthFt + botW) / 2);

  // Volume in Cubic Feet = (Depth / 6) * (TopArea + 4*MidArea + BottomArea)
  const volumeCuFt = (pondDepthFt / 6) * (topArea + 4 * midArea + botArea);
  
  // 1 Cu Ft = 28.317 Liters = 0.028317 Cubic Meters
  const volumeLiters = Math.round(volumeCuFt * 28.317);
  const volumeCuMeters = (volumeCuFt * 0.028317).toFixed(0);

  // Emergency Rabi Irrigation Estimation:
  // A 2 HP diesel pump delivers approx 15,000 Liters / hour
  const pumpHoursAvailable = Math.round((volumeLiters * 0.8) / 15000); // 80% usable after evaporation
  
  // Fish fingerling stocking capacity: ~500 fingerlings per 1000 sq meters (or ~200 per 5 decimal pond)
  const pondAreaSqM = (topArea * 0.0929).toFixed(0);
  const fishFingerlingsCount = Math.round((pondAreaSqM / 1000) * 600);

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#0284C7]">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଫାର୍ମ ପଣ୍ଡ (ଜଳ ସଂରକ୍ଷଣ ପୋଖରୀ) ମାପ ଓ ଜଳସେଚନ କ୍ଷମତା' : 'Farm Pond (Mo Pokhari) Rainwater Sizing Calculator'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ବର୍ଷା ଜଳ ସଂରକ୍ଷଣ, ଜରୁରୀକାଳୀନ ରବି ଜଳସେଚନ ଓ ମାଛ ଚାଷ କ୍ଷମତା ହିସାବ' : 'Compute water volume (Liters), diesel pump hours & fish fingerling stocking density'}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#D5DEC9] mb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] mb-2.5">
          📐 {lang === 'or' ? 'ପୋଖରୀର ମାପ (ଫୁଟ୍ ହିସାବରେ):' : 'Farm Pond Dimensions (Feet):'}
        </h4>

        <div className="grid grid-cols-3 gap-2.5 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଲମ୍ବ (Length ft):' : 'Length (ft):'}
            </label>
            <input
              type="number"
              min="20"
              step="5"
              value={pondLengthFt}
              onChange={(e) => setPondLengthFt(parseFloat(e.target.value) || 20)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-bold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଓସାର (Width ft):' : 'Width (ft):'}
            </label>
            <input
              type="number"
              min="15"
              step="5"
              value={pondWidthFt}
              onChange={(e) => setPondWidthFt(parseFloat(e.target.value) || 15)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-bold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଗଭୀରତା (Depth ft):' : 'Depth (ft):'}
            </label>
            <input
              type="number"
              min="4"
              max="15"
              step="1"
              value={pondDepthFt}
              onChange={(e) => setPondDepthFt(parseFloat(e.target.value) || 4)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-bold"
            />
          </div>
        </div>
      </div>

      {/* Output Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        
        {/* Total Liters */}
        <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#0369A1] block mb-0.5">
            💧 {lang === 'or' ? 'ମୋଟ ଜଳ ସଂରକ୍ଷଣ (Water Capacity)' : 'Total Stored Rainwater'}
          </span>
          <p className="text-xl font-extrabold text-[#0C4A6E]">
            {volumeLiters.toLocaleString('en-IN')} <span className="text-xs font-normal">Liters</span>
          </p>
          <span className="text-[10px] text-[#0284C7] block mt-0.5 font-semibold">
            ≈ {volumeCuMeters} m³ (ଘନ ମିଟର)
          </span>
        </div>

        {/* Pump Irrigation Hours */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#BAC8AA] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#1E4D2B] block mb-0.5">
            ⛽ {lang === 'or' ? 'ଡିଜେଲ ପମ୍ପ ଚାଲିବା ସମୟ' : 'Emergency Pump Hours'}
          </span>
          <p className="text-xl font-extrabold text-[#1E4D2B]">
            ≈ {pumpHoursAvailable} <span className="text-xs font-normal text-[#2C221E]">Hours</span>
          </p>
          <span className="text-[10px] text-[#5A4D41] block mt-0.5 font-semibold">
            {lang === 'or' ? '୨ ଏକର ଜମିରେ ୩-୪ ଥର ଜରୁରୀ ପାଣି' : 'Provides 3-4 life-saving irrigations'}
          </span>
        </div>

        {/* Fish Fingerlings */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#D97706]/40 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#D97706] block mb-0.5">
            🐟 {lang === 'or' ? 'ମାଛ ଯାଆଁଳ ଧାରଣ କ୍ଷମତା' : 'Fish Fingerling Capacity'}
          </span>
          <p className="text-xl font-extrabold text-[#D97706]">
            ≈ {fishFingerlingsCount} <span className="text-xs font-normal text-[#2C221E]">Fingerlings</span>
          </p>
          <span className="text-[10px] text-[#92400E] block mt-0.5 font-semibold">
            {lang === 'or' ? 'ଭାକୁର + ରୋହି + ମିରିକାଳି' : 'Catla, Rohu & Mrigal mix'}
          </span>
        </div>

      </div>

    </div>
  );
}
