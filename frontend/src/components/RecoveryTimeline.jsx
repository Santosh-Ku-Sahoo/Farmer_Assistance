import React from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { translations } from '../translations';

export default function RecoveryTimeline({ rec, lang }) {
  const t = translations[lang];
  if (!rec || rec.severity === 'None') return null;

  const steps = [
    {
      day: lang === 'or' ? 'ଦିନ ୧' : 'Day 1',
      title: lang === 'or' ? 'ସିଞ୍ଚନ ଦିବସ (Spray Day)' : 'Spray Application',
      desc: lang === 'or' ? (rec.recovery_day_1_or || rec.immediate_action_or) : (rec.recovery_day_1_en || rec.immediate_action_en),
      badgeColor: 'bg-[#1E4D2B] text-white',
      borderColor: 'border-[#1E4D2B]'
    },
    {
      day: lang === 'or' ? 'ଦିନ ୩–୪' : 'Day 3–4',
      title: lang === 'or' ? 'ଲକ୍ଷଣ ଯାଞ୍ଚ (Monitoring)' : 'Lesion Arrest Check',
      desc: lang === 'or' ? (rec.recovery_day_3_or || 'ରୋଗ ଦାଗ ଶୁଖିଯିବା ଓ ହଳଦିଆ ଧାର ବନ୍ଦ ହେବା ଲକ୍ଷ୍ୟ କରନ୍ତୁ।') : (rec.recovery_day_3_en || 'Active lesion margins should stop expanding and turn dark/dry.'),
      badgeColor: 'bg-[#D97706] text-white',
      borderColor: 'border-[#D97706]'
    },
    {
      day: lang === 'or' ? 'ଦିନ ୭–୧୦' : 'Day 7–10',
      title: lang === 'or' ? 'ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ (Follow-up)' : 'Follow-up & Nutrient Boost',
      desc: lang === 'or' ? (rec.recovery_day_7_or || 'ନୂଆ ପତ୍ର ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଆବଶ୍ୟକ ହେଲେ ଦ୍ୱିତୀୟ ଥର ସ୍ପ୍ରେ କରନ୍ତୁ।') : (rec.recovery_day_7_en || 'Inspect newly emerged foliage. Rotate to secondary fungicide if weather remains humid.'),
      badgeColor: 'bg-[#8B3A2B] text-white',
      borderColor: 'border-[#8B3A2B]'
    }
  ];

  return (
    <div className="bg-[#FAFDF8] border border-[#C8D4BA] rounded-xl p-4 sm:p-5 text-left card-shadow">
      <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-[#E2EAD6]">
        <Calendar className="w-4 h-4 text-[#1E4D2B]" />
        <h4 className="text-xs sm:text-sm font-bold text-[#1E4D2B] uppercase tracking-wide">
          {lang === 'or' ? '୭-ଦିନିଆ ରୋଗ ନିୟନ୍ତ୍ରଣ ଓ ଯାଞ୍ଚ କ୍ୟାଲେଣ୍ଡର' : '7-Day Disease Recovery & Action Timeline'}
        </h4>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#BAC8AA]">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            {/* Timeline node */}
            <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full ${step.badgeColor} flex items-center justify-center text-[10px] font-bold shadow-xs`}>
              {idx + 1}
            </div>

            <div className="bg-[#FDFCFA] p-3 rounded-lg border border-[#E2EAD6] shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-[#2C221E]">
                  {step.title}
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#EAF0E6] text-[#1E4D2B]">
                  {step.day}
                </span>
              </div>
              <p className="text-xs text-[#4A3E38] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
