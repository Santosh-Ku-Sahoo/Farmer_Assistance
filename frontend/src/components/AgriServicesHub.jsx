import React, { useState } from 'react';
import { 
  Sprout, ShieldAlert, Droplets, Landmark, 
  ArrowLeft, ChevronRight
} from 'lucide-react';

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
import CropRotationPlanner from './CropRotationPlanner';

const CATEGORIES = [
  {
    id: 'soil_seed',
    title_en: 'Soil, Seeds & Nutrition',
    title_or: 'ମାଟି, ବିହନ ଓ ସାର',
    desc_en: 'NPK calculator, soil pH, bio-fertilizers & seed germination',
    desc_or: 'ସାର ହିସାବ, ମାଟି pH, ଜୈବିକ ଖତ ଓ ବିହନ ଗଜା ପରୀକ୍ଷା',
    icon: Sprout,
    image: '/images/cat_soil_seeds.jpg',
    accent: 'bg-emerald-100 text-emerald-700',
    services: [
      { id: 'fertilizer', icon: '⚖️', title_en: 'Fertilizer Bag Calculator', title_or: 'ସାର ବସ୍ତା ହିସାବ', desc_en: '45kg bag count for your field size', desc_or: 'ଆପଣଙ୍କ ଜମି ପାଇଁ ସାର ବସ୍ତା ସଂଖ୍ୟା' },
      { id: 'soilph', icon: '🧪', title_en: 'Soil pH & Lime Dose', title_or: 'ମାଟି pH ଓ ଚୂନ ହିସାବ', desc_en: 'Lime requirement for acidic soil', desc_or: 'ଅମ୍ଳିଆ ମାଟି ପାଇଁ ଚୂନ ମାତ୍ରା' },
      { id: 'biofertilizer', icon: '🌱', title_en: 'Bio-Inoculants Guide', title_or: 'ଜୈବିକ ଖତ ଶୋଧନ', desc_en: 'Rhizobium, PSB & Azotobacter usage', desc_or: 'ଜୈବିକ କଲ୍ଚର ବ୍ୟବହାର ବିଧି' },
      { id: 'seed', icon: '🌾', title_en: 'Seed Germination Test', title_or: 'ବିହନ ଗଜା ପରୀକ୍ଷା', desc_en: '100-seed rag-doll viability test', desc_or: '୧୦୦ ବିହନ ରାଗଡଲ ପରୀକ୍ଷା' },
      { id: 'rotation', icon: '🔄', title_en: 'Crop Rotation Planner', title_or: 'ଫସଲ ପର୍ଯ୍ୟାୟ', desc_en: 'Green manure & legume rotation', desc_or: 'ସବୁଜ ସାର ଓ ଡାଲି ଫସଲ ପର୍ଯ୍ୟାୟ' }
    ]
  },
  {
    id: 'crop_protect',
    title_en: 'Crop Protection & Health',
    title_or: 'ଫସଲ ସୁରକ୍ଷା ଓ ସ୍ୱାସ୍ଥ୍ୟ',
    desc_en: 'Tank-mix safety, bio-pesticides, weed control & flood recovery',
    desc_or: 'ଔଷଧ ମିଶ୍ରଣ, ଜୈବିକ କାଢ଼ା, ଘାସ ଦମନ ଓ ବିପର୍ଯ୍ୟୟ ସଞ୍ଜୀବନୀ',
    icon: ShieldAlert,
    image: '/images/cat_crop_protection.jpg',
    accent: 'bg-amber-100 text-amber-700',
    services: [
      { id: 'tankmix', icon: '🧲', title_en: 'Tank-Mix Jar Test', title_or: 'ଔଷଧ ମିଶ୍ରଣ ଯାଞ୍ଚ', desc_en: 'Check chemical compatibility before mixing', desc_or: 'ମିଶ୍ରଣ ପୂର୍ବରୁ ସୁରକ୍ଷା ଯାଞ୍ଚ' },
      { id: 'organic', icon: '🌿', title_en: 'Bio-Pesticides', title_or: 'ଜୈବିକ କାଢ଼ା', desc_en: 'Neemastra, Jeevamrut & Brahmastra', desc_or: 'ନିମାସ୍ତ୍ର, ଜୀବାମୃତ ଓ ବ୍ରହ୍ମାସ୍ତ୍ର' },
      { id: 'weed', icon: '🌾', title_en: 'Weed & Herbicide Guide', title_or: 'ଘାସ ଦମନ ଓ ଔଷଧ', desc_en: 'Pre & post-emergence herbicide timing', desc_or: 'ପୂର୍ବ ଓ ପର ଉଦ୍ଗମ ଔଷଧ ସମୟ' },
      { id: 'pests', icon: '🐞', title_en: 'Friend vs Pest Insects', title_or: 'ମିତ୍ର ଓ ଶତ୍ରୁ ପୋକ', desc_en: 'Identify beneficial vs harmful insects', desc_or: 'ଉପକାରୀ ଓ କ୍ଷତିକାରକ ପୋକ ଚିହ୍ନଟ' },
      { id: 'stressrecovery', icon: '🌊', title_en: 'Flood & Drought Revival', title_or: 'ବନ୍ୟା/ମରୁଡ଼ି ସଞ୍ଜୀବନୀ', desc_en: 'Emergency recovery spray package', desc_or: 'ଜରୁରୀ ସଞ୍ଜୀବନୀ ସ୍ପ୍ରେ ପ୍ୟାକେଜ' }
    ]
  },
  {
    id: 'water_energy',
    title_en: 'Water, Solar & Irrigation',
    title_or: 'ଜଳ, ସୌର ଶକ୍ତି ଓ ସେଚନ',
    desc_en: 'Solar pump subsidy, irrigation scheduling & farm pond sizing',
    desc_or: 'ସୌର ପମ୍ପ ସବସିଡି, ଜଳସେଚନ ସମୟସାରଣୀ ଓ ପୋଖରୀ ମାପ',
    icon: Droplets,
    image: '/images/cat_water_solar.jpg',
    accent: 'bg-sky-100 text-sky-700',
    services: [
      { id: 'solarpump', icon: '☀️', title_en: 'Solar Pump Subsidy', title_or: 'ସୌର ଜଳନିଧି ପମ୍ପ', desc_en: 'HP sizing & 90% subsidy documents', desc_or: 'ପମ୍ପ HP ଓ ୯୦% ସବସିଡି ଡକୁମେଣ୍ଟ' },
      { id: 'irrigation', icon: '💧', title_en: 'Smart Irrigation', title_or: 'ଜଳସେଚନ କ୍ୟାଲେଣ୍ଡର', desc_en: 'AWD water-saving irrigation schedule', desc_or: 'AWD ଜଳ ସଞ୍ଚୟ ସେଚନ ସମୟସାରଣୀ' },
      { id: 'farmpond', icon: '🌧️', title_en: 'Farm Pond Calculator', title_or: 'ଫାର୍ମ ପଣ୍ଡ ମାପ', desc_en: 'Mo Pokhari pond dimensions & fish yield', desc_or: 'ମୋ ପୋଖରୀ ମାପ ଓ ମାଛ ଉତ୍ପାଦନ' },
      { id: 'nightsos', icon: '🚨', title_en: 'Night Field SOS', title_or: 'ରାତ୍ରି କ୍ଷେତ SOS', desc_en: 'Emergency siren for wild animal alerts', desc_or: 'ବଣ୍ୟ ପ୍ରାଣୀ ଜରୁରୀ ସାଇରେନ' }
    ]
  },
  {
    id: 'income_livestock',
    title_en: 'Income, Diary & Livestock',
    title_or: 'ଆୟ, କୃଷି ଖାତା ଓ ପଶୁପାଳନ',
    desc_en: 'Farm diary, cattle feed, vermicompost & safe grain storage',
    desc_or: 'କୃଷି ଖାତା, ପଶୁ ଖାଦ୍ୟ, ଜିଆ ଖତ ଓ ଶସ୍ୟ ସାଇତିବା',
    icon: Landmark,
    image: '/images/cat_income_livestock.jpg',
    accent: 'bg-violet-100 text-violet-700',
    services: [
      { id: 'khata', icon: '📒', title_en: 'Farm Khata Diary', title_or: 'କୃଷି ଖାତା ଡାଏରୀ', desc_en: 'Track expenses & calculate ROI', desc_or: 'ଖର୍ଚ୍ଚ ଟ୍ରାକ ଓ ଲାଭ ହିସାବ' },
      { id: 'cattle', icon: '🐮', title_en: 'Cattle Feed Planner', title_or: 'ପଶୁ ଖାଦ୍ୟ ହିସାବ', desc_en: 'Balanced dairy cow ration mix', desc_or: 'ଗାଈ ପାଇଁ ସନ୍ତୁଳିତ ଖାଦ୍ୟ ମିଶ୍ରଣ' },
      { id: 'vermicompost', icon: '🪱', title_en: 'Vermicompost Yield', title_or: 'ଜିଆ ଖତ ଉତ୍ପାଦନ', desc_en: 'Pit size, earthworm qty & harvest', desc_or: 'କୁଣ୍ଡ ମାପ, ଜିଆ ପରିମାଣ ଓ ଅମଳ' },
      { id: 'storage', icon: '📦', title_en: 'Grain Storage Guide', title_or: 'ଶସ୍ୟ ସାଇତିବା', desc_en: 'Moisture limits & safe storage', desc_or: 'ଆର୍ଦ୍ରତା ସୀମା ଓ ସୁରକ୍ଷିତ ସାଇତିବା' }
    ]
  }
];

