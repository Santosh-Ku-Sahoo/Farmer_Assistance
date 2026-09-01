import React, { useState } from 'react';
import { Calculator, Package, Sparkles, Scale, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { translations } from '../translations';

// Standard ICAR / OUAT Odisha state fertilizer recommendations (N:P2O5:K2O in kg/hectare)
const CROP_NPK_STANDARDS = {
  Rice: {
    name_en: "Rice / Paddy (Kharif Medium)",
    name_or: "ଧାନ (ମଧ୍ୟମ ଅବଧି ଖରିଫ)",
    n_rate_ha: 80,
    p_rate_ha: 40,
    k_rate_ha: 40,
    splits: {
      basal: { n_pct: 0.25, p_pct: 1.00, k_pct: 0.50, desc_en: "At final puddling / transplanting", desc_or: "ଶେଷ କାଦୁଅ ଚାଷ ବା ରୁଆ ବେଳେ" },
      split1: { n_pct: 0.50, p_pct: 0.00, k_pct: 0.00, desc_en: "At early tillering (21 DAT) + 10kg Zinc", desc_or: "୨୧ ଦିନ ତଳି ବୃଦ୍ଧି ବେଳେ (ସହିତ ୧୦ କେଜି ଜିଙ୍କ୍)" },
      split2: { n_pct: 0.25, p_pct: 0.00, k_pct: 0.50, desc_en: "At panicle initiation (PI stage)", desc_or: "ଥୋଡ଼ ବାହାରିବା ସମୟରେ" }
    }
  },
  Tomato: {
    name_en: "Tomato (Rabi Hybrid)",
    name_or: "ଟମାଟୋ (ରବି ସଙ୍କର କିସମ)",
    n_rate_ha: 100,
    p_rate_ha: 60,
    k_rate_ha: 60,
    splits: {
      basal: { n_pct: 0.33, p_pct: 1.00, k_pct: 0.33, desc_en: "At ridge prep before planting", desc_or: "ହିଡ଼ ପ୍ରସ୍ତୁତି ଓ ଚାରା ରୋପଣ ବେଳେ" },
      split1: { n_pct: 0.33, p_pct: 0.00, k_pct: 0.33, desc_en: "At 30 days after transplanting (weeding)", desc_or: "ରୁଆର ୩୦ ଦିନ ପରେ ଘାସ ବଛା ବେଳେ" },
      split2: { n_pct: 0.34, p_pct: 0.00, k_pct: 0.34, desc_en: "At flowering & fruit setting (60 DAT)", desc_or: "ଫୁଲ ଫୁଟିବା ଓ ଫଳ ଧରିବା ବେଳେ (୬୦ ଦିନ)" }
    }
  },
  Potato: {
    name_en: "Potato (Winter Table)",
    name_or: "ଆଳୁ (ଶୀତକାଳୀନ ରବି)",
    n_rate_ha: 120,
    p_rate_ha: 80,
    k_rate_ha: 100,
    splits: {
      basal: { n_pct: 0.50, p_pct: 1.00, k_pct: 0.50, desc_en: "In furrows during tuber planting", desc_or: "ନାଳିରେ ଆଳୁ ରୋପଣ ସମୟରେ" },
      split1: { n_pct: 0.50, p_pct: 0.00, k_pct: 0.50, desc_en: "At earthing-up (25-30 days)", desc_or: "ମାଟି ଟେକିବା ବେଳେ (୨୫-୩୦ ଦିନ)" }
    }
  }
};

export default function FertilizerCalculator({ lang }) {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [landUnit, setLandUnit] = useState('decimal'); // 'decimal' | 'guntha' | 'acre'
  const [landArea, setLandArea] = useState(10); // Default 10 Decimals

  // Conversion: 1 Hectare = 2.471 Acres = 247.1 Decimals = 61.77 Guntha (in Western/Southern Odisha)
  const getHectares = () => {
    const val = parseFloat(landArea) || 0;
    if (landUnit === 'decimal') return val / 247.1;
    if (landUnit === 'guntha') return val / 61.77;
    return val / 2.471; // acre
  };

  const cropConfig = CROP_NPK_STANDARDS[selectedCrop] || CROP_NPK_STANDARDS.Rice;
  const hectares = getHectares();

  // Pure nutrient requirements in kg
  const reqN = cropConfig.n_rate_ha * hectares;
  const reqP = cropConfig.p_rate_ha * hectares;
  const reqK = cropConfig.k_rate_ha * hectares;

  // Commercial Fertilizer calculations:
  // Using standard DAP (18% N, 46% P2O5) + Urea (46% N) + MOP (60% K2O)
  const dapKg = reqP / 0.46;
  const nFromDap = dapKg * 0.18;
  const remN = Math.max(0, reqN - nFromDap);
  const ureaKg = remN / 0.46;
  const mopKg = reqK / 0.60;

  // 45 kg standard Govt Neem-coated bags
  const ureaBags = (ureaKg / 45).toFixed(1);
  const dapBags = (dapKg / 50).toFixed(1); // DAP usually in 50kg bags
  const mopBags = (mopKg / 50).toFixed(1); // MOP in 50kg bags

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ ଓ ସାର ବସ୍ତା ହିସାବ (Fertilizer Bag Calculator)' : 'Soil Health & Fertilizer Bag Calculator'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଜମି ପରିମାଣ ଅନୁଯାୟୀ ୟୁରିଆ, ଡିଏପି ଓ ପଟାସ୍ ବସ୍ତା ହିସାବ' : 'Convert NPK recommendations into exact commercial 45kg/50kg bags'}
            </p>
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଫସଲ ଚୟନ କରନ୍ତୁ (Crop):' : 'Select Crop:'}
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            <option value="Rice">{lang === 'or' ? '🌾 ଧାନ (Rice / Paddy)' : '🌾 Rice / Paddy'}</option>
            <option value="Tomato">{lang === 'or' ? '🍅 ବିଲାତି ବାଇଗଣ (Tomato)' : '🍅 Tomato'}</option>
            <option value="Potato">{lang === 'or' ? '🥔 ଆଳୁ (Potato)' : '🥔 Potato'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଜମି ମାପ ଏକକ (Unit):' : 'Land Unit:'}
          </label>
          <select
            value={landUnit}
            onChange={(e) => setLandUnit(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            <option value="decimal">{lang === 'or' ? 'ଡେସିମିଲ୍ (Decimal / ଡ଼ିସିମିଲ)' : 'Decimals'}</option>
            <option value="guntha">{lang === 'or' ? 'ଗୁଣ୍ଠ (Guntha / ମାଣ)' : 'Guntha'}</option>
            <option value="acre">{lang === 'or' ? 'ଏକର (Acre)' : 'Acres'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଜମି ପରିମାଣ (Area):' : 'Area Size:'}
          </label>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          />
        </div>
      </div>

      {/* Output Cards: 3 Commercial Bags */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        
        {/* Urea */}
        <div className="bg-[#FAFDF8] border-2 border-[#1E4D2B]/30 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-extrabold text-[#1E4D2B]">
              {lang === 'or' ? 'ୟୁରିଆ (Urea 46% N)' : 'Urea (46% N)'}
            </span>
            <Package className="w-4 h-4 text-[#1E4D2B]" />
          </div>
          <p className="text-xl font-extrabold text-[#2C221E]">
            {ureaKg.toFixed(1)} <span className="text-xs font-medium text-[#7A6E62]">kg</span>
          </p>
          <p className="text-xs font-bold text-[#1E4D2B] mt-1 bg-[#EAF0E6] px-2 py-0.5 rounded inline-block">
            📦 ≈ {ureaBags} {lang === 'or' ? 'ବସ୍ତା (୪୫ କେଜି)' : 'Bags (45kg)'}
          </p>
        </div>

        {/* DAP */}
        <div className="bg-[#FAFDF8] border-2 border-[#D97706]/30 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-extrabold text-[#D97706]">
              {lang === 'or' ? 'ଡିଏପି (DAP 18-46-0)' : 'DAP (18-46-0)'}
            </span>
            <Package className="w-4 h-4 text-[#D97706]" />
          </div>
          <p className="text-xl font-extrabold text-[#2C221E]">
            {dapKg.toFixed(1)} <span className="text-xs font-medium text-[#7A6E62]">kg</span>
          </p>
          <p className="text-xs font-bold text-[#92400E] mt-1 bg-[#FEF3C7] px-2 py-0.5 rounded inline-block">
            📦 ≈ {dapBags} {lang === 'or' ? 'ବସ୍ତା (୫୦ କେଜି)' : 'Bags (50kg)'}
          </p>
        </div>

        {/* MOP Potash */}
        <div className="bg-[#FAFDF8] border-2 border-[#8B3A2B]/30 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-extrabold text-[#8B3A2B]">
              {lang === 'or' ? 'ପଟାସ୍ (MOP 60% K2O)' : 'MOP Potash (60%)'}
            </span>
            <Package className="w-4 h-4 text-[#8B3A2B]" />
          </div>
          <p className="text-xl font-extrabold text-[#2C221E]">
            {mopKg.toFixed(1)} <span className="text-xs font-medium text-[#7A6E62]">kg</span>
          </p>
          <p className="text-xs font-bold text-[#8B3A2B] mt-1 bg-[#FEE2E2] px-2 py-0.5 rounded inline-block">
            📦 ≈ {mopBags} {lang === 'or' ? 'ବସ୍ତା (୫୦ କେଜି)' : 'Bags (50kg)'}
          </p>
        </div>

      </div>

      {/* Split Schedule Table */}
      <div className="bg-[#F8FAF5] rounded-xl border border-[#D5DEC9] p-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] mb-2.5 flex items-center space-x-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#1E4D2B]" />
          <span>{lang === 'or' ? 'ସାର ପ୍ରୟୋଗ ସମୟସାରଣୀ (Application Split Timing):' : 'Application Split Schedule:'}</span>
        </h4>

        <div className="space-y-2 text-xs">
          {Object.entries(cropConfig.splits).map(([key, s], idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
              <div>
                <strong className="text-[#1E4D2B] font-bold block">
                  {key === 'basal' ? '1. ' : key === 'split1' ? '2. ' : '3. '}
                  {lang === 'or' ? s.desc_or : s.desc_en}
                </strong>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-semibold text-[#5A4D41]">
                {s.n_pct > 0 && <span className="px-1.5 py-0.5 rounded bg-[#EAF0E6] text-[#1E4D2B]">Urea: {(ureaKg * s.n_pct).toFixed(1)}kg</span>}
                {s.p_pct > 0 && <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E]">DAP: {(dapKg * s.p_pct).toFixed(1)}kg</span>}
                {s.k_pct > 0 && <span className="px-1.5 py-0.5 rounded bg-[#FEE2E2] text-[#8B3A2B]">MOP: {(mopKg * s.k_pct).toFixed(1)}kg</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
