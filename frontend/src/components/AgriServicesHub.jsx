import React, { useState } from 'react';
import { 
  Sprout, ShieldAlert, Droplets, Landmark, 
  Scale, TestTube2, Sparkles, Shovel, Bug, 
  Sun, Waves, BookMarked, Milk, Layers, Archive, 
  PhoneCall, RefreshCcw, FlaskConical, HeartHandshake,
  ChevronRight, ArrowLeft
} from 'lucide-react';
import { translations } from '../translations';

// Sub-components
import TankMixCompatibility from './TankMixCompatibility';
import BioFertilizerGuide from './BioFertilizerGuide';
import StressRecoveryPackage from './StressRecoveryPackage';
import SolarPumpCalculator from './SolarPumpCalculator';
import SoilPhLimeCalculator from './SoilPhLimeCalculator';
import CattleFeedPlanner from './CattleFeedPlanner';
import FarmPondCalculator from './FarmPondCalculator';
import WeedHerbicideGuide from './WeedHerbicideGuide';
import OrganicBioPesticides from './OrganicBioPesticides';
import IrrigationScheduler from './IrrigationScheduler';
import SeedGerminationTester from './SeedGerminationTester';
import VermicompostCalculator from './VermicompostCalculator';
import NightFieldSOS from './NightFieldSOS';
import GrainStorageGuide from './GrainStorageGuide';
import FertilizerCalculator from './FertilizerCalculator';
import PestBeneficialGuide from './PestBeneficialGuide';
import FarmKhataDiary from './FarmKhataDiary';
import HelplineDirectory from './HelplineDirectory';
import CropRotationPlanner from './CropRotationPlanner';
import GovtSchemesCard from './GovtSchemesCard';

