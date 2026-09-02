import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CropSelectorFilter from './components/CropSelectorFilter';
import ImageUploader from './components/ImageUploader';
import EmptyState from './components/EmptyState';
import ResultCard from './components/ResultCard';
import RetakeGuidance from './components/RetakeGuidance';
import CropGrowingGuide from './components/CropGrowingGuide';
import WeatherAdvisoryCard from './components/WeatherAdvisoryCard';
import MarketPricesCard from './components/MarketPricesCard';
import AgriServicesHub from './components/AgriServicesHub';
import ChatAssistant from './components/ChatAssistant';
import { translations } from './translations';
import { API_BASE_URL } from './config';
import { AlertOctagon, ShieldCheck, Leaf, BookOpen, CloudSun, IndianRupee, Landmark } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('or'); // Odia default per target farmer spec
  const [activeTab, setActiveTab] = useState('diagnosis'); // 'diagnosis' | 'guide' | 'weather' | 'mandi' | 'services'
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);

  const t = translations[lang];

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`);
        setBackendOnline(res.ok);
      } catch (err) {
        setBackendOnline(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Sends image file to FastAPI /predict endpoint
   */
  const handleDiagnose = async (file) => {
    if (!file) return;

    setIsLoading(true);
    setErrorMessage(null);
    setPredictionResult(null);

    const formData = new FormData();
    formData.append('file', file);
    if (selectedCrop && selectedCrop !== 'all') {
      formData.append('crop_hint', selectedCrop);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server returned status ${response.status}`);
      }

      const data = await response.json();
      setPredictionResult(data);
      setBackendOnline(true);
    } catch (err) {
      console.error('[Diagnosis error]:', err);
      setErrorMessage(err.message || t.network_error_desc);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelected = (file, preview) => {
    setCurrentFile(file);
    setPreviewUrl(preview);
    handleDiagnose(file);
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setCurrentFile(null);
    setPredictionResult(null);
    setErrorMessage(null);
  };

  /**
   * Loads quick test sample from backend samples directory
   */
  const handleSelectSample = async (sampleFilename) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/sample-file/${sampleFilename}`);
      if (res.ok) {
        const blob = await res.blob();
        const file = new File([blob], sampleFilename, { type: 'image/jpeg' });
        const preview = URL.createObjectURL(blob);
        handleImageSelected(file, preview);
      }
    } catch (e) {
      console.warn('Sample fetch issue:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tabKey) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveTab(tabKey);
  };

  return (
    <div className={`min-h-screen bg-[#EAF0E6] flex flex-col ${lang === 'or' ? 'font-odia' : ''}`}>
      
      {/* Top Bar */}
      <Header lang={lang} setLang={setLang} backendOnline={backendOnline} />

      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-3 sm:px-4 pt-3 sm:pt-6 pb-28 sm:pb-8 relative">
        
        {/* Desktop Navigation Tabs (Visible on tablets and PCs) */}
        <div className="hidden sm:grid grid-cols-5 gap-1 mb-5 p-1 bg-[#D5DEC9]/60 rounded-xl border border-[#BAC8AA]">
          <button
            type="button"
            onClick={() => handleTabChange('diagnosis')}
            className={`py-2 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'diagnosis'
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'text-[#382E28] hover:text-[#1E4D2B] hover:bg-[#EAF0E6]'
            }`}
            title="Leaf Disease Diagnosis (Primary ML Feature)"
          >
            <Leaf className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{t.tab_diagnosis}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('guide')}
            className={`py-2 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'text-[#382E28] hover:text-[#1E4D2B] hover:bg-[#EAF0E6]'
            }`}
            title="Crop Cultivation Guide (Static Reference)"
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{t.tab_guide}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('weather')}
            className={`py-2 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'weather'
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'text-[#382E28] hover:text-[#1E4D2B] hover:bg-[#EAF0E6]'
            }`}
            title="Spray Weather Advisory & Cyclone Alert"
          >
            <CloudSun className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{t.tab_weather}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('mandi')}
            className={`py-2 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'mandi'
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'text-[#382E28] hover:text-[#1E4D2B] hover:bg-[#EAF0E6]'
            }`}
            title="Odisha Mandi Prices"
          >
            <IndianRupee className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{t.tab_mandi}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('services')}
            className={`py-2 px-1 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'text-[#382E28] hover:text-[#1E4D2B] hover:bg-[#EAF0E6]'
            }`}
            title="Comprehensive Categorized Agro Services"
          >
            <Landmark className="w-4 h-4 flex-shrink-0 text-[#D97706]" />
            <span className="truncate">{lang === 'or' ? 'କୃଷି ସେବା' : 'Agri Care'}</span>
          </button>
        </div>

        {/* Tab 1: Leaf Disease Diagnosis (Default Primary ML Flow) */}
        {activeTab === 'diagnosis' && (
          <div>
            {/* Crop Filter Context */}
            <CropSelectorFilter
              selectedCrop={selectedCrop}
              onSelectCrop={setSelectedCrop}
              lang={lang}
            />

            {/* Leaf Image Capture & Dropzone */}
            <ImageUploader
              onImageSelected={handleImageSelected}
              previewUrl={previewUrl}
              onReset={handleReset}
              isLoading={isLoading}
              lang={lang}
              onSelectSample={handleSelectSample}
            />

            {/* Error State if Backend fails */}
            {errorMessage && (
              <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-4 sm:p-5 mb-6 text-left">
                <div className="flex items-start space-x-3">
                  <AlertOctagon className="w-5 h-5 text-[#B91C1C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#991B1B]">
                      {t.network_error_title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#7F1D1D] mt-1 leading-relaxed">
                      {errorMessage}
                    </p>
                    {currentFile && (
                      <button
                        type="button"
                        onClick={() => handleDiagnose(currentFile)}
                        className="mt-3 px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#B91C1C] text-white hover:bg-[#991B1B] transition-colors cursor-pointer"
                      >
                        {t.retry_button}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Content States */}
            {predictionResult ? (
              predictionResult.is_confident ? (
                /* High Confidence Result Card with XAI Heatmap Inspector */
                <ResultCard
                  result={predictionResult}
                  onReset={handleReset}
                  lang={lang}
                />
              ) : (
                /* Low Confidence Retake Guidance */
                <RetakeGuidance
                  result={predictionResult}
                  onRetake={handleReset}
                  lang={lang}
                />
              )
            ) : !previewUrl ? (
              /* Empty State Guide (Before Upload) */
              <EmptyState lang={lang} />
            ) : null}
          </div>
        )}

        {/* Tab 2: Crop Growing Guide (Static Sowing to Harvest Reference) */}
        {activeTab === 'guide' && (
          <CropGrowingGuide lang={lang} />
        )}

        {/* Tab 3: Spray Weather Advisory (Open-Meteo Public API) */}
        {activeTab === 'weather' && (
          <WeatherAdvisoryCard lang={lang} />
        )}

        {/* Tab 4: Odisha Mandi Prices (Agmarknet) */}
        {activeTab === 'mandi' && (
          <MarketPricesCard lang={lang} selectedCrop={selectedCrop} />
        )}

        {/* Tab 5: Agri Care Extended Services (Clean 4-Category Hub) */}
        {activeTab === 'services' && (
          <AgriServicesHub lang={lang} />
        )}

        {/* Privacy & Ag Extension Note */}
        <footer className="mt-8 text-center text-xs text-[#7A6E62] border-t border-[#D5DEC9] pt-4 pb-16 sm:pb-6 space-y-1">
          <p className="flex items-center justify-center space-x-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#1E4D2B]" />
            <span>{t.privacy_note}</span>
          </p>
          <p className="text-[11px] text-[#8C8074]">
            {lang === 'or'
              ? 'ପ୍ରତିକାର ପରାମର୍ଶ ICAR-NRRI (କଟକ) ଏବଂ OUAT (ଭୁବନେଶ୍ୱର) କୃଷି ମାନକ ଉପରେ ଆଧାରିତ।'
              : 'Recommendations aligned with ICAR-NRRI (Cuttack) & OUAT (Bhubaneswar) IPM standards.'}
          </p>
        </footer>

      </main>

      {/* Mobile Fixed Bottom Navigation Bar (App-like 1-thumb ergonomics) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#BAC8AA] pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => handleTabChange('diagnosis')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-all tap-active cursor-pointer ${
              activeTab === 'diagnosis' ? 'text-[#1E4D2B] font-bold' : 'text-[#7A6E62]'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeTab === 'diagnosis' ? 'bg-[#EAF0E6]' : ''}`}>
              <Leaf className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate">{lang === 'or' ? 'ପତ୍ର ଯାଞ୍ଚ' : 'Diagnosis'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('guide')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-all tap-active cursor-pointer ${
              activeTab === 'guide' ? 'text-[#1E4D2B] font-bold' : 'text-[#7A6E62]'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeTab === 'guide' ? 'bg-[#EAF0E6]' : ''}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate">{lang === 'or' ? 'ଚାଷ ବିଧି' : 'Guide'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('weather')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-all tap-active cursor-pointer ${
              activeTab === 'weather' ? 'text-[#1E4D2B] font-bold' : 'text-[#7A6E62]'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeTab === 'weather' ? 'bg-[#EAF0E6]' : ''}`}>
              <CloudSun className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate">{lang === 'or' ? 'ସ୍ପ୍ରେ ପାଗ' : 'Weather'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('mandi')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-all tap-active cursor-pointer ${
              activeTab === 'mandi' ? 'text-[#1E4D2B] font-bold' : 'text-[#7A6E62]'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeTab === 'mandi' ? 'bg-[#EAF0E6]' : ''}`}>
              <IndianRupee className="w-4 h-4" />
            </div>
            <span className="text-[10px] leading-tight truncate">{lang === 'or' ? 'ମଣ୍ଡି ଦର' : 'Mandi'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('services')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-all tap-active cursor-pointer ${
              activeTab === 'services' ? 'text-[#1E4D2B] font-bold' : 'text-[#7A6E62]'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeTab === 'services' ? 'bg-[#EAF0E6]' : ''}`}>
              <Landmark className="w-4 h-4 text-[#D97706]" />
            </div>
            <span className="text-[10px] leading-tight truncate">{lang === 'or' ? 'କୃଷି ସେବା' : 'Agri Care'}</span>
          </button>
        </div>
      </nav>

      {/* Floating AI Agronomic Chat Assistant at Bottom Right */}
      <ChatAssistant lang={lang} isInline={false} />

    </div>
  );
}
