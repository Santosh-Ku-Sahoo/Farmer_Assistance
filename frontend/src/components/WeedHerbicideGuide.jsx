import React, { useState } from 'react';
import { Shovel, ShieldAlert, CheckCircle2, Droplets, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import { translations } from '../translations';

const WEED_CATEGORIES = [
  {
    id: "grassy",
    name_en: "Grassy Weeds (Echinochloa / Barnyard Grass)",
    name_or: "ଘାସ ଜାତୀୟ ତୃଣକ (ଧାନ ଘାସ / ମଜୁରୀ ଘାସ)",
    symptoms_en: "Narrow, elongated leaves with parallel veins and hollow circular stems.",
    symptoms_or: "ଧାନ ଗଛ ଭଳି ଦିଶୁଥିବା ଲମ୍ବା ପତ୍ର ଓ ଗୋଲାକାର କାଣ୍ଡ।",
    pre_emergence_en: "Pretilachlor 50% EC @ 500 ml/acre (Apply 2-3 days after transplanting with 2-3 cm standing water).",
    pre_emergence_or: "ପ୍ରିଟିଲାକ୍ଲୋର୍ ୫୦% EC (Pretilachlor) @ ୫୦୦ ମିଲି/ଏକର (ରୁଆର ୨-୩ ଦିନ ମଧ୍ୟରେ ୨ ସେମି ପାଣି ଥିବା ବେଳେ ପ୍ରୟୋଗ କରନ୍ତୁ)।",
    post_emergence_en: "Bispyribac Sodium 10% SC (Nominee Gold) @ 80-100 ml/acre (Apply at 15-20 DAT when weeds have 2-3 leaves). Drain water before spray.",
    post_emergence_or: "ବିସପାଇରିବ୍ୟାକ୍ ସୋଡିୟମ୍ ୧୦% SC (ନମିନି ଗୋଲ୍ଡ) @ ୮୦-୧୦୦ ମିଲି/ଏକର (୧୫-୨୦ ଦିନରେ ଘାସରେ ୨-୩ ପତ୍ର ଥିବା ବେଳେ ପାଣି ନିଷ୍କାସନ କରି ସ୍ପ୍ରେ କରନ୍ତୁ)।"
  },
  {
    id: "sedges",
    name_en: "Sedges (Cyperus Rotundus / Mutha)",
    name_or: "ମୁଥା ଜାତୀୟ ତୃଣକ (ମୁଥା ଘାସ / କରଣ୍ଡି)",
    symptoms_en: "Triangular solid stem with 3-ranked leaves originating from deep underground tubers/nuts.",
    symptoms_or: "ତ୍ରିକୋଣିଆ ଟାଣ କାଣ୍ଡ ଏବଂ ମାଟି ତଳେ ଗାଣ୍ଠି (Tuber) ଥାଏ ଯାହା ବାରମ୍ବାର ଗଜା ହୁଏ।",
    pre_emergence_en: "Pyrazosulfuron Ethyl 10% WP @ 80 grams/acre (Apply at 3-5 days after transplanting).",
    pre_emergence_or: "ପାଇରାଜୋସଲଫୁରନ୍ ଇଥାଇଲ୍ ୧୦% WP (Pyrazosulfuron) @ ୮୦ ଗ୍ରାମ୍/ଏକର (ରୁଆର ୩-୫ ଦିନ ମଧ୍ୟରେ)।",
    post_emergence_en: "Metsulfuron Methyl + Chlorimuron Ethyl (Almix) @ 8 grams/acre mixed in 150L water at 20-25 DAT.",
    post_emergence_or: "ଅଲମିକ୍ସ (Almix 20% WP) @ ୮ ଗ୍ରାମ୍/ଏକର ହିସାବରେ ରୁଆର ୨୦-୨୫ ଦିନରେ ସ୍ପ୍ରେ କରନ୍ତୁ।"
  },
  {
    id: "broadleaf",
    name_en: "Broadleaf Weeds (Ludwigia, Monochoria)",
    name_or: "ଚଉଡ଼ା ପତ୍ର ତୃଣକ (କାଣିଶିରା / ପାଣିକାଦୁଆଳି)",
    symptoms_en: "Expanded broad net-veined leaves floating or spreading along crop rows.",
    symptoms_or: "ପ୍ରଶସ୍ତ ଚଉଡ଼ା ପତ୍ର ଯାହା ଜମିର ଆଲୋକ ଓ ସାର ଢାଙ୍କି ରଖେ।",
    pre_emergence_en: "Oxadiargyl 80% WP @ 35-40 grams/acre mixed in sand and broadcasted at 3-5 DAT.",
    pre_emergence_or: "ଅକ୍ସାଡାୟାରଜିଲ୍ ୮୦% WP (Topstar) @ ୩୫-୪୦ ଗ୍ରାମ୍/ଏକର ବାଲିରେ ଗୋଳାଇ ରୁଆର ୩-୫ ଦିନରେ ବୁଣନ୍ତୁ।",
    post_emergence_en: "2,4-D Ethyl Ester 38% EC @ 500 ml/acre or 2,4-D Amine Salt 58% WSC @ 400 ml/acre at 25-30 DAT.",
    post_emergence_or: "୨,୪-ଡି (2,4-D Amine 58%) @ ୪୦୦ ମିଲି/ଏକର ହିସାବରେ ରୁଆର ୨୫-୩୦ ଦିନରେ ସ୍ପ୍ରେ କରନ୍ତୁ।"
  }
];

export default function WeedHerbicideGuide({ lang }) {
  const [selectedCat, setSelectedCat] = useState('grassy');

  const weed = WEED_CATEGORIES.find((w) => w.id === selectedCat) || WEED_CATEGORIES[0];

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Shovel className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ତୃଣକ (ଘାସ) ଦମନ ଓ ତୃଣକନାଶକ ମାର୍ଗଦର୍ଶିକା' : 'Weed Identification & Herbicide Selector'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ପ୍ରାରମ୍ଭିକ ୨୫ ଦିନରେ ଘାସ ଦମନ କରି ଫସଲର ୩୦% ସାର ଅପଚୟ ରୋକନ୍ତୁ' : 'Pre-emergence & post-emergence herbicide recommendations and water management'}
            </p>
          </div>
        </div>
      </div>

      {/* Weed Type Selectors */}
      <div className="grid grid-cols-3 gap-1.5 mb-5">
        {WEED_CATEGORIES.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setSelectedCat(w.id)}
            className={`py-2 px-1 text-xs font-bold rounded-lg transition-all cursor-pointer truncate ${
              selectedCat === w.id
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#BAC8AA] hover:bg-[#EAF0E6]'
            }`}
          >
            {lang === 'or' ? w.name_or.split(' (')[0] : w.name_en.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Selected Weed Advisory Card */}
      <div className="bg-[#FAFDF8] border-2 border-[#1E4D2B]/30 rounded-xl p-4 space-y-3.5 shadow-2xs">
        
        <div>
          <h4 className="text-sm sm:text-base font-extrabold text-[#1E4D2B]">
            {lang === 'or' ? weed.name_or : weed.name_en}
          </h4>
          <p className="text-xs text-[#7A6E62] mt-0.5">
            🔍 <strong>{lang === 'or' ? 'ଚିହ୍ନିବା ଲକ୍ଷଣ:' : 'Identification:'}</strong> {lang === 'or' ? weed.symptoms_or : weed.symptoms_en}
          </p>
        </div>

        {/* Pre vs Post Emergence Grid */}
        <div className="space-y-2.5 text-xs">
          
          {/* Pre-emergence */}
          <div className="p-3 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0]">
            <span className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider block mb-1">
              🌱 1. {lang === 'or' ? 'ଗଜା ହେବା ପୂର୍ବରୁ (Pre-Emergence Herbicide — ରୁଆର ୨-୫ ଦିନ):' : 'Pre-Emergence (2-5 Days after transplanting):'}
            </span>
            <p className="text-[#14532D] font-bold leading-relaxed">
              {lang === 'or' ? weed.pre_emergence_or : weed.pre_emergence_en}
            </p>
          </div>

          {/* Post-emergence */}
          <div className="p-3 bg-[#FEF3C7]/70 rounded-lg border border-[#FDE68A]">
            <span className="text-[10px] font-bold text-[#92400E] uppercase tracking-wider block mb-1">
              🌾 2. {lang === 'or' ? 'ଘାସ ଉଠିବା ପରେ (Post-Emergence Herbicide — ରୁଆର ୧୫-୨୫ ଦିନ):' : 'Post-Emergence (15-25 Days after transplanting):'}
            </span>
            <p className="text-[#78350F] font-bold leading-relaxed">
              {lang === 'or' ? weed.post_emergence_or : weed.post_emergence_en}
            </p>
          </div>

        </div>

        {/* Strict Water Management Rule */}
        <div className="bg-[#FEF2F2] p-2.5 rounded-lg border border-[#FCA5A5] text-[11px] text-[#991B1B] flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
          <p>
            <strong>{lang === 'or' ? 'ଜରୁରୀ ନିୟମ:' : 'Golden Spray Rule:'}</strong>{' '}
            {lang === 'or' 
              ? 'ପୋଷ୍ଟ-ଇମରଜେନ୍ସ (ନମିନି ଗୋଲ୍ଡ/ଅଲମିକ୍ସ) ସ୍ପ୍ରେ କରିବା ପୂର୍ବରୁ ଜମିରୁ ପାଣି କାଢ଼ି ଦିଅନ୍ତୁ। ସ୍ପ୍ରେ କରିବାର ୪୮ ଘଣ୍ଟା (୨ ଦିନ) ପରେ ପୁନର୍ବାର ପାଣି ମଡ଼ାନ୍ତୁ।' 
              : 'Drain all standing water before spraying post-emergence herbicides so weed foliage is exposed. Re-irrigate after 48 hours.'}
          </p>
        </div>

      </div>

    </div>
  );
}