const CATEGORIES = [
  {
    id: 'soil_seed',
    title_en: 'Soil, Seeds & Nutrition',
    title_or: 'ମାଟି, ବିହନ ଓ ସାର ହିସାବ',
    subtitle_en: 'NPK bags, Soil pH Lime, Bio-fertilizers & Seed germination test',
    subtitle_or: 'ସାର ବସ୍ତା, ମାଟିର ଚୂନ, ଜୈବିକ ଖତ ଓ ବିହନ ଗଜା ପରୀକ୍ଷା',
    icon: Sprout,
    badgeColor: 'bg-[#EAF0E6] text-[#1E4D2B] border-[#2C6E3B]',
    services: [
      { id: 'fertilizer', title_en: '⚖️ 45kg Fertilizer Bags', title_or: '⚖️ ସାର ବସ୍ତା ହିସାବ' },
      { id: 'soilph', title_en: '🧪 Soil pH & Lime', title_or: '🧪 ମାଟି pH ଚୂନ' },
      { id: 'biofertilizer', title_en: '🌱 Bio-Inoculants', title_or: '🌱 ଜୈବିକ ଖତ ଶୋଧନ' },
      { id: 'seed', title_en: '🌾 100-Seed Germination', title_or: '🌾 ବିହନ ଗଜା ପରୀକ୍ଷା' },
      { id: 'rotation', title_en: '🔄 Green Manure Rotation', title_or: '🔄 ଫସଲ ପର୍ଯ୍ୟାୟ' }
    ]
  },
  {
    id: 'crop_protect',
    title_en: 'Crop Protection & Health',
    title_or: 'ଫସଲ ସୁରକ୍ଷା ଓ ଔଷଧ ପରିଚାଳନା',
    subtitle_en: 'Tank-mix safety, Bio-pesticides, Weed control & Flood recovery',
    subtitle_or: 'ଔଷଧ ମିଶ୍ରଣ ଯାଞ୍ଚ, ଜୈବିକ କାଢ଼ା, ଘାସ ଦମନ ଓ ବିପର୍ଯ୍ୟୟ ସଞ୍ଜୀବନୀ',
    icon: ShieldAlert,
    badgeColor: 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]',
    services: [
      { id: 'tankmix', title_en: '🧲 Tank-Mix Jar Test', title_or: '🧲 ଔଷଧ ମିଶ୍ରଣ ଯାଞ୍ଚ' },
      { id: 'organic', title_en: '🌿 Traditional Bio-Pesticides', title_or: '🌿 ଜୈବିକ କାଢ଼ା (ନିମାସ୍ତ୍ର)' },
      { id: 'weed', title_en: '🌾 Weed Control & Herbicides', title_or: '🌾 ଘାସ ଦମନ ଓ ଔଷଧ' },
      { id: 'pests', title_en: '🐞 Friend vs Pest Insects', title_or: '🐞 ମିତ୍ର କୀଟ ଓ ଶତ୍ରୁ ପୋକ' },
      { id: 'stressrecovery', title_en: '🌊 Flood & Drought Revival', title_or: '🌊 ବନ୍ୟା/ମରୁଡ଼ି ସଞ୍ଜୀବନୀ' }
    ]
  },
  {
    id: 'water_energy',
    title_en: 'Water, Solar & Farm Safety',
    title_or: 'ଜଳସେଚନ, ସୌର ପମ୍ପ ଓ କ୍ଷେତ ସୁରକ୍ଷା',
    subtitle_en: 'Solar pumps, Smart irrigation, Farm ponds & Night SOS siren',
    subtitle_or: 'ସୌର ଜଳନିଧି, ଜଳସେଚନ କ୍ୟାଲେଣ୍ଡର, ପୋଖରୀ ମାପ ଓ ରାତ୍ରି SOS',
    icon: Droplets,
    badgeColor: 'bg-[#F0F9FF] text-[#0369A1] border-[#38BDF8]',
    services: [
      { id: 'solarpump', title_en: '☀️ Solar Pump Subsidy', title_or: '☀️ ସୌର ଜଳନିଧି ପମ୍ପ' },
      { id: 'irrigation', title_en: '💧 Smart Irrigation & AWD', title_or: '💧 ଜଳସେଚନ କ୍ୟାଲେଣ୍ଡର' },
      { id: 'farmpond', title_en: '🌧️ Farm Pond (Mo Pokhari)', title_or: '🌧️ ଫାର୍ମ ପଣ୍ଡ ମାପ' },
      { id: 'nightsos', title_en: '🚨 Night Field SOS Siren', title_or: '🚨 ରାତ୍ରି କ୍ଷେତ SOS' }
    ]
  },
  {
    id: 'income_livestock',
    title_en: 'Income, Livestock & Support',
    title_or: 'ଚାଷ ଆୟ, ପଶୁପାଳନ ଓ ସରକାରୀ ସହାୟତା',
    subtitle_en: 'Farm khata ledger, Cattle feed, Vermicompost & Govt schemes',
    subtitle_or: 'କୃଷି ଖାତା ଡାଏରୀ, ପଶୁ ଖାଦ୍ୟ, ଜିଆ ଖତ, ହେଲ୍ପଲାଇନ୍ ଓ ଯୋଜନା',
    icon: Landmark,
    badgeColor: 'bg-[#FAF5FF] text-[#7E22CE] border-[#C084FC]',
    services: [
      { id: 'khata', title_en: '📒 Farm Khata (ROI Diary)', title_or: '📒 କୃଷି ଖାତା ଡାଏରୀ' },
      { id: 'cattle', title_en: '🐮 Dairy Cattle Ration', title_or: '🐮 ପଶୁ ଖାଦ୍ୟ ହିସାବ' },
      { id: 'vermicompost', title_en: '🪱 Vermicompost Pit Yield', title_or: '🪱 ଜିଆ ଖତ କୁଣ୍ଡ ଉତ୍ପାଦନ' },
      { id: 'storage', title_en: '📦 Safe Grain Storage', title_or: '📦 ଶସ୍ୟ ସାଇତିବା' },
      { id: 'helpline', title_en: '📞 Emergency Helplines', title_or: '📞 କୃଷି ହେଲ୍ପଲାଇନ୍' },
      { id: 'schemes', title_en: '🏛️ Odisha Govt Schemes', title_or: '🏛️ ସରକାରୀ ଯୋଜନା' }
    ]
  }
];

