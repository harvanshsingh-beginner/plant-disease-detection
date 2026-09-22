import { useState } from "react";
import axios from "axios";
import "./App.css";

const diseaseInfo = {
  Tomato_Late_blight: {
    description: "A fungal-like disease that causes dark spots on leaves.",
    treatment: "Remove infected leaves and avoid excessive moisture."
  },

  Tomato_Early_blight: {
    description: "A disease that causes brown spots and yellowing leaves.",
    treatment: "Remove infected leaves and improve air circulation."
  },

  Tomato_healthy: {
    description: "The tomato plant appears healthy.",
    treatment: "Continue regular watering and proper plant care."
  },

  Pepper__bell___healthy: {
    description: "The pepper plant appears healthy.",
    treatment: "Continue regular watering and monitor plant growth."
  },

  Potato___Early_blight: {
    description: "A disease that causes dark spots on potato leaves.",
    treatment: "Remove infected leaves and maintain proper spacing."
  },

  Potato___Late_blight: {
    description: "A disease that causes dark lesions on potato leaves.",
    treatment: "Remove infected plant material and avoid overhead watering."
  }
};

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
      setResult(null);
    }
  };

  const predictDisease = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5001/predict",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };
  const resetPrediction = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">
        <h2>🌿 Plant AI</h2>

        <div>
          <a href="#home">Home</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home">

        <h1>Plant Disease Detection</h1>

        <p>
          Detect plant diseases using Deep Learning.
        </p>

        {/* Upload Card */}
        <div className="card">

          <h2>Upload Plant Image</h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {/* Image Preview */}
          {preview && (
            <div>
              <h3>Selected Image</h3>

              <img
                src={preview}
                alt="Plant"
                className="plant-image"
              />
            </div>
          )}

          <br />

          {/* Predict Button */}
          <button
            onClick={predictDisease}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </button>

          {/* Prediction Result */}
          {result && (
            <div className="result">
              {/* Top Prediction */}
              <div className="top-prediction">
                <h2>🌿 Detected Disease</h2>

                <h3>
                  {result.predictions[0].disease}
                </h3>

                <p>
                  Confidence:{" "}
                  <strong>
                    {result.predictions[0].confidence}%
                  </strong>
                </p>
              </div>

              <h2>Prediction Result</h2>

              {result.predictions.map((item, index) => (
                <div
                  key={index}
                  className="prediction"
                >
                  <p>
                    <strong>Disease:</strong>{" "}
                    {item.disease}
                  </p>

                  <p>
                    <strong>Confidence:</strong>{" "}
                    {item.confidence}%
                  </p>
                  {diseaseInfo[item.disease] && (
                    <div className="disease-info">
                        <p>
                        <strong>Description:</strong>{" "}
                        {diseaseInfo[item.disease].description}
                        </p>

                        <p>
                        <strong>Treatment:</strong>{" "}
                        {diseaseInfo[item.disease].treatment}
                        </p>
                    </div>
                    )}
                </div>
              ))}

            </div>
          )}
          
           {/* ADD RESET BUTTON HERE */}
          {result && (
            <button
              onClick={resetPrediction}
              className="reset-button"
            >
              Try Another Image
            </button>
          )}

        </div>

      </section>

      {/* About Section */}
      <section id="about" className="about">

        <h2>About Project</h2>

        <p>
          This project uses a Deep Learning model to detect
          diseases in plant leaf images.
        </p>

        <p>Technologies Used:</p>

        <ul>
          <li>React.js</li>
          <li>Python</li>
          <li>Flask</li>
          <li>PyTorch</li>
          <li>CNN / ResNet</li>
        </ul>

      </section>

    </div>
  );
}

export default App;