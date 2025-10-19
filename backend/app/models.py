# Optional for if we decide to use SQLAlchemy 
# (might be helpful if nobody has major SQL experience)
# ALL VALUES ARE TEMPORARY AND CAN BE CHANGED BASED ON PLANT
class SensorData:
    def __init__(self, name=None):
        self.name = name
        self.air_temp = {}
        self.water_temp = {}
        self.humidity = {}
        self.electrical_conductivity = {}
        self.pH = {}

    def set_name(self, name):#update name
        self.name = name

    def set_air_temp(self, value, max_val, min_val):
        self.air_temp = {
            "value": value,
            "min": min_val,
            "max": max_val
        }

    def set_water_temp(self, value, max_val, min_val):
        self.water_temp = {
            "value": value,
            "min": min_val,
            "max": max_val
        }

    def set_humidity(self, value, max_val, min_val):
        self.humidity = {
            "value": value,
            "min": min_val,
            "max": max_val
        }

    def set_electrical_conductivity(self, value, max_val, min_val):
        self.electrical_conductivity = {
            "value": value,
            "min": min_val,
            "max": max_val
        }

    def set_pH(self, value, max_val, min_val):
        self.pH = {
            "value": value,
            "min": min_val,
            "max": max_val
        }

    # --- Return full dictionary structure ---
    def create_dict(self):
        """Return the sensor data in full dictionary format."""
        return {
            "name": self.name,
            "air_temp": self.air_temp,
            "water_temp": self.water_temp,
            "humidity": self.humidity,
            "electrical_conductivity": self.electrical_conductivity,
            "pH": self.pH
        }