#!/usr/bin/env python3

from flask import Flask, request, jsonify
import base64
import cv2
from fer import FER
import json


app = Flask(__name__)

@app.route('/input', methods=['POST'])
def input():
    if request.method == 'POST':
            try:
                    image_json = request.json
            except:
                raise ValueError('JSON loading error')
            decoded = base64.urlsafe_b64decode(image_json['payload'])
            with open('tmp.jpeg', 'wb') as f:
                f.write(decoded)

            img = cv2.imread('tmp.jpeg')
            return predict_emotions(img)
    else:
        raise ValueError('ERROR input f-n')

def predict_emotions(image):
    emotion_model = FER()
    predicted_emotions = emotion_model.detect_emotions(image)
    predicted_emotions = predicted_emotions[0]
    del predicted_emotions['box']
    return jsonify(predicted_emotions)

if __name__ == "__main__":
    app.run(debug = True)