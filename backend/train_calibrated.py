import os
import json
import time
import math
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms, models
from PIL import Image, ImageDraw, ImageFilter

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

CLASS_NAMES = [
    "Rice___Bacterial_Leaf_Blight",
    "Rice___Brown_Spot",
    "Rice___Leaf_Blast",
    "Rice___Healthy",
    "Tomato___Bacterial_Spot",
    "Tomato___Early_Blight",
    "Tomato___Late_Blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_Leaf_Spot",
    "Tomato___Target_Spot",
    "Tomato___Yellow_Leaf_Curl_Virus",
    "Tomato___Mosaic_Virus",
    "Tomato___Healthy",
    "Potato___Early_Blight",
    "Potato___Late_Blight",
    "Potato___Healthy"
]

NUM_CLASSES = len(CLASS_NAMES)
CLASS_TO_IDX = {name: idx for idx, name in enumerate(CLASS_NAMES)}
IDX_TO_CLASS = {idx: name for idx, name in enumerate(CLASS_NAMES)}

def generate_rich_leaf(class_name: str, size=(224, 224), seed=42) -> Image.Image:
    rng = np.random.RandomState(seed)
    
    # Specific color palettes for each crop and condition
    if "Rice" in class_name:
        if "Healthy" in class_name:
            bg_color = (rng.randint(35, 65), rng.randint(145, 195), rng.randint(35, 70))
        elif "Bacterial" in class_name:
            bg_color = (rng.randint(60, 95), rng.randint(130, 170), rng.randint(30, 60))
        elif "Blast" in class_name:
            bg_color = (rng.randint(50, 80), rng.randint(125, 165), rng.randint(35, 65))
        else: # Brown spot
            bg_color = (rng.randint(55, 85), rng.randint(120, 160), rng.randint(30, 55))
    elif "Potato" in class_name:
        if "Healthy" in class_name:
            bg_color = (rng.randint(25, 50), rng.randint(120, 170), rng.randint(25, 60))
        elif "Late_Blight" in class_name:
            bg_color = (rng.randint(35, 65), rng.randint(85, 125), rng.randint(25, 50))
        else:
            bg_color = (rng.randint(35, 60), rng.randint(105, 145), rng.randint(30, 55))
    else: # Tomato
        if "Healthy" in class_name:
            bg_color = (rng.randint(30, 60), rng.randint(140, 185), rng.randint(30, 65))
        elif "Yellow_Leaf_Curl" in class_name:
            bg_color = (rng.randint(120, 175), rng.randint(165, 205), rng.randint(30, 70))
        else:
            bg_color = (rng.randint(35, 65), rng.randint(115, 155), rng.randint(35, 60))

    img = Image.new("RGB", size, color=bg_color)
    draw = ImageDraw.Draw(img)
    width, height = size
    mid_x = width // 2

    # Draw natural leaf vein structures
    for offset in range(-15, 20, 8):
        draw.line([(mid_x + offset, 0), (mid_x - offset, height)], fill=(max(0, bg_color[0]-15), min(255, bg_color[1]+20), max(0, bg_color[2]-10)), width=2)
    for y in range(15, height, 20):
        draw.line([(mid_x, y), (0, y + rng.randint(5, 25))], fill=(max(0, bg_color[0]-10), min(255, bg_color[1]+15), max(0, bg_color[2]-5)), width=1)
        draw.line([(mid_x, y), (width, y + rng.randint(5, 25))], fill=(max(0, bg_color[0]-10), min(255, bg_color[1]+15), max(0, bg_color[2]-5)), width=1)

    # Class-specific lesions
    if "Rice___Bacterial_Leaf_Blight" in class_name:
        for y in range(0, height, 12):
            w = rng.randint(35, 80)
            draw.polygon([(0, y), (w, y+10), (0, y+25)], fill=(200, 185, 70))
            draw.polygon([(width, y), (width-w, y+10), (width, y+25)], fill=(210, 190, 65))
    elif "Rice___Brown_Spot" in class_name:
        for _ in range(rng.randint(15, 30)):
            cx, cy = rng.randint(15, width-15), rng.randint(15, height-15)
            r = rng.randint(6, 14)
            draw.ellipse([cx-r-3, cy-r-3, cx+r+3, cy+r+3], fill=(210, 200, 60))
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(110, 50, 20))
    elif "Rice___Leaf_Blast" in class_name:
        for _ in range(rng.randint(10, 20)):
            cx, cy = rng.randint(25, width-25), rng.randint(25, height-25)
            draw.polygon([(cx, cy-20), (cx+12, cy), (cx, cy+20), (cx-12, cy)], fill=(95, 40, 20))
            draw.polygon([(cx, cy-12), (cx+6, cy), (cx, cy+12), (cx-6, cy)], fill=(195, 195, 195))
    elif "Tomato___Early_Blight" in class_name:
        for _ in range(rng.randint(5, 10)):
            cx, cy = rng.randint(30, width-30), rng.randint(30, height-30)
            for r in [24, 18, 12, 6]:
                draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(80 + r*4, 45 + r*2, 20))
    elif "Tomato___Late_Blight" in class_name:
        for _ in range(rng.randint(4, 8)):
            cx, cy = rng.randint(25, width-25), rng.randint(25, height-25)
            rx, ry = rng.randint(30, 50), rng.randint(25, 45)
            draw.ellipse([cx-rx, cy-ry, cx+rx, cy+ry], fill=(40, 30, 22))
    elif "Tomato___Bacterial_Spot" in class_name:
        for _ in range(rng.randint(25, 50)):
            cx, cy = rng.randint(10, width-10), rng.randint(10, height-10)
            draw.ellipse([cx-4, cy-4, cx+4, cy+4], fill=(30, 20, 10))
    elif "Tomato___Leaf_Mold" in class_name:
        for _ in range(rng.randint(8, 15)):
            cx, cy = rng.randint(20, width-20), rng.randint(20, height-20)
            draw.ellipse([cx-18, cy-18, cx+18, cy+18], fill=(175, 180, 55))
    elif "Tomato___Septoria_Leaf_Spot" in class_name:
        for _ in range(rng.randint(30, 60)):
            cx, cy = rng.randint(10, width-10), rng.randint(10, height-10)
            draw.ellipse([cx-4, cy-4, cx+4, cy+4], fill=(25, 15, 10))
            draw.ellipse([cx-2, cy-2, cx+2, cy+2], fill=(175, 175, 175))
    elif "Tomato___Target_Spot" in class_name:
        for _ in range(rng.randint(6, 12)):
            cx, cy = rng.randint(25, width-25), rng.randint(25, height-25)
            draw.ellipse([cx-16, cy-16, cx+16, cy+16], fill=(120, 70, 35))
            draw.ellipse([cx-8, cy-8, cx+8, cy+8], fill=(60, 35, 15))
    elif "Tomato___Yellow_Leaf_Curl_Virus" in class_name:
        for x in range(0, width, 8):
            draw.line([(x, 0), (x, rng.randint(35, 80))], fill=(225, 215, 40), width=6)
            draw.line([(x, height), (x, height-rng.randint(35, 80))], fill=(225, 215, 40), width=6)
    elif "Tomato___Mosaic_Virus" in class_name:
        for _ in range(40):
            cx, cy = rng.randint(5, width-5), rng.randint(5, height-5)
            draw.rectangle([cx, cy, cx+rng.randint(15, 30), cy+rng.randint(15, 30)], fill=(185, 205, 50))
    elif "Potato___Early_Blight" in class_name:
        for _ in range(rng.randint(5, 10)):
            cx, cy = rng.randint(30, width-30), rng.randint(30, height-30)
            for r in [22, 16, 10, 4]:
                draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(75 + r*4, 40 + r*2, 15))
    elif "Potato___Late_Blight" in class_name:
        for _ in range(rng.randint(4, 9)):
            cx, cy = rng.randint(25, width-25), rng.randint(25, height-25)
            rx, ry = rng.randint(25, 45), rng.randint(20, 40)
            draw.ellipse([cx-rx, cy-ry, cx+rx, cy+ry], fill=(35, 25, 20))

    return img


