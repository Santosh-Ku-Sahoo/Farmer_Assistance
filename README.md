# 🌿 AI-Powered Digital Agronomist & Farmer Assistant (କୃଷକ ସହାୟକ)
## *Bilingual Leaf Disease Diagnosis, Explainable AI (XAI), Agrometeorology, Mandi Economics & Comprehensive Rural Agricultural Extension Hub for Smallholder Farmers in Odisha, India*

---

## 🌟 Executive Summary

The **AI Farmer Assistant (କୃଷକ ସହାୟକ)** is a production-ready, full-stack, offline-capable digital agronomy platform designed specifically for smallholder farmers in Odisha, India. 

It addresses key barriers in rural smallholder farming: **delayed leaf disease identification**, **middleman fertilizer/chemical fraud**, **uncalibrated spray dosages**, **cyclonic pesticide wash-off**, **erratic market prices**, and **language accessibility**.

Grounded in package of practices from **ICAR-National Rice Research Institute (NRRI, Cuttack)** and **Odisha University of Agriculture and Technology (OUAT, Bhubaneswar)**, the system combines deep learning computer vision, explainable artificial intelligence (XAI), real-time agrometeorology, and an extensive 4-pillar rural extension service hub into a unified, high-contrast, vernacular-first progressive web application (PWA).

---

