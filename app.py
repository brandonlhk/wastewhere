from flask import Flask, request,jsonify,render_template, send_from_directory
import base64
import os

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

# Load the saved model
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, 1000)  # Adjust to match the original model's output units
model.load_state_dict(torch.load('model/WasteClassificationModel.pth'))
model.eval()

# Create a new model with the correct final layer
new_model = models.resnet18(pretrained=True)
new_model.fc = nn.Linear(new_model.fc.in_features, 2)  # Adjust to match the desired output units, here we put 2 for recyclable and non-recyclable

# Copy the weights and biases from the loaded model to the new model
new_model.fc.weight.data = model.fc.weight.data[0:2]  # Copy only the first 2 output units
new_model.fc.bias.data = model.fc.bias.data[0:2]


def prepare_image(img):
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(), # convert image to tensor
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    input_tensor = preprocess(img)
    input_batch = input_tensor.unsqueeze(0)  # Add a batch dimension

    return input_batch


app = Flask(__name__, static_folder='frontend/build')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route("/classify", methods=['POST'])
def process():
    images = request.get_json()
    encoded = images['image']
    decoded = base64.b64decode(encoded)

    decodedImage = prepare_image(decoded)
    # decodedImage = view_image.open(io.BytesIO(decoded2))

    # Perform inference
    with torch.no_grad():
        output = model(decodedImage)

    # Get the predicted class
    _, predicted_class = output.max(1)

    # Map the predicted class to the class name
    class_names = ['nonrecyclable', 'recyclable']
    predicted_class_name = class_names[predicted_class.item()]
    
    # prepare response
    response = {
        'predicted_class': predicted_class_name
    }

    # return response
    return jsonify(response) # returns nonrecyclable or recyclable

if __name__ == '__main__':
    app.run(port=5000, debug=True)
