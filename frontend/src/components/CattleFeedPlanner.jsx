import React, { useState } from 'react';
import { Milk, Sparkles, Scale, Heart, ShieldCheck, CheckCircle2, Droplets } from 'lucide-react';
import { translations } from '../translations';

export default function CattleFeedPlanner({ lang }) {
  const [animalType, setAnimalType] = useState('crossbred'); // 'crossbred' | 'desi' | 'buffalo'
  const [milkYieldLiters, setMilkYieldLiters] = useState(7);
  const [bodyWeightKg, setBodyWeightKg] = useState(380);

  // Standard ICAR-NDRI (National Dairy Research Institute) Ration Standards:
  // Dry Matter Intake (DMI) = ~2.5% to 3.0% of body weight
  // Maintenance concentrate: ~1.5 kg for desi, 2.0 kg for crossbred/buffalo
  // Production concentrate: 1 kg concentrate per 2.5 Liters of milk (cow) or per 2.0 Liters (buffalo)
  const isBuffalo = animalType === 'buffalo';
  const isDesi = animalType === 'desi';

  const maintenanceDanadar = isDesi ? 1.5 : 2.0;
  const productionDanadar = milkYieldLiters / (isBuffalo ? 2.0 : 2.5);
  const totalDanadarKg = (maintenanceDanadar + productionDanadar).toFixed(1);

  // Roughage:
  // Green Fodder: 15-25 kg/day (Hybrid Napier, Maize, Para grass)
  // Dry Straw: 4-6 kg/day (Paddy straw / Kada)
  const greenFodderKg = isDesi ? 15 : isBuffalo ? 25 : 20;
  const dryStrawKg = isDesi ? 4 : isBuffalo ? 6 : 5;
  
  // Mineral mixture: 50-60 grams/day + Common salt 30-40 grams/day
  const mineralGrams = isDesi ? 40 : 50;
  const saltGrams = 30;

  // Clean Drinking water requirement: ~40-60 Liters/day
  const waterLiters = (35 + milkYieldLiters * 3.5).toFixed(0);

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#D97706]">
            <Milk className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ପଶୁ ଖାଦ୍ୟ ଓ ଦୁଗ୍ଧ ବୃଦ୍ଧି ହିସାବ (Pashu Poshan Ration)' : 'Dairy Cattle Feed & Milk Production Ration Planner'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଗାଈ ଓ ମଇଁଷିର ଦୈନିକ ସୁଷମ ଖାଦ୍ୟ, ସବୁଜ ଘାସ, ଖଳି ଓ ଧାତୁସାର ହିସାବ' : 'Compute daily balanced green fodder, dry straw, concentrate & mineral mixture'}
            </p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            🐮 {lang === 'or' ? 'ଗୋପଶୁ ଚୟନ:' : 'Animal Type:'}
          </label>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E]"
          >
            <option value="crossbred">{lang === 'or' ? '🐄 ସଙ୍କର ଜର୍ସି / ଏଚ୍.ଏଫ୍ ଗାଈ (Crossbred)' : '🐄 Crossbred Cow (Jersey/HF)'}</option>
            <option value="desi">{lang === 'or' ? '🐂 ଦେଶୀ ଗାଈ (Desi Indigenous)' : '🐂 Desi Indigenous Cow'}</option>
            <option value="buffalo">{lang === 'or' ? '🐃 ଦେଶୀ / ମୁର୍ରା ମଇଁଷି (Buffalo)' : '🐃 Buffalo (Murrah/Local)'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            🥛 {lang === 'or' ? 'ଦୈନିକ କ୍ଷୀର ଉତ୍ପାଦନ (ଲିଟର):' : 'Daily Milk Yield (Liters):'}
          </label>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            value={milkYieldLiters}
            onChange={(e) => setMilkYieldLiters(parseFloat(e.target.value) || 0)}
            className="w-full text-xs sm:text-sm font-bold bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            ⚖️ {lang === 'or' ? 'ଆନୁମାନିକ ଓଜନ (କେଜି):' : 'Body Weight (kg):'}
          </label>
          <input
            type="number"
            min="200"
            max="600"
            step="20"
            value={bodyWeightKg}
            onChange={(e) => setBodyWeightKg(parseFloat(e.target.value) || 300)}
            className="w-full text-xs sm:text-sm font-bold bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E]"
          />
        </div>
      </div>

      {/* Daily Balanced Ration Output Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        
        {/* Concentrates */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border-2 border-[#D97706]/40 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#D97706] block mb-0.5">
            🌾 {lang === 'or' ? 'ଦାନା / ଖଳି / ଚୁନା' : 'Concentrate (Danadar)'}
          </span>
          <p className="text-xl font-extrabold text-[#2C221E]">
            {totalDanadarKg} <span className="text-xs font-normal">kg/day</span>
          </p>
          <span className="text-[10px] text-[#7A6E62] block mt-0.5">
            {lang === 'or' ? 'ରାଶି/ସୋରିଷ ଖଳି + କୁଣ୍ଡା' : 'Mustard cake + Bran mix'}
          </span>
        </div>

        {/* Green Fodder */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border-2 border-[#1E4D2B]/40 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#1E4D2B] block mb-0.5">
            🌱 {lang === 'or' ? 'ସବୁଜ ଘାସ (Green Fodder)' : 'Green Fodder'}
          </span>
          <p className="text-xl font-extrabold text-[#1E4D2B]">
            {greenFodderKg} <span className="text-xs font-normal text-[#2C221E]">kg/day</span>
          </p>
          <span className="text-[10px] text-[#7A6E62] block mt-0.5">
            {lang === 'or' ? 'ହାଇବ୍ରିଡ୍ ନାପିଅର୍ / ମକା' : 'Hybrid Napier / Maize'}
          </span>
        </div>

        {/* Dry Straw */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#BAC8AA] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#7A6E62] block mb-0.5">
            🌾 {lang === 'or' ? 'ଶୁଖିଲା ନଡ଼ା (Dry Straw)' : 'Dry Paddy Straw'}
          </span>
          <p className="text-xl font-extrabold text-[#2C221E]">
            {dryStrawKg} <span className="text-xs font-normal">kg/day</span>
          </p>
          <span className="text-[10px] text-[#7A6E62] block mt-0.5">
            {lang === 'or' ? 'ଛୋଟ ଖଣ୍ଡ କଟା ନଡ଼ା' : 'Chaffed paddy straw'}
          </span>
        </div>

        {/* Mineral Mixture & Salt */}
        <div className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#BAC8AA] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#7A6E62] block mb-0.5">
            🧪 {lang === 'or' ? 'ଧାତୁସାର + ଲୁଣ' : 'Mineral & Salt'}
          </span>
          <p className="text-xl font-extrabold text-[#2C221E]">
            {mineralGrams}g <span className="text-xs font-normal">+ {saltGrams}g</span>
          </p>
          <span className="text-[10px] text-[#7A6E62] block mt-0.5">
            {lang === 'or' ? 'ପ୍ରତିଦିନ ଦାନାରେ ମିଶାନ୍ତୁ' : 'Daily mix with feed'}
          </span>
        </div>

      </div>

      {/* Clean Water & Health Callout */}
      <div className="p-3 bg-[#F0F9FF] rounded-xl border border-[#BAE6FD] text-xs text-[#0369A1] flex items-center justify-between">
        <span className="flex items-center space-x-1.5 font-bold">
          <Droplets className="w-4 h-4 text-[#0284C7]" />
          <span>{lang === 'or' ? `ଦୈନିକ ପାନୀୟ ଜଳ ଆବଶ୍ୟକତା: ପ୍ରାୟ ${waterLiters} ଲିଟର ପରିଷ୍କାର ପାଣି` : `Clean Drinking Water: Approx ${waterLiters} Liters/day`}</span>
        </span>
      </div>

    </div>
  );
}
