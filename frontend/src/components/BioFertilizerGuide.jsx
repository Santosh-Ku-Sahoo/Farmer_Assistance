import React, { useState } from 'react';
import { Sprout, Sparkles, CheckCircle2, ShieldCheck, HelpCircle, Layers, Droplet, ArrowRight } from 'lucide-react';
import { translations } from '../translations';

const BIO_FERTILIZERS = [
  {
    id: "azospirillum",
    name_en: "Azospirillum & Azotobacter (Nitrogen Fixers)",
    name_or: "ଆଜୋସ୍ପାଇରିଲମ୍ ଓ ଆଜୋଟୋବ୍ୟାକ୍ଟର୍ (ଯବକ୍ଷାରଜାନ ସ୍ଥିରୀକାରକ)",
    crop_en: "Rice / Paddy, Vegetables, Maize, Millets",
    crop_or: "ଧାନ, ପନିପରିବା, ମକା ଓ ମାଣ୍ଡିଆ",
    benefit_en: "Fixes 20-30 kg atmospheric Nitrogen/ha directly in rhizosphere; reduces chemical Urea requirement by 25%.",
    benefit_or: "ବାୟୁମଣ୍ଡଳରୁ ୨୦-୩୦ କେଜି ଯବକ୍ଷାରଜାନ ମାଟିରେ ସ୍ଥିର କରେ; ୟୁରିଆ ଖର୍ଚ୍ଚ ୨୫% କମାଇଥାଏ।",
    dosage_seed_en: "200 grams packet per 10-12 kg seed with cold jaggery (Guda) water.",
    dosage_seed_or: "୧୦-୧୨ କେଜି ବିହନ ପାଇଁ ୨୦୦ ଗ୍ରାମ୍ ପ୍ୟାକେଟ୍ (ଗୁଡ଼ ପାଣି ମିଶାଇ ଗୋଳାନ୍ତୁ)।"
  },
  {
    id: "rhizobium",
    name_en: "Rhizobium Culture (Pulse Root Nodules)",
    name_or: "ରାଇଜୋବିୟମ୍ କଲଚର୍ (ଡାଲି ଜାତୀୟ ଫସଲ)",
    crop_en: "Green gram (Mung), Black gram (Biri), Arhar, Groundnut",
    crop_or: "ମୁଗ, ବିରି, ହରଡ଼, ଚିନାବାଦାମ ଓ ସୋୟାବିନ୍",
    benefit_en: "Forms pink active root nodules, fixing 50-80 kg N/ha; enriches soil for the next crop rotation.",
    benefit_or: "ଚେରରେ ଗୋଲାପୀ ଗଣ୍ଠି ତିଆରି କରି ପ୍ରଚୁର ଯବକ୍ଷାରଜାନ ସ୍ଥିର କରେ ଏବଂ ପରବର୍ତ୍ତୀ ଫସଲ ପାଇଁ ମାଟି ଉର୍ବର କରେ।",
    dosage_seed_en: "200 grams per 10 kg pulse seed with rice starch (Peyja) or jaggery solution.",
    dosage_seed_or: "୧୦ କେଜି ଡାଲି ବିହନ ପାଇଁ ୨୦୦ ଗ୍ରାମ୍ (ଥଣ୍ଡା ପେଜ ବା ଗୁଡ଼ ପାଣିରେ ଗୋଳାଇ ଛାଇରେ ଶୁଖାନ୍ତୁ)।"
  },
  {
    id: "psb",
    name_en: "Phosphate Solubilizing Bacteria (PSB - Bacillus)",
    name_or: "ପି.ଏସ୍.ବି / ଫସଫେଟ୍ ଦ୍ରବଣକାରୀ ଜୀବାଣୁ (PSB)",
    crop_en: "All crops (Paddy, Tomato, Potato, Oilseeds)",
    crop_or: "ସମସ୍ତ ଫସଲ (ଧାନ, ଟମାଟୋ, ଆଳୁ ଓ ତୈଳବୀଜ)",
    benefit_en: "Secretes organic acids that dissolve locked insoluble soil Phosphate, saving 25-30% DAP/SSP bags.",
    benefit_or: "ମାଟିରେ ଜମି ରହିଥିବା ଅଦ୍ରବଣୀୟ ଫସଫରସ୍‌କୁ ତରଳାଇ ଗଛକୁ ଯୋଗାଏ; ଡିଏପି (DAP) ସାର ଖର୍ଚ୍ଚ ୩୦% କମାଏ।",
    dosage_seed_en: "200g per 10kg seed or 2 kg mixed in 50kg FYM per acre.",
    dosage_seed_or: "ଏକର ପିଛା ୨ କେଜି PSB କୁ ୫୦ କେଜି ଶଢ଼ା ଗୋବର ଖତରେ ମିଶାଇ ଜମିରେ ପ୍ରୟୋଗ କରନ୍ତୁ।"
  },
  {
    id: "mycorrhiza",
    name_en: "VAM / Mycorrhiza (Glomus - Root Expander)",
    name_or: "ମାଇକୋରାଇଜା / ଭାମ୍ (Mycorrhiza VAM)",
    crop_en: "Vegetables, Tomato, Potato, Fruits, Pulses",
    crop_or: "ପନିପରିବା, ଟମାଟୋ, ଆଳୁ ଓ ଫଳ ଚାଷ",
    benefit_en: "Fungal hyphae expand root surface area by 1000%, enhancing Zinc/Phosphorus uptake & drought resistance.",
    benefit_or: "ଚେରର ପରିସରକୁ ୧୦ ଗୁଣ ବଢ଼ାଇଦିଏ; ମାଟିରୁ ଜିଙ୍କ୍, ଫସଫରସ୍ ଓ ପାଣି ଶୋଷିବାରେ ଅତ୍ୟନ୍ତ ସହାୟକ ହୁଏ।",
    dosage_seed_en: "4 kg granulated VAM per acre mixed with organic compost during planting.",
    dosage_seed_or: "ଏକର ପିଛା ୪ କେଜି ଦାନାଦାର ମାଇକୋରାଇଜା ରୋପଣ ସମୟରେ ମାଟିରେ ପ୍ରୟୋଗ କରନ୍ତୁ।"
  },
  {
    id: "trichoderma",
    name_en: "Trichoderma viride & Pseudomonas (Bio-Fungicide)",
    name_or: "ଟ୍ରାଇକୋଡର୍ମା ଭିରିଡି ଓ ସୁଡୋମୋନାସ୍ (ଜୈବିକ ଫିମ୍ପିନାଶକ)",
    crop_en: "Rice, Tomato, Potato, Chilli, Brinjal",
    crop_or: "ଧାନ, ଟମାଟୋ, ଆଳୁ, ଲଙ୍କା ଓ ବାଇଗଣ",
    benefit_en: "Destroys pathogenic fungi causing Damping-off, Root Rot, Wilt, and Sheath Blight naturally.",
    benefit_or: "ମୂଳସଢ଼ା, ଝାଉଁଳା ଓ କାଣ୍ଡପଚା ରୋଗ ସୃଷ୍ଟିକାରୀ କ୍ଷତିକାରକ ଫିମ୍ପିକୁ ମୂଳରୁ ଖାଇ ନଷ୍ଟ କରେ।",
    dosage_seed_en: "10 grams per 1 kg seed or 1 kg per 100 kg cow dung.",
    dosage_seed_or: "ପ୍ରତି ୧ କେଜି ବିହନରେ ୧୦ ଗ୍ରାମ୍ ପାଉଡର ଗୋଳାଇ ବିହନ ଶୋଧନ କରନ୍ତୁ।"
  }
];

