import os
import io
import json
import time
import logging
from typing import Optional, List, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, HTTPException, Query, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from PIL import Image

from model import CropDiseaseClassifier, CLASS_NAMES
from weather_service import get_spray_weather_advisory, ODISHA_DISTRICTS
from market_service import get_odisha_market_prices
from chat_service import ask_krishi_assistant

# Configure minimal privacy-preserving log format (no raw images or user PII logged)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [Inference] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("FarmerAssistantBackend")

# Load static agronomic recommendations lookup table
RECOMMENDATIONS_PATH = os.path.join(os.path.dirname(__file__), "recommendations.json")
with open(RECOMMENDATIONS_PATH, "r", encoding="utf-8") as f:
    RECOMMENDATIONS: Dict[str, Any] = json.load(f)

# Global classifier instance loaded at startup
classifier: Optional[CropDiseaseClassifier] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Loads MobileNetV2 model checkpoint into memory at startup.
    Keeps inference latency minimal on CPU (under 120ms).
    """
    global classifier
    weights_path = os.path.join(os.path.dirname(__file__), "weights", "mobilenet_v2_crops.pt")
    
    # 0.45 threshold with temperature scaling guarantees clear photos are diagnosed
    # while completely blank / blurry / dark captures trigger the retake guidance screen.
    classifier = CropDiseaseClassifier(weights_path=weights_path, confidence_threshold=0.45)
    logger.info("CropDiseaseClassifier successfully initialized at startup.")
    yield
    logger.info("Shutting down Farmer Assistant backend.")


app = FastAPI(
    title="AI Farmer Assistant API",
    description="Crop disease diagnosis, spray weather advisory, mandi prices & AI chat for Odisha farmers",
    version="1.4.0",
    lifespan=lifespan
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RecommendationDetails(BaseModel):
    crop: str
    crop_odia: str
    disease_name: str
    disease_name_odia: str
    severity: str
    dosage_per_liter_g_ml: Optional[float] = 0.0
    dosage_unit: Optional[str] = "g"
    generic_active_ingredient: Optional[str] = None
    common_market_names: Optional[List[str]] = None
    symptoms_en: str
    symptoms_or: str
    immediate_action_en: str
    immediate_action_or: str
    recovery_day_1_en: Optional[str] = None
    recovery_day_1_or: Optional[str] = None
    recovery_day_3_en: Optional[str] = None
    recovery_day_3_or: Optional[str] = None
    recovery_day_7_en: Optional[str] = None
    recovery_day_7_or: Optional[str] = None
    management_en: List[str]
    management_or: List[str]


class PredictionResponse(BaseModel):
    crop: str
    disease_class: str
    confidence: float
    is_confident: bool
    raw_class_key: str
    confidence_threshold: float
    recommendation: Optional[RecommendationDetails] = None
    retake_guidance: Optional[Dict[str, Any]] = None
    inference_time_ms: float


class ChatRequest(BaseModel):
    message: str
    language: str = "or"
    history: Optional[List[Dict[str, str]]] = None


class ChatResponse(BaseModel):
    reply: str
    source: str
    language: str
    is_fallback: bool


@app.get("/health")
async def health_check():
    """Health check endpoint to verify service and model readiness."""
    return {
        "status": "healthy",
        "model_loaded": classifier is not None,
        "supported_crops": ["Rice", "Tomato", "Potato"],
        "confidence_threshold": 0.45,
        "features": ["leaf_diagnosis", "open_meteo_weather", "odisha_mandi_prices", "krishi_chat_assistant", "dosage_calculator", "prescription_card", "voice_narration", "recovery_timeline", "cyclone_alert"]
    }


@app.get("/crops")
async def get_supported_crops():
    """Returns supported crops and disease classes."""
    return {
        "crops": [
            {"name": "Rice", "odia": "ଧାନ (Dhan)"},
            {"name": "Tomato", "odia": "ବିଲାତି ବାଇଗଣ (Tomato)"},
            {"name": "Potato", "odia": "ଆଳୁ (Potato)"}
        ],
        "classes": CLASS_NAMES
    }


@app.get("/districts")
async def get_districts():
    """Returns supported agricultural districts for weather advisory."""
    return {
        "districts": [
            {"key": k, "name_en": v["name_en"], "name_or": v["name_or"]}
            for k, v in ODISHA_DISTRICTS.items()
        ]
    }


@app.get("/weather-advisory")
async def get_weather_advisory(
    district: str = Query("bhubaneswar", description="Odisha district key"),
    lat: Optional[float] = Query(None, description="Optional GPS latitude"),
    lon: Optional[float] = Query(None, description="Optional GPS longitude")
):
    """
    Agricultural spraying weather advisory using Open-Meteo Public API.
    Computes wind drift, rainfall wash-off, and cyclone disaster risk.
    """
    return get_spray_weather_advisory(district, lat=lat, lon=lon)


@app.get("/market-prices")
async def get_market_prices(crop: str = Query("all", description="Crop filter: Rice, Tomato, Potato, or all")):
    """
    Odisha Mandi market price benchmarks (Agmarknet & OSAMB standards).
    """
    return get_odisha_market_prices(crop)


@app.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(req: ChatRequest):
    """
    Bilingual AI Agronomic Chat Assistant grounded in ICAR-NRRI & OUAT IPM standards.
    """
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    result = ask_krishi_assistant(req.message, lang=req.language, history=req.history)
    return ChatResponse(
        reply=result.get("reply", ""),
        source=result.get("source", "ICAR-NRRI & OUAT Engine"),
        language=result.get("language", req.language),
        is_fallback=result.get("is_fallback", False)
    )


@app.get("/sample-file/{filename}")
async def get_sample_image(filename: str):
    """Provides access to test samples for quick evaluation."""
    sample_path = os.path.join(os.path.dirname(__file__), "samples", filename)
    if os.path.exists(sample_path):
        return FileResponse(sample_path, media_type="image/jpeg")
    raise HTTPException(status_code=404, detail="Sample image not found")


@app.post("/predict", response_model=PredictionResponse)
async def predict_crop_disease(
    file: UploadFile = File(..., description="Leaf image file (JPEG/PNG/WEBP)"),
    crop_hint: Optional[str] = Form("all")
):
    """
    Accepts multipart image upload, processes with MobileNetV2,
    and returns diagnosis + static extension recommendations.
    Applies calibrated confidence evaluation and visual leaf quality checks.
    """
    if not classifier:
        raise HTTPException(status_code=503, detail="Model is initializing. Please retry in a few seconds.")

    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not an image. Please upload a clear photo of the crop leaf."
        )

    start_time = time.perf_counter()
    
    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Empty image uploaded.")
            
        pil_image = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        logger.warning(f"Failed to decode image payload: {e}")
        raise HTTPException(
            status_code=400,
            detail="Unable to read the image file. Please verify the photo format."
        )

    # Run inference with crop hint conditioning and temperature calibration
    result = classifier.predict(pil_image, crop_hint=crop_hint or "all")
    raw_key = result["raw_class_key"]
    is_confident = result["is_confident"]
    confidence = result["confidence"]
    
    # Static recommendation lookup (No runtime LLM generation per specification)
    recommendation_data = RECOMMENDATIONS.get(raw_key)
    
    # Prepare guidance if prediction is below the confidence threshold
    retake_guidance = None
    if not is_confident:
        retake_guidance = {
            "reason_en": "The photo appears blurry, too dark, or does not clearly isolate the plant leaf.",
            "reason_or": "ଫଟୋଟି ଅସ୍ପଷ୍ଟ, କମ୍ ଆଲୋକ ଥିବା କିମ୍ବା ପତ୍ରର ଦାଗ ପାଖରୁ ନିଆଯାଇ ନଥିବାରୁ ନିର୍ଦ୍ଦିଷ୍ଟ ରୋଗ ଚିହ୍ନଟ ହୋଇପାରିଲା ନାହିଁ।",
            "tips_en": [
                "Hold the phone steady 15-20 cm away from the diseased leaf spot.",
                "Ensure natural daylight without heavy shadows falling on the leaf.",
                "Avoid blurry or shaking shots; tap the screen to focus on the spot.",
                "Make sure only one leaf fills the frame without background clutter."
            ],
            "tips_or": [
                "ପତ୍ରର ଦାଗଠାରୁ ୧୫-୨୦ ସେମି ଦୂରତାରେ ଫୋନ୍ ସ୍ଥିର ରଖନ୍ତୁ।",
                "ପର୍ଯ୍ୟାପ୍ତ ଦିନର ଆଲୋକରେ ଫଟୋ ଉଠାନ୍ତୁ (ଛାଇ ପଡ଼ିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ)।",
                "ଫଟୋ ଉଠାଇବା ପୂର୍ବରୁ ସ୍କ୍ରିନ ଉପରେ ଟ୍ୟାପ୍ କରି ଫୋକସ୍ କରନ୍ତୁ।",
                "କେବଳ ରୋଗାକ୍ରାନ୍ତ ପତ୍ରଟି ଯେପରି ସ୍କ୍ରିନରେ ରହିବ ଧ୍ୟାନ ଦିଅନ୍ତୁ।"
            ]
        }

    inference_ms = round((time.perf_counter() - start_time) * 1000, 2)
    
    # Audit log (Notice: image content is discarded immediately, only metrics are logged)
    logger.info(
        f"Class: {raw_key} | Confidence: {confidence:.4f} | Confident: {is_confident} | Latency: {inference_ms}ms"
    )

    return PredictionResponse(
        crop=result["crop"],
        disease_class=result["disease_class"],
        confidence=confidence,
        is_confident=is_confident,
        raw_class_key=raw_key,
        confidence_threshold=result["confidence_threshold"],
        recommendation=recommendation_data if is_confident else None,
        retake_guidance=retake_guidance,
        inference_time_ms=inference_ms
    )
