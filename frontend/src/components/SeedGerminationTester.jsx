import React, { useState } from 'react';
import { Sprout, CheckCircle, AlertOctagon, HelpCircle, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { translations } from '../translations';

export default function SeedGerminationTester({ lang }) {
  const [totalTested, setTotalTested] = useState(100);
  const [sproutedCount, setSproutedCount] = useState(88);

  const germinationPct = totalTested > 0 ? ((sproutedCount / totalTested) * 100).toFixed(1) : 0;
  const pctNum = parseFloat(germinationPct);

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
              {lang === 'or' ? 'ବିହନ ଗଜା ପରୀକ୍ଷା ଓ ଅଙ୍କୁରୋଦ୍ଗମ ମାନ ନିର୍ଦ୍ଧାରଣ' : '100-Seed Germination Rate % Quality Tester'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ବୁଣିବା ପୂର୍ବରୁ ଓଦା କପଡ଼ାରେ ବିହନ ଗଜା ପରୀକ୍ଷା କରି କ୍ଷତିରୁ ବଞ୍ଚନ୍ତୁ' : 'Rag doll seed testing method & seed rate adjustment advisor'}
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Rag Doll Instructions */}
      <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#D5DEC9] mb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] mb-2">
          📋 {lang === 'or' ? 'ଓଦା କପଡ଼ା ବିହନ ପରୀକ୍ଷା ବିଧି (Rag Doll 100-Seed Method):' : '4-Step Rag Doll Germination Test:'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#382E28]">
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6] flex items-start space-x-2">
            <span className="w-4 h-4 rounded-full bg-[#1E4D2B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <span>{lang === 'or' ? 'ବିହନ ବସ୍ତାରୁ ଅନ୍ଧାଧୁନିଆ ଭାବେ ୧୦୦ ଟି ଗୋଟା ବିହନ ବାଛନ୍ତୁ।' : 'Count exactly 100 random seeds from the seed bag.'}</span>
          </div>
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6] flex items-start space-x-2">
            <span className="w-4 h-4 rounded-full bg-[#1E4D2B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <span>{lang === 'or' ? 'ଏକ ଓଦା ସୂତା କପଡ଼ା ବା ଖବରକାଗଜ ଉପରେ ସମାନ ଦୂରତାରେ ସଜାନ୍ତୁ।' : 'Place seeds evenly on a moist cotton cloth / paper towel.'}</span>
          </div>
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6] flex items-start space-x-2">
            <span className="w-4 h-4 rounded-full bg-[#1E4D2B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <span>{lang === 'or' ? 'କପଡ଼ାକୁ ଗୁଡ଼ାଇ ଛାଇ ଜାଗାରେ ରଖି ପ୍ରତିଦିନ ପାଣି ଛିଞ୍ଚନ୍ତୁ।' : 'Roll the cloth gently and keep in shade for 4-5 days with daily water moistening.'}</span>
          </div>
          <div className="p-2 bg-[#FAFDF8] rounded-lg border border-[#E2EAD6] flex items-start space-x-2">
            <span className="w-4 h-4 rounded-full bg-[#1E4D2B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
            <span>{lang === 'or' ? '୫ମ ଦିନରେ କପଡ଼ା ଖୋଲି ସୁସ୍ଥ ଗଜା ବାହାରିଥିବା ବିହନ ଗଣନ୍ତୁ।' : 'Open on Day 5 and count all healthy sprouted seedlings.'}</span>
          </div>
        </div>
      </div>

      {/* Interactive Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ମୋଟ ପରୀକ୍ଷିତ ବିହନ ସଂଖ୍ୟା:' : 'Total Seeds Tested:'}
          </label>
          <input
            type="number"
            value={totalTested}
            onChange={(e) => setTotalTested(parseInt(e.target.value) || 1)}
            className="w-full text-xs sm:text-sm font-bold bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5A4D41] block mb-1">
            {lang === 'or' ? 'ଗଜା ହୋଇଥିବା ବିହନ ସଂଖ୍ୟା (Sprouted Seeds):' : 'Sprouted Healthy Seeds Count:'}
          </label>
          <input
            type="number"
            value={sproutedCount}
            onChange={(e) => setSproutedCount(parseInt(e.target.value) || 0)}
            className="w-full text-xs sm:text-sm font-bold bg-[#F8FAF5] border border-[#BAC8AA] rounded-lg px-2.5 py-1.5 text-[#2C221E]"
          />
        </div>
      </div>

      {/* Results & Quality Verdict */}
      <div className={`p-4 rounded-xl border-2 text-left space-y-2 shadow-2xs ${
        pctNum >= 85
          ? 'bg-[#F0FDF4] border-[#22C55E]'
          : pctNum >= 70
          ? 'bg-[#FEFCE8] border-[#EAB308]'
          : 'bg-[#FEF2F2] border-[#EF4444]'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#5A4D41] block">
              {lang === 'or' ? 'ଅଙ୍କୁରୋଦ୍ଗମ ହାର (Germination Rate):' : 'Calculated Germination %:'}
            </span>
            <p className="text-2xl font-extrabold text-[#2C221E]">
              {germinationPct} %
            </p>
          </div>

          <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
            pctNum >= 85
              ? 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]'
              : pctNum >= 70
              ? 'bg-[#FEF08A] text-[#854D0E] border-[#FDE047]'
              : 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]'
          }`}>
            {pctNum >= 85
              ? (lang === 'or' ? '✅ ଉତ୍କୃଷ୍ଟ ବିହନ (Approved)' : '✅ Excellent Quality')
              : pctNum >= 70
              ? (lang === 'or' ? '⚠️ ମଧ୍ୟମ ବିହନ (Adjust Rate)' : '⚠️ Moderate Quality')
              : (lang === 'or' ? '❌ ଅନୁପଯୁକ୍ତ ବିହନ (Reject Lot)' : '❌ Poor Quality — Reject Lot')}
          </span>
        </div>

        <p className="text-xs font-semibold leading-relaxed pt-1 text-[#2C221E]">
          {pctNum >= 85
            ? (lang === 'or' ? 'ପରାମର୍ଶ: ବିହନ ମାନ ଉତ୍ତମ। ସାଧାରଣ ସୁପାରିଶ ମାତ୍ରାରେ (ଏକର ପିଛା ୧୬-୨୦ କେଜି ଧାନ ବିହନ) ବୁଣନ କରନ୍ତୁ।' : 'Agronomic Action: Seed vigor is optimal. Proceed with standard recommended seed rate.')
            : pctNum >= 70
            ? (lang === 'or' ? 'ପରାମର୍ଶ: ଅଙ୍କୁରୋଦ୍ଗମ ହାର କମ୍ ଥିବାରୁ ଏକର ପିଛା ବିହନ ମାତ୍ରା ୧୫-୨୦% ବଢ଼ାଇ ବୁଣନ୍ତୁ।' : 'Agronomic Action: Germination is sub-optimal. Increase seed rate by 15-20% to compensate.')
            : (lang === 'or' ? 'ସତର୍କତା: ବିହନ ବୁଣିବା ଅନୁପଯୁକ୍ତ! ବିହନ କମ୍ପାନୀ ବା କୃଷି ବିଭାଗ ଡିଲରଙ୍କ ପାଖରେ ବିହନ ଆଇନ ଅଧୀନରେ ଫେରସ୍ତ ଦାବି କରନ୍ତୁ।' : 'Agronomic Action: Do NOT sow! Germination fails legal certification standards. Seek refund/replacement from your certified seed dealer.')}
        </p>
      </div>

    </div>
  );
}