class AgriculturalDataset(Dataset):
    def __init__(self, samples_per_class=60, transform=None, base_seed=1000):
        self.samples = []
        self.transform = transform
        for class_idx, class_name in enumerate(CLASS_NAMES):
            for i in range(samples_per_class):
                seed = base_seed + class_idx * 500 + i
                self.samples.append((class_name, class_idx, seed))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        class_name, class_idx, seed = self.samples[idx]
        img = generate_rich_leaf(class_name, seed=seed)
        if self.transform:
            img = self.transform(img)
        return img, class_idx


def train_calibrated_model():
    print("[Training] Initializing MobileNetV2 with cosine annealing...")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.15, contrast=0.15, saturation=0.15),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    train_dataset = AgriculturalDataset(samples_per_class=80, transform=train_transform, base_seed=100)
    val_dataset = AgriculturalDataset(samples_per_class=20, transform=val_transform, base_seed=9000)

    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

    model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Sequential(
        nn.Dropout(0.2),
        nn.Linear(in_features, NUM_CLASSES)
    )
    model.to(device)

    criterion = nn.CrossEntropyLoss(label_smoothing=0.05)
    optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=12)

    epochs = 12
    best_acc = 0.0
    weights_dir = os.path.join(os.path.dirname(__file__), "weights")
    os.makedirs(weights_dir, exist_ok=True)
    weights_path = os.path.join(weights_dir, "mobilenet_v2_crops.pt")

    for epoch in range(1, epochs + 1):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data).item()
            total += labels.size(0)

        scheduler.step()
        train_acc = correct / total

        # Validation
        model.eval()
        val_correct = 0
        val_total = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                _, preds = torch.max(outputs, 1)
                val_correct += torch.sum(preds == labels.data).item()
                val_total += labels.size(0)

        val_acc = val_correct / val_total
        print(f"Epoch {epoch:02d}/{epochs:02d} | Train Acc: {train_acc:.4f} | Val Acc: {val_acc:.4f}")

        if val_acc > best_acc or epoch == epochs:
            best_acc = val_acc
            torch.save(model.state_dict(), weights_path)

    print(f"[Training Complete] Checkpoint saved to {weights_path} with Best Val Acc: {best_acc:.4f}")


if __name__ == "__main__":
    train_calibrated_model()
