

import os
from io import BytesIO

import numpy as np
import tensorflow as tf
import uvicorn
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://tomato-disease-detection-g6fnbjbwa7edhrc7.eastasia-01.azurewebsites.net"
    "https://witty-hill-080b21100.6.azurestaticapps.net"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# For Local host
# BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # Moves up one level from api/
# MODEL_PATH = os.path.join(BASE_DIR, "models", "1")  # Joins models/1 path

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "1")
MODEL_PATH = os.path.abspath(MODEL_PATH)
MODEL = tf.keras.models.load_model(MODEL_PATH)

# Load the model
MODEL = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = ["Tomato Bacterial spot", "Tomato Early blight", "Tomato Late blight",
 "Tomato Leaf Mold", "Tomato Septoria leaf spot", "Tomato Spider mites Two spotted spider mite",
 "Tomato Target Spot", "Tomato Tomato YellowLeaf Curl Virus", "Tomato Tomato mosaic virus",
 "Tomato healthy"]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(
        file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image,0)

    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class' : predicted_class,
        'confidence': float(confidence)
    }

#For local host
# if __name__=="__main__":
#     uvicorn.run(app, host='localhost', port=8000)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))


