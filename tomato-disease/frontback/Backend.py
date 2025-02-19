import tensorflow as tf
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np

app = Flask(_name_)
app.config['UPLOAD_FOLDER'] = 'uploads/'

# Load the TensorFlow SavedModel
MODEL_PATH = r"C:\Code\tomato-disease\models"  # Path to the folder containing saved_model.pb
model = tf.saved_model.load(MODEL_PATH)

# Get the inference function (default serving signature)
infer = model.signatures["serving_default"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'message': 'No file uploaded'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        # Pre-process the image
        image = cv2.imread(filepath)
        image = cv2.resize(image, (128, 128))  # Resize to match your model input shape
        image = image / 255.0  # Normalize
        image = np.expand_dims(image, axis=0)

        # Run inference
        input_tensor = tf.convert_to_tensor(image, dtype=tf.float32)
        predictions = infer(tf.constant(input_tensor))  # Call the model

        # Adjust the output key based on your model's structure
        output_key = list(predictions.keys())[0]  # Get the first output key
        prediction_values = predictions[output_key].numpy()

        # Determine the predicted class
        predicted_class = np.argmax(prediction_values)

        # Label mapping (update as per your model's classes)
        LABELS = {0: "Healthy", 1: "Diseased"}
        label = LABELS.get(predicted_class, "Unknown")

    except Exception as e:
        return jsonify({'message': 'Error during prediction', 'error': str(e)}), 500
    finally:
        # Clean up: Remove uploaded file
        os.remove(filepath)

    return jsonify({'message': f'The leaf is {label}.'})

if _name_ == '_main_':
    # Create upload folder if it doesn't exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
