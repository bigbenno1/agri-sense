# Optional for if we decide to use SQLAlchemy 
# (might be helpful if nobody has major SQL experience)

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
    
    
    #setter methods for all variables and bounds
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

    
    def create_dict(self):
        return {
            "name": self.name,
            "air_temp": self.air_temp,
            "water_temp": self.water_temp,
            "humidity": self.humidity,
            "electrical_conductivity": self.electrical_conductivity,
            "pH": self.pH
        }