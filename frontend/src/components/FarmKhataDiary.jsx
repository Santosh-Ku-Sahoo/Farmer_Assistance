import React, { useState, useEffect } from 'react';
import { BookMarked, IndianRupee, TrendingUp, TrendingDown, Plus, Trash2, Save, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { translations } from '../translations';

const STORAGE_KEY = 'ai_farmer_assistant_khata_v1';

export default function FarmKhataDiary({ lang }) {
  const [crop, setCrop] = useState('Rice');
  const [landAcres, setLandAcres] = useState(1);
  const [seedCost, setSeedCost] = useState(1500);
  const [tractorCost, setTractorCost] = useState(3000);
  const [fertilizerCost, setFertilizerCost] = useState(3500);
  const [pesticideCost, setPesticideCost] = useState(1200);
  const [laborCost, setLaborCost] = useState(6000);
  const [otherCost, setOtherCost] = useState(1000);

  // Revenue parameters
  const [expectedYieldQtl, setExpectedYieldQtl] = useState(22); // e.g. 22 Quintals / Acre for Rice
  const [pricePerQtl, setPricePerQtl] = useState(2300); // Govt MSP ₹2,300

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.crop) setCrop(data.crop);
        if (data.landAcres) setLandAcres(data.landAcres);
        if (data.seedCost !== undefined) setSeedCost(data.seedCost);
        if (data.tractorCost !== undefined) setTractorCost(data.tractorCost);
        if (data.fertilizerCost !== undefined) setFertilizerCost(data.fertilizerCost);
        if (data.pesticideCost !== undefined) setPesticideCost(data.pesticideCost);
        if (data.laborCost !== undefined) setLaborCost(data.laborCost);
        if (data.otherCost !== undefined) setOtherCost(data.otherCost);
        if (data.expectedYieldQtl !== undefined) setExpectedYieldQtl(data.expectedYieldQtl);
        if (data.pricePerQtl !== undefined) setPricePerQtl(data.pricePerQtl);
      }
    } catch (e) {}
  }, []);

  // Save to local storage on change
  const handleSave = () => {
    try {
      const payload = {
        crop, landAcres, seedCost, tractorCost, fertilizerCost,
        pesticideCost, laborCost, otherCost, expectedYieldQtl, pricePerQtl
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      alert(lang === 'or' ? 'ଖାତା ତଥ୍ୟ ସଫଳତାର ସହ ସାଇତା ଗଲା!' : 'Farm logbook saved successfully to your phone!');
    } catch (e) {}
  };

  const handleResetDefaults = () => {
    if (crop === 'Rice') {
      setSeedCost(1500); setTractorCost(3000); setFertilizerCost(3500);
      setPesticideCost(1200); setLaborCost(6000); setOtherCost(1000);
      setExpectedYieldQtl(22); setPricePerQtl(2300);
    } else if (crop === 'Tomato') {
      setSeedCost(2500); setTractorCost(3500); setFertilizerCost(6000);
      setPesticideCost(3000); setLaborCost(10000); setOtherCost(2000);
      setExpectedYieldQtl(80); setPricePerQtl(1400);
    } else {
      setSeedCost(12000); setTractorCost(4000); setFertilizerCost(8000);
      setPesticideCost(3500); setLaborCost(9000); setOtherCost(2500);
      setExpectedYieldQtl(75); setPricePerQtl(1300);
    }
  };

  const totalExpense = (
    parseFloat(seedCost || 0) +
    parseFloat(tractorCost || 0) +
    parseFloat(fertilizerCost || 0) +
    parseFloat(pesticideCost || 0) +
    parseFloat(laborCost || 0) +
    parseFloat(otherCost || 0)
  ) * parseFloat(landAcres || 1);

  const totalRevenue = (parseFloat(expectedYieldQtl || 0) * parseFloat(pricePerQtl || 0)) * parseFloat(landAcres || 1);
  const netProfit = totalRevenue - totalExpense;
  const roiPct = totalExpense > 0 ? ((netProfit / totalExpense) * 100).toFixed(1) : 0;

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'କୃଷକ ଖର୍ଚ୍ଚ ଓ ଲାଭ ଡାଏରୀ (Krishi Khata Logbook)' : 'Farmer Profit & Field Expense Diary'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଚାଷ ଖର୍ଚ୍ଚ, ଅମଳ ବିକ୍ରି ଓ ନିଟ୍ ଲାଭ ହିସାବ ଡାଏରୀ' : 'Track crop production costs vs mandi revenue & calculate net ROI'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#1E4D2B] text-white text-xs font-bold hover:bg-[#163B21] transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{lang === 'or' ? 'ସାଇତନ୍ତୁ' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Crop & Land Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଫସଲ ଚୟନ:' : 'Select Crop:'}
          </label>
          <select
            value={crop}
            onChange={(e) => {
              setCrop(e.target.value);
              // auto-update benchmark defaults
              setTimeout(handleResetDefaults, 50);
            }}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            <option value="Rice">{lang === 'or' ? '🌾 ଧାନ (Rice / Paddy)' : '🌾 Rice / Paddy'}</option>
            <option value="Tomato">{lang === 'or' ? '🍅 ବିଲାତି ବାଇଗଣ (Tomato)' : '🍅 Tomato'}</option>
            <option value="Potato">{lang === 'or' ? '🥔 ଆଳୁ (Potato)' : '🥔 Potato'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଜମି ପରିମାଣ (ଏକର):' : 'Land Size (Acres):'}
          </label>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={landAcres}
            onChange={(e) => setLandAcres(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          />
        </div>
      </div>

      {/* Expense Input Fields */}
      <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#D5DEC9] mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] mb-2.5">
          💸 {lang === 'or' ? 'ଚାଷ ଖର୍ଚ୍ଚ ବିବରଣୀ (Production Expenses per Acre ₹):' : 'Cost Breakdown (Per Acre ₹):'}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ବିହନ ଖର୍ଚ୍ଚ (Seed):' : 'Seed Cost:'}
            </label>
            <input
              type="number"
              value={seedCost}
              onChange={(e) => setSeedCost(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଟ୍ରାକ୍ଟର / ଚାଷ (Tillage):' : 'Tractor/Plough:'}
            </label>
            <input
              type="number"
              value={tractorCost}
              onChange={(e) => setTractorCost(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଖତସାର (Fertilizer):' : 'Fertilizers:'}
            </label>
            <input
              type="number"
              value={fertilizerCost}
              onChange={(e) => setFertilizerCost(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'କୀଟନାଶକ (Pesticide):' : 'Pesticides:'}
            </label>
            <input
              type="number"
              value={pesticideCost}
              onChange={(e) => setPesticideCost(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ମୂଲିଆ / ମଜୁରୀ (Labor):' : 'Labor & Weeding:'}
            </label>
            <input
              type="number"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଅନ୍ୟାନ୍ୟ (Harvest/Misc):' : 'Harvest / Misc:'}
            </label>
            <input
              type="number"
              value={otherCost}
              onChange={(e) => setOtherCost(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] font-medium"
            />
          </div>
        </div>
      </div>

      {/* Revenue Estimation */}
      <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#D5DEC9] mb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] mb-2.5">
          🌾 {lang === 'or' ? 'ଅମଳ ଓ ବିକ୍ରି ଦର (Estimated Harvest & Selling Price):' : 'Expected Harvest & Sale Price:'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ଅନୁମାନିତ ଅମଳ (କୁଇଣ୍ଟାଲ/ଏକର):' : 'Expected Yield (Quintals/Acre):'}
            </label>
            <input
              type="number"
              value={expectedYieldQtl}
              onChange={(e) => setExpectedYieldQtl(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2.5 py-1.5 text-[#2C221E] font-bold"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#7A6E62] block mb-0.5">
              {lang === 'or' ? 'ବିକ୍ରି ଦର (ଟଙ୍କା / କୁଇଣ୍ଟାଲ):' : 'Sale Price (₹ / Quintal):'}
            </label>
            <input
              type="number"
              value={pricePerQtl}
              onChange={(e) => setPricePerQtl(e.target.value)}
              className="w-full bg-[#FAFDF8] border border-[#C8D4BA] rounded-lg px-2.5 py-1.5 text-[#2C221E] font-bold"
            />
          </div>
        </div>
      </div>

      {/* Final Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        
        <div className="p-3.5 bg-[#FAFDF8] border border-[#BAC8AA] rounded-xl text-xs shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#7A6E62] block mb-0.5">
            {lang === 'or' ? 'ମୋଟ ଖର୍ଚ୍ଚ (Total Cost)' : 'Total Investment'}
          </span>
          <p className="text-base sm:text-lg font-extrabold text-[#8B3A2B]">
            ₹ {totalExpense.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-3.5 bg-[#FAFDF8] border border-[#BAC8AA] rounded-xl text-xs shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#7A6E62] block mb-0.5">
            {lang === 'or' ? 'ମୋଟ ଆୟ (Total Sale)' : 'Gross Revenue'}
          </span>
          <p className="text-base sm:text-lg font-extrabold text-[#1E4D2B]">
            ₹ {totalRevenue.toLocaleString('en-IN')}
          </p>
        </div>

        <div className={`p-3.5 rounded-xl border text-xs shadow-2xs ${
          netProfit >= 0
            ? 'bg-[#EAF0E6] border-[#2C6E3B] text-[#1E4D2B]'
            : 'bg-[#FEE2E2] border-[#EF4444] text-[#991B1B]'
        }`}>
          <span className="text-[10px] uppercase font-extrabold block mb-0.5">
            {netProfit >= 0 ? (lang === 'or' ? 'ନିଟ୍ ଲାଭ (Net Profit)' : 'Net Profit') : (lang === 'or' ? 'କ୍ଷତି (Net Loss)' : 'Net Loss')}
          </span>
          <p className="text-base sm:text-lg font-extrabold flex items-center space-x-1">
            {netProfit >= 0 ? <TrendingUp className="w-4 h-4 text-[#1E4D2B]" /> : <TrendingDown className="w-4 h-4 text-[#991B1B]" />}
            <span>₹ {Math.abs(netProfit).toLocaleString('en-IN')}</span>
          </p>
          <span className="text-[11px] font-bold mt-0.5 block">
            ROI: {roiPct}%
          </span>
        </div>

      </div>

    </div>
  );
}
