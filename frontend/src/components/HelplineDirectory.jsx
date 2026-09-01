import React, { useState } from 'react';
import { Phone, PhoneCall, ShieldCheck, MapPin, Building, Clock, UserCheck } from 'lucide-react';
import { translations } from '../translations';

const HELPLINE_DATA = [
  {
    name_en: "Ama Krushi Odisha Helpline (Govt of Odisha)",
    name_or: "ଆମ କୃଷି ଓଡ଼ିଶା ହେଲ୍ପଲାଇନ୍ (ଓଡ଼ିଶା ସରକାର)",
    number: "155333",
    type: "Toll-Free (Free Call)",
    timing_en: "Mon - Sat: 6:00 AM - 10:00 PM",
    timing_or: "ସୋମ - ଶନି: ସକାଳ ୬ ରୁ ରାତି ୧୦",
    desc_en: "Direct expert advice from State Department of Agriculture in Odia language.",
    desc_or: "କୃଷି ବିଭାଗ ଅଧିକାରୀଙ୍କ ସହିତ ସିଧାସଳଖ ଓଡ଼ିଆରେ କଥା ହୋଇ ପରାମର୍ଶ ପାଆନ୍ତୁ।"
  },
  {
    name_en: "National Kisan Call Center (Govt of India)",
    name_or: "ଜାତୀୟ କିଷାନ କଲ୍ ସେଣ୍ଟର (ଭାରତ ସରକାର)",
    number: "18001801551",
    type: "Toll-Free (Free Call)",
    timing_en: "All Days: 6:00 AM - 10:00 PM",
    timing_or: "ପ୍ରତିଦିନ: ସକାଳ ୬ ରୁ ରାତି ୧୦",
    desc_en: "Free nationwide agricultural advisory in regional languages.",
    desc_or: "ଭାରତ ସରକାରଙ୍କ ଦେୟମୁକ୍ତ କୃଷି ପରାମର୍ଶ ସେବା।"
  }
];

const KVK_DIRECTORY = [
  {
    district_en: "Cuttack (ICAR-NRRI)",
    district_or: "କଟକ (ICAR-NRRI ବିଦ୍ୟାଧରପୁର)",
    phone: "06712367757",
    officer: "Senior Scientist & Head, KVK Cuttack",
    address_en: "NRRI Campus, Bidyadharpur, Cuttack - 753006",
    address_or: "ଜାତୀୟ ଧାନ ଗବେଷଣା ପ୍ରତିଷ୍ଠାନ (NRRI), ବିଦ୍ୟାଧରପୁର, କଟକ"
  },
  {
    district_en: "Sambalpur (OUAT)",
    district_or: "ସମ୍ବଲପୁର (OUAT ଚିପିଲିମା)",
    phone: "06632540224",
    officer: "Programme Coordinator, KVK Sambalpur",
    address_en: "RRTTS Campus, Chiplima, Sambalpur - 768025",
    address_or: "ଚିପିଲିମା କୃଷି କଲେଜ ପରିସର, ସମ୍ବଲପୁର"
  },
  {
    district_en: "Bargarh (OUAT)",
    district_or: "ବରଗଡ଼ (OUAT ଗମ୍ଭାରୀପାଲି)",
    phone: "06646234230",
    officer: "Senior Scientist, KVK Bargarh",
    address_en: "Gambharipali, Bargarh - 768038",
    address_or: "ଗମ୍ଭାରୀପାଲି, ବରଗଡ଼"
  },
  {
    district_en: "Khordha (CIFA)",
    district_or: "ଖୋର୍ଦ୍ଧା (ICAR-CIFA କୌଶଲ୍ୟାଗଙ୍ଗ)",
    phone: "06742465446",
    officer: "KVK Head, CIFA Bhubaneswar",
    address_en: "Kausalyaganga, Bhubaneswar - 751002",
    address_or: "କୌଶଲ୍ୟାଗଙ୍ଗ, ଭୁବନେଶ୍ୱର"
  },
  {
    district_en: "Balasore (OUAT)",
    district_or: "ବାଲେଶ୍ୱର (OUAT ବାଲିଆପାଳ)",
    phone: "06782256260",
    officer: "Senior Scientist & Head, KVK Balasore",
    address_en: "Ranital / Baliapal, Balasore - 756003",
    address_or: "ବାଲେଶ୍ୱର କେଭିକେ"
  },
  {
    district_en: "Koraput (OUAT)",
    district_or: "କୋରାପୁଟ (OUAT ସେମିଳିଗୁଡ଼ା)",
    phone: "06853225333",
    officer: "Programme Coordinator, KVK Koraput",
    address_en: "Semiliguda, Koraput - 763002",
    address_or: "ସେମିଳିଗୁଡ଼ା, କୋରାପୁଟ"
  }
];

