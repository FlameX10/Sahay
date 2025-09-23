import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from routes.assessment import assessment_bp
from bot import get_bot_response
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__, static_folder='frontend')
CORS(app)

# Register assessment blueprint
app.register_blueprint(assessment_bp, url_prefix='/api')

# In-memory session storage
sessions = {}
logging.basicConfig(level=logging.INFO)

# === ROUTES ===

@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'App.jsx')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "OK",
        "message": "🌿 SahayBot Backend is alive and caring!"
    }), 200

@app.route('/test-assessment', methods=['GET'])
def test_assessment():
    return jsonify({
        "message": "Assessment API is working!",
        "endpoints": {
            "assess": "/api/assess",
            "submit": "/api/submit"
        }
    }), 200

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"error": "Field 'message' is required"}), 400

        user_message = data['message']
        session_id = data.get('session_id', 'default')

        bot_reply = get_bot_response(user_message)

        if session_id not in sessions:
            sessions[session_id] = []
        sessions[session_id].append({
            "user": user_message,
            "bot": bot_reply
        })

        return jsonify({
            "response": bot_reply,
            "session_id": session_id
        }), 200

    except Exception as e:
        logging.error(f"[ERROR] /chat: {str(e)}")
        return jsonify({
            "error": "Something went wrong. Please try again."
        }), 500

@app.route('/history/<session_id>', methods=['GET'])
def get_history(session_id):
    history = sessions.get(session_id, [])
    return jsonify({
        "session_id": session_id,
        "history": history
    }), 200

# === RUN ===
if __name__ == '__main__':
    print("🚀 SahayBot Server Starting...")
    print("👉 Visit http://localhost:5000 to open the chat interface")
    print("📊 Assessment API available at http://localhost:5000/api/assess")
    print("💬 Chat API available at http://localhost:5000/chat")
    app.run(host='0.0.0.0', port=5000, debug=True)