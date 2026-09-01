import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Droplets, Thermometer, ShieldCheck, AlertTriangle, ShieldAlert, RefreshCw, MapPin, AlertOctagon, Flame, Crosshair, Navigation } from 'lucide-react';
import { translations } from '../translations';
import { API_BASE_URL } from '../config';

export default function WeatherAdvisoryCard({ lang }) {
  const t = translations[lang];
  const [district, setDistrict] = useState('bhubaneswar');
  const [weatherData, setWeatherData] = useState(null);
  const [districtsList, setDistrictsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);

  useEffect(() => {
    // Load available districts
    fetch(`${API_BASE_URL}/districts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.districts) setDistrictsList(data.districts);
      })
      .catch(() => {});
  }, []);

  const fetchWeather = (distKey, lat = null, lon = null) => {
    setLoading(true);
    let url = `${API_BASE_URL}/weather-advisory?district=${distKey}`;
    if (lat !== null && lon !== null) {
      url += `&lat=${lat}&lon=${lon}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Weather fetch error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!gpsActive) {
      fetchWeather(district);
    }
  }, [district, gpsActive]);

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert(lang === 'or' ? 'ଆପଣଙ୍କ ବ୍ରାଉଜରରେ GPS ସୁବିଧା ନାହିଁ।' : 'Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGpsActive(true);
        setIsLocating(false);
        fetchWeather('custom', latitude, longitude);
      },
      (error) => {
        console.warn('GPS location error:', error);
        setIsLocating(false);
        alert(lang === 'or' ? 'GPS ସ୍ଥାନ ଚିହ୍ନଟ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି ତାଲିକାରୁ ଜିଲ୍ଲା ବାଛନ୍ତୁ।' : 'Unable to retrieve GPS location. Please select your district from the list.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleDistrictChange = (e) => {
    setGpsActive(false);
    setDistrict(e.target.value);
  };

  const getStatusBadge = () => {
    if (!weatherData) return null;
    if (weatherData.spray_status === 'CRITICAL_WASTE' || weatherData.is_cyclone_alert) {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#7F1D1D] text-white border border-[#EF4444] animate-pulse">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>{lang === 'or' ? 'ବାତ୍ୟା / ୧୦୦% ଔଷଧ ନଷ୍ଟ' : '100% PESTICIDE WASTE'}</span>
        </span>
      );
    }
    if (weatherData.spray_status === 'SAFE') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF0E6] text-[#1E4D2B] border border-[#2C6E3B]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === 'or' ? weatherData.status_or : weatherData.status_en}</span>
        </span>
      );
    }
    if (weatherData.spray_status === 'CAUTION') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FBBF24]">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{lang === 'or' ? weatherData.status_or : weatherData.status_en}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#F87171]">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>{lang === 'or' ? weatherData.status_or : weatherData.status_en}</span>
      </span>
    );
  };

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div>
          <h3 className="font-bold text-[#2C221E] text-base sm:text-lg flex items-center space-x-2">
            <CloudRain className="w-5 h-5 text-[#1E4D2B]" />
            <span>{t.weather_title}</span>
          </h3>
          <p className="text-xs text-[#7A6E62] mt-0.5">
            {t.weather_subtitle}
          </p>
        </div>

        {/* District Selector & GPS Button */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={handleUseGPS}
            disabled={isLocating}
            className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              gpsActive
                ? 'bg-[#1E4D2B] text-white shadow-xs'
                : 'bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA] hover:bg-[#D5DEC9]'
            }`}
            title="Auto-detect current farm GPS location"
          >
            {isLocating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Crosshair className="w-3.5 h-3.5 text-[#D97706]" />
            )}
            <span>{lang === 'or' ? (isLocating ? 'ଖୋଜା ଚାଲିଛି...' : '📍 ମୋର ଅଞ୍ଚଳ') : (isLocating ? 'Locating...' : '📍 Use GPS')}</span>
          </button>

          <div className="flex items-center space-x-1">
            <select
              value={gpsActive ? 'custom' : district}
              onChange={handleDistrictChange}
              className="text-xs sm:text-sm font-medium bg-[#F8FAF5] border border-[#C8D4BA] rounded-lg px-2 py-1 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
            >
              {gpsActive && <option value="custom">📍 GPS Live Farm</option>}
              {districtsList.map((d) => (
                <option key={d.key} value={d.key}>
                  {lang === 'or' ? d.name_or : d.name_en}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center text-[#5A4D41]">
          <RefreshCw className="w-6 h-6 animate-spin text-[#1E4D2B] mb-2" />
          <span className="text-xs">{lang === 'or' ? 'ପାଣିପାଗ ତଥ୍ୟ ଲୋଡ୍ ହେଉଛି...' : 'Fetching live Open-Meteo weather...'}</span>
        </div>
      ) : weatherData ? (
        <div className="space-y-4">
          
          {/* Extreme Cyclone / Disaster Alert Box */}
          {(weatherData.is_cyclone_alert || weatherData.spray_status === 'CRITICAL_WASTE') && (
            <div className="bg-[#7F1D1D] text-white p-4 rounded-xl shadow-md border-2 border-[#EF4444] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center space-x-2 mb-1.5">
                <AlertOctagon className="w-5 h-5 text-[#FCA5A5] animate-bounce" />
                <h4 className="font-extrabold text-sm sm:text-base text-white tracking-wide uppercase">
                  {lang === 'or' ? '🚨 ବାତ୍ୟା ଓ ପ୍ରବଳ ବର୍ଷା ସତର୍କତା — ଔଷଧ ସିଞ୍ଚନ ସମ୍ପୂର୍ଣ୍ଣ ବନ୍ଦ ରଖନ୍ତୁ!' : '🚨 CYCLONE & STORM DISASTER ALERT — ZERO SPRAY ADVISORY'}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#FEE2E2] leading-relaxed">
                {lang === 'or' 
                  ? 'ପ୍ରବଳ ବେଗରେ ପବନ ଓ ଝଡ଼ବର୍ଷା ହେଉଥିବାରୁ କୌଣସି କୀଟନାଶକ ବା ଫିମ୍ପିନାଶକ ସ୍ପ୍ରେ କଲେ ୧୦୦% ଔଷଧ ଧୋଇ ହୋଇ ନଦୀ-ନାଳରେ ମିଶିବ ଏବଂ ହଜାର ହଜାର ଟଙ୍କା ବୃଥା ନଷ୍ଟ ହେବ।'
                  : 'Gale-force winds and torrential rains will wash away 100% of sprayed pesticides, causing complete economic loss and water pollution. Halt all foliar applications.'}
              </p>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
              <div className="flex items-center space-x-1.5 text-xs text-[#7A6E62] mb-1">
                <Thermometer className="w-3.5 h-3.5 text-[#8B3A2B]" />
                <span>{t.temp_label}</span>
              </div>
              <p className="text-lg font-extrabold text-[#2C221E]">{weatherData.temperature_c}°C</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
              <div className="flex items-center space-x-1.5 text-xs text-[#7A6E62] mb-1">
                <Droplets className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{t.humidity_label}</span>
              </div>
              <p className="text-lg font-extrabold text-[#2C221E]">{weatherData.humidity_percent}%</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
              <div className="flex items-center space-x-1.5 text-xs text-[#7A6E62] mb-1">
                <Wind className="w-3.5 h-3.5 text-[#1E4D2B]" />
                <span>{t.wind_label}</span>
              </div>
              <p className="text-lg font-extrabold text-[#2C221E]">{weatherData.wind_speed_kmh} <span className="text-xs font-normal">km/h</span></p>
              {weatherData.wind_gusts_kmh > weatherData.wind_speed_kmh && (
                <span className="text-[10px] text-[#D97706] font-semibold block mt-0.5">
                  {lang === 'or' ? `ଝଟକା: ${weatherData.wind_gusts_kmh} km/h` : `Gusts: ${weatherData.wind_gusts_kmh} km/h`}
                </span>
              )}
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6]">
              <div className="flex items-center space-x-1.5 text-xs text-[#7A6E62] mb-1">
                <CloudRain className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{t.rain_risk_label}</span>
              </div>
              <p className="text-lg font-extrabold text-[#2C221E]">{weatherData.rain_probability_percent}%</p>
            </div>
          </div>

          {/* Spray Feasibility Callout */}
          <div className={`p-4 rounded-xl border ${
            weatherData.spray_status === 'CRITICAL_WASTE'
              ? 'bg-[#FEF2F2] border-[#EF4444] text-[#7F1D1D]'
              : weatherData.spray_status === 'SAFE'
              ? 'bg-[#EAF0E6]/70 border-[#2C6E3B]/40'
              : weatherData.spray_status === 'CAUTION'
              ? 'bg-[#FEF3C7]/70 border-[#F59E0B]/50'
              : 'bg-[#FEE2E2]/70 border-[#EF4444]/50'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-[#5A4D41]">
                {t.spray_recommendation}
              </span>
              {getStatusBadge()}
            </div>
            <p className="text-sm font-semibold text-[#2C221E] leading-relaxed">
              {lang === 'or' ? weatherData.advice_or : weatherData.advice_en}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8C8074]">
            <span>
              📍 <strong>{lang === 'or' ? weatherData.district_name_or : weatherData.district_name_en}</strong>
            </span>
            <span>
              {lang === 'or' ? `ଉତ୍ସ: ${weatherData.source}` : `Source: ${weatherData.source}`}
            </span>
          </div>

        </div>
      ) : null}

    </div>
  );
}