export default function HelplineDirectory({ lang }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKVKs = KVK_DIRECTORY.filter((k) =>
    k.district_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.district_or.includes(searchTerm)
  );

  return (
    <div className="bg-[#FDFCFA] border border-[#D5DEC9] rounded-xl p-4 sm:p-5 card-shadow text-left mb-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EAF0E6]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#EAF0E6] text-[#1E4D2B]">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2C221E] text-base sm:text-lg">
              {lang === 'or' ? 'ଜରୁରୀ କୃଷି ହେଲ୍ପଲାଇନ୍ ଓ କେଭିକେ ଡାଇରେକ୍ଟରୀ' : 'Emergency Krishi Helplines & KVK Directory'}
            </h3>
            <p className="text-xs text-[#7A6E62]">
              {lang === 'or' ? 'ଓଡ଼ିଶା ସରକାର ଓ କୃଷି ବୈଜ୍ଞାନିକଙ୍କ ସହିତ ସିଧାସଳଖ ଫୋନରେ କଥା ହୁଅନ୍ତୁ' : '1-Tap direct dialing to Odisha agricultural scientists & official helplines'}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Toll-Free Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {HELPLINE_DATA.map((h, idx) => (
          <div key={idx} className="bg-[#FAFDF8] border border-[#BAC8AA] rounded-xl p-3.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <strong className="text-xs sm:text-sm text-[#1E4D2B] leading-tight">
                  {lang === 'or' ? h.name_or : h.name_en}
                </strong>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF0E6] text-[#1E4D2B] whitespace-nowrap">
                  {h.type}
                </span>
              </div>

              <p className="text-xs text-[#5A4D41] mt-1 leading-relaxed">
                {lang === 'or' ? h.desc_or : h.desc_en}
              </p>

              <div className="flex items-center space-x-1 text-[11px] text-[#7A6E62] mt-2">
                <Clock className="w-3 h-3 text-[#D97706]" />
                <span>{lang === 'or' ? h.timing_or : h.timing_en}</span>
              </div>
            </div>

            <a
              href={`tel:${h.number}`}
              className="mt-3 w-full inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-[#1E4D2B] text-white text-xs sm:text-sm font-bold hover:bg-[#163B21] transition-all cursor-pointer shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>{lang === 'or' ? `କଲ୍ କରନ୍ତୁ (${h.number})` : `Call ${h.number}`}</span>
            </a>
          </div>
        ))}
      </div>

      {/* District KVK Directory */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4D41] flex items-center space-x-1.5">
            <Building className="w-4 h-4 text-[#1E4D2B]" />
            <span>{lang === 'or' ? 'ଜିଲ୍ଲା କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର (KVK) ତାଲିକା:' : 'District Krishi Vigyan Kendra (KVK) Contacts:'}</span>
          </h4>

          <input
            type="text"
            placeholder={lang === 'or' ? 'ଜିଲ୍ଲା ଖୋଜନ୍ତୁ...' : 'Filter district...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs bg-[#F8FAF5] border border-[#C8D4BA] rounded-lg px-2.5 py-1 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
          />
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {filteredKVKs.map((k, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-[#F8FAF5] border border-[#E2EAD6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-1.5 font-bold text-xs sm:text-sm text-[#2C221E]">
                  <MapPin className="w-3.5 h-3.5 text-[#8B3A2B] flex-shrink-0" />
                  <span>{lang === 'or' ? k.district_or : k.district_en}</span>
                </div>
                <p className="text-[11px] text-[#7A6E62] mt-0.5 ml-5">
                  {lang === 'or' ? k.address_or : k.address_en}
                </p>
              </div>

              <a
                href={`tel:${k.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA] text-xs font-bold hover:bg-[#D5DEC9] transition-colors cursor-pointer flex-shrink-0"
              >
                <Phone className="w-3 h-3" />
                <span>{k.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
