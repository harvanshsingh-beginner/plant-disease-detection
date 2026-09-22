from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

import io


app = Flask(__name__)
CORS(app)


# Select device
device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# Load checkpoint
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "plant_disease_resnet18_finetuned.pth"
)

checkpoint = torch.load(
    MODEL_PATH,
    map_location=device,
    weights_only=False
)

class_names = checkpoint["class_names"]


# Create ResNet18 architecture
model = models.resnet18(weights=None)

model.fc = nn.Linear(
    model.fc.in_features,
    len(class_names)
)


# Load trained weights
model.load_state_dict(
    checkpoint["model_state_dict"]
)

model = model.to(device)
model.eval()


# Image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Plant Disease Detection API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    file = request.files["image"]

    try:

        image = Image.open(
            io.BytesIO(file.read())
        ).convert("RGB")

        image_tensor = transform(
            image
        ).unsqueeze(0).to(device)


        # Prediction
        with torch.no_grad():

            output = model(image_tensor)

            probabilities = torch.softmax(
                output,
                dim=1
            )

            top3_probs, top3_indices = torch.topk(
                probabilities,
                3
            )


        predictions = []

        for i in range(3):

            class_index = top3_indices[0][i].item()

            confidence = top3_probs[0][i].item() * 100

            predictions.append({
                "disease": class_names[class_index],
                "confidence": round(confidence, 2)
            })


        return jsonify({
            "predictions": predictions
        })


    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        debug=True,
        port=5001
    )