export default function AgriServicesHub({ lang }) {
  const [selectedCategory, setSelectedCategory] = useState('soil_seed');
  const [activeService, setActiveService] = useState('fertilizer');

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="space-y-4">
      
      {/* 4 Clean Category Selection Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveService(cat.services[0].id);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1E4D2B] text-white border-[#15381F] shadow-md ring-2 ring-[#2C6E3B]/30'
                  : 'bg-[#FDFCFA] text-[#2C221E] border-[#BAC8AA] hover:bg-[#F4F8F0] card-shadow'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#2C6E3B] text-white' : 'bg-[#EAF0E6] text-[#1E4D2B]'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#EAF0E6] text-[#1E4D2B]'
                }`}>
                  {cat.services.length} Tools
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-xs sm:text-sm leading-tight">
                  {lang === 'or' ? cat.title_or : cat.title_en}
                </h4>
                <p className={`text-[10px] mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-[#D5DEC9]' : 'text-[#7A6E62]'}`}>
                  {lang === 'or' ? cat.subtitle_or : cat.subtitle_en}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tool Selector Horizontal Chips for Selected Category */}
      <div className="bg-[#FAFDF8] p-2 rounded-xl border border-[#BAC8AA] flex items-center space-x-1.5 overflow-x-auto no-scrollbar touch-pan-x">
        {currentCategoryObj.services.map((srv) => (
          <button
            key={srv.id}
            type="button"
            onClick={() => setActiveService(srv.id)}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeService === srv.id
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'bg-[#F0F5EC] text-[#5A4D41] hover:bg-[#E2EAD6] hover:text-[#1E4D2B]'
            }`}
          >
            {lang === 'or' ? srv.title_or : srv.title_en}
          </button>
        ))}
      </div>

      {/* Render Active Tool Component */}
      <div className="animate-in fade-in duration-150">
        {/* Category 1: Soil, Seed & Nutrition */}
        {activeService === 'fertilizer' && <FertilizerCalculator lang={lang} />}
        {activeService === 'soilph' && <SoilPhLimeCalculator lang={lang} />}
        {activeService === 'biofertilizer' && <BioFertilizerGuide lang={lang} />}
        {activeService === 'seed' && <SeedGerminationTester lang={lang} />}
        {activeService === 'rotation' && <CropRotationPlanner lang={lang} />}

        {/* Category 2: Crop Protection & Health */}
        {activeService === 'tankmix' && <TankMixCompatibility lang={lang} />}
        {activeService === 'organic' && <OrganicBioPesticides lang={lang} />}
        {activeService === 'weed' && <WeedHerbicideGuide lang={lang} />}
        {activeService === 'pests' && <PestBeneficialGuide lang={lang} />}
        {activeService === 'stressrecovery' && <StressRecoveryPackage lang={lang} />}

        {/* Category 3: Water, Solar & Farm Safety */}
        {activeService === 'solarpump' && <SolarPumpCalculator lang={lang} />}
        {activeService === 'irrigation' && <IrrigationScheduler lang={lang} />}
        {activeService === 'farmpond' && <FarmPondCalculator lang={lang} />}
        {activeService === 'nightsos' && <NightFieldSOS lang={lang} />}

        {/* Category 4: Income, Livestock & Support */}
        {activeService === 'khata' && <FarmKhataDiary lang={lang} />}
        {activeService === 'cattle' && <CattleFeedPlanner lang={lang} />}
        {activeService === 'vermicompost' && <VermicompostCalculator lang={lang} />}
        {activeService === 'storage' && <GrainStorageGuide lang={lang} />}
        {activeService === 'helpline' && <HelplineDirectory lang={lang} />}
        {activeService === 'schemes' && <GovtSchemesCard lang={lang} />}
      </div>

    </div>
  );
}
