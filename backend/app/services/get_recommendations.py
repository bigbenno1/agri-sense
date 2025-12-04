def to_fahrenheit(value, unit):
    return value if unit == "F" else (value * 9/5) + 32

def give_temp_recommendation(
        air_temp, air_unit,
        water_temp, water_unit,
        humidity, electrical_conductivity, pH):

    # Convert both temps to Fahrenheit for comparison
    air_f = to_fahrenheit(air_temp, air_unit.upper())
    water_f = to_fahrenheit(water_temp, water_unit.upper())

    messages = []

    # --- Air Temp ---
    if 60 <= air_f <= 80:
        messages.append("Air temperature is perfect — no action needed")
    elif air_f < 60:
        messages.append("Move your plant into the sun — it's too cold!")
    else:
        messages.append("Move your plant into the shade — it's too hot!")

    # --- Water Temp ---
    if 65 <= water_f <= 75:
        messages.append("Water temperature is perfect — no action needed")
    elif water_f < 65:
        messages.append("Heat up the water temperature!")
    else:
        messages.append("Cool down the water temperature!")

    # --- Humidity ---
    if 40 <= humidity <= 70:
        messages.append("Humidity is perfect — no action needed")
    elif humidity < 40:
        messages.append("Too Dry! Increase humidity levels!")
    else:
        messages.append("Too Humid! Decrease humidity levels!")

    # --- EC ---
    if 1.0 <= electrical_conductivity <= 2.5:
        messages.append("Nutrient strength is good — no action needed")
    elif electrical_conductivity < 1.0:
        messages.append("Nutrients too diluted! Increase nutrient concentration!")
    else:
        messages.append("Nutrients not diluted enough! Dilute solution to avoid burn!")

    # --- pH ---
    if 5.5 <= pH <= 6.5:
        messages.append("pH is in range — no action needed")
    elif pH < 5.5:
        messages.append("Too acidic! raise pH levels!")
    else:
        messages.append("Too basic! lower pH levels!")

    return messages