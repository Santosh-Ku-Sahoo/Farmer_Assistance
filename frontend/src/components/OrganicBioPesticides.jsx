import React, { useState } from 'react';
import { Leaf, Droplet, Flame, Sparkles, Clock, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { translations } from '../translations';

const ORGANIC_RECIPES = [
  {
    id: "neemastra",
    name_en: "Neemastra (ନିମାସ୍ତ୍ର)",
    name_or: "ନିମାସ୍ତ୍ର (Neemastra - ଶୋଷକ ପୋକ ଦମନ)",
    target_en: "Sucking pests, Aphids, Whiteflies, Jassids, Leaf Miners",
    target_or: "ଲାହି, ଧଳାମାଛି, ଡେଇଁବା ପୋକ, ରସ ଶୋଷକ କୀଟ",
    shelf_life_en: "Use within 6 months (Store in shade)",
    shelf_life_or: "୬ ମାସ ପର୍ଯ୍ୟନ୍ତ ବ୍ୟବହାର ଯୋଗ୍ୟ (ଛାଇରେ ରଖନ୍ତୁ)",
    ingredients_en: [
      "Desi Cow Dung: 2 kg",
      "Desi Cow Urine (Gomutra): 5 Liters",
      "Crushed Neem Leaves / Kernels: 5 kg",
      "Fresh Water: 100 Liters"
    ],
    ingredients_or: [
      "ଦେଶୀ ଗାଈ ଗୋବର: ୨ କେଜି",
      "ଦେଶୀ ଗାଈ ଗୋମୂତ୍ର: ୫ ଲିଟର",
      "ଛେଚା ନିମ ପତ୍ର ବା ନିମ୍ବ ମଞ୍ଜି: ୫ କେଜି",
      "ପରିଷ୍କାର ପାଣି: ୧୦୦ ଲିଟର"
    ],
    procedure_en: [
      "Mix cow dung, cow urine, crushed neem leaves, and 100L water in a plastic drum.",
      "Stir clockwise with a wooden stick for 2 minutes twice daily (morning & evening).",
      "Cover with a jute bag and ferment in a cool shade for 48 hours.",
      "Filter thoroughly through a cotton cloth. Spray undiluted @ 100L per acre on foliage."
    ],
    procedure_or: [
      "ଏକ ପ୍ଲାଷ୍ଟିକ୍ ଡ୍ରମରେ ଗୋବର, ଗୋମୂତ୍ର, ଛେଚା ନିମପତ୍ର ଏବଂ ୧୦୦ ଲିଟର ପାଣି ମିଶାନ୍ତୁ।",
      "ସକାଳ ଓ ସନ୍ଧ୍ୟାରେ ଏକ କାଠ ବାଡ଼ିରେ ଡାହାଣ ପାଖକୁ ୨ ମିନିଟ୍ ଘାଣ୍ଟନ୍ତୁ।",
      "ଛାଇ ଜାଗାରେ ଚୋଟା ବସ୍ତା ଘୋଡ଼ାଇ ୪୮ ଘଣ୍ଟା (୨ ଦିନ) ସଢ଼ିବାକୁ ଦିଅନ୍ତୁ।",
      "ପତଳା କପଡ଼ାରେ ଛାଣି ଏକର ପିଛା ୧୦୦ ଲିଟର ହିସାବରେ ସିଧାସଳଖ ପତ୍ରରେ ସ୍ପ୍ରେ କରନ୍ତୁ।"
    ]
  },
  {
    id: "brahmastra",
    name_en: "Brahmastra (ବ୍ରହ୍ମାସ୍ତ୍ର - 5 Bitter Leaves)",
    name_or: "ବ୍ରହ୍ମାସ୍ତ୍ର (Brahmastra - ଫଳବିନ୍ଧା ଓ ଶୁଣ୍ଢିଆ ପୋକ)",
    target_en: "Fruit Borer, Stem Borer, Pod Borer, Large Caterpillars",
    target_or: "ଫଳବିନ୍ଧା ପୋକ, କାଣ୍ଡବିନ୍ଧା ଶୁକ, ଲେଡା ପୋକ",
    shelf_life_en: "Use within 6 months",
    shelf_life_or: "୬ ମାସ ପର୍ଯ୍ୟନ୍ତ ରଖିହେବ",
    ingredients_en: [
      "Crushed Neem leaves: 2 kg",
      "Crushed Custard Apple (Atta) leaves: 2 kg",
      "Crushed Papaya leaves: 2 kg",
      "Crushed Guava / Karanja leaves: 2 kg",
      "Crushed Calotropis (Arakha) leaves: 2 kg",
      "Desi Cow Urine: 10 Liters"
    ],
    ingredients_or: [
      "ଛେଚା ନିମ ପତ୍ର: ୨ କେଜି",
      "ଛେଚା ଆତ (Custard apple) ପତ୍ର: ୨ କେଜି",
      "ଛେଚା ଅମୃତଭଣ୍ଡା ପତ୍ର: ୨ କେଜି",
      "ଛେଚା କରଞ୍ଜ ବା ପିଜୁଳି ପତ୍ର: ୨ କେଜି",
      "ଛେଚା ଅରଖ ପତ୍ର: ୨ କେଜି",
      "ଦେଶୀ ଗାଈ ଗୋମୂତ୍ର: ୧୦ ଲିଟର"
    ],
    procedure_en: [
      "Crush all 5 bitter/medicinal leaves into a paste and mix into 10L cow urine in a pot.",
      "Boil on a slow fire until the liquid reduces by half (about 5 Liters remaining).",
      "Let it cool in shade for 24 hours, then filter through a cloth.",
      "Dosage: Mix 200–250 ml of Brahmastra extract per 15-Liter knapsack spray pump (1:60 ratio) and spray."
    ],
    procedure_or: [
      "୫ ପ୍ରକାର ତିକ୍ତ ପତ୍ରକୁ ବାଟି ୧୦ ଲିଟର ଗୋମୂତ୍ରରେ ମିଶାଇ ପାତ୍ରରେ ରଖନ୍ତୁ।",
      "ମାଟି ବା ତେଲ କଡ଼େଇରେ ଧୀମା ଆଞ୍ଚରେ ଫୁଟାଇ ଅଧା (୫ ଲିଟର) ହେବା ଯାଏ ଗରମ କରନ୍ତୁ।",
      "୨୪ ଘଣ୍ଟା ଥଣ୍ଡା ହେବା ପରେ କପଡ଼ାରେ ଛାଣି ବୋତଲରେ ରଖନ୍ତୁ।",
      "ପ୍ରୟୋଗ ମାତ୍ରା: ୧୫ ଲିଟର ସ୍ପ୍ରେ ଟାଙ୍କି ପିଛା ୨୦୦-୨୫୦ ମିଲି ମିଶାଇ ଗଛରେ ସ୍ପ୍ରେ କରନ୍ତୁ।"
    ]
  },
  {
    id: "jeevamrut",
    name_en: "Jeevamrut (ଜୀବାମୃତ - Liquid Bio-Booster)",
    name_or: "ଜୀବାମୃତ (Jeevamrut - ମାଟିର ପ୍ରାକୃତିକ ଅମୃତ)",
    target_en: "Soil microbial enrichment, root growth, plant immunity",
    target_or: "ମାଟିରେ ଉପକାରୀ ଜୀବାଣୁ ବୃଦ୍ଧି, ଚେର ବୃଦ୍ଧି ଓ ରୋଗ ପ୍ରତିରୋଧକ ଶକ୍ତି",
    shelf_life_en: "Use within 7-10 days of preparation",
    shelf_life_or: "ପ୍ରସ୍ତୁତିର ୭-୧୦ ଦିନ ମଧ୍ୟରେ ଜମିରେ ପ୍ରୟୋଗ କରନ୍ତୁ",
    ingredients_en: [
      "Fresh Desi Cow Dung: 10 kg",
      "Desi Cow Urine: 10 Liters",
      "Black Jaggery (Guda): 2 kg",
      "Gram / Pulse Flour (Besan): 2 kg",
      "Virgin Field Bund Soil: 1 Handful (100g)",
      "Clean Water: 200 Liters"
    ],
    ingredients_or: [
      "ସତେଜ ଦେଶୀ ଗୋବର: ୧୦ କେଜି",
      "ଦେଶୀ ଗୋମୂତ୍ର: ୧୦ ଲିଟର",
      "କଳା ଗୁଡ଼: ୨ କେଜି",
      "ବେସନ ବା ଡାଲି ଗୁଣ୍ଡ: ୨ କେଜି",
      "ଜମି ହିଡ଼ର କୀଟନାଶକ ପଡ଼ିନଥିବା ମାଟି: ୧ ମୁଠା (୧୦୦ ଗ୍ରାମ୍)",
      "ପାଣି: ୨୦୦ ଲିଟର"
    ],
    procedure_en: [
      "In a 200L plastic drum, add 200L water, cow dung, cow urine, melted jaggery, besan, and the handful of virgin soil.",
      "Stir clockwise for 2 minutes with a wooden pole twice a day.",
      "Keep the drum covered in shade with a wet gunny bag for 48 to 72 hours.",
      "Apply 200 Liters per acre through irrigation water or sprinkle near root zone during weeding."
    ],
    procedure_or: [
      "୨୦୦ ଲିଟର ପ୍ଲାଷ୍ଟିକ୍ ଡ୍ରମରେ ପାଣି, ଗୋବର, ଗୋମୂତ୍ର, ଗୁଡ଼, ବେସନ ଓ ଜମିର ମାଟି ମିଶାନ୍ତୁ।",
      "ଦିନକୁ ୨ ଥର କାଠ ବାଡ଼ିରେ ଡାହାଣ ପାଖକୁ ୨ ମିନିଟ୍ ଘାଣ୍ଟନ୍ତୁ।",
      "ଛାଇ ଜାଗାରେ ଚୋଟା ବସ୍ତା ଘୋଡ଼ାଇ ୩ ଦିନ ପର୍ଯ୍ୟନ୍ତ ରଖନ୍ତୁ।",
      "ଜଳସେଚନ ନାଳି ଦେଇ ଏକର ପିଛା ୨୦୦ ଲିଟର ପ୍ରୟୋଗ କରନ୍ତୁ ବା ଗଛ ମୂଳରେ ସିଞ୍ଚନ କରନ୍ତୁ।"
    ]
  },
  {
    id: "buttermilk",
    name_en: "Sour Buttermilk + Hing Antifungal Spray",
    name_or: "ଖଟା ଘୋଳଦହି ଓ ହିଙ୍ଗୁ ସ୍ପ୍ରେ (Sour Buttermilk Spray)",
    target_en: "Fungal leaf blights, powdery mildew, viral leaf curl suppression",
    target_or: "ଫିମ୍ପି ପତ୍ରପୋଡ଼ା, ଧଳା ପାଉଡର ରୋଗ (Powdery Mildew) ଓ ପତ୍ରମୋଡ଼ା",
    shelf_life_en: "Use fresh after 7-10 days of fermentation",
    shelf_life_or: "୭-୧୦ ଦିନ ଖଟା ହେବା ପରେ ବ୍ୟବହାର କରନ୍ତୁ",
    ingredients_en: [
      "Sour Buttermilk (from desi cow milk): 5 Liters",
      "Compounded Asafoetida (Hing): 50 grams",
      "Copper piece / wire (in earthen pot): 1 piece",
      "Water: 100 Liters"
    ],
    ingredients_or: [
      "ଖଟା ଘୋଳଦହି (ଦେଶୀ ଗାଈ କ୍ଷୀର): ୫ ଲିଟର",
      "ହିଙ୍ଗୁ (Asafoetida): ୫୦ ଗ୍ରାମ୍",
      "ତମ୍ବା ଖଣ୍ଡ / ତାର (ମାଟି ପାତ୍ରରେ ପକାଇବା ପାଇଁ): ୧ ଖଣ୍ଡ",
      "ପାଣି: ୧୦୦ ଲିଟର"
    ],
    procedure_en: [
      "Place 5L sour buttermilk with a copper piece and 50g hing in an earthen pot for 7-10 days until greenish layer forms.",
      "Mix this 5L fermented buttermilk extract in 100L water.",
      "Spray on affected crop foliage early morning. The lactic acid and copper ions act as a powerful organic fungicide."
    ],
    procedure_or: [
      "ଏକ ମାଟି ହାଣ୍ଡିରେ ୫ ଲିଟର ଘୋଳଦହି ସହିତ ଗୋଟିଏ ତମ୍ବା ଖଣ୍ଡ ଓ ହିଙ୍ଗୁ ପକାଇ ୭-୧୦ ଦିନ ଘୋଡ଼ାଇ ରଖନ୍ତୁ।",
      "ସବୁଜିଆ ତମ୍ବା ରଙ୍ଗ ହେବା ପରେ ୧୦୦ ଲିଟର ପାଣିରେ ମିଶାନ୍ତୁ।",
      "ଏହା ଏକ ଉତ୍କୃଷ୍ଟ ଜୈବିକ ଫିମ୍ପିନାଶକ ଭାବେ କାମ କରେ; ସକାଳେ ପତ୍ରରେ ସ୍ପ୍ରେ କରନ୍ତୁ।"
    ]
  }
];

export default function OrganicBioPesticides({ lang }) {
  const [selectedRecipe, setSelectedRecipe] = useState('neemastra');

  const recipe = ORGANIC_RECIPES.find((r) => r.id === selectedRecipe) || ORGANIC_RECIPES[0];

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଘରୋଇ ଜୈବିକ କୀଟନାଶକ ଓ କାଢ଼ା ପ୍ରସ୍ତୁତି' : 'Traditional Bio-Pesticide & Kashayam Recipes'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ବିନା ଖର୍ଚ୍ଚରେ ନିମାସ୍ତ୍ର, ବ୍ରହ୍ମାସ୍ତ୍ର ଓ ଜୀବାମୃତ ପ୍ରସ୍ତୁତି ପ୍ରଣାଳୀ' : 'Zero-cost home preparations for pest & disease management'}
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-5">
        {ORGANIC_RECIPES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setSelectedRecipe(r.id)}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer truncate ${
              selectedRecipe === r.id
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#C8D4BA] hover:bg-[#EAF0E6]'
            }`}
          >
            {lang === 'or' ? r.name_or.split(' (')[0] : r.name_en.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Selected Recipe Card */}
      <div className="bg-[#FAFDF8] border-2 border-[#1E4D2B]/30 rounded-xl p-4 space-y-4 shadow-2xs">
        
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#E2EAD6] pb-2.5">
          <div>
            <h4 className="text-base sm:text-lg font-extrabold text-[#1E4D2B]">
              {lang === 'or' ? recipe.name_or : recipe.name_en}
            </h4>
            <p className="text-xs text-[#8B3A2B] font-bold mt-0.5">
              🎯 {lang === 'or' ? `ଦମନ କରେ: ${recipe.target_or}` : `Target: ${recipe.target_en}`}
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA]">
            ⏳ {lang === 'or' ? recipe.shelf_life_or : recipe.shelf_life_en}
          </span>
        </div>

        {/* Ingredients & Materials */}
        <div className="bg-[#F8FAF5] p-3 rounded-lg border border-[#E2EAD6]">
          <strong className="text-xs uppercase font-bold text-[#5A4D41] block mb-2">
            📦 {lang === 'or' ? 'ଦରକାରୀ ଉପାଦାନ (Ingredients):' : 'Required Ingredients:'}
          </strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#2C221E]">
            {(lang === 'or' ? recipe.ingredients_or : recipe.ingredients_en).map((ing, iIdx) => (
              <div key={iIdx} className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E4D2B]"></span>
                <span>{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Preparation */}
        <div>
          <strong className="text-xs uppercase font-bold text-[#5A4D41] block mb-2">
            🥣 {lang === 'or' ? 'ପ୍ରସ୍ତୁତି ଓ ପ୍ରୟୋଗ ପ୍ରଣାଳୀ (Preparation Steps):' : 'Step-by-Step Preparation & Application:'}
          </strong>
          <div className="space-y-2 text-xs text-[#382E28]">
            {(lang === 'or' ? recipe.procedure_or : recipe.procedure_en).map((step, sIdx) => (
              <div key={sIdx} className="flex items-start space-x-2 bg-[#FDFCFA] p-2.5 rounded-lg border border-[#E2EAD6]">
                <span className="w-4 h-4 rounded-full bg-[#EAF0E6] text-[#1E4D2B] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <p className="leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
