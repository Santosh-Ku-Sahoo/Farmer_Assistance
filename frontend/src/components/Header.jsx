import React from 'react';
import { Leaf } from 'lucide-react';
import { translations } from '../translations';

export default function Header({ lang, setLang, backendOnline }) {
  const t = translations[lang];

  return (
    <header className="bg-[#1E4D2B] text-[#FDFCFA] border-b border-[#15381F] shadow-sm">
      <div className="max-w-2xl w-full mx-auto px-3 sm:px-4 py-3.5 sm:py-4 flex items-center justify-between">
        
        {/* Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#2C6E3B] flex items-center justify-center text-white shadow-inner flex-shrink-0" aria-hidden="true">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
              {t.app_title}
            </h1>
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
