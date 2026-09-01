import React, { useState } from 'react';
import { Droplets, Waves, AlertTriangle, CheckCircle2, Clock, ShieldCheck, Info } from 'lucide-react';
import { translations } from '../translations';

const IRRIGATION_DATABASE = {
  Rice: {
    nursery: {
      depth_en: "Maintain thin film (1-2 cm) of standing water",
      depth_or: "୧-୨ ସେମି ପତଳା ପାଣି ଜମାଇ ରଖନ୍ତୁ",
      interval_days: "Continuous thin film after 5th day",
      interval_or: "୫ମ ଦିନ ପରେ ସର୍ବଦା ପତଳା ପାଣି",
      critical_warning_en: "Do not submerge young germinating shoots.",
      critical_warning_or: "ଗଜା ତଳିକୁ ସମ୍ପୂର୍ଣ୍ଣ ବୁଡ଼ାଇ ରଖନ୍ତୁ ନାହିଁ।"
    },
    tillering: {
      depth_en: "Shallow standing water (2-3 cm) or Alternate Wetting & Drying (AWD)",
      depth_or: "୨-୩ ସେମି ଅଗଭୀର ପାଣି ବା ମଝିରେ ମଝିରେ ଶୁଖାଇ ପାଣି ମଡ଼ାନ୍ତୁ (AWD)",
      interval_days: "Irrigate 2-3 days after hairline cracks appear on soil",
      interval_or: "ମାଟିରେ ସାମାନ୍ୟ ଫାଟ ଦେଖାଦେବାର ୨-୩ ଦିନ ପରେ ପାଣି ଦିଅନ୍ତୁ",
      critical_warning_en: "Deep standing water (>5 cm) suppresses tiller formation.",
      critical_warning_or: "ଅଧିକ ପାଣି ଜମି ରହିଲେ ଧାନ ପିଲ କମିଯାଏ।"
    },
    flowering: {
      depth_en: "Continuous standing water (3-5 cm) - MOST CRITICAL STAGE",
      depth_or: "୩-୫ ସେମି ନିରବଚ୍ଛିନ୍ନ ପାଣି (ଅତି ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଅବସ୍ଥା)",
      interval_days: "Do not let soil dry during Panicle Initiation to Milk Stage",
      interval_or: "ଥୋଡ଼ ବାହାରିବା ଠାରୁ କ୍ଷୀର ଧରିବା ଯାଏଁ ଜମି ଶୁଖିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ",
      critical_warning_en: "Drought at flowering causes 60-80% unfilled chaffy grains (Agadi).",
      critical_warning_or: "ଏହି ସମୟରେ ପାଣି ଅଭାବ ହେଲେ ଧାନ ଅଗାଡ଼ି ହୋଇଯାଏ।"
    },
    pre_harvest: {
      depth_en: "Complete Drainage (0 cm)",
      depth_or: "ସମ୍ପୂର୍ଣ୍ଣ ପାଣି ନିଷ୍କାସନ (ଶୁଖିଲା ଜମି)",
      interval_days: "Drain all water 10-14 days before harvest",
      interval_or: "ଧାନ କାଟିବାର ୧୦-୧୪ ଦିନ ପୂର୍ବରୁ ପାଣି କାଢ଼ି ଦିଅନ୍ତୁ",
      critical_warning_en: "Standing water at harvest causes grain sprouting and lodging.",
      critical_warning_or: "ଅମଳ ବେଳେ ପାଣି ଥିଲେ ଧାନ ଶିଁଷାରେ ଗଜା ହୋଇ ନଷ୍ଟ ହୁଏ।"
    }
  },
  Tomato: {
    vegetative: {
      depth_en: "Furrow irrigation (moisten root zone without wetting foliage)",
      depth_or: "ନାଳି ଦେଇ ପାଣି ମଡ଼ାନ୍ତୁ (ପତ୍ର ଉପରେ ପାଣି ପକାନ୍ତୁ ନାହିଁ)",
      interval_days: "Every 7-8 days (Sandy Loam: 5-6 days)",
      interval_or: "ପ୍ରତି ୭-୮ ଦିନ ବ୍ୟବଧାନରେ (ବେଲେଇ ମାଟି: ୫-୬ ଦିନ)",
      critical_warning_en: "Overhead sprinkler watering promotes Early Blight fungal spread.",
      critical_warning_or: "ପତ୍ର ଉପରେ ପାଣି ଛିଞ୍ଚିଲେ ପତ୍ରପୋଡ଼ା ରୋଗ ଦ୍ରୁତ ବଢ଼େ।"
    },
    flowering: {
      depth_en: "Steady, uniform moisture in furrows",
      depth_or: "ଧାଡ଼ି ନାଳିରେ ସମତୁଲ ଆର୍ଦ୍ରତା ରଖନ୍ତୁ",
      interval_days: "Every 5-7 days",
      interval_or: "ପ୍ରତି ୫-୭ ଦିନରେ",
      critical_warning_en: "Moisture fluctuation causes heavy blossom drop and blossom-end rot.",
      critical_warning_or: "ଅଧିକ ଶୁଖାଇ ପାଣି ଦେଲେ ଫୁଲ ଝଡ଼ିଯାଏ ଓ ଫଳ ତଳ କଳା ପଡ଼ିଯାଏ।"
    },
    fruiting: {
      depth_en: "Light furrow irrigation",
      depth_or: "ହାଲୁକା ନାଳି ଜଳସେଚନ",
      interval_days: "Every 6-8 days (Reduce before final harvest)",
      interval_or: "ପ୍ରତି ୬-୮ ଦିନରେ (ତୋଳା ପୂର୍ବରୁ ପାଣି କମାନ୍ତୁ)",
      critical_warning_en: "Excess water during fruit ripening causes fruit cracking/splitting.",
      critical_warning_or: "ଟମାଟୋ ପାଚିବା ବେଳେ ଅଧିକ ପାଣି ଦେଲେ ଫଳ ଫାଟି ନଷ୍ଟ ହୁଏ।"
    }
  },
  Potato: {
    emergence: {
      depth_en: "Light furrow irrigation (water below 2/3rd of ridge height)",
      depth_or: "ହାଲୁକା ପାଣି (ହିଡ଼ ଉଚ୍ଚତାର ଦୁଇ-ତୃତୀୟାଂଶ ତଳେ ରଖନ୍ତୁ)",
      interval_days: "First irrigation 7-10 days after planting",
      interval_or: "ରୋପଣର ୭-୧୦ ଦିନ ପରେ ପ୍ରଥମ ପାଣି",
      critical_warning_en: "Water submerging ridge tops rots sprouted seed tubers.",
      critical_warning_or: "ହିଡ଼ ଉପରେ ପାଣି ଚଢ଼ିଲେ ଆଳୁ ବିହନ ସଢ଼ିଯାଏ।"
    },
    tuber_bulking: {
      depth_en: "Steady furrow moisture (Critical bulking phase)",
      depth_or: "ଆଳୁ ବଢ଼ିବା ସମୟରେ ନିୟମିତ ନାଳି ଜଳସେଚନ",
      interval_days: "Every 7-9 days",
      interval_or: "ପ୍ରତି ୭-୯ ଦିନରେ",
      critical_warning_en: "Dry soil followed by heavy irrigation creates hollow heart and knobby tubers.",
      critical_warning_or: "ଆଳୁ ମଝି ଫାଙ୍କା ଓ ବଙ୍କା-ଟଙ୍କା ହେବା ରୋକିବାକୁ ସମାନ ପାଣି ଦିଅନ୍ତୁ।"
    },
    pre_harvest: {
      depth_en: "Stop all irrigation completely",
      depth_or: "ଜଳସେଚନ ସମ୍ପୂର୍ଣ୍ଣ ବନ୍ଦ ରଖନ୍ତୁ",
      interval_days: "Stop water 10 days before dehaulming (15-20 days before digging)",
      interval_or: "ପତ୍ର କାଟିବାର ୧୦ ଦିନ ପୂର୍ବରୁ ପାଣି ବନ୍ଦ କରନ୍ତୁ",
      critical_warning_en: "Wet soil at digging peels tuber skin and causes rotting in storage.",
      critical_warning_or: "ଓଦା ମାଟିରେ ଆଳୁ ଖୋଳିଲେ ଚୋପା ଛାଡ଼ି କୋଲ୍ଡ ଷ୍ଟୋରରେ ସଢ଼ିଯାଏ।"
    }
  }
};

