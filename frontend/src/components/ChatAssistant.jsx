import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, MessageSquare, Bot, User, Sparkles, RefreshCw, Trash2, X, 
  MessageCircle, Mic, MicOff, Volume2, VolumeX, Share2, 
  Zap, ChevronDown, ChevronUp, CheckCircle2, Bookmark
} from 'lucide-react';
import { translations } from '../translations';
import { API_BASE_URL } from '../config';

// Categorized comprehensive quick queries repository
const CATEGORIZED_QUERIES = [
  {
    category_id: "rice",
    name_en: "🌾 Rice / Paddy (ଧାନ)",
    name_or: "🌾 ଧାନ ରୋଗ ଓ ପୋକ",
    queries: [
      { text_or: "🌾 ଧାନରେ ପତ୍ର ମହିଷା (Leaf Blast) ପ୍ରତିକାର କ’ଣ?", text_en: "🌾 How to control rice leaf blast disease?" },
      { text_or: "🐛 ଧାନ କାଣ୍ଡବିନ୍ଧା (Stem Borer) ପୋକ ଦମନ ଉପାୟ?", text_en: "🐛 Yellow stem borer spray for paddy?" },
      { text_or: "🦗 ମାଟିଆ ଗୁଣ୍ଡି ପୋକ (BPH) ପାଇଁ କ’ଣ ସ୍ପ୍ରେ କରିବେ?", text_en: "🦗 Brown plant hopper (BPH) management?" },
      { text_or: "🌾 ଧାନରେ କାଣ୍ଡପଚା (Sheath Blight) ପ୍ରତିକାର କ’ଣ?", text_en: "🌾 Rice sheath blight treatment?" },
      { text_or: "🦠 ଜୀବାଣୁଜନିତ ପତ୍ରପୋଡ଼ା (BLB) ରୋଗ ଚିକିତ୍ସା?", text_en: "🦠 Bacterial leaf blight (BLB) spray?" },
      { text_or: "🌾 ଧାନରେ ଜିଙ୍କ୍ ଅଭାବ ଓ ଖଇରା (Khaira) ରୋଗ ପ୍ରତିକାର?", text_en: "🌾 Zinc deficiency & Khaira disease solution?" }
    ]
  },
  {
    category_id: "tomato",
    name_en: "🍅 Tomato (ବିଲାତି ବାଇଗଣ)",
    name_or: "🍅 ଟମାଟୋ ରୋଗ ଓ ପୋକ",
    queries: [
      { text_or: "🍅 ଟମାଟୋରେ ଧଳାମାଛି ଓ ପତ୍ର କୁଞ୍ଚୁକୁଞ୍ଚିଆ ଦମନ?", text_en: "🍅 Tomato whitefly & leaf curl virus control?" },
      { text_or: "🐛 ଟମାଟୋ ଫଳବିନ୍ଧା ପୋକ (Fruit Borer) ନିୟନ୍ତ୍ରଣ?", text_en: "🐛 Tomato fruit borer spray recommendations?" },
      { text_or: "🍅 ଟମାଟୋ ପ୍ରାଥମିକ ପତ୍ରପୋଡ଼ା (Early Blight) ଚିକିତ୍ସା?", text_en: "🍅 Tomato early blight treatment?" },
      { text_or: "🍅 ଟମାଟୋ ଫଳ ତଳ କଳା ପଡ଼ିବା (Blossom End Rot)?", text_en: "🍅 Tomato blossom-end rot calcium deficiency?" }
    ]
  },
  {
    category_id: "potato",
    name_en: "🥔 Potato (ଆଳୁ)",
    name_or: "🥔 ଆଳୁ ରୋଗ ଓ ସାଇତିବା",
    queries: [
      { text_or: "🥔 କୁହୁଡ଼ି ପାଗରେ ଆଳୁ ପଛୁଆ ପତ୍ରପୋଡ଼ା (Late Blight)?", text_en: "🥔 Late blight potato protection in fog/mist?" },
      { text_or: "🥔 ଆଳୁରେ କାଛୁ (Common Scab) ରୋଗ ପ୍ରତିକାର?", text_en: "🥔 Potato common scab prevention?" },
      { text_or: "📦 ଆଳୁ ଅମଳ ପରେ କିପରି ସୁରକ୍ଷିତ ସାଇତିବେ?", text_en: "📦 Safe potato storage & curing guidelines?" }
    ]
  },
  {
    category_id: "soil_organic",
    name_en: "🧪 Soil, Fertilizers & Bio (ସାର ଓ ଜୈବିକ)",
    name_or: "🧪 ସାର, ମାଟି ଓ ଜୈବିକ କାଢ଼ା",
    queries: [
      { text_or: "🧪 ୧ ଏକର ଧାନ ପାଇଁ ସନ୍ତୁଳିତ NPK ସାର ହିସାବ?", text_en: "🧪 Balanced NPK fertilizer plan for 1 acre rice?" },
      { text_or: "🧪 ମାଟି ଅମ୍ଳିଆ (Acid Soil) ହେଲେ ଚୂନ କେତେ ଦେବେ?", text_en: "🧪 Acid soil reclamation & agricultural lime dose?" },
      { text_or: "🌿 ଘରେ ନିମାସ୍ତ୍ର (Neemastra) କିପରି ତିଆରି କରିବେ?", text_en: "🌿 Homemade Neemastra recipe for sucking pests?" },
      { text_or: "🌿 ଜୀବାମୃତ (Jeevamrut) ପ୍ରସ୍ତୁତି ଓ ପ୍ରୟୋଗ ବିଧି?", text_en: "🌿 Step-by-step Jeevamrut preparation guide?" },
      { text_or: "🌿 ବ୍ରହ୍ମାସ୍ତ୍ର (Brahmastra) କୀଟନାଶକ କାଢ଼ା ପ୍ରସ୍ତୁତି?", text_en: "🌿 Brahmastra 5-leaf decoction recipe?" }
    ]
  },
  {
    category_id: "schemes",
    name_en: "🏛️ Govt Schemes & Helplines (ଯୋଜନା)",
    name_or: "🏛️ ସରକାରୀ ଯୋଜନା ଓ ସବସିଡି",
    queries: [
      { text_or: "🏛️ କାଳିଆ ଯୋଜନା (KALIA) ଓ ପିଏମ୍-କିଷାନ ସହାୟତା?", text_en: "🏛️ Odisha KALIA & PM-KISAN scheme benefits?" },
      { text_or: "☀️ ସୌର ଜଳନିଧି-୨ ରେ ୯୦% ସବସିଡି କିପରି ପାଇବେ?", text_en: "☀️ Soura Jalanidhi II solar pump subsidy process?" },
      { text_or: "🛡️ ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା (PMFBY) ୭୨ ଘଣ୍ଟା କ୍ଷତିପୂରଣ?", text_en: "🛡️ PMFBY crop insurance 72-hour claim intimation?" },
      { text_or: "📞 ଆମ କୃଷି ଓ କିଷାନ କଲ୍ ସେଣ୍ଟର ଟୋଲ୍-ଫ୍ରି ନମ୍ବର?", text_en: "📞 Odisha agriculture emergency helpline numbers?" }
    ]
  }
];

