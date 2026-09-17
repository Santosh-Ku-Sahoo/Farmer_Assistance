import React from 'react';
import { Leaf } from 'lucide-react';
import { translations } from '../translations';

export default function Header({ lang, setLang, backendOnline }) {
  const t = translations[lang];

  return (
    <header className="bg-[#1E4D2B] text-[#FDFCFA] border-b-2 border-[#D97706] shadow-sm">
      {/* Official State Agri Portal Sub-Bar */}
      <div className="bg-[#13331D] text-[#BAC8AA] text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-[#2C6E3B]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" aria-hidden="true" />
            <span className="font-medium">
              {lang === 'or' 
                ? 'ଓଡ଼ିଶା ସରକାର — କୃଷି ଓ କୃଷକ ସଶକ୍ତିକରଣ ମଡେଲ୍' 
                : 'Govt of Odisha — Department of Agriculture & Farmers Empowerment'}
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-[10px] text-[#D5DEC9]">
            <span>{lang === 'or' ? '🌾 ଖରିଫ ଓ ରବି ସହାୟତା' : '🌾 Kharif & Rabi Assistance'}</span>
            <span>•</span>
            <span>{lang === 'or' ? '📞 କୃଷି ହେଲ୍ପଲାଇନ୍: 155333' : '📞 Krushi Helpline: 155333'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        
        {/* Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C6E3B] to-[#15381F] border border-[#BAC8AA]/40 flex items-center justify-center text-[#F59E0B] shadow-inner flex-shrink-0" aria-hidden="true">
            <Leaf className="w-5 h-5 text-[#86EFAC]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight">
                {t.app_title}
              </h1>
              <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider bg-[#D97706] text-white px-2 py-0.5 rounded-full">
                {lang === 'or' ? 'ସ୍ମାର୍ଟ କୃଷି' : 'Smart Agri'}
              </span>
            </div>
            <p className="text-xs text-[#D5DEC9] hidden sm:block normal-case tracking-normal">
              {t.app_subtitle}
            </p>
          </div>
        </div>

        {/* Status & Language Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Server Connection Badge */}
          <div 
            role="status"
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              backendOnline 
                ? 'bg-[#15381F] text-[#86EFAC] border-[#2C6E3B]' 
                : 'bg-[#451A1A] text-[#FCA5A5] border-[#7F1D1D]'
            }`}
            title={backendOnline ? "FastAPI backend connected" : "Backend offline - offline mode active"}
          >
            <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`} aria-hidden="true"></span>
            <span>{backendOnline ? t.online_badge : t.offline_badge}</span>
          </div>

          {/* Language Switcher */}
          <div className="inline-flex rounded-lg border border-[#2C6E3B] bg-[#15381F] p-0.5" role="group" aria-label={lang === 'or' ? "ଭାଷା ପରିବର୍ତ୍ତନ" : "Select language"}>
            <button
              type="button"
              aria-pressed={lang === 'or'}
              onClick={() => setLang('or')}
              className={`btn-tab ${
                lang === 'or'
                  ? 'btn-tab-active !bg-[#2C6E3B]'
                  : 'text-[#D5DEC9] hover:text-white hover:bg-[#2C6E3B]/40'
              }`}
            >
              ଓଡ଼ିଆ
            </button>
            <button
              type="button"
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
              className={`btn-tab ${
                lang === 'en'
                  ? 'btn-tab-active !bg-[#2C6E3B]'
                  : 'text-[#D5DEC9] hover:text-white hover:bg-[#2C6E3B]/40'
              }`}
            >
              English
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
