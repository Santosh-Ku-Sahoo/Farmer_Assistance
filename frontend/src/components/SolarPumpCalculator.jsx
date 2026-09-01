import React, { useState } from 'react';
import { Sun, Zap, Droplets, IndianRupee, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { translations } from '../translations';

export default function SolarPumpCalculator({ lang }) {
  const [waterSource, setWaterSource] = useState('borewell'); // 'borewell' | 'dugwell' | 'river'
  const [depthFeet, setDepthFeet] = useState(80);
  const [landAcres, setLandAcres] = useState(2);
  const [farmerCategory, setFarmerCategory] = useState('marginal'); // 'marginal' (90% subsidy) | 'general' (70% subsidy)

  // Sizing Logic based on Odisha Soura Jalanidhi II guidelines:
  // - 0.5 HP / 1 HP: Shallow dugwells (<40 ft) for 0.5 - 1.0 Acre
  // - 2 HP Submersible: 40-100 ft depth for 1 - 3 Acres (1,800 Wp Solar PV)
  // - 3 HP Submersible: 100-180 ft depth for 3 - 5 Acres (3,000 Wp Solar PV)
  // - 5 HP Submersible: 180-250+ ft depth for 5+ Acres (4,800 Wp Solar PV)

  let pumpHp = 2;
  let pvWattage = 1800;
  let baseCost = 140000; // Benchmark cost ₹1.4 Lakh
  let dailyDischargeLiters = 55000; // ~55,000 Liters/day

  if (depthFeet <= 40 && landAcres <= 1.5) {
    pumpHp = 1;
    pvWattage = 1000;
    baseCost = 90000;
    dailyDischargeLiters = 35000;
  } else if (depthFeet <= 100 && landAcres <= 3) {
    pumpHp = 2;
    pvWattage = 1800;
    baseCost = 140000;
    dailyDischargeLiters = 55000;
  } else if (depthFeet <= 180 && landAcres <= 5) {
    pumpHp = 3;
    pvWattage = 3000;
    baseCost = 210000;
    dailyDischargeLiters = 85000;
  } else {
    pumpHp = 5;
    pvWattage = 4800;
    baseCost = 320000;
    dailyDischargeLiters = 140000;
  }

  // Subsidy % under Odisha Soura Jalanidhi II:
  // 90% for Small/Marginal/SC/ST/Women farmers (Max subsidy capped per guidelines)
  // 70% for General category farmers
  const subsidyPercent = farmerCategory === 'marginal' ? 90 : 70;
  const subsidyAmount = Math.round(baseCost * (subsidyPercent / 100));
  const farmerShare = baseCost - subsidyAmount;

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#FFFBEB] text-[#D97706]">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ସୌର ଜଳନିଧି ପମ୍ପ ଓ ସବସିଡି ହିସାବ (Soura Jalanidhi)' : 'Solar Water Pump Sizing & Odisha Subsidy Estimator'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଓଡ଼ିଶା ସରକାରଙ୍କ ୭୦% ରୁ ୯୦% ରିହାତିରେ ସୌର ପମ୍ପ ପାଇବା ପାଇଁ ମାପ ଓ ଖର୍ଚ୍ଚ' : 'Calculate recommended Pump HP, Solar Panels (Watts) & Government Subsidy'}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 mb-5 text-xs">
        <div>
          <label className="font-semibold text-[#5A4D41] block mb-1">
            💧 {lang === 'or' ? 'ପାଣିର ଉତ୍ସ:' : 'Water Source:'}
          </label>
          <select
            value={waterSource}
            onChange={(e) => setWaterSource(e.target.value)}
            className="w-full font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2 py-1.5 text-[#2C221E]"
          >
            <option value="borewell">{lang === 'or' ? 'ବୋରୱେଲ୍ (Borewell)' : 'Borewell'}</option>
            <option value="dugwell">{lang === 'or' ? 'ଖୋଲା କୂଅ (Open Dugwell)' : 'Open Dugwell'}</option>
            <option value="river">{lang === 'or' ? 'ନଦୀ / ନାଳ (River/Canal)' : 'River / Canal'}</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-[#5A4D41] block mb-1">
            📏 {lang === 'or' ? 'ଗଭୀରତା (ଫୁଟ୍):' : 'Depth (Feet):'}
          </label>
          <input
            type="number"
            min="10"
            max="350"
            step="10"
            value={depthFeet}
            onChange={(e) => setDepthFeet(parseFloat(e.target.value) || 20)}
            className="w-full font-bold bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2 py-1.5 text-[#2C221E]"
          />
        </div>

        <div>
          <label className="font-semibold text-[#5A4D41] block mb-1">
            🌾 {lang === 'or' ? 'ଜମି ପରିମାଣ (ଏକର):' : 'Land Size (Acres):'}
          </label>
          <input
            type="number"
            min="0.5"
            max="25"
            step="0.5"
            value={landAcres}
            onChange={(e) => setLandAcres(parseFloat(e.target.value) || 1)}
            className="w-full font-bold bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2 py-1.5 text-[#2C221E]"
          />
        </div>

        <div>
          <label className="font-semibold text-[#5A4D41] block mb-1">
            🏷️ {lang === 'or' ? 'ଚାଷୀ ବର୍ଗ (ସବସିଡି):' : 'Farmer Category:'}
          </label>
          <select
            value={farmerCategory}
            onChange={(e) => setFarmerCategory(e.target.value)}
            className="w-full font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2 py-1.5 text-[#2C221E]"
          >
            <option value="marginal">{lang === 'or' ? 'କ୍ଷୁଦ୍ର / ନାମମାତ୍ର / SC / ST (୯୦% ରିହାତି)' : 'Small/Marginal/SC/ST (90% Subsidy)'}</option>
            <option value="general">{lang === 'or' ? 'ସାଧାରଣ ଚାଷୀ (୭୦% ରିହାତି)' : 'General Category (70% Subsidy)'}</option>
          </select>
        </div>
      </div>

      {/* Sizing & Capacity Output */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        
        {/* Pump HP */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border-2 border-[#D97706]/40 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#D97706] block mb-0.5">
            ⚡ {lang === 'or' ? 'ସୁପାରିଶ ପମ୍ପ କ୍ଷମତା' : 'Recommended Pump'}
          </span>
          <p className="text-2xl font-extrabold text-[#2C221E]">
            {pumpHp} HP <span className="text-xs font-semibold text-[#7A6E62]">{waterSource === 'river' ? 'Surface DC' : 'Submersible DC'}</span>
          </p>
          <span className="text-[11px] text-[#92400E] font-bold block mt-0.5">
            ☀️ {pvWattage} Wp {lang === 'or' ? 'ସୋଲାର ପ୍ୟାନେଲ୍' : 'Solar PV Panels'}
          </span>
        </div>

        {/* Daily Water */}
        <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#0369A1] block mb-0.5">
            💧 {lang === 'or' ? 'ଦୈନିକ ପାଣି ନିଷ୍କାସନ' : 'Daily Water Discharge'}
          </span>
          <p className="text-xl font-extrabold text-[#0C4A6E]">
            ≈ {dailyDischargeLiters.toLocaleString('en-IN')} <span className="text-xs font-normal">Liters/day</span>
          </p>
          <span className="text-[10px] text-[#0284C7] block mt-0.5 font-semibold">
            {lang === 'or' ? '୬-୭ ଘଣ୍ଟା ସୂର୍ଯ୍ୟ କିରଣରେ' : 'During 6-7 sunny peak hours'}
          </span>
        </div>

        {/* Financial Breakdown */}
        <div className="p-3.5 rounded-xl bg-[#EAF0E6] border border-[#2C6E3B] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#1E4D2B] block mb-0.5">
            💰 {lang === 'or' ? 'ଚାଷୀଙ୍କ ନିଜ ଖର୍ଚ୍ଚ (Farmer Share)' : 'Farmer Net Share Cost'}
          </span>
          <p className="text-2xl font-extrabold text-[#1E4D2B]">
            ₹ {farmerShare.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-[#166534] font-bold block mt-0.5">
            🎉 {lang === 'or' ? `ସରକାରୀ ସବସିଡି (${subsidyPercent}%): ₹ ${subsidyAmount.toLocaleString('en-IN')}` : `Govt Subsidy (${subsidyPercent}%): ₹ ${subsidyAmount.toLocaleString('en-IN')}`}
          </span>
        </div>

      </div>

      {/* Scheme Application Checklist */}
      <div className="bg-[#FAFDF8] p-3.5 rounded-xl border border-[#BAC8AA] text-xs text-[#2C221E] space-y-2">
        <strong className="block font-bold text-[#1E4D2B]">
          📋 {lang === 'or' ? 'ସୌର ଜଳନିଧି ଯୋଜନାରେ ଆବେଦନ ପାଇଁ ଆବଶ୍ୟକୀୟ କାଗଜପତ୍ର:' : 'Required Documents for Soura Jalanidhi II (agrnet.odisha.gov.in):'}
        </strong>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#5A4D41]">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4D2B]" />
            <span>{lang === 'or' ? 'ଜମି ପଟ୍ଟା (Land RoR Record)' : 'Land RoR / Patta Passbook'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4D2B]" />
            <span>{lang === 'or' ? 'ଆଧାର କାର୍ଡ ଓ ବ୍ୟାଙ୍କ ପାସବୁକ୍' : 'Aadhaar Card & Bank Account'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4D2B]" />
            <span>{lang === 'or' ? 'କ୍ଷୁଦ୍ର ଚାଷୀ / ଜାତି ପ୍ରମାଣପତ୍ର' : 'Small Farmer / Caste Certificate (for 90%)'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4D2B]" />
            <span>{lang === 'or' ? 'ବୋରୱେଲ୍ / କୂଅ ଫଟୋ' : 'Borewell / Water source photo'}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
