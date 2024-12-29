from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

ANTHROPIC_API_KEY = 'key'
ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')

    headers = {
        'Authorization': f'Bearer {ANTHROPIC_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        'model': 'latest-model',
        'messages': [
            {'role': 'user', 'content': user_message}
        ]
    }

    response = requests.post(ANTHROPIC_API_URL, headers=headers, json=payload)
    response_data = response.json()

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
