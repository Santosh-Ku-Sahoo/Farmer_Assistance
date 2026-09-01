import os
import io
import pytest
from fastapi.testclient import TestClient
from PIL import Image

# Set OpenMP environment variable for Windows
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

from app import app

def test_backend_suite():
    with TestClient(app) as client:
        # 1. Health check
        res_health = client.get("/health")
        assert res_health.status_code == 200
        health_data = res_health.json()
        assert health_data["status"] == "healthy"
        assert health_data["model_loaded"] is True
        print("[TEST 1/10 PASS] /health returned healthy status and model loaded.")

        # 2. Crops list check
        res_crops = client.get("/crops")
        assert res_crops.status_code == 200
        crops_data = res_crops.json()
        crop_names = [c["name"] for c in crops_data["crops"]]
        assert "Rice" in crop_names
        assert "Tomato" in crop_names
        assert "Potato" in crop_names
        print(f"[TEST 2/10 PASS] /crops returned {len(crops_data['classes'])} classes across {crop_names}.")

        # 3. Districts list check
        res_dist = client.get("/districts")
        assert res_dist.status_code == 200
        dist_data = res_dist.json()
        assert len(dist_data["districts"]) >= 6
        print(f"[TEST 3/10 PASS] /districts returned {len(dist_data['districts'])} Odisha districts.")

        # 4. Weather Advisory endpoint (Open-Meteo & Cyclone Disaster detection)
        res_weather = client.get("/weather-advisory?district=bhubaneswar")
        assert res_weather.status_code == 200
        weather_data = res_weather.json()
        assert "temperature_c" in weather_data
        assert "spray_status" in weather_data
        assert "is_cyclone_alert" in weather_data
        print(f"[TEST 4/10 PASS] /weather-advisory -> Dist: {weather_data['district_name_en']}, Temp: {weather_data['temperature_c']}C, Spray Status: {weather_data['spray_status']}, Cyclone Alert: {weather_data['is_cyclone_alert']}")

        # 5. Mandi Prices endpoint (Agmarknet)
        res_prices = client.get("/market-prices?crop=all")
        assert res_prices.status_code == 200
        prices_data = res_prices.json()
        assert "Rice" in prices_data["data"]
        print(f"[TEST 5/10 PASS] /market-prices -> Loaded Mandi feeds for {list(prices_data['data'].keys())}")

        # 6. AI Agronomic Chat Assistant (/chat in Odia)
        res_chat_or = client.post("/chat", json={"message": "ଧାନରେ ପତ୍ରପୋଡ଼ା କିପରି ନିୟନ୍ତ୍ରଣ କରିବେ?", "language": "or"})
        assert res_chat_or.status_code == 200
        chat_data = res_chat_or.json()
        assert "reply" in chat_data
        assert len(chat_data["reply"]) > 20
        print(f"[TEST 6/10 PASS] /chat (Odia query) -> Source: {chat_data['source']}")

        # 7. AI Agronomic Chat Assistant (/chat in English)
        res_chat_en = client.post("/chat", json={"message": "How to control whitefly in tomato?", "language": "en"})
        assert res_chat_en.status_code == 200
        print(f"[TEST 7/10 PASS] /chat (English query) -> Response generated successfully.")

        # 8. Predict with valid Rice leaf image (Rice Blast)
        sample_path = os.path.join(os.path.dirname(__file__), "samples", "rice_blast.jpg")
        with open(sample_path, "rb") as f:
            res_pred = client.post("/predict", files={"file": ("rice_blast.jpg", f, "image/jpeg")}, data={"crop_hint": "Rice"})
        assert res_pred.status_code == 200
        pred_data = res_pred.json()
        assert pred_data["crop"] == "Rice"
        assert pred_data["is_confident"] is True
        assert pred_data["recommendation"] is not None
        assert pred_data["recommendation"]["dosage_per_liter_g_ml"] > 0
        print(f"[TEST 8/10 PASS] /predict (Rice Blast with hint) -> Crop: {pred_data['crop']}, Disease: {pred_data['disease_class']}, Conf: {pred_data['confidence']:.2%}, Confident: {pred_data['is_confident']}")

        # 9. Predict with Potato leaf image (Potato Late Blight)
        pot_sample = os.path.join(os.path.dirname(__file__), "samples", "potato_late_blight.jpg")
        with open(pot_sample, "rb") as f:
            res_pot = client.post("/predict", files={"file": ("potato_late_blight.jpg", f, "image/jpeg")}, data={"crop_hint": "Potato"})
        assert res_pot.status_code == 200
        pot_data = res_pot.json()
        assert pot_data["crop"] == "Potato"
        assert pot_data["is_confident"] is True
        print(f"[TEST 9/10 PASS] /predict (Potato Late Blight with hint) -> Crop: {pot_data['crop']}, Conf: {pot_data['confidence']:.2%}, Confident: {pot_data['is_confident']}")

        # 10. Invalid file type handling (rejection test)
        res_invalid = client.post("/predict", files={"file": ("test.txt", io.BytesIO(b"Not an image"), "text/plain")})
        assert res_invalid.status_code == 400
        print("[TEST 10/10 PASS] /predict properly rejected non-image payload with 400 Bad Request.")

    print("\n=======================================================")
    print("      ALL 10 AUTOMATED TEST CASES PASSED (100%)       ")
    print("=======================================================\n")

if __name__ == "__main__":
    test_backend_suite()
