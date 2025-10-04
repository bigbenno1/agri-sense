# Example core logic/service file.
# Functions here will be from routes.py. 
# * There should only be ONE service per file.

def get_status_data():
    return {
        "status": "Online",
        "message": "Agri-Sense Backend API is running successfully!",
        "version": "v0.1-MVP"
    }
