import React, { useState } from 'react';
import { FlaskConical, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, Info, Sparkles, Beaker } from 'lucide-react';
import { translations } from '../translations';

const CHEMICAL_DATABASE = [
  { id: "tricyclazole", name: "Tricyclazole 75% WP (Rice Blast)", category: "Systemic Fungicide" },
  { id: "mancozeb", name: "Mancozeb 75% WP (Contact Blight)", category: "Contact Fungicide" },
  { id: "copper", name: "Copper Oxychloride 50% WP (COC)", category: "Inorganic Copper Fungicide" },
  { id: "sulfur", name: "Sulfur 80% WDG (Powdery Mildew)", category: "Inorganic Sulfur" },
  { id: "chlorantraniliprole", name: "Chlorantraniliprole 18.5% SC (Coragen)", category: "Systemic Insecticide" },
  { id: "imidacloprid", name: "Imidacloprid 17.8% SL (Confidor)", category: "Systemic Sucking Insecticide" },
  { id: "neem_oil", name: "Neem Oil 10,000 ppm (EC Formulation)", category: "Botanical Oil" },
  { id: "boron_npk", name: "Water Soluble NPK (19:19:19) / Boron 20%", category: "Foliar Micronutrient" },
  { id: "sticker", name: "Agricultural Wetting Agent (Sticker/Spreader)", category: "Adjuvant" }
];

