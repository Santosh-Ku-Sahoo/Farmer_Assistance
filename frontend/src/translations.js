export const translations = {
  en: {
    app_title: "AI Farmer Assistant",
    app_subtitle: "Crop disease diagnosis, spray weather, market prices & AI chat for Odisha farmers",
    supported_crops: "Crops in scope: Rice, Tomato, Potato",
    select_crop_hint: "Filter Crop (Optional)",
    all_crops: "Auto-detect / All Crops",
    rice: "Rice",
    tomato: "Tomato",
    potato: "Potato",

    // Navigation Tabs
    tab_diagnosis: "Leaf Diagnosis",
    tab_guide: "Growing Guide",
    tab_weather: "Spray Weather",
    tab_mandi: "Mandi Prices",
    tab_chat: "Krishi AI Chat",
    
    // Empty state & Guide
    empty_title: "Take a photo of the affected leaf",
    empty_instruction_1: "Focus directly on the leaf spot or discoloration.",
    empty_instruction_2: "Ensure good daylight without heavy shadows or glare.",
    empty_instruction_3: "Hold camera 15-20 cm away and keep steady.",
    
    // Actions
    take_photo: "Take Leaf Photo",
    upload_photo: "Upload Photo",
    analyzing: "Diagnosing leaf symptoms...",
    analyzing_sub: "Running MobileNetV2 in-process inference...",
    retake_photo: "Take New Photo",
    change_photo: "Change Photo",
    
    // Results
    diagnosis_title: "Diagnosis Result",
    crop_label: "Crop",
    disease_label: "Detected Disease",
    confidence_label: "Model Confidence",
    severity_label: "Severity",
    symptoms_title: "Key Symptoms",
    immediate_title: "Immediate Field Action",
    treatment_title: "Extension Treatment Plan (IPM)",
    
    // Retake Guidance (Low Confidence)
    uncertain_title: "Photo Unclear — Please Retake",
    uncertain_badge: "Low Confidence (<60%)",
    uncertain_explanation: "The model cannot reliably identify the disease because leaf lesions are blurry, out-of-focus, or masked by shadows.",
    tips_header: "How to get an accurate diagnosis:",
    tip_distance: "Get closer to the leaf spot (15 to 20 cm).",
    tip_light: "Use direct morning or afternoon natural sunlight.",
    tip_focus: "Tap the diseased spot on your screen to lock focus.",
    tip_single_leaf: "Ensure only the affected leaf is inside the frame.",
    retake_now_button: "Retake Photo with Better Focus",
    
    // Severities
    severity_high: "High Severity",
    severity_medium: "Moderate",
    severity_none: "Healthy Foliage",
    
    // Weather & Spray Advisory
    weather_title: "Today's Agricultural Spray Weather",
    weather_subtitle: "Real-time weather from Open-Meteo Public API for pesticide/fungicide application",
    select_district: "Select District",
    temp_label: "Temperature",
    humidity_label: "Humidity",
    wind_label: "Wind Speed",
    rain_risk_label: "Rain Probability",
    spray_recommendation: "Spraying Advisory",
    
    // Mandi Prices
    mandi_title: "Odisha Mandi Commodity Prices",
    mandi_subtitle: "Latest market price benchmarks from Agmarknet & OSAMB",
    mandi_market: "Market / Mandi",
    mandi_min: "Min Price",
    mandi_max: "Max Price",
    mandi_modal: "Modal (Average)",
    msp_label: "Govt MSP Benchmark",

    // Network / Error states
    network_error_title: "Diagnosis Request Failed",
    network_error_desc: "Could not reach the local backend server. Ensure FastAPI is running on port 8000.",
    retry_button: "Retry Diagnosis",
    offline_badge: "Offline",
    online_badge: "Connected",
    privacy_note: "Privacy Note: Photos are processed in-memory and never stored on the server."
  },
  or: {
    app_title: "କୃଷକ ସହାୟକ (AI Farmer Assistant)",
    app_subtitle: "ଓଡ଼ିଶାର କୃଷକଙ୍କ ପାଇଁ ଫସଲ ରୋଗ ଚିହ୍ନଟ, ସ୍ପ୍ରେ ପାଗ, ମଣ୍ଡି ଦର ଓ AI ଚାଟ୍",
    supported_crops: "ଅନ୍ତର୍ଭୁକ୍ତ ଫସଲ: ଧାନ, ବିଲାତି ବାଇଗଣ, ଆଳୁ",
    select_crop_hint: "ଫସଲ ବାଛନ୍ତୁ (ଇଚ୍ଛାଧୀନ)",
    all_crops: "ସ୍ୱୟଂଚାଳିତ ଚିହ୍ନଟ (ସମସ୍ତ ଫସଲ)",
    rice: "ଧାନ (Rice)",
    tomato: "ବିଲାତି ବାଇଗଣ (Tomato)",
    potato: "ଆଳୁ (Potato)",

    // Navigation Tabs
    tab_diagnosis: "ପତ୍ର ରୋଗ ପରୀକ୍ଷା",
    tab_guide: "ଚାଷ ପ୍ରଣାଳୀ",
    tab_weather: "ସ୍ପ୍ରେ ପାଗ ସୂଚନା",
    tab_mandi: "ଓଡ଼ିଶା ମଣ୍ଡି ଦର",
    tab_chat: "କୃଷି AI ଚାଟ୍",
    
    // Empty state & Guide
    empty_title: "ରୋଗାକ୍ରାନ୍ତ ପତ୍ରର ଫଟୋ ଉଠାନ୍ତୁ",
    empty_instruction_1: "ପତ୍ରର ଦାଗ ବା ପୋଡ଼ା ଅଂଶ ଉପରେ କ୍ୟାମେରା ଫୋକସ୍ କରନ୍ତୁ।",
    empty_instruction_2: "ଭଲ ଦିନର ଆଲୋକରେ ଫଟୋ ଉଠାନ୍ତୁ (ଛାଇ ପଡ଼ିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ)।",
    empty_instruction_3: "୧୫ ରୁ ୨୦ ସେମି ଦୂରରେ ଫୋନ୍ ସ୍ଥିର ରଖି ଫଟୋ ନିଅନ୍ତୁ।",
    
    // Actions
    take_photo: "ପତ୍ରର ଫଟୋ ଉଠାନ୍ତୁ",
    upload_photo: "ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
    analyzing: "ପତ୍ରର ଲକ୍ଷଣ ପରୀକ୍ଷା କରାଯାଉଛି...",
    analyzing_sub: "MobileNetV2 ମଡେଲ୍ ଦ୍ୱାରା ଯାଞ୍ଚ ଚାଲିଛି...",
    retake_photo: "ଅନ୍ୟ ଫଟୋ ନିଅନ୍ତୁ",
    change_photo: "ଫଟୋ ବଦଳାନ୍ତୁ",
    
    // Results
    diagnosis_title: "ରୋଗ ନିର୍ଣ୍ଣୟ ଫଳାଫଳ",
    crop_label: "ଫସଲ",
    disease_label: "ଚିହ୍ନଟ ରୋଗ",
    confidence_label: "ନିର୍ଭୁଲତା (Confidence)",
    severity_label: "ରୋଗର ମାତ୍ରା",
    symptoms_title: "ମୁଖ୍ୟ ଲକ୍ଷଣ",
    immediate_title: "ତୁରନ୍ତ କ୍ଷେତ୍ର କାର୍ଯ୍ୟାନୁଷ୍ଠାନ",
    treatment_title: "କୃଷି ବିଭାଗ ପରାମର୍ଶିତ ପ୍ରତିକାର",
    
    // Retake Guidance (Low Confidence)
    uncertain_title: "ଫଟୋ ଅସ୍ପଷ୍ଟ — ଦୟାକରି ପୁନର୍ବାର ଫଟୋ ଉଠାନ୍ତୁ",
    uncertain_badge: "କମ୍ ନିଶ୍ଚିତତା (<୬୦%)",
    uncertain_explanation: "ପତ୍ରର ଦାଗ ଅସ୍ପଷ୍ଟ ଥିବାରୁ କିମ୍ବା ଆଲୋକ କମ୍ ଥିବାରୁ ରୋଗ ସଠିକ୍ ଭାବେ ଚିହ୍ନଟ ହୋଇପାରିଲା ନାହିଁ।",
    tips_header: "ସଠିକ୍ ଫଟୋ ଉଠାଇବା ପାଇଁ ପରାମର୍ଶ:",
    tip_distance: "ପତ୍ରର ରୋଗାକ୍ରାନ୍ତ ଅଂଶ ପାଖରୁ (୧୫-୨୦ ସେମି) ଫଟୋ ନିଅନ୍ତୁ।",
    tip_light: "ଖରାରେ ବା ଉଜ୍ଜ୍ୱଳ ପ୍ରାକୃତିକ ଆଲୋକରେ ଫଟୋ ଉଠାନ୍ତୁ।",
    tip_focus: "ଫୋନ୍ ସ୍କ୍ରିନରେ ପତ୍ର ଦାଗ ଉପରେ ଆଙ୍ଗୁଠି ଛୁଇଁ ଫୋକସ୍ କରନ୍ତୁ।",
    tip_single_leaf: "ସ୍କ୍ରିନରେ କେବଳ ଗୋଟିଏ ରୋଗାକ୍ରାନ୍ତ ପତ୍ର ରଖନ୍ତୁ।",
    retake_now_button: "ସ୍ପଷ୍ଟ ଭାବେ ପୁନର୍ବାର ଫଟୋ ନିଅନ୍ତୁ",
    
    // Severities
    severity_high: "ଗୁରୁତର ରୋଗ",
    severity_medium: "ମଧ୍ୟମ ଧରଣର",
    severity_none: "ସୁସ୍ଥ ପତ୍ର",

    // Weather & Spray Advisory
    weather_title: "ଆଜିର ଔଷଧ ସ୍ପ୍ରେ ପାଗ ସୂଚନା",
    weather_subtitle: "Open-Meteo ପବ୍ଲିକ API ରୁ ପ୍ରତ୍ୟକ୍ଷ ପାଣିପାଗ ତଥ୍ୟ",
    select_district: "ଜିଲ୍ଲା ବାଛନ୍ତୁ",
    temp_label: "ତାପମାତ୍ରା",
    humidity_label: "ବାୟୁମଣ୍ଡଳ ଆର୍ଦ୍ରତା",
    wind_label: "ପବନର ବେଗ",
    rain_risk_label: "ବର୍ଷା ସମ୍ଭାବନା",
    spray_recommendation: "ସ୍ପ୍ରେ ପରାମର୍ଶ",

    // Mandi Prices
    mandi_title: "ଓଡ଼ିଶା ମଣ୍ଡି ଫସଲ ଦର",
    mandi_subtitle: "Agmarknet ଏବଂ OSAMB ଅନୁମୋଦିତ ମଣ୍ଡି ମୂଲ୍ୟ",
    mandi_market: "ମଣ୍ଡି / ବଜାର",
    mandi_min: "ସର୍ବନିମ୍ନ ଦର",
    mandi_max: "ସର୍ବାଧିକ ଦର",
    mandi_modal: "ହାରାହାରି ଦର (Modal)",
    msp_label: "ସରକାରୀ ସର୍ବନିମ୍ନ ସହାୟକ ମୂଲ୍ୟ (MSP)",
    
    // Network / Error states
    network_error_title: "ସଂଯୋଗ ହୋଇପାରିଲା ନାହିଁ",
    network_error_desc: "ସର୍ଭର ସହିତ ଯୋଗାଯୋଗ ବିଚ୍ଛିନ୍ନ ହୋଇଛି। ଦୟାକରି ଯାଞ୍ଚ କରନ୍ତୁ।",
    retry_button: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
    offline_badge: "ଅଫଲାଇନ୍",
    online_badge: "ସଂଯୁକ୍ତ",
    privacy_note: "ଗୋପନୀୟତା ସୂଚନା: ଆପଣଙ୍କ ଫଟୋ ସର୍ଭରରେ ସାଇତି ରଖାଯାଏ ନାହିଁ।"
  }
};
