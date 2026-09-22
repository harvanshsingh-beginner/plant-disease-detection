# Plant Disease Detection 

This is a Plant Disease Detection project that I built using Deep Learning. 
The application takes an image of a plant leaf and predicts the possible disease 
using a trained ResNet18 model.

The project has a React frontend and a Flask backend. The trained PyTorch model 
is loaded by the Flask API, which receives the uploaded image and returns the 
top 3 predictions with their confidence scores.

## What this project does

- Upload a plant leaf image
- Preview the uploaded image
- Predict the plant disease
- Show the top 3 predictions
- Show the confidence score for each prediction
- Display basic information about some diseases

## Model

I used a pretrained ResNet18 model and applied transfer learning for this project.

The model was trained on the PlantVillage dataset.

Some of the details are:

- Model: ResNet18
- Framework: PyTorch
- Image size: 224 × 224
- Batch size: 32
- Optimizer: Adam
- Learning rate: 0.001
- Epochs: 5
- Train/Validation split: 80/20

The model achieved around **92.81% validation accuracy** after 5 epochs.

## Technologies Used

**Frontend**
- React.js
- Axios
- CSS
- Vite

**Backend**
- Python
- Flask
- Flask-CORS
- Pillow

**Machine Learning**
- PyTorch
- Torchvision
- ResNet18

## Project Structure

```text
plant-disease-detection/
│
├── backend/
│   ├── app.py
│   └── model/
│       └── plant_disease_resnet18_finetuned.pth
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── test_api.py
├── .gitignore
└── README.md
