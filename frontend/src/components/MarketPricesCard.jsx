import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Minus, Store, Sprout } from 'lucide-react';
import { translations } from '../translations';
import { API_BASE_URL } from '../config';

export default function MarketPricesCard({ lang, selectedCrop }) {
  const t = translations[lang];
  const [marketData, setMarketData] = useState(null);
  const [activeCropTab, setActiveCropTab] = useState(selectedCrop === 'all' ? 'Rice' : selectedCrop);

  useEffect(() => {
    if (selectedCrop && selectedCrop !== 'all') {
      setActiveCropTab(selectedCrop);
    }
  }, [selectedCrop]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/market-prices?crop=all`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data) setMarketData(resData.data);
      })
      .catch((err) => console.error('Mandi prices fetch error:', err));
  }, []);

  const cropKeys = ['Rice', 'Tomato', 'Potato'];
  const currentCropInfo = marketData ? marketData[activeCropTab] : null;

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-5 card-shadow text-left mb-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div>
          <h3 className="font-bold text-[#2C221E] text-base sm:text-lg flex items-center space-x-2">
            <IndianRupee className="w-5 h-5 text-[#1E4D2B]" />
            <span>{t.mandi_title}</span>
          </h3>
          <p className="text-xs text-[#7A6E62] mt-0.5">
            {t.mandi_subtitle}
          </p>
        </div>

        {/* Crop Tabs */}
        <div className="flex rounded-lg border border-[#D5DEC9] p-0.5 bg-[#F8FAF5]">
          {cropKeys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setActiveCropTab(k)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeCropTab === k
                  ? 'bg-[#1E4D2B] text-white shadow-xs'
                  : 'text-[#5A4D41] hover:text-[#1E4D2B]'
              }`}
            >
              {k === 'Rice' ? (lang === 'or' ? 'ଧାନ' : 'Rice') : k === 'Tomato' ? (lang === 'or' ? 'ଟମାଟୋ' : 'Tomato') : (lang === 'or' ? 'ଆଳୁ' : 'Potato')}
            </button>
          ))}
        </div>
      </div>

      {currentCropInfo ? (
        <div className="space-y-4">
          
          {/* Crop Heading & MSP */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F8FAF5] p-3 rounded-lg border border-[#E2EAD6]">
            <div>
              <span className="text-xs uppercase font-bold text-[#1E4D2B] tracking-wider block">
                {lang === 'or' ? currentCropInfo.crop_or : currentCropInfo.crop_en}
              </span>
              <span className="text-[11px] text-[#7A6E62]">
                {lang === 'or' ? currentCropInfo.unit_or : currentCropInfo.unit}
              </span>
            </div>

            {currentCropInfo.msp && (
              <div className="text-right">
                <span className="text-[11px] font-semibold text-[#8B3A2B] block">
                  {t.msp_label}
                </span>
                <span className="text-sm font-extrabold text-[#2C221E]">
                  ₹ {currentCropInfo.msp} / Qtl
                </span>
              </div>
            )}
          </div>

          {/* Markets Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-[#EAF0E6] text-[#7A6E62] uppercase text-[11px] tracking-wider">
                  <th className="pb-2 font-bold">{t.mandi_market}</th>
                  <th className="pb-2 font-bold text-right">{t.mandi_min}</th>
                  <th className="pb-2 font-bold text-right">{t.mandi_max}</th>
                  <th className="pb-2 font-bold text-right text-[#1E4D2B]">{t.mandi_modal}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F6EC]">
                {currentCropInfo.markets.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FCF6]">
                    <td className="py-2.5 font-medium text-[#2C221E] flex items-center space-x-1.5">
                      <Store className="w-3.5 h-3.5 text-[#1E4D2B]" />
                      <span>{lang === 'or' ? m.mandi_or : m.mandi_en}</span>
                    </td>
                    <td className="py-2.5 text-right text-[#5A4D41]">₹ {m.min_price}</td>
                    <td className="py-2.5 text-right text-[#5A4D41]">₹ {m.max_price}</td>
                    <td className="py-2.5 text-right font-bold text-[#1E4D2B]">
                      ₹ {m.modal_price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-[#8C8074] text-right">
            {lang === 'or' 
              ? 'ଉତ୍ସ: Agmarknet ଏବଂ ଓଡ଼ିଶା ରାଜ୍ୟ କୃଷି ବିପଣନ ବୋର୍ଡ (OSAMB)' 
              : 'Source: Agmarknet & Odisha State Agricultural Marketing Board'}
          </p>

        </div>
      ) : null}

    </div>
  );
}