## 🚀 Key Feature Matrix

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   AI FARMER ASSISTANT ECOSYSTEM                                  │
├───────────────────────────────────┬───────────────────────────────────┬──────────────────────────┤
│ 1. 🌿 VISION AI & XAI DIAGNOSIS   │ 2. 🌦️ WEATHER & MANDI ECONOMICS   │ 3. 🏛️ 4-PILLAR EXTENSION │
├───────────────────────────────────┼───────────────────────────────────┼──────────────────────────┤
│ • MobileNetV2 Neural Network      │ • Real-time Open-Meteo Weather    │ 🌱 Soil & Nutrition:     │
│ • 16 Disease & Healthy Classes    │ • 📍 1-Tap GPS Device Location    │ • ⚖️ 45kg Fertilizer Bags│
│ • Rice, Tomato & Potato Support   │ • 🚨 Bay of Bengal Cyclone Alert  │ • 🧪 Soil pH & Lime Recl.│
│ • T=0.55 Calibrated Probabilities │ • Odisha Mandi Rates (Agmarknet)  │ • 🌱 Bio-Inoculants      │
│ • <80ms CPU Inference Latency     │ • Government MSP Tracking         │ • 🌾 100-Seed Germination│
│ • 🔍 Explainable AI Lesion Heatmap│ • 📒 Farm Khata Profit Ledger     │ • 🔄 Green Manure Rotat. │
│ • 🔊 Spoken Odia/English Narration│                                   │                          │
│ • 🛒 1-Tap Retail Prescription    │ 4. 🎙️ KRISHI AI VOICE CHAT        │ 🛡️ Crop Protection:      │
│ • 💬 1-Tap Direct WhatsApp Share  │ • 🎙️ 1-Tap Voice Speech-to-Text   │ • 🧲 Tank-Mix Jar Test   │
│ • 🧮 Knapsack Spray Land Dosage   │ • 🔊 1-Tap Spoken Voice Output    │ • 🌿 Bio-Pesticides      │
│ • 📅 7-Day Disease Recovery Track │ • 📲 1-Tap WhatsApp Share Advice  │ • 🌾 Weed Herbicide Guide│
│ • 📖 Sowing-to-Harvest Guide      │ • ⚡ 20+ Categorized Quick Menu   │ • 🌊 Flood/Drought Reviv.│
└───────────────────────────────────┴───────────────────────────────────┴──────────────────────────┘
```

---

## 🏗️ Technical Architecture & Separation of Concerns

```
[ Frontend: React 19 + Tailwind CSS + Lucide Icons + Vite ]
   │
   ├── 1. Leaf Capture / Gallery Dropzone (Auto-compressed to WebP/JPEG via Canvas)
   ├── 2. Crop Context Filter: [All, Rice, Tomato, Potato]
   ├── 3. Glare-Resistant High-Contrast Odia/English UI Switcher
   ├── 4. Speech Synthesis Narration (Web Speech API: 'or-IN' / 'hi-IN' / 'en-IN')
   ├── 5. Explainable AI (XAI) Grad-CAM Lesion Heatmap Overlay & Saliency Slider
   ├── 6. 1-Tap Retail Prescription Slip Modal with Direct WhatsApp Sharing
   ├── 7. Clean 4-Category Agri Care Hub (AgriServicesHub.jsx)
   └── 8. Voice-Enabled Krishi AI Chat Assistant (Web Speech Recognition + Audio Readout)
   │
   ▼ HTTP REST API (FastAPI @ Port 8000)
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                  FASTAPI BACKEND SERVICE                                  │
├───────────────────────────────┬───────────────────────────────┬───────────────────────────┤
│ • /predict (MobileNetV2 Torch)│ • /weather-advisory (Open-Met)│ • /chat (ICAR Grounded)   │
│ • /crops (16-Class Metadata)  │ • /market-prices (Agmarknet)  │ • /districts (Odisha GPS) │
└───────────────────────────────┴───────────────────────────────┴───────────────────────────┘
```

---

## 📋 Complete 16-Class Diagnostic Coverage

| Crop | Disease / Healthy Class | Pathogen Type | ICAR-NRRI / OUAT Treatment Recommendation |
| :--- | :--- | :--- | :--- |
| **Rice (ଧାନ)** | Leaf Blast (*ମହିଷା ରୋଗ*) | Fungal (*Magnaporthe oryzae*) | Stop Urea; Spray Tricyclazole 75% WP @ 0.6 g/L |
| **Rice (ଧାନ)** | Brown Spot (*ବାଦାମୀ ଦାଗ*) | Fungal (*Bipolaris oryzae*) | Spray Mancozeb 75% WP @ 2 g/L; Correct soil potassium |
| **Rice (ଧାନ)** | Bacterial Leaf Blight (*ଜୀବାଣୁ ପତ୍ରପୋଡ଼ା*) | Bacterial (*Xanthomonas oryzae*) | Plantomycin (1.5g/10L) + Copper Oxychloride (25g/10L) |
| **Rice (ଧାନ)** | Sheath Blight (*କାଣ୍ଡପଚା ରୋଗ*) | Fungal (*Rhizoctonia solani*) | Hexaconazole 5% EC @ 2 ml/L or Validamycin 3% L |
| **Rice (ଧାନ)** | Stem Borer / Deadheart (*କାଣ୍ଡବିନ୍ଧା*) | Insect Pest (*Scirpophaga*) | Coragen @ 0.4 ml/L or Cartap 4G @ 7.5 kg/acre |
| **Rice (ଧାନ)** | Brown Plant Hopper (*ମାଟିଆ ଗୁଣ୍ଡି*) | Insect Pest (*Nilaparvata lugens*) | Pymetrozine 50% WDG (Chess @ 0.6 g/L); Drain field water |
| **Rice (ଧାନ)** | Healthy Leaf (*ସୁସ୍ଥ ଧାନ ପତ୍ର*) | N/A | Balanced NPK (80:40:40) + AWD water management |
| **Tomato (ବିଲାତି)** | Early Blight (*ପ୍ରାଥମିକ ପତ୍ରପୋଡ଼ା*) | Fungal (*Alternaria solani*) | Mancozeb 75% WP @ 2.5 g/L; Prune lower soil-touching leaves |
| **Tomato (ବିଲାତି)** | Late Blight (*ପଛୁଆ ପତ୍ରପୋଡ଼ା*) | Oomycete (*Phytophthora infestans*) | Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ @ 2.5 g/L) |
| **Tomato (ବିଲାତି)** | Leaf Curl Virus (*କୁଞ୍ଚୁକୁଞ୍ଚିଆ ରୋଗ*) | Viral (*ToLCV* via Whitefly) | Yellow sticky traps + Imidacloprid 17.8% SL @ 0.5 ml/L |
| **Tomato (ବିଲାତି)** | Bacterial Spot (*ଜୀବାଣୁ ଦାଗ*) | Bacterial (*Xanthomonas*) | Copper Hydroxide 53.8% DF @ 2 g/L |
| **Tomato (ବିଲାତି)** | Septoria Leaf Spot (*ସେପ୍ଟୋରିଆ ଦାଗ*) | Fungal (*Septoria lycopersici*) | Chlorothalonil 75% WP @ 2 g/L |
| **Tomato (ବିଲାତି)** | Healthy Tomato (*ସୁସ୍ଥ ଟମାଟୋ*) | N/A | 3-wire bamboo trellis staking + 5% neem oil preventative |
| **Potato (ଆଳୁ)** | Early Blight (*ପ୍ରାଥମିକ କଳଙ୍କୀ*) | Fungal (*Alternaria solani*) | Propineb 70% WP (Antracol @ 2 g/L) |
| **Potato (ଆଳୁ)** | Late Blight (*ମଡ଼କ ରୋଗ*) | Oomycete (*Phytophthora infestans*) | Dimethomorph 50% WP @ 1 g/L or Cymoxanil + Mancozeb @ 2.5 g/L |
| **Potato (ଆଳୁ)** | Healthy Potato (*ସୁସ୍ଥ ଆଳୁ ଗଛ*) | N/A | Ridge earthing-up + stop watering 10 days before harvest |

---

## ⚡ How to Run Manually

### Prerequisites
- **Python 3.10+** (Anaconda or standard Python)
- **Node.js 18+ & npm**

---

### Option A: 1-Click Startup (Windows)
Double-click the **`run_app.bat`** file located in the root directory. It will automatically launch both the backend and frontend in separate command windows and open the app.

---

### Option B: Step-by-Step Manual Terminal Execution

#### 1. Start the FastAPI Backend Server
Open a **PowerShell** or **Command Prompt** window:

```powershell
# 1. Navigate to the backend folder
cd "c:\Users\asus\OneDrive\Documents\farmer assistant\backend"

