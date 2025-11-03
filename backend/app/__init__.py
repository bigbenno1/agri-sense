from flask import Flask
from flask_cors import CORS

def create_app():
    """Application factory function."""
    app = Flask(__name__)

    # Apply CORS (Cross-Origin Resource Sharing) to allow the frontend (which 
	# runs on a different port/address) to communicate with this backend API.
    # This is crucial for local development.
    CORS(app)

    # Register routes (Blueprints)
    from .routes import api
    app.register_blueprint(api, url_prefix="/api")

    return app
