from flask import Flask, request,jsonify
import base64

app = Flask(__name__)

@app.route("/", methods=['POST'])
def process():
    images = request.get_json()
    encoded = images['image']
    decoded = base64.b64decode(encoded)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
