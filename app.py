from flask import Flask, request,jsonify,render_template, send_from_directory
import base64
import os

app = Flask(__name__, static_folder='frontend/build')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route("/image", methods=['POST'])
def process():
    images = request.get_json()
    encoded = images['image']
    decoded = base64.b64decode(encoded)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
