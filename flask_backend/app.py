#!/usr/bin/env python3 
from flask import Flask, request, jsonify, redirect, url_for, session
import base64
import cv2
from fer import FER
import json
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time

app = Flask(__name__)
app.secret_key = 'wtryterwe3yerwegdhgyugfcybwvttt315v532132v51k532vcrwqrc'

### Spotify

@app.route('/home')
def home():
	return '127.0.0.1'

@app.route('/input', methods=['POST'])
def input():
	if request.method == 'POST':
			try:
					image_json = request.json
			except:
				return 'JSON loading error'
				raise ValueError('JSON loading error')
			decoded = base64.urlsafe_b64decode(image_json['payload'])
			with open('tmp.jpeg', 'wb') as f:
				f.write(decoded)

			img = cv2.imread('tmp.jpeg')
			return predict_emotions(img)
	else:
		return 'ERROR input f-n'
		raise ValueError('ERROR input f-n')

def predict_emotions(image):
	emotion_model = FER()
	predicted_emotions = emotion_model.detect_emotions(image)
	predicted_emotions = predicted_emotions[0]
	del predicted_emotions['box']
	return jsonify(predicted_emotions)

@app.route('/')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/authorize')
def authorize():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session["token_info"] = token_info
    return redirect("/home")

@app.route('/logout')
def logout():
	print(session)
	for key in list(session.keys()):
		session.pop(key)
	session.clear()
	print(session)
	return redirect('https://accounts.spotify.com/en/logout')

# Checks to see if token is valid and gets a new token if not
def get_token():
    token_valid = False
    token_info = session.get("token_info", {})

    # Checking if the session already has a token stored
    if not (session.get('token_info', False)):
        token_valid = False
        return token_info, token_valid

    # Checking if token has expired
    now = int(time.time())
    is_token_expired = session.get('token_info').get('expires_at') - now < 60

    # Refreshing token if it has expired
    if (is_token_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(session.get('token_info').get('refresh_token'))

    token_valid = True
    return token_info, token_valid


def create_spotify_oauth():
		return SpotifyOAuth(
				client_id="5f4e30da16e0418fa42c562b25c70096",
				client_secret="e316d20fef4a4141ad25c2be65e500f1",
				redirect_uri=url_for('authorize', _external=True),
				scope="user-library-read user-top-read")


@app.route('/top')
def get_top_100():
	session['token_info'], authorized = get_token()
	print(get_token())
	session.modified = True
	if not authorized:
		return redirect('/')
	sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
	results = []
	ids = []
	for i in range(3):
		curGroup = sp.current_user_top_tracks(limit = 20, time_range='short_term', offset = 20 * i)['items']

		for ind, item in enumerate(curGroup):
			val = item['name']
			song_id = item['id']
			ids.append(song_id)
			results.append(val)
	
	### Recomendations
	for i in range(12):
			curGroup = sp.recommendations(limit=5, seed_tracks=ids[i*5:5+i*5])['tracks']
			for ind, item in enumerate(curGroup):
				val = item['name']
				results.append(val)

	data = {'songs': results}
	return jsonify(data)


if __name__ == "__main__":
	app.run(debug = True)