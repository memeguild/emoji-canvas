from flask import Flask, render_template, request
import json
import requests

with open('config.json') as config:
    CONFIG = json.load(config)
OAUTH_URL = 'https://slack.com/api/oauth.access'

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/oauth/')
def oauth():
    params = {
        'client_id': CONFIG['clientId'],
        'client_secret': CONFIG['clientSecret'],
        'code': request.args.get('code', ''),
    }

    r = requests.get(OAUTH_URL, params=params)
    return r.json().get('access_token', '')
    # return render_template('oauth.html')

if __name__ == "__main__":
    app.run()
