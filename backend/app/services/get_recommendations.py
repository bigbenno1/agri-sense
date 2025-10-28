def give_temp_recommendation(air_temp, water_temp, humidity, electrical_conductivity, pH):
    messages = []

    if 60 <= air_temp <= 80:
        messages.append("Air temperature is perfect — no action needed")
    elif air_temp < 60:
        messages.append("Move your plant into the sun — it's too cold!")
    else:
        messages.append("Move your plant into the shade — it's too hot!")
    
    if 65 <= water_temp <= 75:
         messages.append("Water temperature is perfect — no action needed")
    elif water_temp < 65:
        messages.append("Heat up the water temperature!")
    else:
        messages.append("Cool down the water temperature!")
    
    if 40 <= humidity <= 70:
        messages.append("Humidity is perfect — no action needed")
    elif humidity < 40:
        messages.append("Too Dry! Increase humidity levels!")
    else:
        messages.append("Too Humid! Decrease humidity levels!")
    
    if 1.0 <= electrical_conductivity <= 2.5:
        messages.append("Nutrient strength is good — no action needed")
    elif electrical_conductivity < 1.0:
        messages.append("Nutrients too diluted! Increase nutrient concentration!")
    else:
        messages.append("Nutrients not diluted enough! Dilute solution to avoid burn!")
    
    if 5.5 <= pH <= 6.5:
        messages.append("pH is in range — no action needed")
    elif pH < 5.5:
        messages.append("Too acidic! raise pH levels!")
    else:
        messages.append("Too basic! lower pH levels!")

    return messages