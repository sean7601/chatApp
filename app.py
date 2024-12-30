from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
import anthropic

app = Flask(__name__, static_folder='frontend')
CORS(app)

ANTHROPIC_API_KEY = 'key'
ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key=ANTHROPIC_API_KEY,
)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    print(data)
    conversation = data.get('history')
    conversation = [{"role": message["role"], "content": message["content"]} for message in conversation]

    print(conversation)
    print(conversation[0])

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1000,
        temperature=0,
        messages=conversation,
    )

    print(message)
    # Create a serializable response
    response = {
        "role": message.role,
        "content": message.content[0].text if message.content else "",
        "model": message.model,
        "type": message.type
    }

    print(response)

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
