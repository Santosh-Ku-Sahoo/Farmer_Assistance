import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Volume2, VolumeX, Moon, Sun, PhoneCall, Radio, AlertOctagon, HelpCircle } from 'lucide-react';
import { translations } from '../translations';

export default function NightFieldSOS({ lang }) {
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [redNightMode, setRedNightMode] = useState(false);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const intervalRef = useRef(null);

  // Stop alarm on unmount
  useEffect(() => {
    return () => {
      stopAlarm();
    };
  }, []);

  const startAlarm = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setAlarmPlaying(true);

      // Pulsate frequency between 700Hz and 1400Hz (High urgency wildlife acoustic repellent)
      let high = false;
      intervalRef.current = setInterval(() => {
        if (oscRef.current && audioCtxRef.current) {
          const freq = high ? 750 : 1350;
          oscRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.05);
          high = !high;
        }
      }, 300);

    } catch (e) {
      console.warn('Audio alarm init failed:', e);
    }
  };

  const stopAlarm = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {}
      oscRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setAlarmPlaying(false);
  };

  return (
    <div className={`border rounded-xl p-4 sm:p-5 card-shadow text-left mb-6 transition-colors duration-300 ${
      redNightMode
        ? 'bg-[#2A0808] border-[#991B1B] text-[#FCA5A5]'
        : 'bg-[#FDFCFA] border-[#D5DEC9] text-[#2C221E]'
    }`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-black/10">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${redNightMode ? 'bg-[#991B1B] text-white' : 'bg-[#EAF0E6] text-[#8B3A2B]'}`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {lang === 'or' ? 'ରାତ୍ରି କ୍ଷେତ ସୁରକ୍ଷା ଓ ବିପଦ ଆଲାର୍ମ (Night SOS)' : 'Night Field SOS & Wildlife Acoustic Alarm'}
            </h3>
            <p className="text-xs opacity-80">
              {lang === 'or' ? 'ସାପ ଓ ବନ୍ୟଜନ୍ତୁ ତଡ଼ିବା ଆଲାର୍ମ ଏବଂ ଜରୁରୀକାଳୀନ ହେଲ୍ପଲାଇନ୍' : 'Emergency acoustic repeller siren & forest wildlife helplines'}
            </p>
          </div>
        </div>

        {/* Night-Vision Red Mode Toggle */}
        <button
          type="button"
          onClick={() => setRedNightMode(!redNightMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
            redNightMode
              ? 'bg-[#EF4444] text-white'
              : 'bg-[#F8FAF5] text-[#5A4D41] border border-[#C8D4BA] hover:bg-[#EAF0E6]'
          }`}
        >
          {redNightMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{redNightMode ? (lang === 'or' ? 'ଦିନ ମୋଡ୍' : 'Day Mode') : (lang === 'or' ? 'ନାଲି ରାତି ମୋଡ୍' : 'Red Night Vision')}</span>
        </button>
      </div>

      {/* Acoustic Alarm Big Button */}
      <div className="p-4 rounded-xl border-2 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/5">
        <div>
          <strong className="text-sm sm:text-base font-extrabold block">
            📢 {lang === 'or' ? 'ଉଚ୍ଚ ତରଙ୍ଗ ବିପଦ ସାଇରନ୍ (Acoustic Siren):' : 'Pulsating High-Decibel Warning Siren:'}
          </strong>
          <p className="text-xs opacity-80 mt-0.5 leading-relaxed">
            {lang === 'or' 
              ? 'ଜରୁରୀ ସମୟରେ ବନ୍ୟଜନ୍ତୁ/ହାତୀ ତଡ଼ିବା ଓ ନିକଟସ୍ଥ ଚାଷୀଙ୍କୁ ଡାକିବା ପାଇଁ ସାଇରନ୍ ବଜାନ୍ତୁ।'
              : 'Deters snakes/wild boars and alerts nearby farmers with sharp acoustic pulses.'}
          </p>
        </div>

        <button
          type="button"
          onClick={alarmPlaying ? stopAlarm : startAlarm}
          className={`px-5 py-3 rounded-xl font-extrabold text-sm flex items-center space-x-2 transition-all cursor-pointer shadow-lg flex-shrink-0 ${
            alarmPlaying
              ? 'bg-[#DC2626] text-white animate-bounce shadow-red-500/50'
              : 'bg-[#1E4D2B] text-white hover:bg-[#163B21]'
          }`}
        >
          {alarmPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          <span>{alarmPlaying ? (lang === 'or' ? '🚨 ସାଇରନ୍ ବନ୍ଦ କରନ୍ତୁ' : '🚨 STOP SIREN') : (lang === 'or' ? '🚨 ସାଇରନ୍ ବଜାନ୍ତୁ' : '🚨 START SOS SIREN')}</span>
        </button>
      </div>

      {/* Emergency Phone Directory */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2">
          📞 {lang === 'or' ? '୧-ଟ୍ୟାପ୍ ଜରୁରୀକାଳୀନ କଲ୍ (Direct Emergency Dial):' : '1-Tap Emergency Calling:'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <a
            href="tel:18003456789"
            className="p-3 rounded-lg border flex items-center justify-between bg-black/5 hover:bg-black/10 transition-colors"
          >
            <div>
              <strong className="block font-bold">
                {lang === 'or' ? 'ଓଡ଼ିଶା ବନ ବିଭାଗ (Elephant & Wildlife):' : 'Odisha Forest & Wildlife Help:'}
              </strong>
              <span className="text-[11px] opacity-80">1800-345-6789 (Toll Free)</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#16A34A]" />
          </a>

          <a
            href="tel:108"
            className="p-3 rounded-lg border flex items-center justify-between bg-black/5 hover:bg-black/10 transition-colors"
          >
            <div>
              <strong className="block font-bold">
                {lang === 'or' ? 'ଆମ୍ବୁଲାନ୍ସ / ସର୍ପାଘାତ ଜରୁରୀ ଚିକିତ୍ସା:' : 'Ambulance / Snake Bite 108:'}
              </strong>
              <span className="text-[11px] opacity-80">108 / 112 (Emergency Medical)</span>
            </div>
            <PhoneCall className="w-4 h-4 text-[#DC2626]" />
          </a>
        </div>
      </div>

    </div>
  );
}
