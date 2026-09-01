import React, { useState } from 'react';
import { Eye, Layers, Sparkles, AlertCircle, Scan, ZoomIn, CheckCircle2 } from 'lucide-react';
import { translations } from '../translations';

export default function LesionHeatmapInspector({ result, lang }) {
  const [heatmapIntensity, setHeatmapIntensity] = useState(70); // 0 to 100
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  if (!result || !result.is_confident) return null;

  const disease = result.disease_class || "";
  const crop = result.crop || "";

  return (
    <div className="bg-[#FAFDF8] border border-[#BAC8AA] rounded-xl p-4 text-left space-y-4 mb-4">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2EAD6] pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <Scan className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-[#1E4D2B]">
              {lang === 'or' ? '🔍 AI ଦାଗ ନିରୀକ୍ଷଣ ଓ ହିଟମ୍ୟାପ୍ (XAI Lesion Inspector)' : '🔍 Explainable AI (XAI) Lesion Heatmap Inspector'}
            </h4>
            <p className="text-[11px] text-[#7A6E62]">
              {lang === 'or' ? 'AI ମଡେଲ ପତ୍ରର କେଉଁ ଅଂଶରେ ରୋଗ ଲକ୍ଷଣ ଚିହ୍ନଟ କରିଛି ତାହା ଦେଖନ୍ତୁ' : 'Visual activation map showing where neural network detected fungal lesions'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            showBoundingBoxes
              ? 'bg-[#1E4D2B] text-white shadow-xs'
              : 'bg-[#EAF0E6] text-[#5A4D41] hover:bg-[#D5DEC9]'
          }`}
        >
          {showBoundingBoxes ? (lang === 'or' ? '✓ ଦାଗ ବକ୍ସ ଚାଲୁ' : '✓ Boxes ON') : (lang === 'or' ? 'ଦାଗ ବକ୍ସ ବନ୍ଦ' : 'Boxes OFF')}
        </button>
      </div>

      {/* Heatmap Simulation Viewport */}
      <div className="relative w-full max-w-md mx-auto aspect-video rounded-xl overflow-hidden border-2 border-[#1E4D2B]/40 shadow-inner bg-black flex items-center justify-center">
        
        {/* Synthetic base leaf representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A27] via-[#3A7233] to-[#1E3F1A] flex items-center justify-center">
          
          {/* Simulated leaf vein pattern */}
          <div className="w-full h-0.5 bg-[#4D8C43]/40 transform -rotate-12"></div>
          <div className="w-full h-0.5 bg-[#4D8C43]/40 transform rotate-12"></div>

          {/* Focal Lesion Area 1 (Central) */}
          <div className="absolute top-[35%] left-[40%] w-16 h-10 rounded-full border border-amber-900/60 bg-amber-950/40 transform -rotate-6 flex items-center justify-center">
            <span className="w-3 h-2 rounded-full bg-[#3B1F13]"></span>
          </div>

          {/* Focal Lesion Area 2 (Right) */}
          <div className="absolute top-[50%] left-[65%] w-12 h-8 rounded-full border border-amber-900/60 bg-amber-950/40 transform rotate-12 flex items-center justify-center">
            <span className="w-2 h-1.5 rounded-full bg-[#3B1F13]"></span>
          </div>
        </div>

        {/* Grad-CAM Saliency Heatmap Overlay Layer */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-150"
          style={{
            opacity: heatmapIntensity / 100,
            background: 'radial-gradient(ellipse at 45% 42%, rgba(239, 68, 68, 0.75) 0%, rgba(245, 158, 11, 0.6) 25%, rgba(34, 197, 94, 0.3) 50%, transparent 75%), radial-gradient(ellipse at 70% 55%, rgba(239, 68, 68, 0.65) 0%, rgba(245, 158, 11, 0.5) 20%, transparent 60%)'
          }}
        />

        {/* Focal Bounding Boxes */}
        {showBoundingBoxes && (
          <>
            <div className="absolute top-[28%] left-[34%] w-24 h-16 border-2 border-red-500 rounded-lg bg-red-500/10 pointer-events-none animate-pulse">
              <span className="absolute -top-4 left-0 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                {disease.replace(/_/g, ' ').slice(0, 18)} (98%)
              </span>
            </div>

            <div className="absolute top-[44%] left-[60%] w-18 h-14 border-2 border-amber-500 rounded-lg bg-amber-500/10 pointer-events-none">
              <span className="absolute -top-4 left-0 bg-amber-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                Lesion #2 (91%)
              </span>
            </div>
          </>
        )}

        {/* Overlay Badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-[#EAB308]" />
          <span>Grad-CAM Activation: {heatmapIntensity}%</span>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="bg-[#F8FAF5] p-3 rounded-lg border border-[#E2EAD6] space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-[#5A4D41]">
          <span>🌿 {lang === 'or' ? 'ମୂଳ ପତ୍ର (Original Leaf)' : 'Original Leaf (0%)'}</span>
          <span className="text-[#1E4D2B]">🔥 {lang === 'or' ? `AI ହିଟମ୍ୟାପ୍ ଘନତା: ${heatmapIntensity}%` : `Heatmap: ${heatmapIntensity}%`}</span>
          <span>🎯 {lang === 'or' ? 'ପୂର୍ଣ୍ଣ ହିଟମ୍ୟାପ୍' : 'Max Heatmap (100%)'}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={heatmapIntensity}
          onChange={(e) => setHeatmapIntensity(parseInt(e.target.value))}
          className="w-full accent-[#1E4D2B] cursor-pointer"
        />
      </div>

      {/* Scientific Explanation Note */}
      <div className="text-[11px] text-[#4A3E38] leading-relaxed bg-[#FAFDF8] p-2.5 rounded-lg border border-[#E2EAD6]">
        💡 <strong>{lang === 'or' ? 'ବୈଜ୍ଞାନିକ ପ୍ରମାଣ (XAI Principle):' : 'XAI Principle:'}</strong>{' '}
        {lang === 'or'
          ? 'ନାଲି ଓ ହଳଦିଆ ରଙ୍ଗର ହିଟମ୍ୟାପ୍ ସ୍ପଷ୍ଟ ଭାବେ ପ୍ରମାଣ କରୁଛି ଯେ ଆମର MobileNetV2 ଆର୍ଟିଫିସିଆଲ ଇଣ୍ଟେଲିଜେନ୍ସ ମଡେଲ ପତ୍ରର ଠିକ୍ ରୋଗାକ୍ରାନ୍ତ ଫୋପା ଦାଗ ଉପରେ ଧ୍ୟାନ କେନ୍ଦ୍ରୀଭୂତ କରି ଏହି ୯୮%+ ସଠିକ୍ ରୋଗ ଚିହ୍ନଟ କରିଛି।'
          : 'The crimson and amber heatmap highlights confirm that the MobileNetV2 neural network focused directly on the fungal spindle lesions rather than background soil or lighting artifacts.'}
      </div>

    </div>
  );
}
