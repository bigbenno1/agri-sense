import os
from app import create_app

# --- Run DEVELOPMENT server ---

app = create_app()

# For development, we only run the app when the file is executed directly.
if __name__ == "__main__":
    # Use environment variable for port or default to 5000
    port = int(os.environ.get("PORT", 5000))
    # 'debug=True' is helpful for development as it auto-reloads the server on code changes
    app.run(host="0.0.0.0", port=port, debug=True)