# 2. Prevent OpenMP duplicate library conflict (Windows Anaconda)
$env:KMP_DUPLICATE_LIB_OK="TRUE"

# 3. Launch the FastAPI server
& "C:\Users\asus\anaconda3\python.exe" -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```
> **Backend URL**: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
> **Interactive Swagger API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

#### 2. Start the Vite React Frontend Server
Open a **second** terminal window:

```powershell
# 1. Navigate to the frontend folder
cd "c:\Users\asus\OneDrive\Documents\farmer assistant\frontend"

# 2. Start Vite server
npm run dev -- --host 0.0.0.0 --port 5173
```
> **Web App URL**: [http://localhost:5173](http://localhost:5173)

---

## 🛡️ Running Automated Tests

Run the full end-to-end automated test suite:
```powershell
cd "c:\Users\asus\OneDrive\Documents\farmer assistant"
$env:KMP_DUPLICATE_LIB_OK="TRUE"
& "C:\Users\asus\anaconda3\python.exe" -m pytest backend/test_api.py -v
```
All **10 / 10 automated test suites** pass with 100% score covering:
1. `/health` system liveness & model checkpoint validation.
2. `/crops` metadata integrity for 16 crop-disease classes.
3. `/districts` Odisha geographical coverage.
4. `/weather-advisory` Open-Meteo integration and Bay of Bengal cyclone trigger.
5. `/market-prices` Agmarknet & OSAMB Mandi benchmark rates.
6. `/chat` Odia agronomic prompt inference.
7. `/chat` English agronomic prompt inference.
8. `/predict` High-confidence leaf diagnosis with calibrated confidence score.
9. `/predict` Low-confidence / non-leaf edge case retake interception.
10. `/predict` Crop-hint conditioning filter.

---

## 📄 License & Attribution
- Grounded in agricultural packages of practices published by **ICAR-NRRI (Cuttack)** and **OUAT (Bhubaneswar)**.
- Weather data provided via **Open-Meteo Public API** (Non-commercial open-access).
- Mandi price data benchmarked from **Agmarknet / OSAMB Odisha**.
- Built with ❤️ for the farming community of Odisha.
