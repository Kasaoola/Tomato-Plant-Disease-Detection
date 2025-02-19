from tkinter import Image

import numpy as np
from fastapi import FastAPI, File, UploadFile
import uvicorn
from io import BytesIO
from PIL import Image
import requests

app = FastAPI()

endpoint = "http://localhost:8501/v1/models/tomato_model:predict"

CLASS_NAMES = ["Tomato_Bacterial_spot", "Tomato_Early_blight", "Tomato_Late_blight",
 "Tomato_Leaf_Mold", "Tomato_Septoria_leaf_spot", "Tomato_Spider_mites_Two_spotted_spider_mite",
 "Tomato__Target_Spot", "Tomato__Tomato_YellowLeaf__Curl_Virus", "Tomato__Tomato_mosaic_virus",
 "Tomato_healthy"]

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
    json_data = {
        "instances": img_batch.tolist()
    }

    response = requests.post(endpoint,json=json_data)
    pass



if __name__=="__main__":
    uvicorn.run(app, host='localhost', port=8000)

