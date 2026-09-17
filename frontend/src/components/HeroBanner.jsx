import React, { useState, useEffect } from 'react';
import { Leaf, ShieldCheck, ChevronRight, ChevronLeft, PhoneCall, Sparkles, Award } from 'lucide-react';

const SLIDES = [
  {
    id: 'paddy_care',
    image: '/images/hero_farmer_paddy.jpg',
    tag_en: 'Govt of Odisha Krushak Model',
    tag_or: 'ଓଡ଼ିଶା ସରକାର କୃଷକ କଲ୍ୟାଣ ମଡେଲ',
    title_en: 'Empowering Odisha Farmers with AI Agrotechnology',
    title_or: 'ଆଧୁନିକ କୃଷି ପ୍ରଯୁକ୍ତିରେ ଓଡ଼ିଶାର କୃଷକ ସଶକ୍ତ',
    desc_en: 'Instant leaf disease diagnosis, scientific fertilizer dose, weather alerts, and direct government schemes for all 30 districts.',
    desc_or: 'ତୁରନ୍ତ ପତ୍ର ରୋଗ ଚିହ୍ନଟ, ବୈଜ୍ଞାନିକ ସାର ପ୍ରୟୋଗ, ପାଣିପାଗ ସତର୍କତା ଓ ସରକାରୀ ଯୋଜନାର ସିଧାସଳଖ ସୁବିଧା।',
    ctaTab: 'diagnosis',
    cta_en: 'Scan Crop Leaf Now',
    cta_or: 'ପତ୍ର ରୋଗ ପରୀକ୍ଷା କରନ୍ତୁ'
  },
  {
    id: 'smart_science',
    image: '/images/farmer_smart_field.jpg',
    tag_en: 'ICAR-NRRI & OUAT Calibrated',
    tag_or: 'ICAR-NRRI ଓ OUAT ବୈଜ୍ଞାନିକ ପ୍ରମାଣିତ',
    title_en: 'AI Diagnostics for Rice, Tomato & Potato',
    title_or: 'ଧାନ, ବିଲାତି ବାଇଗଣ ଓ ଆଳୁ ଫସଲର ସ୍ମାର୍ଟ ନିଦାନ',
    desc_en: 'Dual-model AI trained on thousands of certified field samples from Cuttack, Bargarh, and Sambalpur agro-climatic zones.',
    desc_or: 'କଟକ, ବରଗଡ଼ ଓ ସମ୍ବଲପୁର କୃଷି ଜଳବାୟୁ ଅଞ୍ଚଳର ହଜାର ହଜାର କ୍ଷେତ୍ର ନମୁନାରେ ପ୍ରମାଣିତ ଆର୍ଟିଫିସିଆଲ୍ ଇଣ୍ଟେଲିଜେନ୍ସ।',
    ctaTab: 'services',
    cta_en: 'Explore 18 Agri Tools',
    cta_or: '୧୮ ଟି କୃଷି ଟୁଲ୍ ଦେଖନ୍ତୁ'
  },
  {
    id: 'golden_harvest',
    image: '/images/hero_harvest.jpg',
    tag_en: 'Market Support & Direct Benefit',
    tag_or: 'ମଣ୍ଡି ସହାୟତା ଓ ସିଧାସଳଖ ଲାଭ (DBT)',
    title_en: 'Fair Mandi Prices & Instant Farmer Subsidies',
    title_or: 'ସୁନାର ଫସଲ, ଉଚିତ୍ ମଣ୍ଡି ଦର ଓ ସରକାରୀ ସହାୟତା',
    desc_en: 'Track live commodity rates across 30 RMCs and check eligibility for KALIA, PM-KISAN, and Soura Jalanidhi solar pump subsidies.',
    desc_or: '୩୦ ଟି ନିୟନ୍ତ୍ରିତ ବଜାରର ଦୈନିକ ମଣ୍ଡି ଦର ଓ କାଳିଆ, ପିଏମ୍-କିଷାନ ଏବଂ ସୌର ଜଳନିଧି ସବସିଡିର ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ।',
    ctaTab: 'schemes',
    cta_en: 'Check Govt Schemes',
    cta_or: 'ସରକାରୀ ଯୋଜନା ଯାଞ୍ଚ'
  }
];

