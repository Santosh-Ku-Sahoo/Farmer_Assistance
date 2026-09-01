import React from 'react';
import { FileText, X, CheckCircle, Store, ShieldCheck, Printer, Download, Sparkles, Share2, MessageCircle } from 'lucide-react';
import { translations } from '../translations';

export default function PrescriptionModal({ result, onClose, lang }) {
  const t = translations[lang];
  const rec = result?.recommendation;

  if (!rec) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const cropName = lang === 'or' ? rec.crop_odia : result.crop;
    const diseaseName = lang === 'or' ? rec.disease_name_odia : result.disease_class;
    const chemical = rec.generic_active_ingredient || rec.disease_name;
    const dosage = `${rec.dosage_per_liter_g_ml} ${rec.dosage_unit || 'g'}/Liter`;
    const brands = rec.common_market_names ? rec.common_market_names.join(', ') : 'Standard Generic';

    const message = lang === 'or'
      ? `🌾 *AI କୃଷକ ସହାୟକ - କୀଟନାଶକ ପ୍ରେସକ୍ରିପସନ୍ ପର୍ଚ୍ଚା*\n` +
        `----------------------------------------\n` +
        `🌱 *ଫସଲ:* ${cropName}\n` +
        `🦠 *ଚିହ୍ନଟ ରୋଗ:* ${diseaseName}\n` +
        `🧪 *ଅନୁମୋଦିତ ରାସାୟନିକ ଫର୍ମୁଲା:* ${chemical}\n` +
        `⚖️ *ପ୍ରୟୋଗ ମାତ୍ରା:* ${dosage}\n` +
        `🏷️ *ଓଡ଼ିଶା ବଜାର ବ୍ରାଣ୍ଡ:* ${brands}\n` +
        `----------------------------------------\n` +
        `📌 *ପରାମର୍ଶ:* ICAR-NRRI & OUAT ମାନକ ଅନୁଯାୟୀ।`
      : `🌾 *AI Farmer Assistant - Agro-Shop Prescription Slip*\n` +
        `----------------------------------------\n` +
        `🌱 *Crop:* ${cropName}\n` +
        `🦠 *Diagnosed Disease:* ${diseaseName}\n` +
        `🧪 *Active Formulation:* ${chemical}\n` +
        `⚖️ *Application Dosage:* ${dosage}\n` +
        `🏷️ *Market Trade Names:* ${brands}\n` +
        `----------------------------------------\n` +
        `📌 *Standard:* Verified ICAR-NRRI & OUAT IPM Recommendation.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      
      {/* Slip Card */}
      <div className="bg-[#FDFCFA] border-2 border-[#1E4D2B] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-left">
        
        {/* Header */}
        <div className="bg-[#1E4D2B] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#2C6E3B] rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                {lang === 'or' ? 'କୀଟନାଶକ ଦୋକାନ ପ୍ରେସକ୍ରିପସନ୍ ପର୍ଚ୍ଚା' : 'Agro-Shop Prescription Slip'}
              </h3>
              <p className="text-[11px] text-[#D5DEC9]">
                ICAR-NRRI & OUAT Verified Prescription
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#D5DEC9] hover:text-white hover:bg-[#2C6E3B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prescription Body */}
        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
          
          {/* Note to Dealer */}
          <div className="bg-[#FFFBEB] p-3 rounded-lg border border-[#FDE68A] flex items-start space-x-2 text-[#78350F]">
            <Store className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs leading-relaxed">
              <strong>{lang === 'or' ? 'ଦୋକାନୀଙ୍କ ପାଇଁ ସୂଚନା:' : 'Notice for Retailer:'}</strong>{' '}
              {lang === 'or' 
                ? 'ଦୟାକରି କେବଳ ନିମ୍ନଲିଖିତ ଜେନେରିକ୍ ଫର୍ମୁଲା ବା ସମତୁଲ୍ୟ ଅନୁମୋଦିତ ବ୍ରାଣ୍ଡ ପ୍ରଦାନ କରନ୍ତୁ।'
                : 'Please dispense only the verified active generic formulation or approved equivalent.'}
            </p>
          </div>

          {/* Diagnosed Crop & Disease */}
          <div className="grid grid-cols-2 gap-2 bg-[#F8FAF5] p-3 rounded-lg border border-[#E2EAD6]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7A6E62] block">
                {t.crop_label}
              </span>
              <strong className="text-xs sm:text-sm text-[#2C221E]">
                {lang === 'or' ? rec.crop_odia : result.crop}
              </strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7A6E62] block">
                {t.disease_label}
              </span>
              <strong className="text-xs sm:text-sm text-[#B91C1C]">
                {lang === 'or' ? rec.disease_name_odia : result.disease_class}
              </strong>
            </div>
          </div>

          {/* Prescribed Active Ingredient Formulation */}
          <div className="p-3.5 bg-[#EAF0E6]/60 rounded-xl border border-[#2C6E3B]/40">
            <span className="text-[10px] uppercase font-extrabold text-[#1E4D2B] tracking-wider block mb-1">
              {lang === 'or' ? 'ଅନୁମୋଦିତ ରାସାୟନିକ ଫର୍ମୁଲା (Active Ingredient)' : 'Prescribed Generic Formulation:'}
            </span>
            <p className="text-sm sm:text-base font-extrabold text-[#1E4D2B]">
              {rec.generic_active_ingredient || rec.disease_name}
            </p>
            <p className="text-xs text-[#382E28] font-semibold mt-1">
              {lang === 'or' ? 'ପ୍ରୟୋଗ ମାତ୍ରା:' : 'Application Dosage:'}{' '}
              <span className="text-[#8B3A2B] font-bold">{rec.dosage_per_liter_g_ml} {rec.dosage_unit || 'g'}/Liter</span>
            </p>
          </div>

          {/* Common Market Brands (Odisha Dealers) */}
          {rec.common_market_names && rec.common_market_names.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7A6E62] block mb-1.5">
                {lang === 'or' ? 'ଓଡ଼ିଶା ବଜାରରେ ଉପଲବ୍ଧ ପ୍ରମୁଖ ବ୍ରାଣ୍ଡ (Market Trade Names):' : 'Common Brand Names in Odisha Mandis:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {rec.common_market_names.map((name, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#F2F7ED] text-[#1E4D2B] border border-[#BAC8AA] text-xs font-bold"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Adjuvant instruction */}
          <div className="bg-[#FAFDF8] p-2.5 rounded-lg border border-[#E2EAD6] text-[11px] text-[#4A3E38]">
            <p>
              💡 <strong>{lang === 'or' ? 'ବିଶେଷ ପରାମର୍ଶ:' : 'Adjuvant Note:'}</strong>{' '}
              {lang === 'or' 
                ? 'ଔଷଧ ସହିତ ସ୍ପ୍ରେଡର୍ / ଅଠା (Sticker 0.5 ml/L) ମିଶାନ୍ତୁ ଯାହା ଫଳରେ ଔଷଧ ଧୋଇ ହୋଇଯିବ ନାହିଁ।'
                : 'Mix agricultural spreader/sticker (0.5 ml/L) to enhance leaf adhesion in humid weather.'}
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#F8FAF5] border-t border-[#EAF0E6] flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>{lang === 'or' ? 'ହ୍ୱାଟ୍ସଆପ୍‌ରେ ପଠାନ୍ତୁ' : 'Share on WhatsApp'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg bg-[#1E4D2B] text-white text-xs font-bold hover:bg-[#163B21] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'or' ? 'ପ୍ରିଣ୍ଟ' : 'Print'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-[#EAF0E6] text-[#2C221E] text-xs font-semibold hover:bg-[#D5DEC9] transition-colors cursor-pointer"
            >
              {lang === 'or' ? 'ବନ୍ଦ' : 'Close'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
