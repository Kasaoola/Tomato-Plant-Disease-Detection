## Tomato Plant Disease Detection using CNN ##
This project leverages a Convolutional Neural Network (CNN) to detect and classify tomato plant diseases from leaf images. The backend is built with FastAPI, while the frontend offers a user-friendly interface for image uploads and result visualization. The full-stack application is containerized with Docker and was deployed on Microsoft Azure.

## 📖 Overview ##
The goal of this project is to assist farmers and agricultural professionals by providing an automated system to detect common tomato plant diseases through image analysis. By utilizing deep learning techniques, specifically CNNs, the system can identify and classify diseases, enabling timely interventions and reducing crop losses.

## ✨ Features ##
Automated Disease Detection: Identifies and classifies tomato plant diseases from leaf images.

Web Interface: User-friendly frontend for uploading images and viewing results.

FastAPI: Backend built with FastAPI to handle requests and model inference.

Containerization: Dockerized application for easy deployment.

Cloud Deployment: Previously deployed on Microsoft Azure using a free $200 credit.

## 🛠️ Tech Stack ##
Frontend: React.js

Backend: FastAPI (Python)

Machine Learning: Convolutional Neural Network (CNN)

Containerization: Docker

Cloud Platform: Microsoft Azure

## 📁 Project Structure ##

- [`tomato-disease/`](./tomato-disease) – Main application code
- [`training/`](./training) – Model training scripts
- [`model_evaluations/`](./model_evaluations) – Model evaluation docs
- [`requirements.txt`](./requirements.txt) – Python dependencies
- [`.github/workflows/`](./.github/workflows) – GitHub Actions workflows
- [`README.md`](./README.md) – Project documentation

## 🚀 Usage Guide ##
Open the web application in your browser.

Upload a clear image of a tomato leaf.

Submit the image for analysis.

View the predicted disease classification and confidence score.

## 🧠 Model Details ##
Architecture: Convolutional Neural Network (CNN)

Dataset: Data are taken from PlantVIllage Dataset. The data has different types of diseases for tomato leaves. The dataset can be viewed in the folder: tomato-disease --> training --> PlantVillage

Here are the list:

- Tomato_mosaic_virus  
- Target_Spot  
- Bacterial_spot  
- Tomato_Yellow_Leaf_Curl_Virus  
- Late_blight  
- Leaf_Mold  
- Early_blight  
- Spider_mites  
- Two-spotted_spider_mite  
- Tomato___healthy  
- Septoria_leaf_spot


Training: Different models have been trained using different optimizers like Adam, SGD, RMSprop and Adagrad. Also dropoyt layers have been added to analyze the difference in the model along with changes in parameters like batch size, image size and number of layers. The models can be seen in the folder: tomato-disease --> training

## 📊 Results ##
A demonstration of the application's functionality can be viewed in the following video:
(The website was built using a free $200 credit that was valid for one month, which has since expired).
Click here to watch the video demo on Google Drive: https://drive.google.com/file/d/1PJ64ZuHSW-ZrkHGqe3z9z7EJ6YxtrrMt/view?usp=sharing

## ⚠️ Limitations & Challenges ##
Deployment: The application was deployed using a free Azure credit, which has since expired.

Data Quality: The accuracy of disease detection is contingent on the quality and clarity of the input images.

Model Generalization: The model's performance on images from different sources or environments may vary.

## 👥 Contributors ##
Aavash Shrestha, Prabhiv Adhikary and Adril Thapa under the supervision of Asst. Prof. Dr. Kamal Chapagain | Kathmandu University




