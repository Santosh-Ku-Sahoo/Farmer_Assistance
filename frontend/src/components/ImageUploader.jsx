import React, { useRef, useState } from 'react';
import { Camera, Upload, RefreshCw, Sparkles, Image as ImageIcon, CheckCircle, Zap } from 'lucide-react';
import { translations } from '../translations';

export default function ImageUploader({ 
  onImageSelected, 
  previewUrl, 
  onReset, 
  isLoading, 
  lang, 
  onSelectSample 
}) {
  const t = translations[lang];
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  /**
   * Resizes image on client canvas before sending to save 4G bandwidth.
   * Compresses large phone photos (3-12MB) to ~150KB while retaining 800px lesion clarity.
   */
  const processAndEmitFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const optimizedFile = new File([blob], file.name || 'capture.jpg', { type: 'image/jpeg' });
          const preview = URL.createObjectURL(blob);
          onImageSelected(optimizedFile, preview);
        }, 'image/jpeg', 0.85);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processAndEmitFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndEmitFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow mb-6">
      
      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Box / Image Preview */}
      {!previewUrl ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-5 sm:p-7 text-center transition-colors ${
            dragActive
              ? 'border-[#1E4D2B] bg-[#F1F6EC]'
              : 'border-[#C8D4BA] bg-[#FBFDF9] hover:border-[#1E4D2B]'
          }`}
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-[#EAF0E6] flex items-center justify-center text-[#1E4D2B] mb-2.5 shadow-2xs">
            <Camera className="w-6 h-6" />
          </div>

          <p className="text-sm sm:text-base font-bold text-[#2C221E] mb-1">
            {lang === 'or' ? 'ପତ୍ରର ଫଟୋ ଉଠାନ୍ତୁ ବା ଅପଲୋଡ୍ କରନ୍ତୁ' : 'Capture or Upload Leaf Photo'}
          </p>
          <p className="text-xs text-[#7A6E62] mb-4 max-w-sm mx-auto leading-relaxed">
            {lang === 'or' 
              ? 'ଫୋନ୍ କ୍ୟାମେରା ବ୍ୟବହାର କରନ୍ତୁ କିମ୍ବା ତଳେ ଥିବା ପରୀକ୍ଷଣ ନମୁନା କ୍ଲିକ୍ କରନ୍ତୁ' 
              : 'Take a picture or click one of the quick test samples below'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-5">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-[#1E4D2B] text-white text-xs sm:text-sm font-bold hover:bg-[#163B21] transition-colors shadow-sm cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{t.take_photo}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-[#FDFCFA] text-[#2C221E] border border-[#BAC8AA] text-xs sm:text-sm font-bold hover:bg-[#EAF0E6] transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#5A4D41]" />
              <span>{t.upload_photo}</span>
            </button>
          </div>

          {/* Test Sample Quick Buttons */}
          <div className="pt-3.5 border-t border-[#EAF0E6] bg-[#FAFDF8] -mx-5 -mb-5 p-3.5 rounded-b-xl">
            <div className="flex items-center justify-center space-x-1 text-[11px] font-bold uppercase tracking-wider text-[#1E4D2B] mb-2">
              <Zap className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{lang === 'or' ? 'ଶୀଘ୍ର ପରୀକ୍ଷଣ ନମୁନା (1-Click Test Samples):' : 'Instant 1-Click Test Samples:'}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => onSelectSample('rice_blast.jpg')}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#EAF0E6] text-[#1E4D2B] hover:bg-[#D5DEC9] border border-[#BAC8AA] font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1"
              >
                <span>🌾 {lang === 'or' ? 'ଧାନ ପତ୍ର ମହିଷା (Rice Blast)' : 'Rice Blast'}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectSample('tomato_early_blight.jpg')}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#EAF0E6] text-[#1E4D2B] hover:bg-[#D5DEC9] border border-[#BAC8AA] font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1"
              >
                <span>🍅 {lang === 'or' ? 'ଟମାଟୋ ଆଗୁଆ ଝାଉଁଳା' : 'Tomato Early Blight'}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectSample('potato_late_blight.jpg')}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#EAF0E6] text-[#1E4D2B] hover:bg-[#D5DEC9] border border-[#BAC8AA] font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1"
              >
                <span>🥔 {lang === 'or' ? 'ଆଳୁ ପଛୁଆ ପତ୍ରପୋଡ଼ା' : 'Potato Late Blight'}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectSample('unclear_photo.jpg')}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] border border-[#FCD34D] font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1"
                title="Test low-confidence retake guidance"
              >
                <span>⚠️ {lang === 'or' ? 'ଅସ୍ପଷ୍ଟ ଫଟୋ (Retake State)' : 'Unclear Photo'}</span>
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* Preview View with Reticle & Status */
        <div className="relative rounded-xl overflow-hidden bg-[#2C221E] border border-[#443831]">
          <div className="aspect-square sm:aspect-video w-full max-h-80 relative flex items-center justify-center overflow-hidden bg-black/40">
            <img
              src={previewUrl}
              alt="Leaf capture preview"
              className="object-contain w-full h-full max-h-80"
            />
            
            {/* Visual crop viewfinder reticle */}
            <div className="absolute inset-4 border-2 border-white/40 rounded-lg pointer-events-none flex items-center justify-center">
              <div className="w-10 h-10 border border-white/60 rounded-full"></div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-[#2C221E]/80 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-[#86EFAC] mb-2" />
                <p className="text-sm font-semibold text-white">
                  {t.analyzing}
                </p>
                <p className="text-xs text-[#D5DEC9] mt-0.5">
                  {t.analyzing_sub}
                </p>
              </div>
            )}
          </div>

          {/* Change Photo Button */}
          {!isLoading && (
            <div className="p-3 bg-[#FDFCFA] border-t border-[#D5DEC9] flex items-center justify-between">
              <span className="text-xs text-[#5A4D41] flex items-center space-x-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#1E4D2B]" />
                <span>{lang === 'or' ? 'ନିଆଯାଇଥିବା ଫଟୋ' : 'Current photo loaded'}</span>
              </span>
              <button
                type="button"
                onClick={onReset}
                className="text-xs font-semibold text-[#8B3A2B] hover:text-[#5A2218] px-3 py-1 rounded-md hover:bg-[#FEE2E2] transition-colors cursor-pointer"
              >
                {t.change_photo}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
