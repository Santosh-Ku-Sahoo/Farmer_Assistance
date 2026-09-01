import os
from PIL import Image, ImageDraw
from train import generate_synthetic_leaf

def create_sample_images():
    os.makedirs("samples", exist_ok=True)
    
    # 1. Clear leaf samples
    samples = [
        ("rice_blast.jpg", "Rice___Leaf_Blast", 101),
        ("rice_brown_spot.jpg", "Rice___Brown_Spot", 102),
        ("rice_healthy.jpg", "Rice___Healthy", 103),
        ("tomato_early_blight.jpg", "Tomato___Early_Blight", 104),
        ("tomato_yellow_curl.jpg", "Tomato___Yellow_Leaf_Curl_Virus", 105),
        ("tomato_healthy.jpg", "Tomato___Healthy", 106),
        ("potato_late_blight.jpg", "Potato___Late_Blight", 107),
        ("potato_healthy.jpg", "Potato___Healthy", 108)
    ]
    
    for filename, class_name, seed in samples:
        img = generate_synthetic_leaf(class_name, size=(400, 400), seed=seed)
        path = os.path.join("samples", filename)
        img.save(path, quality=90)
        print(f"Generated sample: {path}")
        
    # 2. Out-of-distribution / ambiguous sample (e.g. wall/floor/blurry texture) to trigger retake state
    ood_img = Image.new("RGB", (400, 400), color=(180, 180, 180))
    d = ImageDraw.Draw(ood_img)
    for i in range(0, 400, 30):
        d.line([(0, i), (400, i)], fill=(160, 160, 160), width=2)
    ood_path = os.path.join("samples", "unclear_photo.jpg")
    ood_img.save(ood_path, quality=80)
    print(f"Generated low-confidence sample: {ood_path}")

if __name__ == "__main__":
    create_sample_images()