export default function HeroBanner({ lang, onNavigateTab }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 6.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = SLIDES[currentSlide];

  return (
    <section 
      className="relative mb-6 sm:mb-8 rounded-2xl overflow-hidden border border-[#BAC8AA] shadow-md bg-[#15381F]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label={lang === 'or' ? "କୃଷକ ସହାୟତା ମୁଖ୍ୟ ବ୍ୟାନର" : "Farmer Assistance Hero Showcase"}
    >
      {/* Background Photography with Rich Gradient Overlay */}
      <div className="relative min-h-[290px] sm:min-h-[340px] md:min-h-[380px] w-full flex items-center">
        {SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={lang === 'or' ? s.title_or : s.title_en}
              className="w-full h-full object-cover object-center"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Multi-layer gradient for deep contrast and authentic Odisha aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C2413]/95 via-[#15381F]/85 sm:via-[#15381F]/70 to-black/30" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0C2413]/40 to-[#0C2413]/70" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-10 w-full p-5 sm:p-8 md:p-10 flex flex-col justify-between text-left">
          
          <div className="max-w-2xl">
            {/* Official Badge Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAF0E6]/20 backdrop-blur-md border border-[#BAC8AA]/40 text-[#86EFAC] text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
              <span>{lang === 'or' ? slide.tag_or : slide.tag_en}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-sm">
              {lang === 'or' ? slide.title_or : slide.title_en}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-[#D5DEC9] leading-relaxed mb-5 line-clamp-3 sm:line-clamp-none max-w-xl">
              {lang === 'or' ? slide.desc_or : slide.desc_en}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateTab(slide.ctaTab)}
                className="btn-primary !bg-[#D97706] hover:!bg-[#B45309] !text-white text-xs sm:text-sm py-2.5 px-5 font-bold rounded-xl shadow-md inline-flex items-center space-x-2 transition-all hover:scale-102"
              >
                <span>{lang === 'or' ? slide.cta_or : slide.cta_en}</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('helpline')}
                className="btn-tab text-xs sm:text-sm py-2.5 px-4 font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 inline-flex items-center space-x-1.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#86EFAC]" aria-hidden="true" />
                <span>{lang === 'or' ? '୧୫୫୩୩୩ ହେଲ୍ପଲାଇନ୍' : '155333 Toll-Free'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar on Bottom */}
          <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-white/90 text-[11px] sm:text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" aria-hidden="true" />
              <span className="font-semibold">{lang === 'or' ? '୩୦ ଜିଲ୍ଲା କଭରେଜ୍' : '30 Districts'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" aria-hidden="true" />
              <span className="font-semibold">{lang === 'or' ? 'OUAT/NRRI ପ୍ରମାଣିତ' : 'OUAT/NRRI Calibrated'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#60A5FA]" aria-hidden="true" />
              <span className="font-semibold">{lang === 'or' ? 'ତୁରନ୍ତ AI ନିଦାନ' : 'Instant AI Diagnosis'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C084FC]" aria-hidden="true" />
              <span className="font-semibold">{lang === 'or' ? '୧୦୦% ମାଗଣା ସେବା' : '100% Free Service'}</span>
            </div>
          </div>

        </div>

        {/* Carousel Navigation Dots & Controls */}
        <div className="absolute bottom-4 right-4 sm:right-6 z-20 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
            aria-label={lang === 'or' ? "ପୂର୍ବ ସ୍ଲାଇଡ୍" : "Previous slide"}
            className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex space-x-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-[#F59E0B]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
            aria-label={lang === 'or' ? "ପରବର୍ତ୍ତୀ ସ୍ଲାଇଡ୍" : "Next slide"}
            className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
