import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Leaf, ExternalLink, Heart, Code2 } from 'lucide-react';

export default function Footer({ lang }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E4D2B] text-[#D5DEC9] mt-auto">

      {/* Main Footer Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#2C6E3B] flex items-center justify-center shadow-inner">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-white text-sm">
                {lang === 'or' ? 'କୃଷକ ସହାୟକ' : 'AI Farmer Assistant'}
              </h3>
            </div>
            <p className="text-xs leading-relaxed">
              {lang === 'or'
                ? 'ଓଡ଼ିଶାର କୃଷକଙ୍କ ପାଇଁ AI ଆଧାରିତ ଫସଲ ରୋଗ ନିଦାନ, ସ୍ପ୍ରେ ପାଗ ପରାମର୍ଶ, ମଣ୍ଡି ଦର ଏବଂ କୃଷି ସେବା ପ୍ଲାଟଫର୍ମ।'
                : 'AI-powered crop disease diagnosis, spray weather advisory, mandi prices & agri services platform for Odisha farmers.'}
            </p>
            <div className="flex items-center space-x-1.5 mt-3 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#86EFAC] flex-shrink-0" />
              <span>
                {lang === 'or'
                  ? 'ଆପଣଙ୍କ ଫଟୋ ସର୍ଭରରେ ଜମା ହୋଇ ନ ଥାଏ'
                  : 'Your photos are never stored on server'}
              </span>
            </div>
          </div>

          {/* Column 2: Emergency Helplines */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3">
              {lang === 'or' ? '📞 ଜରୁରୀ ହେଲ୍ପଲାଇନ୍' : '📞 Emergency Helplines'}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:155333" className="group flex items-start space-x-2 text-xs hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#86EFAC]" />
                  <div>
                    <span className="font-bold text-white group-hover:underline">155333</span>
                    <p className="text-[#BAC8AA] leading-tight">
                      {lang === 'or' ? 'ଆମ କୃଷି ଓଡ଼ିଶା (ଟୋଲ୍ ଫ୍ରୀ)' : 'Ama Krushi Odisha (Toll-Free)'}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:18001801551" className="group flex items-start space-x-2 text-xs hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#86EFAC]" />
                  <div>
                    <span className="font-bold text-white group-hover:underline">1800-180-1551</span>
                    <p className="text-[#BAC8AA] leading-tight">
                      {lang === 'or' ? 'ଜାତୀୟ କିଷାନ କଲ୍ ସେଣ୍ଟର (ଟୋଲ୍ ଫ୍ରୀ)' : 'National Kisan Call Center (Toll-Free)'}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:06712367757" className="group flex items-start space-x-2 text-xs hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#86EFAC]" />
                  <div>
                    <span className="font-bold text-white group-hover:underline">0671-2367757</span>
                    <p className="text-[#BAC8AA] leading-tight">
                      {lang === 'or' ? 'KVK କଟକ (ICAR-NRRI)' : 'KVK Cuttack (ICAR-NRRI)'}
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3">
              {lang === 'or' ? '🔗 ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଲିଙ୍କ୍' : '🔗 Useful Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://odisha.gov.in/departments/agriculture-farmers-empowerment" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span>{lang === 'or' ? 'ଓଡ଼ିଶା କୃଷି ବିଭାଗ' : 'Odisha Dept. of Agriculture'}</span>
                </a>
              </li>
              <li>
                <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span>{lang === 'or' ? 'Agmarknet ମଣ୍ଡି ଦର' : 'Agmarknet Mandi Prices'}</span>
                </a>
              </li>
              <li>
                <a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span>ICAR</span>
                </a>
              </li>
              <li>
                <a href="https://ouat.ac.in" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span>{lang === 'or' ? 'OUAT ଭୁବନେଶ୍ୱର' : 'OUAT Bhubaneswar'}</span>
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span>{lang === 'or' ? 'PM-KISAN ଯୋଜନା' : 'PM-KISAN Scheme'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Technical & Contact */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3">
              {lang === 'or' ? 'ℹ️ ପ୍ରଯୁକ୍ତି ଓ ଯୋଗାଯୋଗ' : 'ℹ️ Tech & Contact'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-xs">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#86EFAC]" />
                <span>{lang === 'or' ? 'ICAR-NRRI, କଟକ, ଓଡ଼ିଶା' : 'ICAR-NRRI, Cuttack, Odisha'}</span>
              </li>
              <li>
                <a href="https://github.com/Santosh-Ku-Sahoo/Farmer_Assistance" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs hover:text-white transition-colors">
                  <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{lang === 'or' ? 'GitHub ସୋର୍ସ କୋଡ୍' : 'GitHub Source Code'}</span>
                </a>
              </li>
            </ul>
            <div className="mt-3 p-2.5 rounded-lg bg-[#15381F] border border-[#2C6E3B]">
              <p className="text-xs text-[#BAC8AA] leading-relaxed">
                <span className="font-bold text-white">
                  {lang === 'or' ? 'ଶକ୍ତି:' : 'Powered by:'}
                </span>{' '}
                MobileNetV2 · FastAPI · React · Open-Meteo
              </p>
              <p className="text-xs text-[#BAC8AA] leading-relaxed mt-1">
                {lang === 'or'
                  ? 'ICAR-NRRI ଓ OUAT IPM ମାନକ ଅନୁସାରେ ପରାମର୍ଶ'
                  : 'Advisory per ICAR-NRRI & OUAT IPM standards'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2C6E3B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#BAC8AA]">
            © {currentYear}{' '}
            {lang === 'or' ? 'କୃଷକ ସହାୟକ — ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ' : 'AI Farmer Assistant — All rights reserved'}
          </p>
          <p className="text-xs text-[#BAC8AA] flex items-center space-x-1">
            <span>{lang === 'or' ? 'ତିଆରି' : 'Made with'}</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>{lang === 'or' ? 'ଓଡ଼ିଶାର କୃଷକଙ୍କ ପାଇଁ' : 'for Odisha Farmers'}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
