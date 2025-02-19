from fastapi import FastAPI, File, UploadFile
import uvicorn
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained model and class names
MODEL = tf.keras.models.load_model("../models/1")
CLASS_NAMES = ["Tomato_Bacterial_spot", "Tomato_Early_blight", "Tomato_Late_blight",
               "Tomato_Leaf_Mold", "Tomato_Septoria_leaf_spot", "Tomato_Spider_mites_Two_spotted_spider_mite",
               "Tomato__Target_Spot", "Tomato__Tomato_YellowLeaf__Curl_Virus", "Tomato__Tomato_mosaic_virus",
               "Tomato_healthy"]


@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(data) -> np.ndarray:
    """Convert binary file data to a NumPy array."""
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict-multiple")
async def predict_multiple(files: list[UploadFile] = File(...)):
    """Endpoint to handle multiple image predictions."""
    results = []  # List to store results for each image

    for file in files:
        # Read and preprocess the image
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, 0)  # Add batch dimension

        # Get predictions from the model
        predictions = MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])

        # Append results for this image
        results.append({
            'filename': file.filename,
            'class': predicted_class,
            'confidence': float(confidence)
        })

    return {"results": results}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
