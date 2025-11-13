# Optional for if we decide to use SQLAlchemy 
# (might be helpful if nobody has major SQL experience)
<<<<<<< HEAD
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
    

    def fahrenheit_to_celsius(self, value):
        return (value - 32) * 5 / 9
    
    #setter methods for all variables and bounds

    #vales will be default fahrenheit
    def set_air_temp(self, value, max_val, min_val):
        self.air_temp = {
            "fahrenheit_value": value,
            "fahrenheit_min": min_val,
            "fahrenheit_max": max_val,
            "celsius_value": self.farenheit_to_celcius(value),
            "celsius_min": self.farenheit_to_celcius(min_val),
            "celsius_max": self.farenheit_to_celcius(max_val)
        }

    #vales will be default fahrenheit
    def set_water_temp(self, value, max_val, min_val):
        self.water_temp = {
            "fahrenheit_value": value,
            "fahrenheit_min": min_val,
            "fahrenheit_max": max_val,
            "celsius_value": self.farenheit_to_celcius(value),
            "celsius_min": self.farenheit_to_celcius(min_val),
            "celsius_max": self.farenheit_to_celcius(max_val)
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
=======

class SensorData:
    """Data model for plant sensor readings"""
    
    def __init__(self, name):
        self.name = name
        self.air_temp = {"value": None, "unit": "°F", "min": None, "max": None, "status": "unknown"}
        self.water_temp = {"value": None, "unit": "°F", "min": None, "max": None, "status": "unknown"}
        self.humidity = {"value": None, "unit": "%", "min": None, "max": None, "status": "unknown"}
        self.electrical_conductivity = {"value": None, "unit": "mS/cm", "min": None, "max": None, "status": "unknown"}
        self.pH = {"value": None, "unit": "", "min": None, "max": None, "status": "unknown"}
        
    def set_air_temp(self, value, min_val, max_val):
        self.air_temp["value"] = value
        self.air_temp["min"] = min_val
        self.air_temp["max"] = max_val
        self.air_temp["status"] = self._get_status(value, min_val, max_val)
        
    def set_water_temp(self, value, min_val, max_val):
        self.water_temp["value"] = value
        self.water_temp["min"] = min_val
        self.water_temp["max"] = max_val
        self.water_temp["status"] = self._get_status(value, min_val, max_val)
        
    def set_humidity(self, value, min_val, max_val):
        self.humidity["value"] = value
        self.humidity["min"] = min_val
        self.humidity["max"] = max_val
        self.humidity["status"] = self._get_status(value, min_val, max_val)
        
    def set_electrical_conductivity(self, value, min_val, max_val):
        self.electrical_conductivity["value"] = value
        self.electrical_conductivity["min"] = min_val
        self.electrical_conductivity["max"] = max_val
        self.electrical_conductivity["status"] = self._get_status(value, min_val, max_val)
        
    def set_pH(self, value, min_val, max_val):
        self.pH["value"] = value
        self.pH["min"] = min_val
        self.pH["max"] = max_val
        self.pH["status"] = self._get_status(value, min_val, max_val)
        
    def _get_status(self, value, min_val, max_val):
        """Determine if value is within optimal range"""
        if value is None:
            return "unknown"
        if min_val <= value <= max_val:
            return "optimal"
        elif min_val * 0.9 <= value <= max_val * 1.1:
            return "warning"
        else:
            return "critical"
            
    def create_dict(self):
        """Convert to dictionary for JSON response"""
>>>>>>> 8b02cad5f87e8adf75e411e69fb9af48645a8b58
        return {
            "name": self.name,
            "air_temp": self.air_temp,
            "water_temp": self.water_temp,
            "humidity": self.humidity,
            "electrical_conductivity": self.electrical_conductivity,
            "pH": self.pH
<<<<<<< HEAD
        }
=======
        }
>>>>>>> 8b02cad5f87e8adf75e411e69fb9af48645a8b58
