from flask import Flask
from flask_socketio import SocketIO, emit
from chatbot import generate_reply
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows requests from your Next.js frontend
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('send_message')
def handle_message(data):
    user_input = data['message']
    response = generate_reply(user_input)
    emit('receive_message', {'message': response})

if __name__ == '__main__':
    socketio.run(app, debug=True)
