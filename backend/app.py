from flask import Flask, jsonify
from flask_cors import CORS
import os

# Initialize the Flask application
app = Flask(__name__)

# Apply CORS (Cross-Origin Resource Sharing) to allow the frontend 
# (which runs on a different port/address) to communicate with this backend API.
# This is crucial for local development.
CORS(app) 

# --- API Endpoints ---

@app.route('/api/status', methods=['GET'])
def get_status():
    """
    A simple endpoint to confirm the backend is running.
    Returns: A JSON object confirming the server status.
    """
    # The initial data structure to return to the frontend
    initial_data = {
        "status": "Online",
        "message": "Agri-Sense Backend API is running successfully!",
        "version": "v0.1-MVP"
    }
    return jsonify(initial_data)


# --- Run Server ---

# We only run the app when the file is executed directly.
if __name__ == '__main__':
    # Use environment variable for port or default to 5000
    port = int(os.environ.get('PORT', 5000))
    # 'debug=True' is helpful for development as it auto-reloads the server on code changes
    app.run(host='0.0.0.0', port=port, debug=True)
