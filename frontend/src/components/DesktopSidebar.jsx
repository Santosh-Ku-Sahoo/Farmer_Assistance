import React from 'react';
import { Phone, Sparkles, ArrowRight, Leaf } from 'lucide-react';

const CROP_GALLERY = [
  {
    id: 'rice_blast',
    file: 'rice_blast.jpg',
    crop_en: 'Rice',
    crop_or: 'ଧାନ',
    disease_en: 'Leaf Blast',
    disease_or: 'ମହିଷା ରୋଗ',
    badge_en: 'Spindle lesions with grey centers',
    badge_or: 'ଧୂସର କେନ୍ଦ୍ର ବିଶିଷ୍ଟ ଡଙ୍ଗା ଆକାରର ଦାଗ',
    severity: 'High'
  },
  {
    id: 'rice_brown_spot',
    file: 'rice_brown_spot.jpg',
    crop_en: 'Rice',
    crop_or: 'ଧାନ',
    disease_en: 'Brown Spot',
    disease_or: 'ବାଦାମୀ ଦାଗ ରୋଗ',
    badge_en: 'Oval dark brown spots with yellow halo',
    badge_or: 'ହଳଦିଆ ବଳୟ ଥିବା ବାଦାମୀ ଦାଗ',
    severity: 'Medium'
  },
  {
    id: 'tomato_early_blight',
    file: 'tomato_early_blight.jpg',
    crop_en: 'Tomato',
    crop_or: 'ବିଲାତି ବାଇଗଣ',
    disease_en: 'Early Blight',
    disease_or: 'ଆଗୁଆ ଝାଉଁଳା ରୋଗ',
    badge_en: 'Concentric target rings on lower leaves',
    badge_or: 'ତଳ ପତ୍ରରେ ଟାର୍ଗେଟ୍ ଭଳି ଗୋଲାକାର ଚକଡ଼ା',
    severity: 'High'
  },
  {
    id: 'potato_late_blight',
    file: 'potato_late_blight.jpg',
    crop_en: 'Potato',
    crop_or: 'ଆଳୁ',
    disease_en: 'Late Blight',
    disease_or: 'ପଛୁଆ ମଡ଼କ ରୋଗ',
    badge_en: 'Water-soaked black lesions with white mold',
    badge_or: 'ପାଣିଚିଆ କଳା ଦାଗ ଓ ଧଳା ଫିମ୍ପି',
    severity: 'High'
  }
];