export default function TankMixCompatibility({ lang }) {
  const [chemA, setChemA] = useState('tricyclazole');
  const [chemB, setChemB] = useState('chlorantraniliprole');

  const checkCompatibility = () => {
    // 1. Extreme Incompatibility: Sulfur + Oils
    if ((chemA === 'sulfur' && chemB === 'neem_oil') || (chemA === 'neem_oil' && chemB === 'sulfur')) {
      return {
        status: "INCOMPATIBLE",
        status_en: "⛔ DANGEROUS: Severe Leaf Scorch & Phytotoxicity",
        status_or: "⛔ ନିଷିଦ୍ଧ ମିଶ୍ରଣ: ପ୍ରବଳ ପତ୍ରପୋଡ଼ା (Phytotoxicity) ଆଶଙ୍କା",
        desc_en: "Never mix Sulfur with Oil or spray within 14 days of each other! Sulfur dissolves rapidly in oil, penetrating leaf cuticles and causing catastrophic chemical burn.",
        desc_or: "ଗନ୍ଧକ (Sulfur) ସହିତ କୌଣସି ତେଲ ବା ନିମ୍ବ ତେଲ ମିଶାନ୍ତୁ ନାହିଁ! ଏହା ପତ୍ରକୁ ସମ୍ପୂର୍ଣ୍ଣ ପୋଡ଼ି ନଷ୍ଟ କରିଦିଏ। ଦୁଇଟି ମଧ୍ୟରେ ୧୪ ଦିନ ବ୍ୟବଧାନ ରଖନ୍ତୁ।",
        badge_bg: "bg-[#FEE2E2]",
        badge_text: "text-[#991B1B]",
        badge_border: "border-[#EF4444]"
      };
    }

    // 2. Copper Oxychloride + Organophosphates / Micronutrients
    if (chemA === 'copper' || chemB === 'copper') {
      const other = chemA === 'copper' ? chemB : chemA;
      if (other === 'boron_npk' || other === 'neem_oil') {
        return {
          status: "INCOMPATIBLE",
          status_en: "⛔ INCOMPATIBLE: Chemical Inactivation & Sludge Curdling",
          status_or: "⛔ ନିଷିଦ୍ଧ ମିଶ୍ରଣ: ରାସାୟନିକ ଅପଚୟ ଓ ଟାଙ୍କିରେ ଘୋଳ ଫାଟିବା",
          desc_en: "Copper Oxychloride alters tank pH, converting soluble nutrients into insoluble heavy metal precipitates that choke spray nozzles and lose all efficacy.",
          desc_or: "ତମ୍ବା ଔଷଧ (Copper) ସହିତ ସାର ବା ତେଲ ମିଶାଇଲେ ପାଣିରେ ଛେନା ଭଳି ଘୋଳ ଫାଟିଯାଏ ଓ ସ୍ପ୍ରେ ନୋଜଲ ଜାମ୍ ହୋଇ ଔଷଧ ନଷ୍ଟ ହୁଏ।",
          badge_bg: "bg-[#FEE2E2]",
          badge_text: "text-[#991B1B]",
          badge_border: "border-[#EF4444]"
        };
      }
    }

    // 3. Excellent Synergistic Tank Mixes
    if (
      (chemA === 'tricyclazole' && chemB === 'chlorantraniliprole') ||
      (chemA === 'chlorantraniliprole' && chemB === 'tricyclazole') ||
      (chemA === 'mancozeb' && chemB === 'imidacloprid') ||
      (chemA === 'imidacloprid' && chemB === 'mancozeb')
    ) {
      return {
        status: "COMPATIBLE",
        status_en: "✅ FULLY COMPATIBLE & RECOMMENDED (Synergistic Mix)",
        status_or: "✅ ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ ଓ ଉପଯୁକ୍ତ ମିଶ୍ରଣ (ଗୋଟିଏ ସ୍ପ୍ରେରେ ଦୁଇଟି କାମ)",
        desc_en: "Physical and biological compatibility confirmed by ICAR-NRRI. Controls both fungal diseases (Blast/Blight) and destructive insect pests (Stem borer/Whitefly) in one single labor pass.",
        desc_or: "ଏହି ଦୁଇଟି ଔଷଧ ଏକାଠି ମିଶାଇ ସ୍ପ୍ରେ କଲେ ଗୋଟିଏ ଖର୍ଚ୍ଚରେ ଉଭୟ ଫିମ୍ପି ରୋଗ (ବ୍ଲାଷ୍ଟ/ପତ୍ରପୋଡ଼ା) ଏବଂ କୀଟ (କାଣ୍ଡବିନ୍ଧା/ଧଳାମାଛି) ନିୟନ୍ତ୍ରଣ ହୋଇଥାଏ।",
        badge_bg: "bg-[#DCFCE7]",
        badge_text: "text-[#15803D]",
        badge_border: "border-[#22C55E]"
      };
    }

    // 4. Sticker / Adjuvant with any fungicide/insecticide
    if (chemA === 'sticker' || chemB === 'sticker') {
      return {
        status: "COMPATIBLE",
        status_en: "✅ EXCELLENT: Agricultural Spreader Enhances Rainfastness",
        status_or: "✅ ଉତ୍ତମ ମିଶ୍ରଣ: ଅଠା (Sticker) ଔଷଧକୁ ପତ୍ରରେ ଧରିରଖେ",
        desc_en: "Agricultural silicone stickers (0.5 ml/L) improve foliar coverage and prevent rain wash-off under humid conditions.",
        desc_or: "ସ୍ପ୍ରେଡର୍ ବା ଅଠା (୦.୫ ମିଲି/ଲିଟର) ମିଶାଇଲେ ଔଷଧ ସମଗ୍ର ପତ୍ରରେ ବିଛାଡ଼ି ହୋଇ ରହେ ଏବଂ ବର୍ଷାରେ ଧୋଇ ହୋଇଯାଏ ନାହିଁ।",
        badge_bg: "bg-[#DCFCE7]",
        badge_text: "text-[#15803D]",
        badge_border: "border-[#22C55E]"
      };
    }

    // 5. Cautionary Jar Test default
    return {
      status: "JAR_TEST",
      status_en: "⚠️ CAUTION: Perform 5-Minute Glass Jar Test Before Tank Mix",
      status_or: "⚠️ ସତର୍କତା: ଟାଙ୍କିରେ ମିଶାଇବା ପୂର୍ବରୁ ୫-ମିନିଟ୍ କାଚ ବୋତଲ ପରୀକ୍ଷା କରନ୍ତୁ",
      desc_en: "Physical compatibility depends on water hardness and temperature. Prepare a small test sample in a clean glass jar first. Check for curdling, sediment, or heat release after 5 minutes.",
      desc_or: "ପାଣିର କ୍ଷାର ଅନୁସାରେ ଏହି ମିଶ୍ରଣରେ ସାମାନ୍ୟ ପରିବର୍ତ୍ତନ ହୋଇପାରେ। ବଡ଼ ଟାଙ୍କିରେ ମିଶାଇବା ପୂର୍ବରୁ ୧ ଗିଲାସ ପାଣିରେ ଛୋଟ ପରୀକ୍ଷା (Jar Test) କରନ୍ତୁ।",
      badge_bg: "bg-[#FEF9C3]",
      badge_text: "text-[#854D0E]",
      badge_border: "border-[#EAB308]"
    };
  };

  const result = checkCompatibility();

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'କୀଟନାଶକ ମିଶ୍ରଣ ଓ ଟାଙ୍କି ଫାଟିବା ପରୀକ୍ଷା (Tank-Mix Compatibility)' : 'Tank-Mix Chemical Incompatibility & Jar Test'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଦୁଇଟି ଔଷଧ ଏକାଠି ମିଶାଇଲେ ଟାଙ୍କିରେ ଘୋଳ ଫାଟିବା ବା ପତ୍ର ପୋଡ଼ିବା ଆଶଙ୍କା ଯାଞ୍ଚ କରନ୍ତୁ' : 'Check if 2 agrochemicals can be safely mixed in your knapsack sprayer'}
            </p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            🧪 {lang === 'or' ? 'ପ୍ରଥମ ଔଷଧ / ଫର୍ମୁଲା (Chemical A):' : 'First Chemical (A):'}
          </label>
          <select
            value={chemA}
            onChange={(e) => setChemA(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            {CHEMICAL_DATABASE.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            🧪 {lang === 'or' ? 'ଦ୍ୱିତୀୟ ଔଷଧ / ଫର୍ମୁଲା (Chemical B):' : 'Second Chemical (B):'}
          </label>
          <select
            value={chemB}
            onChange={(e) => setChemB(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            {CHEMICAL_DATABASE.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Compatibility Verdict Card */}
      <div className={`p-4 rounded-xl border-2 text-left space-y-2.5 shadow-2xs ${result.badge_bg} ${result.badge_border}`}>
        <div className="flex items-center space-x-2">
          <strong className={`text-sm sm:text-base font-extrabold ${result.badge_text}`}>
            {lang === 'or' ? result.status_or : result.status_en}
          </strong>
        </div>

        <p className="text-xs sm:text-sm text-[#2C221E] font-medium leading-relaxed">
          {lang === 'or' ? result.desc_or : result.desc_en}
        </p>
      </div>

      {/* 5-Minute Glass Jar Test Protocol */}
      <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#D5DEC9] mt-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] mb-2 flex items-center space-x-1.5">
          <Beaker className="w-4 h-4 text-[#1E4D2B]" />
          <span>{lang === 'or' ? '୫-ମିନିଟ୍ କାଚ ବୋତଲ ପରୀକ୍ଷା ନିୟମ (WALES Mixing Sequence):' : '5-Minute Jar Test & WALES Mixing Order:'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#382E28]">
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6]">
            <strong>1. W (Wettable Powders):</strong> {lang === 'or' ? 'ପ୍ରଥମେ ଗୁଣ୍ଡ ଔଷଧ (WP/WDG) କୁ ଅଳ୍ପ ପାଣିରେ ଗୋଳାଇ ମିଶାନ୍ତୁ।' : 'Mix powders (WP/WDG) into a slurry with water first.'}
          </div>
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6]">
            <strong>2. A (Agitate / Liquid flowables):</strong> {lang === 'or' ? 'ଭଲ ଭାବେ ଘାଣ୍ଟି ତରଳ SC/SL ଔଷଧ ଢାଳନ୍ତୁ।' : 'Stir well and add liquid flowable (SC/SL) concentrates.'}
          </div>
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6]">
            <strong>3. L (Liquids & Emulsions):</strong> {lang === 'or' ? 'ତେଲିଆ EC ଫର୍ମୁଲେସନ୍ ଏହାପରେ ମିଶାନ୍ତୁ।' : 'Add emulsifiable concentrates (EC) next.'}
          </div>
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6]">
            <strong>4. S (Surfactants / Stickers):</strong> {lang === 'or' ? 'ଶେଷରେ ଅଠା (Sticker) ପକାଇ ୫ ମିନିଟ୍ ଅପେକ୍ଷା କରନ୍ତୁ।' : 'Add spreader/sticker last. Check if sludge forms.'}
          </div>
        </div>
      </div>

    </div>
  );
}
