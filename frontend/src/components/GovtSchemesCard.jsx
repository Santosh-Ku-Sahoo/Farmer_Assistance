import React from 'react';
import { Landmark, Award, IndianRupee, FileCheck, ExternalLink, ShieldCheck } from 'lucide-react';
import { translations } from '../translations';

const SCHEMES = [
  {
    name_en: "KALIA Scheme (Govt of Odisha)",
    name_or: "କାଳିଆ ଯୋଜନା (ଓଡ଼ିଶା ସରକାର)",
    benefit_en: "₹10,000 / year (₹5000 in Kharif + ₹5000 in Rabi)",
    benefit_or: "ବାର୍ଷିକ ₹୧୦,୦୦୦ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ (ଖରିଫ ଓ ରବି)",
    eligibility_en: "Small and marginal farmers, landless agricultural households in Odisha.",
    eligibility_or: "କ୍ଷୁଦ୍ର, ନାମମାତ୍ର ଏବଂ ଭୂମିହୀନ କୃଷକ ପରିବାର।",
    documents_en: "Aadhaar Card, Bank Passbook linked to Aadhaar, Ration Card.",
    documents_or: "ଆଧାର କାର୍ଡ, ବ୍ୟାଙ୍କ ପାସବହି, ରାସନ କାର୍ଡ।"
  },
  {
    name_en: "PM-KISAN (Govt of India)",
    name_or: "ପିଏମ କିଷାନ ସମ୍ମାନ ନିଧି (ଭାରତ ସରକାର)",
    benefit_en: "₹6,000 / year (3 installments of ₹2,000 via DBT)",
    benefit_or: "ବାର୍ଷିକ ₹୬,୦୦୦ (୩ ଟି କିସ୍ତିରେ ₹୨,୦୦୦ ଲେଖାଏଁ)",
    eligibility_en: "All landholding farmer families across India.",
    eligibility_or: "ସମସ୍ତ ଜମି ଥିବା କୃଷକ ପରିବାର।",
    documents_en: "eKYC, Land RoR (Patta), Aadhaar Card.",
    documents_or: "ଜମି ପଟ୍ଟା, ଇ-କେୱାଇସି, ଆଧାର କାର୍ଡ।"
  },
  {
    name_en: "Odisha Seed & Fertilizer DBT Subsidy (Agri-DBT)",
    name_or: "ଡିବିଟି ବିହନ ଓ ଯନ୍ତ୍ରପାତି ରିହାତି (Agri-DBT Odisha)",
    benefit_en: "50% to 75% subsidy on certified paddy, pulse & vegetable seeds.",
    benefit_or: "ପ୍ରମାଣିତ ବିହନ ଉପରେ ୫୦% ରୁ ୭୫% ପର୍ଯ୍ୟନ୍ତ ସରକାରୀ ରିହାତି।",
    eligibility_en: "Registered farmers on Krushak Odisha portal.",
    eligibility_or: "କୃଷକ ଓଡ଼ିଶା ପୋର୍ଟାଲରେ ପଞ୍ଜୀକୃତ କୃଷକ।",
    documents_en: "Farmer ID (Krushak Odisha), Aadhaar.",
    documents_or: "କୃଷକ ଆଇଡି (Krushak Odisha ID) ଏବଂ ଆଧାର।"
  },
  {
    name_en: "Soura Jalanidhi (Solar Irrigation Pump Subsidy)",
    name_or: "ସୌର ଜଳନିଧି ଯୋଜନା (ସୋଲାର ପମ୍ପ ରିହାତି)",
    benefit_en: "Up to 90% subsidy for 0.5 HP solar pumps for small farmers.",
    benefit_or: "କ୍ଷୁଦ୍ର ଚାଷୀଙ୍କ ପାଇଁ ସୌର ପମ୍ପ ଉପରେ ୯୦% ପର୍ଯ୍ୟନ୍ତ ରିହାତି।",
    eligibility_en: "Farmers having minimum 0.5 acre cultivable land and borewell/dugwell.",
    eligibility_or: "ଅତି କମରେ ୦.୫ ଏକର ଜମି ଓ ପାଣି ଉତ୍ସ ଥିବା ଚାଷୀ।",
    documents_en: "Land record, Bank details, Caste certificate (for SC/ST).",
    documents_or: "ଜମି ପଟ୍ଟା, ବ୍ୟାଙ୍କ ବିବରଣୀ, ଜାତି ପ୍ରମାଣପତ୍ର।"
  }
];

export default function GovtSchemesCard({ lang }) {
  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'କୃଷକ ସରକାରୀ ଯୋଜନା ଓ ସହାୟତା ମାର୍ଗଦର୍ଶିକା' : 'Odisha Govt Farmer Schemes & Subsidies'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ସରକାରୀ ଆର୍ଥିକ ସହାୟତା, ବିହନ ରିହାତି ଏବଂ ସୋଲାର ପମ୍ପ ଯୋଜନା' : 'Official direct benefit transfers, certified seed subsidies & solar irrigation grants'}
            </p>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="space-y-3">
        {SCHEMES.map((scheme, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#FAFDF8] border border-[#BAC8AA] shadow-2xs space-y-2">
            
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <strong className="text-xs sm:text-sm text-[#1E4D2B] font-extrabold">
                {lang === 'or' ? scheme.name_or : scheme.name_en}
              </strong>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA]">
                {lang === 'or' ? scheme.benefit_or : scheme.benefit_en}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-[#FDFCFA] p-2 rounded-lg border border-[#E2EAD6]">
                <span className="text-[10px] font-bold text-[#7A6E62] block uppercase">
                  {lang === 'or' ? 'ଯୋଗ୍ୟତା (Eligibility):' : 'Eligibility:'}
                </span>
                <p className="text-[#382E28] mt-0.5">
                  {lang === 'or' ? scheme.eligibility_or : scheme.eligibility_en}
                </p>
              </div>

              <div className="bg-[#FDFCFA] p-2 rounded-lg border border-[#E2EAD6]">
                <span className="text-[10px] font-bold text-[#7A6E62] block uppercase">
                  {lang === 'or' ? 'ଦରକାରୀ କାଗଜପତ୍ର (Documents):' : 'Required Documents:'}
                </span>
                <p className="text-[#382E28] mt-0.5">
                  {lang === 'or' ? scheme.documents_or : scheme.documents_en}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
