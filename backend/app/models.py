# Optional for if we decide to use SQLAlchemy 
# (might be helpful if nobody has major SQL experience)

class SensorData:
    def __init__(self, name=None):
        self.name = name
        self.air_temp = {"value": None, "unit": "°F", "min": None, "max": None, "status": "unknown"}
        self.water_temp = {"value": None, "unit": "°F", "min": None, "max": None, "status": "unknown"}
        self.humidity = {"value": None, "unit": "%", "min": None, "max": None, "status": "unknown"}
        self.electrical_conductivity = {"value": None, "unit": "mS/cm", "min": None, "max": None, "status": "unknown"}
        self.pH = {"value": None, "unit": "", "min": None, "max": None, "status": "unknown"}

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
            "celsius_value": self.fahrenheit_to_celsius(value),
            "celsius_min": self.fahrenheit_to_celsius(min_val),
            "celsius_max": self.fahrenheit_to_celsius(max_val)
        }

    #vales will be default fahrenheit
    def set_water_temp(self, value, max_val, min_val):
        self.water_temp = {
            "fahrenheit_value": value,
            "fahrenheit_min": min_val,
            "fahrenheit_max": max_val,
            "celsius_value": self.fahrenheit_to_celsius(value),
            "celsius_min": self.fahrenheit_to_celsius(min_val),
            "celsius_max": self.fahrenheit_to_celsius(max_val)
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
        return {
            "name": self.name,
            "air_temp": self.air_temp,
            "water_temp": self.water_temp,
            "humidity": self.humidity,
            "electrical_conductivity": self.electrical_conductivity,
            "pH": self.pH
        }