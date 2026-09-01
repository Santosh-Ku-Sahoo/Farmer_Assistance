import React, { useState } from 'react';
import { ShieldCheck, Bug, Heart, ShieldAlert, Sparkles, HelpCircle, Eye } from 'lucide-react';
import { translations } from '../translations';

const BENEFICIAL_INSECTS = [
  {
    name_en: "Ladybird Beetle (Coccinellid)",
    name_or: "ଲେଡିବାର୍ଡ ବିଟଲ୍ / ସୁନେଲି ପୋକ (Ladybird Beetle)",
    role_en: "Voracious predator of Aphids, Whiteflies & Thrips",
    role_or: "ଲାହି, ଧଳାମାଛି ଓ ଡାଳପୋକର ପ୍ରାକୃତିକ ଶତ୍ରୁ",
    impact_en: "1 adult beetle devours 40-50 aphids per day!",
    impact_or: "ଗୋଟିଏ ପୋକ ଦିନକୁ ୪୦-୫୦ ଟି ଲାହି କୀଟ ଖାଇ ନଷ୍ଟ କରେ!",
    identification_en: "Bright red/orange dome shell with distinct black dots.",
    identification_or: "ଚମକଦାର ଲାଲ୍/କମଳା ରଙ୍ଗର ପିଠି ଉପରେ କଳା ଫୋପା ଦାଗ।"
  },
  {
    name_en: "Wolf Spider & Lynx Spider",
    name_or: "ବୁଢ଼ିଆଣୀ (Spider / Wolf Spider)",
    role_en: "Generalist hunter of Leaf Hoppers & BPH Nymphs",
    role_or: "ମାଟିଆ ଗୁଣ୍ଡି ପୋକ (BPH) ଓ ଡେଇଁବା ପୋକର ପ୍ରଧାନ ଶିକାରୀ",
    impact_en: "Consumes 10-15 Brown Plant Hopper nymphs daily at plant base.",
    impact_or: "ଧାନ କାଣ୍ଡ ମୂଳରେ ଦିନକୁ ୧୦-୧୫ ଟି ମାଟିଆ ଗୁଣ୍ଡି ପୋକ ଖାଏ।",
    identification_en: "Fast-running brown mottled hunting spiders across water & stems.",
    identification_or: "ପାଣି ଓ କାଣ୍ଡ ଉପରେ ଦୌଡ଼ୁଥିବା ମାଟିଆ ରଙ୍ଗର ଶିକାରୀ ବୁଢ଼ିଆଣୀ।"
  },
  {
    name_en: "Trichogramma Egg Parasitoid Wasp",
    name_or: "ଟ୍ରାଇକୋଗ୍ରାମା ବାରୁଡ଼ି (Trichogramma Wasp)",
    role_en: "Lays eggs inside Stem Borer & Fruit Borer eggs",
    role_or: "କାଣ୍ଡବିନ୍ଧା ଓ ଫଳବିନ୍ଧା ପୋକର ଅଣ୍ଡା ଭିତରେ ବସା ବାନ୍ଧି ନଷ୍ଟ କରେ",
    impact_en: "Destroys stem borer caterpillars before they ever hatch!",
    impact_or: "କାଣ୍ଡବିନ୍ଧା ପୋକ ଜନ୍ମ ହେବା ପୂର୍ବରୁ ଅଣ୍ଡାକୁ ସମ୍ପୂର୍ଣ୍ଣ ନଷ୍ଟ କରେ!",
    identification_en: "Microscopic (0.5 mm) beneficial golden-brown friendly wasp (Tricho cards).",
    identification_or: "ଅତି କ୍ଷୁଦ୍ର ମିତ୍ର କୀଟ (ଟ୍ରାଇକୋ କାର୍ଡ ସାହାଯ୍ୟରେ କ୍ଷେତରେ ଲଗାଯାଏ)।"
  }
];

