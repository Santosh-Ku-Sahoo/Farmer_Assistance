import React from 'react';
import { Archive, ShieldCheck, Sun, ThermometerSnowflake, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { translations } from '../translations';

const STORAGE_PRACTICES = [
  {
    commodity_en: "Paddy / Rice Grain Storage",
    commodity_or: "ଧାନ ଶସ୍ୟ ସାଇତିବା ଓ ଘୁଣ ପୋକ ଦମନ",
    target_moisture: "12% - 14% Moisture",
    rules_en: [
      "Sun-dry cleaned paddy grains on clean tarpaulins for 3-4 bright sunny days until moisture reaches 12-14%.",
      "Thumbnail Test: When dry, a grain bitten between front teeth breaks with a crisp sharp cracking sound ('Khat' sound).",
      "Traditional Protection: Mix dried bitter Neem leaves (1 kg per quintal) or Pongamia (Karanja) leaves with grain bags.",
      "Modern Protection: Store in 3-layer airtight Hermetic SuperGrainbags (Pusa Bins). The lack of oxygen suffocates Rice Weevils naturally without chemicals."
    ],
    rules_or: [
      "ଧାନକୁ ପାଲ ଉପରେ ୩-୪ ଦିନ ଟାଣ ଖରାରେ ଶୁଖାଇ ଆର୍ଦ୍ରତା ୧୨-୧୪% କୁ କମାନ୍ତୁ।",
      "ଦାନ୍ତ ପରୀକ୍ଷା: ଧାନକୁ ଦାନ୍ତରେ କାମୁଡ଼ିଲେ 'ଖଟ୍' କରି ଶବ୍ଦ ହୋଇ ଭାଙ୍ଗିଲେ ଶୁଖିଲା ବୋଲି ଜାଣନ୍ତୁ।",
      "ପ୍ରାକୃତିକ ସୁରକ୍ଷା: କୁଇଣ୍ଟାଲ ପିଛା ୧ କେଜି ଶୁଖିଲା ନିମପତ୍ର ବା କରଞ୍ଜ ପତ୍ର ମିଶାଇ ବସ୍ତାରେ ଭରନ୍ତୁ।",
      "ଆଧୁନିକ ସୁରକ୍ଷା: ହରମେଟିକ୍ ଏୟାର-ଟାଇଟ୍ ବ୍ୟାଗ୍ (Hermetic Bag) ବା ପୁସା କୋଠିରେ ରଖନ୍ତୁ, ଯାହାଦ୍ୱାରା ଅମ୍ଳଜାନ ଅଭାବରୁ ଘୁଣ ପୋକ ମରିଯାଆନ୍ତି।"
    ]
  },
  {
    commodity_en: "Potato Tuber Storage (Table & Seed)",
    commodity_or: "ଆଳୁ ସାଇତିବା ଓ କୋଲ୍ଡ ଷ୍ଟୋରେଜ୍ ନିୟମ",
    target_moisture: "90% Relative Humidity @ 2°C - 4°C",
    rules_en: [
      "Shade Curing: Keep dug potatoes in a dark, cool ventilated shed (30-40 cm heap) for 10-15 days to thicken skin.",
      "Strict Sorting: Discard bruised, greened, diseased, or pest-damaged tubers before storage.",
      "Farmer Shed Storage: Store in bamboo racks in a well-ventilated dry room with a thin layer of sand/dry neem leaves.",
      "Commercial Cold Storage: Maintain 2-4°C temperature for seed tubers, and 8-10°C with CIPC sprout suppressant for table potatoes."
    ],
    rules_or: [
      "ଛାଇରେ ଶୁଖାଇବା (Curing): ଆଳୁକୁ ଛାଇ ଓ ପବନ ଚଳାଚଳ ଥିବା ଜାଗାରେ ୧୦-୧୫ ଦିନ ପତଳା କରି ବିଛାଇ ଚୋପା ଟାଣ କରନ୍ତୁ।",
      "ବଛା-ବଛି: ସଢ଼ା, କଟା ଓ ସବୁଜ ଆଳୁକୁ ଅଲଗା କରନ୍ତୁ।",
      "ଘରୋଇ ସାଇତିବା: ବାଉଁଶ ଥାକ ଉପରେ ଶୁଖିଲା ବାଲି ବା ନିମପତ୍ର ପକାଇ ଆଳୁ ସଜାନ୍ତୁ।",
      "କୋଲ୍ଡ ଷ୍ଟୋର୍: ବିହନ ଆଳୁ ପାଇଁ ୨-୪°C ତାପମାତ୍ରା ଓ ୯୦% ଆର୍ଦ୍ରତା ବଜାୟ ରଖନ୍ତୁ।"
    ]
  }
];

export default function GrainStorageGuide({ lang }) {
  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଶସ୍ୟ ସାଇତିବା ଓ ଗୋଦାମ ସୁରକ୍ଷା ମାର୍ଗଦର୍ଶିକା' : 'Safe Grain & Tuber Storage Guide'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଧାନରେ ଘୁଣ ପୋକ ଓ ଆଳୁ ସଢ଼ାରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ବୈଜ୍ଞାନିକ ଉପାୟ' : 'Prevent post-harvest storage losses, weevils, and moisture damage'}
            </p>
          </div>
        </div>
      </div>

      {/* Storage Cards */}
      <div className="space-y-4">
        {STORAGE_PRACTICES.map((p, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#FAFDF8] border border-[#BAC8AA] shadow-2xs space-y-3">
            
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#E2EAD6] pb-2">
              <strong className="text-sm sm:text-base font-extrabold text-[#1E4D2B]">
                {lang === 'or' ? p.commodity_or : p.commodity_en}
              </strong>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA]">
                🎯 {p.target_moisture}
              </span>
            </div>

            <ul className="space-y-2 text-xs text-[#2C221E] leading-relaxed">
              {(lang === 'or' ? p.rules_or : p.rules_en).map((rule, rIdx) => (
                <li key={rIdx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4D2B] flex-shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

    </div>
  );
}