export default function BioFertilizerGuide({ lang }) {
  const [selectedBio, setSelectedBio] = useState('azospirillum');

  const bio = BIO_FERTILIZERS.find((b) => b.id === selectedBio) || BIO_FERTILIZERS[0];

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଜୈବିକ ଖତ ଓ ଜୀବାଣୁ ବିହନ ଶୋଧନ ମାର୍ଗଦର୍ଶିକା' : 'Bio-Fertilizer Inoculation & Seed Treatment Guide'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଆଜୋସ୍ପାଇରିଲମ୍, ରାଇଜୋବିୟମ୍, ପିଏସବି ଓ ଟ୍ରାଇକୋଡର୍ମା ପ୍ରୟୋଗ ବିଧି' : 'Nitrogen fixers, Phosphate solubilizers & Mycorrhiza root boosters'}
            </p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-5">
        {BIO_FERTILIZERS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setSelectedBio(b.id)}
            className={`py-2 px-1 text-xs font-bold rounded-lg transition-all cursor-pointer truncate ${
              selectedBio === b.id
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#BAC8AA] hover:bg-[#EAF0E6]'
            }`}
          >
            {lang === 'or' ? b.name_or.split(' (')[0] : b.name_en.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Selected Bio-Inoculant Card */}
      <div className="bg-[#FAFDF8] border-2 border-[#1E4D2B]/30 rounded-xl p-4 space-y-3.5 shadow-2xs">
        
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#E2EAD6] pb-2">
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-[#1E4D2B]">
              {lang === 'or' ? bio.name_or : bio.name_en}
            </h4>
            <span className="text-xs text-[#8B3A2B] font-bold mt-0.5 block">
              🌾 {lang === 'or' ? `ଉପଯୁକ୍ତ ଫସଲ: ${bio.crop_or}` : `Suitable Crops: ${bio.crop_en}`}
            </span>
          </div>
        </div>

        {/* Benefits & Mode of Action */}
        <div className="p-3 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0] text-xs text-[#14532D]">
          <strong className="block font-bold mb-1">
            ⚡ {lang === 'or' ? 'କାର୍ଯ୍ୟକାରିତା ଓ ଲାଭ:' : 'Biological Mode of Action & Benefits:'}
          </strong>
          <p className="leading-relaxed font-semibold">
            {lang === 'or' ? bio.benefit_or : bio.benefit_en}
          </p>
        </div>

        {/* Recommended Dosage */}
        <div className="p-3 bg-[#FEF3C7]/60 rounded-lg border border-[#FDE68A] text-xs text-[#78350F]">
          <strong className="block font-bold mb-1">
            ⚖️ {lang === 'or' ? 'ପ୍ରୟୋଗ ମାତ୍ରା ଓ ବିହନ ଶୋଧନ ବିଧି:' : 'Application Method & Dosage:'}
          </strong>
          <p className="leading-relaxed font-semibold">
            {lang === 'or' ? bio.dosage_seed_or : bio.dosage_seed_en}
          </p>
        </div>

        {/* 3-Step Inoculation Procedure */}
        <div className="bg-[#F8FAF5] p-3 rounded-lg border border-[#E2EAD6] text-xs text-[#2C221E] space-y-1.5">
          <strong className="block font-bold text-[#1E4D2B]">
            🥣 {lang === 'or' ? 'ଗୁଡ଼ ପାଣିରେ ବିହନ ଶୋଧନ ପଦ୍ଧତି (Jaggery Slurry Recipe):' : 'Step-by-Step Seed Coating Procedure:'}
          </strong>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#5A4D41] leading-relaxed">
            <li>{lang === 'or' ? '୫୦ ଗ୍ରାମ୍ ଗୁଡ଼କୁ ୨୫୦ ମିଲି ପାଣିରେ ଫୁଟାଇ ଥଣ୍ଡା କରନ୍ତୁ।' : 'Boil 50g jaggery in 250ml water for 5 mins and cool down to room temp.'}</li>
            <li>{lang === 'or' ? 'ଥଣ୍ଡା ଗୁଡ଼ ପାଣିରେ ୨୦୦ ଗ୍ରାମ୍ ଜୀବାଣୁ ପାଉଡର ମିଶାଇ ଘୋଳ ତିଆରି କରନ୍ତୁ।' : 'Mix 200g bio-fertilizer powder into the cool slurry.'}</li>
            <li>{lang === 'or' ? 'ବିହନ ଉପରେ ଏହି ଘୋଳ ଛିଞ୍ଚି ଧୀରେ ଧୀରେ ଗୋଳାନ୍ତୁ ଯେପରି ପ୍ରତି ବିହନରେ ପତଳା ଆସ୍ତରଣ ବସିବ।' : 'Sprinkle over seeds and gently coat until a uniform film forms.'}</li>
            <li>{lang === 'or' ? 'ଛାଇ ଜାଗାରେ ୩୦ ମିନିଟ୍ ଶୁଖାଇ ତୁରନ୍ତ ବୁଣି ଦିଅନ୍ତୁ (ଖରାରେ ରଖନ୍ତୁ ନାହିଁ)।' : 'Dry in shade for 30 mins and sow immediately (never expose to harsh direct sunlight).'}</li>
          </ol>
        </div>

      </div>

    </div>
  );
}
