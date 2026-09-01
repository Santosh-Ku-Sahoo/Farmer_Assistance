import React, { useState } from 'react';
import { CloudRain, Sun, AlertTriangle, ShieldCheck, CheckCircle2, Droplets, Sparkles, HeartHandshake } from 'lucide-react';
import { translations } from '../translations';

export default function StressRecoveryPackage({ lang }) {
  const [stressType, setStressType] = useState('flood'); // 'flood' | 'drought'

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#8B3A2B]">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ (ବନ୍ୟା / ମରୁଡ଼ି) ଫସଲ ପୁନରୁଦ୍ଧାର ପ୍ୟାକେଜ୍' : 'Drought & Flood Stress Crop Recovery Package'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଜଳବନ୍ଦୀ, ବାତ୍ୟା କାଦୁଅ କିମ୍ବା ଟାଣ ଖରାରୁ ଛିଡ଼ା ଫସଲକୁ ପୁନର୍ଜୀବିତ କରିବାର ବୈଜ୍ଞାନିକ ଉପାୟ' : 'OUAT & ICAR emergency revival spray protocols for submerged or drought-hit crops'}
            </p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          type="button"
          onClick={() => setStressType('flood')}
          className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            stressType === 'flood'
              ? 'bg-[#0284C7] text-white shadow-xs'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#BAC8AA] hover:bg-[#EAF0E6]'
          }`}
        >
          <CloudRain className="w-4 h-4" />
          <span>{lang === 'or' ? '🌊 ବନ୍ୟା / ଜଳବନ୍ଦୀ (Flood Recovery)' : '🌊 Flood / Submergence'}</span>
        </button>

        <button
          type="button"
          onClick={() => setStressType('drought')}
          className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            stressType === 'drought'
              ? 'bg-[#D97706] text-white shadow-xs'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#BAC8AA] hover:bg-[#EAF0E6]'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>{lang === 'or' ? '☀️ ମରୁଡ଼ି / ଖରା (Drought Recovery)' : '☀️ Drought / Dry Spell'}</span>
        </button>
      </div>

      {/* Flood Recovery Protocol */}
      {stressType === 'flood' && (
        <div className="bg-[#FAFDF8] border-2 border-[#0284C7]/40 rounded-xl p-4 space-y-3.5 shadow-2xs">
          
          <div className="flex items-center space-x-2 text-[#0369A1] border-b border-[#BAE6FD] pb-2">
            <strong className="text-sm sm:text-base font-extrabold">
              {lang === 'or' ? '🌊 ଜଳବନ୍ଦୀ ଓ ବାତ୍ୟା ପରବର୍ତ୍ତୀ ୪-ପର୍ଯ୍ୟାୟ ପୁନରୁଦ୍ଧାର ନିର୍ଦ୍ଦେଶ:' : '4-Stage Post-Flood / Submergence Crop Revival Protocol:'}
            </strong>
          </div>

          <div className="space-y-2.5 text-xs text-[#2C221E]">
            
            {/* Step 1 */}
            <div className="p-2.5 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD]">
              <strong className="text-[#0C4A6E] block mb-0.5">
                1. {lang === 'or' ? 'ତୁରନ୍ତ ପାଣି ନିଷ୍କାସନ (Rapid Surface Drainage):' : 'Drain Standing Water Immediately:'}
              </strong>
              <p className="leading-relaxed">
                {lang === 'or'
                  ? 'ଜମିର ହିଡ଼ କାଟି ଯଥାଶୀଘ୍ର ଗୋଳିଆ ପାଣି ନିଷ୍କାସନ କରନ୍ତୁ ଯାହାଦ୍ୱାରା ଚେରକୁ ଅମ୍ଳଜାନ (Oxygen) ମିଳିପାରିବ।'
                  : 'Open field bund trenches immediately to drain stagnant muddy water so suffocated root zones can breathe.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
              <strong className="text-[#14532D] block mb-0.5">
                2. {lang === 'or' ? 'କାଦୁଅ ଧୋଇବା (Clean Foliar Spray):' : 'Wash Silt / Mud Film from Leaves:'}
              </strong>
              <p className="leading-relaxed">
                {lang === 'or'
                  ? 'ପତ୍ରରେ ଜମିଥିବା କାଦୁଅ ଆସ୍ତରଣକୁ ସ୍ପ୍ରେୟାର୍ ପମ୍ପରେ କେବଳ ପରିଷ୍କାର ପାଣି ସିଞ୍ଚନ କରି ଧୋଇ ଦିଅନ୍ତୁ, ଯାହାଦ୍ୱାରା ଆଲୋକଶ୍ଳେଷଣ (Photosynthesis) ପୁନର୍ବାର ଆରମ୍ଭ ହେବ।'
                  : 'Spray clean water on foliage to wash away deposited silt layers so plants can resume photosynthesis.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-2.5 rounded-lg bg-[#FEFCE8] border border-[#FDE047]">
              <strong className="text-[#854D0E] block mb-0.5">
                3. {lang === 'or' ? 'ଫୋଲିଆର୍ ସଞ୍ଜୀବନୀ ସ୍ପ୍ରେ (Foliar Booster Nutrition Spray):' : 'Emergency Bypass Foliar Spray:'}
              </strong>
              <p className="leading-relaxed font-semibold">
                {lang === 'or'
                  ? 'ପାଣିରେ ଚେର ଦୁର୍ବଳ ଥିବାରୁ ମାଟିରେ ସାର ନଦେଇ ପତ୍ର ଉପରେ ସ୍ପ୍ରେ କରନ୍ତୁ: ୧% ୟୁରିଆ (୧୦ ଗ୍ରାମ୍/ଲି.) + ୧% ପୋଟାସିୟମ୍ ନାଇଟ୍ରେଟ୍ (13:0:45) + ୦.୨% ଚିଲେଟେଡ୍ ଜିଙ୍କ୍ (୧ ଗ୍ରାମ୍/ଲି.)।'
                  : 'Bypass damaged roots with a foliar spray: 1% Urea (10g/L) + 1% Potassium Nitrate 13:0:45 (10g/L) + 0.2% Chelated Zinc (1g/L).'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5]">
              <strong className="text-[#991B1B] block mb-0.5">
                4. {lang === 'or' ? 'ମୂଳସଢ଼ା ରୋଗ ପ୍ରତିକାର (Root Rot Prevention Drench):' : 'Root Rot Fungicide Drench:'}
              </strong>
              <p className="leading-relaxed">
                {lang === 'or'
                  ? 'ଜଳବନ୍ଦୀ ଯୋଗୁଁ ଚେର ସଢ଼ିବା ରୋକିବା ପାଇଁ କାର୍ବେଣ୍ଡାଜିମ୍ + ମାଙ୍କୋଜେବ୍ (SAAF ୨ ଗ୍ରାମ୍/ଲି.) କିମ୍ବା ଟ୍ରାଇକୋଡର୍ମା ଗଛ ମୂଳରେ ସିଞ୍ଚନ କରନ୍ତୁ।'
                  : 'Drench root zone with Carbendazim + Mancozeb (2g/L) or Trichoderma (10g/L) to prevent bacterial/fungal root rot.'}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Drought Recovery Protocol */}
      {stressType === 'drought' && (
        <div className="bg-[#FAFDF8] border-2 border-[#D97706]/40 rounded-xl p-4 space-y-3.5 shadow-2xs">
          
          <div className="flex items-center space-x-2 text-[#D97706] border-b border-[#FDE68A] pb-2">
            <strong className="text-sm sm:text-base font-extrabold">
              {lang === 'or' ? '☀️ ମରୁଡ଼ି ଓ ଟାଣ ଖରା ପ୍ରତିରୋଧକ ସଞ୍ଜୀବନୀ ଉପାୟ:' : 'Drought & Mid-Season Dry Spell Survival Protocol:'}
            </strong>
          </div>

          <div className="space-y-2.5 text-xs text-[#2C221E]">
            
            {/* Step 1 */}
            <div className="p-2.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A]">
              <strong className="text-[#78350F] block mb-0.5">
                1. {lang === 'or' ? 'ପୋଟାସ୍ ସ୍ପ୍ରେ (Potassium Moisture Shield):' : '1% Potassium Spray for Stomatal Control:'}
              </strong>
              <p className="leading-relaxed font-semibold">
                {lang === 'or'
                  ? '୧% ପୋଟାସିୟମ୍ କ୍ଲୋରାଇଡ୍ (MOP) କିମ୍ବା ୧% ପୋଟାସିୟମ୍ ନାଇଟ୍ରେଟ୍ (13:0:45) ପତ୍ରରେ ସ୍ପ୍ରେ କରନ୍ତୁ। ଏହା ପତ୍ରର ଛିଦ୍ର (Stomata) ବନ୍ଦ ରଖି ୪୦% ପାଣି ବାଷ୍ପୀଭବନ ରୋକିଥାଏ।'
                  : 'Foliar spray of 1% Potassium Nitrate (13:0:45 @ 10g/L) regulates stomatal closure, reducing plant water loss by 40%.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-2.5 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6]">
              <strong className="text-[#1E4D2B] block mb-0.5">
                2. {lang === 'or' ? 'ନଡ଼ା ଆଚ୍ଛାଦନ (Straw Mulching):' : 'Soil Straw Mulching:'}
              </strong>
              <p className="leading-relaxed">
                {lang === 'or'
                  ? 'ପନିପରିବା ଓ ଟମାଟୋ ଧାଡ଼ି ମଝିରେ ୫-୭ ସେମି ବହଳରେ ଶୁଖିଲା ନଡ଼ା ବା ଘାସ ବିଛାନ୍ତୁ। ଏହା ମାଟି ତାପମାତ୍ରା କମାଇ ଆର୍ଦ୍ରତା ଧରି ରଖେ।'
                  : 'Spread 5-7 cm layer of dried paddy straw between crop rows to shade soil and prevent evaporation.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
              <strong className="text-[#14532D] block mb-0.5">
                3. {lang === 'or' ? 'କାଓଲିନ୍ କ୍ଲେ ସ୍ପ୍ରେ (Anti-Transpirant Sunscreen):' : 'Kaolin 5% Anti-Transpirant Sunscreen:'}
              </strong>
              <p className="leading-relaxed">
                {lang === 'or'
                  ? 'ଅତ୍ୟଧିକ ପ୍ରଚଣ୍ଡ ଖରାରେ କାଓଲିନ୍ (Kaolin ୫୦ ଗ୍ରାମ୍/ଲି.) ସ୍ପ୍ରେ କଲେ ପତ୍ର ଉପରେ ଧଳା ପତଳା ଆସ୍ତରଣ ସୃଷ୍ଟି ହୋଇ ପ୍ରଖର ସୂର୍ଯ୍ୟ କିରଣ ପ୍ରତିଫଳିତ ହୁଏ।'
                  : 'Foliar spray of 5% Kaolin clay creates a protective reflective white film, reflecting harsh solar radiation.'}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