export default function ChatAssistant({ lang, isInline = false }) {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(isInline ? true : false);
  const [showQueryDrawer, setShowQueryDrawer] = useState(false);
  const [selectedCatFilter, setSelectedCatFilter] = useState('rice');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'or' 
        ? "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ AI କୃଷି ସହାୟକ। ଧାନ, ବିଲାତି ବାଇଗଣ, ଆଳୁ ଫସଲର ରୋଗ, କୀଟନାଶକ, ସାର ବା ଜୈବିକ ଚାଷ ବିଷୟରେ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ ବା ତଳେ ଥିବା '⚡ ଶୀଘ୍ର ପ୍ରଶ୍ନ' ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।"
        : "Namaskar! I am your AI Krishi Assistant. Ask me anything about Rice, Tomato, Potato diseases, pest control, fertilizers, or tap '⚡ Quick Queries' below.",
      source: "ICAR-NRRI & OUAT Agronomy Engine"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen || isInline) {
      scrollToBottom();
    }
  }, [messages, isSending, isOpen, isInline, showQueryDrawer]);

  // Clean up speech and recognition on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Voice-to-text speech recognition
  const handleToggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(lang === 'or' ? 'ଆପଣଙ୍କ ବ୍ରାଉଜରରେ ମାଇକ୍ ସୁବିଧା ନାହିଁ।' : 'Speech recognition not supported in this browser.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'or' ? 'or-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSend(transcript);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Speech recognition failed:', e);
      setIsListening(false);
    }
  };

  // Text-to-speech audio readout for bot messages
  const handleToggleSpeak = (msgId, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[\*\#\_\-\`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.lang = lang === 'or' ? 'hi-IN' : 'en-US';

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // WhatsApp share for bot advice
  const handleShareWhatsApp = (text) => {
    const cleanText = text.replace(/[\#\`]/g, '');
    const msg = `🌾 *AI କୃଷକ ସହାୟକ ପରାମର୍ଶ (Krishi AI Advice):*\n\n${cleanText}\n\n📌 *ICAR-NRRI & OUAT Verified*`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;

    setShowQueryDrawer(false); // Close quick queries drawer when a query is sent

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsSending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: lang,
          history: messages.slice(-4).map(m => ({ role: m.sender, content: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply,
        source: data.source
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: lang === 'or' 
          ? "କ୍ଷମା କରିବେ, ସର୍ଭର ସହିତ ଯୋଗାଯୋଗ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି କିଛି ସମୟ ପରେ ଚେଷ୍ଟା କରନ୍ତୁ।"
          : "Could not reach the assistant service. Please verify server status.",
        source: "System"
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeakingMsgId(null);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: lang === 'or' 
          ? "ନୂଆ ଆଲୋଚନା ଆରମ୍ଭ ହେଲା। କୃଷି ବିଷୟରେ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।"
          : "Chat cleared. Ask me any questions about your crops.",
        source: "ICAR-NRRI & OUAT Engine"
      }
    ]);
  };

  const currentCategoryObj = CATEGORIZED_QUERIES.find((c) => c.category_id === selectedCatFilter) || CATEGORIZED_QUERIES[0];

  return (
    <>
      {/* Floating Action Button (FAB) */}
      {!isInline && !isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-[#1E4D2B] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:bg-[#163B21] transition-all flex items-center space-x-2 border-2 border-[#86EFAC]/40 cursor-pointer animate-bounce hover:animate-none group"
          title="Open Krishi AI Assistant"
        >
          <Bot className="w-6 h-6 text-[#86EFAC]" />
          <span className="text-xs font-bold hidden sm:inline-block pr-1">
            {lang === 'or' ? 'କୃଷି ସହାୟକ ଚାଟ୍' : 'Ask Krishi AI'}
          </span>
        </button>
      )}

      {/* Chat Window Modal */}
      {(isOpen || isInline) && (
        <div className={isInline ? "w-full" : "fixed bottom-4 right-4 z-50 w-full sm:w-[440px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[90vh] bg-[#FDFCFA] rounded-2xl shadow-2xl border-2 border-[#1E4D2B] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"}>
          
          {/* Header */}
          <div className="bg-[#1E4D2B] text-white p-3.5 flex items-center justify-between shadow-xs flex-shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-[#2C6E3B] rounded-lg">
                <Bot className="w-5 h-5 text-[#86EFAC]" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center space-x-1.5">
                  <span>{lang === 'or' ? 'କୃଷି AI ସହାୟକ' : 'Krishi AI Agronomist'}</span>
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-[#D5DEC9]">
                  ICAR-NRRI & OUAT Verified • 20+ Topics
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-[#D5DEC9] hover:text-white hover:bg-[#2C6E3B] transition-colors cursor-pointer"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {!isInline && (
                <button
                  type="button"
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-[#D5DEC9] hover:text-white hover:bg-[#2C6E3B] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Queries Drawer Toggle Bar */}
          <div className="bg-[#FAFDF8] border-b border-[#BAC8AA] px-3 py-1.5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowQueryDrawer(!showQueryDrawer)}
              className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-[#1E4D2B] bg-[#EAF0E6] px-2.5 py-1 rounded-lg border border-[#BAC8AA] hover:bg-[#D5DEC9] transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
              <span>{lang === 'or' ? '⚡ ଶୀଘ୍ର ପ୍ରଶ୍ନୋତ୍ତର ମେନୁ (All Queries)' : '⚡ Quick Queries Menu (20+)'}</span>
              {showQueryDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <span className="text-[10px] text-[#7A6E62] font-semibold">
              {lang === 'or' ? 'ପ୍ରଶ୍ନ ବାଛି କ୍ଲିକ୍ କରନ୍ତୁ' : 'Tap any query'}
            </span>
          </div>

          {/* Full Categorized Quick Queries Drawer */}
          {showQueryDrawer && (
            <div className="bg-[#FAFDF8] border-b-2 border-[#1E4D2B] p-3 max-h-[260px] overflow-y-auto space-y-2.5 shadow-inner animate-in slide-in-from-top-2 duration-150 flex-shrink-0">
              
              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar touch-pan-x pb-1">
                {CATEGORIZED_QUERIES.map((cat) => (
                  <button
                    key={cat.category_id}
                    type="button"
                    onClick={() => setSelectedCatFilter(cat.category_id)}
                    className={`py-1 px-2 text-[11px] font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      selectedCatFilter === cat.category_id
                        ? 'bg-[#1E4D2B] text-white shadow-xs'
                        : 'bg-[#F0F5EC] text-[#5A4D41] border border-[#BAC8AA] hover:bg-[#E2EAD6]'
                    }`}
                  >
                    {lang === 'or' ? cat.name_or : cat.name_en}
                  </button>
                ))}
              </div>

              {/* Queries Grid for Selected Category */}
              <div className="grid grid-cols-1 gap-1.5 text-left">
                {currentCategoryObj.queries.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(lang === 'or' ? q.text_or : q.text_en)}
                    className="p-2 rounded-lg text-xs font-semibold bg-[#F8FAF5] border border-[#D5DEC9] text-[#2C221E] hover:bg-[#1E4D2B] hover:text-white transition-all text-left flex items-start space-x-1.5 cursor-pointer group"
                  >
                    <span className="text-[#1E4D2B] group-hover:text-white font-bold">•</span>
                    <span className="leading-snug">{lang === 'or' ? q.text_or : q.text_en}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FAFDF8]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed text-left shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#1E4D2B] text-white rounded-br-none'
                      : 'bg-[#F0F5EC] text-[#2C221E] border border-[#BAC8AA] rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                {/* Bot Message Actions: Audio Readout & WhatsApp Share */}
                {msg.sender === 'bot' && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 px-1">
                    <button
                      type="button"
                      onClick={() => handleToggleSpeak(msg.id, msg.text)}
                      className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        speakingMsgId === msg.id
                          ? 'bg-[#8B3A2B] text-white border-[#8B3A2B] animate-pulse'
                          : 'bg-[#FAFDF8] text-[#1E4D2B] border-[#BAC8AA] hover:bg-[#EAF0E6]'
                      }`}
                    >
                      {speakingMsgId === msg.id ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{speakingMsgId === msg.id ? (lang === 'or' ? 'ବନ୍ଦ' : 'Stop') : (lang === 'or' ? 'ଶୁଣନ୍ତୁ' : 'Listen')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(msg.text)}
                      className="inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#25D366]/15 text-[#15803D] border border-[#25D366]/40 hover:bg-[#25D366]/25 transition-colors cursor-pointer"
                      title="Share advice on WhatsApp"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </button>

                    {msg.source && (
                      <span className="text-[10px] text-[#7A6E62] ml-1">
                        • {msg.source}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isSending && (
              <div className="flex items-center space-x-2 text-xs text-[#5A4D41] bg-[#F0F5EC] p-2.5 rounded-xl border border-[#BAC8AA] w-max animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#1E4D2B]" />
                <span>{lang === 'or' ? 'କୃଷି ବିଶେଷଜ୍ଞ ଉତ୍ତର ପ୍ରସ୍ତୁତ କରୁଛନ୍ତି...' : 'Consulting ICAR agronomy engine...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Horizontal Scroll Bar */}
          {!showQueryDrawer && (
            <div className="px-3 py-2 bg-[#F0F5EC] border-t border-[#BAC8AA] overflow-x-auto no-scrollbar touch-pan-x flex items-center space-x-1.5 flex-shrink-0">
              {CATEGORIZED_QUERIES.flatMap(c => c.queries).slice(0, 8).map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(lang === 'or' ? q.text_or : q.text_en)}
                  className="text-[11px] font-semibold bg-[#FAFDF8] border border-[#BAC8AA] text-[#2C221E] px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-[#1E4D2B] hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  {lang === 'or' ? q.text_or : q.text_en}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer with Microphone & Send */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-[#FAFDF8] border-t border-[#BAC8AA] flex items-center space-x-2 flex-shrink-0"
          >
            {/* 1-Tap Microphone Speech-to-Text */}
            <button
              type="button"
              onClick={handleToggleListening}
              className={`p-2.5 rounded-xl transition-all cursor-pointer flex-shrink-0 ${
                isListening
                  ? 'bg-[#DC2626] text-white animate-bounce shadow-md shadow-red-500/50'
                  : 'bg-[#EAF0E6] text-[#1E4D2B] border border-[#BAC8AA] hover:bg-[#D5DEC9]'
              }`}
              title="Click and speak in Odia or English"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? (lang === 'or' ? 'ଶୁଣୁଛି, କୁହନ୍ତୁ...' : 'Listening...') : (lang === 'or' ? 'ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ ବା ମାଇକ୍ ଦବାନ୍ତୁ...' : 'Ask a question or tap mic...')}
              disabled={isSending}
              className="flex-1 text-xs sm:text-sm bg-[#F8FAF5] border border-[#BAC8AA] rounded-xl px-3 py-2 text-[#2C221E] focus:outline-none focus:border-[#1E4D2B]"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="p-2.5 bg-[#1E4D2B] text-white rounded-xl hover:bg-[#163B21] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