// Map service IDs to components
const SERVICE_COMPONENTS = {
  fertilizer: FertilizerCalculator,
  soilph: SoilPhLimeCalculator,
  biofertilizer: BioFertilizerGuide,
  seed: SeedGerminationTester,
  rotation: CropRotationPlanner,
  tankmix: TankMixCompatibility,
  organic: OrganicBioPesticides,
  weed: WeedHerbicideGuide,
  pests: PestBeneficialGuide,
  stressrecovery: StressRecoveryPackage,
  solarpump: SolarPumpCalculator,
  irrigation: IrrigationScheduler,
  farmpond: FarmPondCalculator,
  nightsos: NightFieldSOS,
  khata: FarmKhataDiary,
  cattle: CattleFeedPlanner,
  vermicompost: VermicompostCalculator,
  storage: GrainStorageGuide
};

export default function AgriServicesHub({ lang }) {
  // view: 'categories' | 'tools' | 'detail'
  const [view, setView] = useState('categories');
  const [selectedCat, setSelectedCat] = useState(null);
  const [activeService, setActiveService] = useState(null);

  const openCategory = (cat) => {
    setSelectedCat(cat);
    setView('tools');
  };

  const openTool = (serviceId) => {
    setActiveService(serviceId);
    setView('detail');
  };

  const goBack = () => {
    if (view === 'detail') {
      setView('tools');
      setActiveService(null);
    } else if (view === 'tools') {
      setView('categories');
      setSelectedCat(null);
    }
  };

  const ActiveComponent = activeService ? SERVICE_COMPONENTS[activeService] : null;
  const activeSrv = selectedCat?.services.find(s => s.id === activeService);

  // ─── Screen 1: Category Cards ────────────────────────────
  if (view === 'categories') {
    return (
      <div className="space-y-3">
        <div className="text-center mb-2">
          <h2 className="font-bold text-base sm:text-lg text-[#2C221E]">
            {lang === 'or' ? '🌾 କୃଷି ସେବା ହବ୍' : '🌾 Agri Services Hub'}
          </h2>
          <p className="text-xs text-[#7A6E62] mt-0.5">
            {lang === 'or' ? '୧୮ ବିଶେଷ କୃଷି ଟୁଲ୍ — ଗୋଟିଏ ବର୍ଗ ବାଛନ୍ତୁ' : '18 specialized farm tools — pick a category'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => openCategory(cat)}
                className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-2xl overflow-hidden text-left cursor-pointer hover:border-[#1E4D2B] hover:shadow-lg transition-all group flex flex-col"
              >
                {/* Photographic Header */}
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-[#15381F]">
                  <img
                    src={cat.image}
                    alt={lang === 'or' ? cat.title_or : cat.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  
                  {/* Floating Icon and Tool Count Badge */}
                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg backdrop-blur-md bg-white/90 shadow-xs ${cat.accent}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-white text-xs font-bold drop-shadow-sm">
                        {lang === 'or' ? cat.title_or : cat.title_en}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
                      {cat.services.length} {lang === 'or' ? 'ଟୁଲ୍' : 'tools'}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#4A3E38] leading-relaxed">
                    {lang === 'or' ? cat.desc_or : cat.desc_en}
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#EAF0E6] flex items-center justify-between text-xs font-bold text-[#1E4D2B]">
                    <span>{lang === 'or' ? 'ଟୁଲ୍ ଖୋଲନ୍ତୁ' : 'Open Category Tools'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Screen 2: Tools List for Selected Category ──────────
  if (view === 'tools' && selectedCat) {
    const IconComp = selectedCat.icon;
    return (
      <div className="space-y-3">
        {/* Back + Category Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B] hover:bg-[#D5DEC9] transition-colors cursor-pointer flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <div className={`p-2 rounded-lg flex-shrink-0 ${selectedCat.accent}`}>
              <IconComp className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm sm:text-base text-[#2C221E] truncate">
              {lang === 'or' ? selectedCat.title_or : selectedCat.title_en}
            </h2>
          </div>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 gap-2">
          {selectedCat.services.map((srv) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => openTool(srv.id)}
              className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-3.5 text-left cursor-pointer hover:border-[#1E4D2B] hover:shadow-sm transition-all group flex items-center gap-3"
            >
              <span className="text-xl flex-shrink-0">{srv.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#2C221E] group-hover:text-[#1E4D2B] transition-colors">
                  {lang === 'or' ? srv.title_or : srv.title_en}
                </h3>
                <p className="text-xs text-[#7A6E62] mt-0.5 leading-relaxed">
                  {lang === 'or' ? srv.desc_or : srv.desc_en}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#BAC8AA] group-hover:text-[#1E4D2B] flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── Screen 3: Active Tool Detail ────────────────────────
  if (view === 'detail' && ActiveComponent) {
    return (
      <div className="space-y-3">
        {/* Back + Tool Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B] hover:bg-[#D5DEC9] transition-colors cursor-pointer flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {activeSrv && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg flex-shrink-0">{activeSrv.icon}</span>
              <h2 className="font-bold text-sm sm:text-base text-[#2C221E] truncate">
                {lang === 'or' ? activeSrv.title_or : activeSrv.title_en}
              </h2>
            </div>
          )}
        </div>

        {/* Tool Component */}
        <ActiveComponent lang={lang} />
      </div>
    );
  }

  return null;
}
