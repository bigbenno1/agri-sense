# Optional for if we decide to use SQLAlchemy 
# (might be helpful if nobody has major SQL experience)
# ALL VALUES ARE TEMPORARY AND CAN BE CHANGED BASED ON PLANT
sensor_data = {
    "name": "PLANT",
    "air_temp": {  # bounded to 60–80 degrees F (typical indoor/greenhouse range)
        "value": 67,
        "min": 60,
        "max": 80
    },
    "water_temp": {  # bounded to 60–72 degrees F 
        "value": 68,
        "min": 60,
        "max": 72
    },
    "humidity": {  # bounded to 40–60% humidity
        "value": 0.51,
        "min": 0.4,
        "max": 0.6
    },
    "electrical_conductivity": {  # bounded to 0.8–2.2 mS/cm
        "value": 1.4,
        "min": 0.8,
        "max": 2.2
    },
    "pH": {  # bounded to 5.5–7.0 (typical for most plants)
        "value": 6.5,
        "min": 5.5,
        "max": 7.0
    }
}