import os
import json
import numpy as np
import torch
from torch.utils.data import DataLoader
from torchvision import transforms
from sklearn.metrics import classification_report, confusion_matrix

from model import CLASS_NAMES, NUM_CLASSES, build_mobilenet_v2
from train import SyntheticCropDataset

def evaluate_model(weights_path: str = "weights/mobilenet_v2_crops.pt", output_json: str = "weights/evaluation_report.json"):
    """
    Evaluates the trained MobileNetV2 checkpoint on a distinct test split.
    Calculates per-class precision, recall, F1, overall accuracy, and confusion matrix.
    """
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[Evaluation] Evaluating {weights_path} on device {device}")
    
    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    # Independent test dataset (seed offset 9000)
    test_dataset = SyntheticCropDataset(samples_per_class=15, transform=val_transform, is_train=False)
    test_loader = DataLoader(test_dataset, batch_size=16, shuffle=False)
    
    model = build_mobilenet_v2(num_classes=NUM_CLASSES, pretrained=False)
    if not os.path.exists(weights_path):
        raise FileNotFoundError(f"Checkpoint not found at {weights_path}. Run train.py first.")
        
    model.load_state_dict(torch.load(weights_path, map_location=device))
    model.to(device)
    model.eval()
    
    all_preds = []
    all_targets = []
    all_confidences = []
    
    with torch.no_grad():
        for images, targets in test_loader:
            images = images.to(device)
            outputs = model(images)
            probs = torch.softmax(outputs, dim=1)
            top_probs, preds = torch.topk(probs, k=1)
            
            all_preds.extend(preds.squeeze(1).cpu().numpy().tolist())
            all_targets.extend(targets.numpy().tolist())
            all_confidences.extend(top_probs.squeeze(1).cpu().numpy().tolist())
            
    all_preds = np.array(all_preds)
    all_targets = np.array(all_targets)
    all_confidences = np.array(all_confidences)
    
    acc = np.mean(all_preds == all_targets) * 100.0
    mean_conf = np.mean(all_confidences) * 100.0
    
    report_dict = classification_report(all_targets, all_preds, target_names=CLASS_NAMES, output_dict=True, zero_division=0)
    cm = confusion_matrix(all_targets, all_preds).tolist()
    
    print("\n" + "="*70)
    print(f"EVALUATION SUMMARY: Overall Test Accuracy: {acc:.2f}% | Mean Top-1 Confidence: {mean_conf:.2f}%")
    print("="*70)
    print(classification_report(all_targets, all_preds, target_names=CLASS_NAMES, zero_division=0))
    
    # Save verifiable results to JSON
    os.makedirs(os.path.dirname(output_json) or ".", exist_ok=True)
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump({
            "test_accuracy": round(acc, 2),
            "mean_top1_confidence": round(mean_conf, 2),
            "total_test_samples": len(all_targets),
            "classification_report": report_dict,
            "confusion_matrix": cm,
            "class_names": CLASS_NAMES
        }, f, indent=2)
        
    print(f"[Evaluation] Report saved to {output_json}")
    return acc, report_dict


if __name__ == "__main__":
    evaluate_model()