export default function IrrigationScheduler({ lang }) {
  const [crop, setCrop] = useState('Rice');
  const [stage, setStage] = useState('flowering');

  const cropData = IRRIGATION_DATABASE[crop] || IRRIGATION_DATABASE.Rice;
  const stageInfo = cropData[stage] || Object.values(cropData)[0];

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#0284C7]">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଜଳସେଚନ ଓ ପାଣି ଆବଶ୍ୟକତା କ୍ୟାଲେଣ୍ଡର' : 'Smart Irrigation & Water Scheduler'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଅତିରିକ୍ତ ପାଣିରୁ ରୋଗ ରୋକନ୍ତୁ ଓ ଠିକ୍ ସମୟରେ ଜଳସେଚନ କରନ୍ତୁ' : 'Crop growth stage water requirements & disease prevention drainage rules'}
            </p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଫସଲ ଚୟନ:' : 'Select Crop:'}
          </label>
          <select
            value={crop}
            onChange={(e) => {
              const newCrop = e.target.value;
              setCrop(newCrop);
              setStage(Object.keys(IRRIGATION_DATABASE[newCrop])[1] || Object.keys(IRRIGATION_DATABASE[newCrop])[0]);
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
            {lang === 'or' ? 'ଫସଲର ବୃଦ୍ଧି ପର୍ଯ୍ୟାୟ (Growth Stage):' : 'Growth Stage:'}
          </label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          >
            {Object.keys(cropData).map((k) => (
              <option key={k} value={k}>
                {k === 'nursery' ? (lang === 'or' ? 'ତଳିଘରା (Nursery)' : 'Nursery Bed') :
                 k === 'tillering' ? (lang === 'or' ? 'ପିଲ ବୃଦ୍ଧି (Tillering)' : 'Tillering') :
                 k === 'flowering' ? (lang === 'or' ? 'ଥୋଡ଼ / ଫୁଲ (Flowering/Panicle)' : 'Flowering / Panicle') :
                 k === 'vegetative' ? (lang === 'or' ? 'ପ୍ରାରମ୍ଭିକ ବୃଦ୍ଧି (Vegetative)' : 'Vegetative') :
                 k === 'fruiting' ? (lang === 'or' ? 'ଫଳ ଧରିବା (Fruiting)' : 'Fruiting') :
                 k === 'emergence' ? (lang === 'or' ? 'ଗଜା ଉଠିବା (Emergence)' : 'Emergence') :
                 k === 'tuber_bulking' ? (lang === 'or' ? 'ଆଳୁ ବଢ଼ିବା (Tuber Bulking)' : 'Tuber Bulking') :
                 (lang === 'or' ? 'ଅମଳ ପୂର୍ବ ନିଷ୍କାସନ (Pre-Harvest)' : 'Pre-Harvest Drainage')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advisory Output Box */}
      <div className="bg-[#FAFDF8] border-2 border-[#0284C7]/30 rounded-xl p-4 space-y-3.5 shadow-2xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-[#F0F9FF] rounded-lg border border-[#BAE6FD]">
            <span className="text-[10px] font-bold text-[#0369A1] uppercase tracking-wider block mb-1">
              🌊 {lang === 'or' ? 'ପାଣି ଗଭୀରତା ଓ ପଦ୍ଧତି:' : 'Recommended Water Depth & Method:'}
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-[#0C4A6E]">
              {lang === 'or' ? stageInfo.depth_or : stageInfo.depth_en}
            </p>
          </div>

          <div className="p-3 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0]">
            <span className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider block mb-1">
              ⏱️ {lang === 'or' ? 'ଜଳସେଚନ ବ୍ୟବଧାନ (Interval):' : 'Irrigation Frequency:'}
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-[#14532D]">
              {lang === 'or' ? stageInfo.interval_or : stageInfo.interval_days}
            </p>
          </div>
        </div>

        {/* Critical Agronomic Warning */}
        <div className="p-3 bg-[#FEF2F2] rounded-lg border border-[#FCA5A5] text-xs text-[#991B1B] flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block">
              {lang === 'or' ? 'ସତର୍କତା ଓ ରୋଗ ନିୟନ୍ତ୍ରଣ:' : 'Critical Disease Prevention Warning:'}
            </strong>
            <p className="mt-0.5 leading-relaxed">
              {lang === 'or' ? stageInfo.critical_warning_or : stageInfo.critical_warning_en}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
