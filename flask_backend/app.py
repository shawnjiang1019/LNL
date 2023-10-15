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
global songs
songs = {}

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

@app.route('/get_songs')
def get_songs():
	if songs:
		return jsonify(songs)
	return "doesn't work"

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
    return redirect("/top")

@app.route('/logout')
def logout():
	for key in list(session.keys()):
		session.pop(key)
	session.clear()
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
			client_id="42746e9e8107487d95584a2ec51188f9",
			client_secret="7a6070b74808451096e3712f6ce4347f",
			redirect_uri=url_for('authorize', _external=True),
			scope="user-library-read user-top-read playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public")


@app.route('/get_token')
def get_cache():
	with open(".cache") as f:
		data = json.load(f)
	access_token = data["access_token"]
	return access_token

@app.route('/top')
def get_top():
	global songs
	session['token_info'], authorized = get_token()
	session.modified = True
	if not authorized:
		return redirect('/')
	sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))

	results = []
	ids = []
	for i in range(10):
		curGroup = sp.current_user_top_tracks(limit = 20, time_range='short_term', offset = 20 * i)['items']

		for ind, item in enumerate(curGroup):
			val = item['name']
			song_id = item['id']
			ids.append(song_id)
			results.append(val)

	### Recomendations
	for y in range(2):
		for i in range(12):
			curGroup = sp.recommendations(limit=5, seed_tracks=ids[i*5:5+i*5])['tracks']
			for ind, item in enumerate(curGroup):
				song_id = item['id']
				val = item['name']
				results.append(val)
				ids.append(song_id)

	tmp = [[name, song_id] for name, song_id in zip(results, ids)]    
	data = {'songs': tmp[:100]}
	songs = data
	return redirect('http://localhost:3000')

if __name__ == "__main__":
	app.run(debug = True)