const HARMFUL_PESTS = [
  {
    name_en: "Yellow Stem Borer (YSB) - Scirpophaga",
    name_or: "ଧାନ କାଣ୍ଡବିନ୍ଧା ପୋକ (Stem Borer)",
    damage_en: "Deadheart at tillering; White-earhead (empty grains) at flowering.",
    damage_or: "ପିଲ ବେଳେ ମଲାଡାଳ ଏବଂ ଶିଁଷା ବାହାରିବା ବେଳେ ଧଳା ଅଗାଡ଼ି ଶିଁଷା (White earhead)।",
    organic_control_en: "Install 5 Pheromone Traps/acre with Scirpo-lure; Clip seedling leaf tips before transplanting.",
    organic_control_or: "ଏକର ପିଛା ୫ ଟି ଫେରୋମନ୍ ଟ୍ରାପ୍ ଲଗାନ୍ତୁ; ରୁଆ ପୂର୍ବରୁ ତଳିର ଅଗ କାଟି ଦିଅନ୍ତୁ।"
  },
  {
    name_en: "Brown Plant Hopper (BPH) - Nilaparvata",
    name_or: "ମାଟିଆ ଗୁଣ୍ଡି ପୋକ (Brown Plant Hopper)",
    damage_en: "Sucks plant sap at water base; causes severe circular drying patches ('Hopper Burn').",
    damage_or: "କାଣ୍ଡରୁ ରସ ଶୋଷିନିଏ; ଫଳରେ ଜମିରେ ଚକଡ଼ା ପୋଡ଼ିଲା ଭଳି ଶୁଖିଯାଏ (Hopper Burn)।",
    organic_control_en: "Maintain skipping alleys (30 cm every 2m); Drain field water for 3 days; avoid excess urea.",
    organic_control_or: "ପ୍ରତି ୨ ମିଟରରେ ୩୦ ସେମି ଆଲି ରାସ୍ତା ଛାଡ଼ନ୍ତୁ; ୩ ଦିନ ପାଇଁ ଜମିରୁ ପାଣି ନିଷ୍କାସନ କରନ୍ତୁ।"
  },
  {
    name_en: "Whitefly & Aphids (Tomato / Potato)",
    name_or: "ଧଳାମାଛି ଓ ଲାହି ପୋକ (Whitefly & Aphids)",
    damage_en: "Sucks leaf sap and transmits devastating Leaf Curl & Mosaic Viruses.",
    damage_or: "ପତ୍ରରୁ ରସ ଶୋଷି ପତ୍ରମୋଡ଼ା ଭୂତାଣୁ (Leaf Curl Virus) ବ୍ୟାପିଥାଏ।",
    organic_control_en: "Install Yellow Sticky Traps (10/acre) + Spray Neem Oil (10,000 ppm) @ 2 ml/L.",
    organic_control_or: "ଏକର ପିଛା ୧୦ ଟି ହଳଦିଆ ଅଠା କାର୍ଡ (Yellow Sticky Traps) ଲଗାନ୍ତୁ ଓ ନିମ୍ବ ତେଲ ସ୍ପ୍ରେ କରନ୍ତୁ।"
  }
];

