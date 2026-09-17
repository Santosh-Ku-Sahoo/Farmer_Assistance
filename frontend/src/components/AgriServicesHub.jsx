import React, { useState } from 'react';
import { 
  Sprout, ShieldAlert, Droplets, Landmark, 
  ChevronDown
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
    title_or: 'ମାଟି, ବିହନ ଓ ସାର',
    icon: Sprout,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-600',
    activeBg: 'bg-emerald-600',
    services: [
      { id: 'fertilizer', title_en: '⚖️ Fertilizer Bag Calculator', title_or: '⚖️ ସାର ବସ୍ତା ହିସାବ' },
      { id: 'soilph', title_en: '🧪 Soil pH & Lime Dose', title_or: '🧪 ମାଟି pH ଓ ଚୂନ' },
      { id: 'biofertilizer', title_en: '🌱 Bio-Inoculants Guide', title_or: '🌱 ଜୈବିକ ଖତ ଶୋଧନ' },
      { id: 'seed', title_en: '🌾 Seed Germination Test', title_or: '🌾 ବିହନ ଗଜା ପରୀକ୍ଷା' },
      { id: 'rotation', title_en: '🔄 Crop Rotation Planner', title_or: '🔄 ଫସଲ ପର୍ଯ୍ୟାୟ' }
    ]
  },
  {
    id: 'crop_protect',
    title_en: 'Crop Protection',
    title_or: 'ଫସଲ ସୁରକ୍ଷା',
    icon: ShieldAlert,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-600',
    activeBg: 'bg-amber-600',
    services: [
      { id: 'tankmix', title_en: '🧲 Tank-Mix Jar Test', title_or: '🧲 ଔଷଧ ମିଶ୍ରଣ ଯାଞ୍ଚ' },
      { id: 'organic', title_en: '🌿 Bio-Pesticides', title_or: '🌿 ଜୈବିକ କାଢ଼ା' },
      { id: 'weed', title_en: '🌾 Weed & Herbicide Guide', title_or: '🌾 ଘାସ ଦମନ' },
      { id: 'pests', title_en: '🐞 Friend vs Pest Insects', title_or: '🐞 ମିତ୍ର ଓ ଶତ୍ରୁ ପୋକ' },
      { id: 'stressrecovery', title_en: '🌊 Flood & Drought Revival', title_or: '🌊 ବନ୍ୟା/ମରୁଡ଼ି ସଞ୍ଜୀବନୀ' }
    ]
  },
  {
    id: 'water_energy',
    title_en: 'Water & Solar',
    title_or: 'ଜଳ ଓ ସୌର ଶକ୍ତି',
    icon: Droplets,
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    iconBg: 'bg-sky-100 text-sky-600',
    activeBg: 'bg-sky-600',
    services: [
      { id: 'solarpump', title_en: '☀️ Solar Pump Subsidy', title_or: '☀️ ସୌର ଜଳନିଧି ପମ୍ପ' },
      { id: 'irrigation', title_en: '💧 Smart Irrigation', title_or: '💧 ଜଳସେଚନ କ୍ୟାଲେଣ୍ଡର' },
      { id: 'farmpond', title_en: '🌧️ Farm Pond Calculator', title_or: '🌧️ ଫାର୍ମ ପଣ୍ଡ ମାପ' },
      { id: 'nightsos', title_en: '🚨 Night Field SOS', title_or: '🚨 ରାତ୍ରି କ୍ଷେତ SOS' }
    ]
  },
  {
    id: 'income_livestock',
    title_en: 'Income & Support',
    title_or: 'ଆୟ ଓ ସହାୟତା',
    icon: Landmark,
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    iconBg: 'bg-violet-100 text-violet-600',
    activeBg: 'bg-violet-600',
    services: [
      { id: 'khata', title_en: '📒 Farm Khata Diary', title_or: '📒 କୃଷି ଖାତା ଡାଏରୀ' },
      { id: 'cattle', title_en: '🐮 Cattle Feed Planner', title_or: '🐮 ପଶୁ ଖାଦ୍ୟ ହିସାବ' },
      { id: 'vermicompost', title_en: '🪱 Vermicompost Yield', title_or: '🪱 ଜିଆ ଖତ ଉତ୍ପାଦନ' },
      { id: 'storage', title_en: '📦 Grain Storage Guide', title_or: '📦 ଶସ୍ୟ ସାଇତିବା' },
      { id: 'helpline', title_en: '📞 Emergency Helplines', title_or: '📞 କୃଷି ହେଲ୍ପଲାଇନ୍' },
      { id: 'schemes', title_en: '🏛️ Govt Schemes', title_or: '🏛️ ସରକାରୀ ଯୋଜନା' }
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
  storage: GrainStorageGuide,
  helpline: HelplineDirectory,
  schemes: GovtSchemesCard
};

export default function AgriServicesHub({ lang }) {
  const [openCategory, setOpenCategory] = useState('soil_seed');
  const [activeService, setActiveService] = useState('fertilizer');

  const handleCategoryToggle = (catId, firstServiceId) => {
    if (openCategory === catId) {
      setOpenCategory(null);
    } else {
      setOpenCategory(catId);
      setActiveService(firstServiceId);
    }
  };

  const ActiveComponent = SERVICE_COMPONENTS[activeService];

  return (
    <div className="space-y-3">

      {/* Category Accordion */}
      {CATEGORIES.map((cat) => {
        const IconComponent = cat.icon;
        const isOpen = openCategory === cat.id;

        return (
          <div key={cat.id} className={`rounded-xl border overflow-hidden transition-all ${isOpen ? cat.color + ' shadow-sm' : 'bg-[#FDFCFA] border-[#D5DEC9]'}`}>
            
            {/* Category Header — always visible */}
            <button
              type="button"
              onClick={() => handleCategoryToggle(cat.id, cat.services[0].id)}
              className="w-full px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-colors hover:bg-black/[0.02]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-lg flex-shrink-0 ${isOpen ? cat.iconBg : 'bg-[#EAF0E6] text-[#5A4D41]'}`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-bold text-sm leading-tight truncate">
                    {lang === 'or' ? cat.title_or : cat.title_en}
                  </h3>
                  <p className="text-xs text-[#7A6E62] mt-0.5">
                    {cat.services.length} {lang === 'or' ? 'ଟୁଲ୍' : 'tools'}
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 text-[#7A6E62] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Expanded: Tool list + active tool content */}
            {isOpen && (
              <div className="px-3 pb-3 space-y-3">

                {/* Tool buttons — clean 2-column grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {cat.services.map((srv) => {
                    const isActive = activeService === srv.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setActiveService(srv.id)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer leading-snug ${
                          isActive
                            ? `${cat.activeBg} text-white shadow-sm`
                            : 'bg-white/80 text-[#2C221E] border border-[#D5DEC9] hover:bg-white'
                        }`}
                      >
                        {lang === 'or' ? srv.title_or : srv.title_en}
                      </button>
                    );
                  })}
                </div>

                {/* Active tool content */}
                <div className="animate-in fade-in duration-150">
                  {ActiveComponent && <ActiveComponent lang={lang} />}
                </div>
              </div>
            )}
          </div>
        );
      })}

    </div>
  );
}
