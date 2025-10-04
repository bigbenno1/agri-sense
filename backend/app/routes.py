from flask import Blueprint, jsonify

api = Blueprint("api", __name__)

# --- API Endpoints ---

@api.route("/status", methods=["GET"])
def get_status():
    """
    A simple endpoint to confirm the backend is running.
    """
    from .services.get_status import get_status_data
    initial_data = get_status_data()
    return jsonify(initial_data)