export default function PestBeneficialGuide({ lang }) {
  const [activeView, setActiveView] = useState('beneficial'); // 'beneficial' | 'pests'

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ମିତ୍ର କୀଟ ଓ ଶତ୍ରୁ ପୋକ ଚିହ୍ନଟ (Pest vs Friend Insects)' : 'Beneficial Friend Insects vs Harmful Pests'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଅଯଥା ଔଷଧ ସ୍ପ୍ରେ ନକରି ମିତ୍ର କୀଟଙ୍କ ଦ୍ୱାରା ପ୍ରାକୃତିକ କୀଟ ଦମନ କରନ୍ତୁ' : 'Identify beneficial predators & eco-friendly bio-control measures'}
            </p>
          </div>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          type="button"
          onClick={() => setActiveView('beneficial')}
          className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeView === 'beneficial'
              ? 'bg-[#1E4D2B] text-white shadow-xs'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#C8D4BA] hover:bg-[#EAF0E6]'
          }`}
        >
          <Heart className="w-4 h-4 text-[#F87171] fill-[#F87171]" />
          <span>{lang === 'or' ? '🐞 ମିତ୍ର କୀଟ (Farmer Friends)' : '🐞 Beneficial Predators'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView('pests')}
          className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeView === 'pests'
              ? 'bg-[#8B3A2B] text-white shadow-xs'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#C8D4BA] hover:bg-[#EAF0E6]'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#FCA5A5]" />
          <span>{lang === 'or' ? '🐛 କ୍ଷତିକାରକ ପୋକ (Harmful Pests)' : '🐛 Harmful Pests'}</span>
        </button>
      </div>

      {/* Beneficial Predators View */}
      {activeView === 'beneficial' && (
        <div className="space-y-3">
          <div className="bg-[#FAFDF8] p-3 rounded-xl border border-[#BAC8AA] text-xs text-[#1E4D2B] font-medium leading-relaxed">
            💡 <strong>{lang === 'or' ? 'ଜାଣି ରଖନ୍ତୁ:' : 'Did you know?'}</strong>{' '}
            {lang === 'or'
              ? 'କ୍ଷେତରେ ଦେଖାଯାଉଥିବା ୭୦% କୀଟ ଚାଷୀର ବନ୍ଧୁ! ବିନା କାରଣରେ କୀଟନାଶକ ସ୍ପ୍ରେ କଲେ ଏହି ମିତ୍ର କୀଟ ମରିଯାଆନ୍ତି ଏବଂ ଶତ୍ରୁ ପୋକ ଅଧିକ ବଢ଼ନ୍ତି।'
              : 'Over 70% of insects in farm fields are harmless or beneficial predators. Indiscriminate chemical spraying kills your natural predator army!'}
          </div>

          {BENEFICIAL_INSECTS.map((insect, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#D5DEC9] shadow-2xs space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <strong className="text-sm font-extrabold text-[#1E4D2B]">
                  {lang === 'or' ? insect.name_or : insect.name_en}
                </strong>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA]">
                  🛡️ {lang === 'or' ? 'ମିତ୍ର ଶିକାରୀ' : 'Friend Predator'}
                </span>
              </div>

              <p className="text-xs text-[#2C221E] font-semibold">
                🎯 {lang === 'or' ? insect.role_or : insect.role_en}
              </p>

              <div className="p-2 bg-[#EAF0E6]/60 rounded-lg text-xs text-[#1E4D2B] font-bold">
                ⚡ {lang === 'or' ? insect.impact_or : insect.impact_en}
              </div>

              <p className="text-[11px] text-[#7A6E62]">
                🔍 <strong>{lang === 'or' ? 'ଚିହ୍ନିବା ଉପାୟ:' : 'How to Identify:'}</strong> {lang === 'or' ? insect.identification_or : insect.identification_en}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Harmful Pests View */}
      {activeView === 'pests' && (
        <div className="space-y-3">
          {HARMFUL_PESTS.map((pest, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#FAFDF8] border border-[#FCA5A5]/60 shadow-2xs space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <strong className="text-sm font-extrabold text-[#8B3A2B]">
                  {lang === 'or' ? pest.name_or : pest.name_en}
                </strong>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
                  ⚠️ {lang === 'or' ? 'ଶତ୍ରୁ ପୋକ' : 'Target Pest'}
                </span>
              </div>

              <p className="text-xs text-[#7F1D1D] leading-relaxed">
                <strong>{lang === 'or' ? 'କ୍ଷତିର ଲକ୍ଷଣ:' : 'Damage Symptoms:'}</strong> {lang === 'or' ? pest.damage_or : pest.damage_en}
              </p>

              <div className="p-2.5 bg-[#FEF3C7]/60 rounded-lg border border-[#FDE68A] text-xs text-[#92400E] leading-relaxed">
                🌱 <strong>{lang === 'or' ? 'ପ୍ରାକୃତିକ ଓ ଜୈବିକ ନିୟନ୍ତ୍ରଣ (Bio-Control):' : 'Eco-Friendly Bio Control:'}</strong>{' '}
                {lang === 'or' ? pest.organic_control_or : pest.organic_control_en}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
