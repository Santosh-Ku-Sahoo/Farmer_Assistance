import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, Sprout, RotateCcw, Clock, Volume2, VolumeX, FileText, Calculator, Calendar, Scan } from 'lucide-react';
import { translations } from '../translations';
import DosageCalculator from './DosageCalculator';
import PrescriptionModal from './PrescriptionModal';
import RecoveryTimeline from './RecoveryTimeline';
import LesionHeatmapInspector from './LesionHeatmapInspector';

export default function ResultCard({ result, onReset, lang }) {
  const t = translations[lang];
  const rec = result.recommendation;
  const confidencePercent = Math.round(result.confidence * 100);
  const isHealthy = result.disease_class.toLowerCase().includes('healthy');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('treatment'); // 'treatment' | 'calculator' | 'timeline' | 'heatmap'

  // Stop any active speech on unmount
  React.useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Severity color mapping
  const getSeverityBadge = () => {
    if (isHealthy) {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF0E6] text-[#1E4D2B] border border-[#2C6E3B]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{t.severity_none}</span>
        </span>
      );
    }
    if (rec?.severity === 'High') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#F87171]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{t.severity_high}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FBBF24]">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>{t.severity_medium}</span>
      </span>
    );
  };

  /**
   * Reads the diagnosis and immediate action aloud using browser Web Speech API
   */
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert(lang === 'or' ? 'ଆପଣଙ୍କ ବ୍ରାଉଜରରେ ଭଏସ୍ ସୁବିଧା ଉପଲବ୍ଧ ନାହିଁ।' : 'Speech synthesis not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = lang === 'or'
      ? `ଫସଲ: ${rec?.crop_odia || result.crop}। ଚିହ୍ନଟ ରୋଗ: ${rec?.disease_name_odia || result.disease_class}। ତୁରନ୍ତ ପଦକ୍ଷେପ: ${rec?.immediate_action_or || ''}`
      : `Crop: ${result.crop}. Diagnosis: ${rec?.disease_name || result.disease_class}. Immediate action: ${rec?.immediate_action_en || ''}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.lang = lang === 'or' ? 'hi-IN' : 'en-US'; // Odia uses Indic phonetics fallback

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl overflow-hidden card-shadow-lg text-left mb-6">
      
      {/* Header Banner */}
      <div className={`p-4 sm:p-5 border-b ${isHealthy ? 'bg-[#F2F7ED] border-[#D5DEC9]' : 'bg-[#FAF4EF] border-[#EADACF]'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-[#1E4D2B]" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#5A4D41]">
              {lang === 'or' ? rec?.crop_odia : result.crop}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Voice Narration Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center space-x-1 text-xs font-semibold px-2.5 ${
                isSpeaking
                  ? 'bg-[#8B3A2B] text-white border-[#8B3A2B] animate-pulse'
                  : 'bg-[#FDFCFA] text-[#1E4D2B] border-[#BAC8AA] hover:bg-[#EAF0E6]'
              }`}
              title="Listen aloud in native audio"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? (lang === 'or' ? 'ବନ୍ଦ' : 'Stop') : (lang === 'or' ? 'ଶୁଣନ୍ତୁ' : 'Listen')}</span>
            </button>

            {getSeverityBadge()}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C221E] tracking-tight">
          {lang === 'or' ? (rec?.disease_name_odia || result.disease_class) : (rec?.disease_name || result.disease_class)}
        </h2>
        
        {/* Confidence Meter */}
        <div className="mt-3 flex items-center space-x-3">
          <div className="flex-1 bg-[#E2EAD6] h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                confidencePercent >= 80 ? 'bg-[#1E4D2B]' : 'bg-[#D97706]'
              }`}
              style={{ width: `${confidencePercent}%` }}
            ></div>
          </div>
          <span className="text-xs font-bold text-[#2C221E] whitespace-nowrap">
            {t.confidence_label}: {confidencePercent}%
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        
        {/* Symptoms Section */}
        {rec && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6E62] mb-1.5 flex items-center space-x-1.5">
              <span>{t.symptoms_title}</span>
            </h4>
            <p className="text-sm text-[#382E28] leading-relaxed bg-[#F8FAF5] p-3 rounded-lg border border-[#E2EAD6]">
              {lang === 'or' ? rec.symptoms_or : rec.symptoms_en}
            </p>
          </div>
        )}

        {/* Immediate Field Action Box */}
        {rec && (
          <div className={`p-4 rounded-xl border ${
            isHealthy 
              ? 'bg-[#EAF0E6]/60 border-[#2C6E3B]/40 text-[#1E4D2B]' 
              : 'bg-[#FEF2F2] border-[#F87171] text-[#991B1B]'
          }`}>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>{t.immediate_title}</span>
            </h4>
            <p className="text-sm font-semibold leading-relaxed">
              {lang === 'or' ? rec.immediate_action_or : rec.immediate_action_en}
            </p>
          </div>
        )}

        {/* 1-Tap Agro-Shop Prescription Slip Button */}
        {!isHealthy && rec && (
          <div className="bg-[#FFFBEB] p-3.5 rounded-xl border border-[#FDE68A] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <strong className="text-xs sm:text-sm text-[#92400E] block">
                {lang === 'or' ? '🛒 କୀଟନାଶକ ଦୋକାନୀଙ୍କୁ ଦେଖାଇବା ପାଇଁ ପର୍ଚ୍ଚା' : '🛒 Retailer Prescription Slip'}
              </strong>
              <p className="text-[11px] text-[#78350F] mt-0.5">
                {lang === 'or' 
                  ? 'ଜେନେରିକ୍ କେମିକାଲ୍ ଫର୍ମୁଲା ଓ ବ୍ରାଣ୍ଡ ତାଲିକା ଏକ କ୍ଲିକରେ ଦେଖନ୍ତୁ।' 
                  : 'Exact generic active ingredient & brand names to show at the agrochemical shop.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPrescription(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg bg-[#D97706] text-white text-xs font-bold hover:bg-[#B45309] transition-colors shadow-xs cursor-pointer flex-shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'or' ? 'ପ୍ରେସକ୍ରିପସନ୍ ଖୋଲନ୍ତୁ' : 'Open Prescription'}</span>
            </button>
          </div>
        )}

        {/* Sub-Tabs: Treatment Steps | Dosage Calculator | Recovery Timeline */}
        {!isHealthy && rec && (
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 mb-3 p-1 bg-[#EAF0E6] rounded-xl border border-[#C8D4BA]">
              <button
                type="button"
                onClick={() => setActiveSubTab('treatment')}
                className={`py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                  activeSubTab === 'treatment'
                    ? 'bg-[#1E4D2B] text-white shadow-xs'
                    : 'text-[#5A4D41] hover:text-[#1E4D2B]'
                }`}
              >
                <span>{lang === 'or' ? 'ପ୍ରତିକାର' : 'IPM Steps'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('calculator')}
                className={`py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                  activeSubTab === 'calculator'
                    ? 'bg-[#1E4D2B] text-white shadow-xs'
                    : 'text-[#5A4D41] hover:text-[#1E4D2B]'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{lang === 'or' ? 'ଟାଙ୍କି ହିସାବ' : 'Calculator'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('timeline')}
                className={`py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                  activeSubTab === 'timeline'
                    ? 'bg-[#1E4D2B] text-white shadow-xs'
                    : 'text-[#5A4D41] hover:text-[#1E4D2B]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === 'or' ? '୭-ଦିନ କ୍ୟାଲେଣ୍ଡର' : 'Timeline'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('heatmap')}
                className={`py-1.5 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                  activeSubTab === 'heatmap'
                    ? 'bg-[#1E4D2B] text-white shadow-xs'
                    : 'text-[#5A4D41] hover:text-[#1E4D2B]'
                }`}
              >
                <Scan className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{lang === 'or' ? 'ଦାଗ ହିଟମ୍ୟାପ୍' : 'Heatmap'}</span>
              </button>
            </div>

            {/* Sub-Tab 1: Standard IPM Management Steps */}
            {activeSubTab === 'treatment' && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B] mb-2">
                  {t.treatment_title} (ICAR-NRRI & OUAT Guidelines)
                </h4>
                <div className="space-y-2">
                  {(lang === 'or' ? rec.management_or : rec.management_en).map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6] text-sm text-[#2C221E]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#1E4D2B] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Dosage & Spray Tank Calculator */}
            {activeSubTab === 'calculator' && (
              <DosageCalculator rec={rec} lang={lang} />
            )}

            {/* Sub-Tab 3: 7-Day Disease Recovery Timeline */}
            {activeSubTab === 'timeline' && (
              <RecoveryTimeline rec={rec} lang={lang} />
            )}

            {/* Sub-Tab 4: Explainable AI Lesion Heatmap Inspector */}
            {activeSubTab === 'heatmap' && (
              <LesionHeatmapInspector result={result} lang={lang} />
            )}
          </div>
        )}

        {/* Healthy Plant General Advice */}
        {isHealthy && rec && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B] mb-2">
              {t.treatment_title}
            </h4>
            <div className="space-y-2">
              {(lang === 'or' ? rec.management_or : rec.management_en).map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start space-x-3 p-3 rounded-lg bg-[#FAFDF8] border border-[#E2EAD6] text-sm text-[#2C221E]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1E4D2B] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#EAF0E6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#7A6E62]">
            {lang === 'or' 
              ? `ଗଣନା ସମୟ: ${result.inference_time_ms} ms (MobileNetV2)` 
              : `Inference time: ${result.inference_time_ms} ms (MobileNetV2)`}
          </span>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-[#1E4D2B] text-white text-sm font-semibold hover:bg-[#163B21] transition-colors shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.retake_photo}</span>
          </button>
        </div>

      </div>

      {/* Prescription Modal Popup */}
      {showPrescription && (
        <PrescriptionModal
          result={result}
          onClose={() => setShowPrescription(false)}
          lang={lang}
        />
      )}

    </div>
  );
}