export default function DesktopSidebar({ lang, onSelectSample }) {
  return (
    <aside className="space-y-5 text-left" aria-label={lang === 'or' ? "କୃଷି ସନ୍ଦର୍ଭ ସୂଚନା" : "Agricultural Reference Gallery"}>
      
      {/* Official Odisha Farmer Field Advisory Card with Real Photo */}
      <div className="bg-[#FAFDF8] border border-[#BAC8AA] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#1E4D2B] flex-shrink-0 shadow-xs">
            <img
              src="/images/farmer_portrait.jpg"
              alt="Odisha Farmer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1E4D2B]">
                {lang === 'or' ? 'ଓଡ଼ିଶା କ୍ଷେତ୍ର ପରାମର୍ଶ' : 'State Agronomy Desk'}
              </h3>
              <span className="text-[9px] font-bold bg-[#86EFAC]/30 text-[#166534] px-2 py-0.5 rounded-full border border-[#86EFAC]/60">
                {lang === 'or' ? 'ସକ୍ରିୟ ଋତୁ' : 'Active Season'}
              </span>
            </div>
            <p className="text-[11px] text-[#4A3E38] mt-0.5 leading-snug">
              {lang === 'or'
                ? 'ବର୍ତ୍ତମାନ ଖରିଫ ଓ ରବି ଋତୁରେ ଧାନ ମହିଷା ଓ ପୋକ ସମସ୍ୟା ଦେଖାଦେଲେ ତୁରନ୍ତ ଫଟୋ ଉଠାଇ ଯାଞ୍ଚ କରନ୍ତୁ।'
                : 'Rice blast and bacterial blight risk elevated during humid weather. Upload early leaves for prompt intervention.'}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Disease Pathology Reference Gallery */}
      <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-5 card-shadow">
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#EAF0E6]">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#EAF0E6] flex items-center justify-center text-[#1E4D2B]">
              <Leaf className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2C221E]">
                {lang === 'or' ? 'ପ୍ରମୁଖ ଫସଲ ରୋଗ ଗ୍ୟାଲେରୀ' : 'Crop Disease Reference Gallery'}
              </h3>
              <p className="text-[11px] text-[#7A6E62]">
                {lang === 'or' ? 'ନମୁନା ଫଟୋ କ୍ଲିକ୍ କରି ତୁରନ୍ତ ଟେଷ୍ଟ କରନ୍ତୁ' : 'Click any photo to test instant diagnosis'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EAF0E6] text-[#1E4D2B]">
            {lang === 'or' ? 'ଓଡ଼ିଶା କ୍ଷେତ୍ର' : 'Odisha Field'}
          </span>
        </div>

        {/* 2x2 Visual Cards with Real Leaves */}
        <div className="grid grid-cols-2 gap-3">
          {CROP_GALLERY.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSample(item.file)}
              className="group flex flex-col rounded-xl border border-[#BAC8AA]/80 bg-[#FAFDF8] hover:border-[#1E4D2B] hover:shadow-md transition-all text-left overflow-hidden cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#2C221E]/10">
                <img
                  src={`/samples/${item.file}`}
                  alt={lang === 'or' ? `${item.crop_or} - ${item.disease_or}` : `${item.crop_en} - ${item.disease_en}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded text-white ${
                  item.severity === 'High' ? 'bg-[#B91C1C]' : 'bg-[#D97706]'
                }`}>
                  {item.severity === 'High' ? (lang === 'or' ? 'ତୀବ୍ର' : 'High') : (lang === 'or' ? 'ମଧ୍ୟମ' : 'Medium')}
                </span>
                <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded backdrop-blur-xs font-semibold">
                  {lang === 'or' ? item.crop_or : item.crop_en}
                </span>
              </div>

              {/* Text */}
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#2C221E] group-hover:text-[#1E4D2B] transition-colors leading-tight">
                    {lang === 'or' ? item.disease_or : item.disease_en}
                  </h4>
                  <p className="text-[10px] text-[#7A6E62] mt-1 line-clamp-2 leading-relaxed">
                    {lang === 'or' ? item.badge_or : item.badge_en}
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-[#EAF0E6] flex items-center justify-between text-[10px] font-bold text-[#1E4D2B]">
                  <span>{lang === 'or' ? 'ପରୀକ୍ଷା କରନ୍ତୁ' : 'Test Sample'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Photography & Inspection Guide Banner */}
      <div className="bg-gradient-to-br from-[#1E4D2B] to-[#15381F] text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#86EFAC]" aria-hidden="true" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#86EFAC]">
            {lang === 'or' ? 'ଫଟୋ ଉଠାଇବାର ଉତ୍ତମ ନିୟମ' : 'Best Photography Practices'}
          </h3>
        </div>
        <p className="text-xs text-[#D5DEC9] leading-relaxed mb-3">
          {lang === 'or'
            ? '୯୫% ସଠିକ୍ ପରିଣାମ ପାଇଁ ପ୍ରଭାବିତ ପତ୍ରକୁ ସୂର୍ଯ୍ୟାଲୋକରେ ସ୍ପଷ୍ଟ ଭାବେ ରଖନ୍ତୁ। ପତ୍ରର ଉଭୟ ଉପର ଏବଂ ତଳ ପାର୍ଶ୍ୱ ନିରୀକ୍ଷଣ କରନ୍ତୁ।'
            : 'For >95% accuracy, photograph the infected lesion in bright natural daylight. Inspect both top and underside of the leaf.'}
        </p>
        <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#2C6E3B]/60 text-[#BAC8AA]">
          <div className="flex items-center space-x-1.5">
            <span className="text-[#86EFAC]" aria-hidden="true">✓</span>
            <span>{lang === 'or' ? '୧୫-୨୦ ସେମି ଦୂରତା' : '15-20cm distance'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[#86EFAC]" aria-hidden="true">✓</span>
            <span>{lang === 'or' ? 'ସ୍ୱଚ୍ଛ ଦିନର ଆଲୋକ' : 'Natural daylight'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[#86EFAC]" aria-hidden="true">✓</span>
            <span>{lang === 'or' ? 'ଏକକ ପତ୍ର ଫୋକସ୍' : 'Single leaf focus'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[#86EFAC]" aria-hidden="true">✓</span>
            <span>{lang === 'or' ? 'ଦାଗ କେନ୍ଦ୍ରୀଭୂତ' : 'Centered lesions'}</span>
          </div>
        </div>
      </div>

      {/* Emergency Assistance Quick Card */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 text-[#92400E]">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-[#FEF3C7] text-[#B45309] flex-shrink-0 mt-0.5" aria-hidden="true">
            <Phone className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-[#92400E]">
              {lang === 'or' ? 'ଜରୁରୀ କୃଷି ପରାମର୍ଶ ଲୋଡ଼ା କି?' : 'Need Urgent Agronomic Help?'}
            </h4>
            <p className="text-[11px] text-[#78350F] mt-0.5 leading-relaxed">
              {lang === 'or'
                ? 'କଲ୍ କରନ୍ତୁ ଆମ କୃଷି ଓଡ଼ିଶା ଟୋଲ୍-ଫ୍ରୀ ହେଲ୍ପଲାଇନ୍:'
                : 'Call Govt of Odisha Toll-Free Ama Krushi line:'}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <a
                href="tel:155333"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1E4D2B] text-white text-xs font-bold hover:bg-[#163B21] transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>155333 (Toll Free)</span>
              </a>
              <span className="text-[10px] text-[#78350F]">
                {lang === 'or' ? '୬:୦୦ AM - ୧୦:୦୦ PM' : '6 AM - 10 PM'}
              </span>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}