import React, { useState, useEffect } from 'react';
import Card from '../components/card';

const PlantPage = () => {
    const [plantData, setPlantData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch plant data from your backend
        const fetchPlantData = async () => {
            try {
                // Replace with your actual API endpoint
                // const response = await fetch('http://localhost:5000/api/plant/1');
                // const data = await response.json();
                
                // Mock data for now - replace with actual API call
                const mockData = {
                    id: 1,
                    name: "Basil Plant #1",
                    lastUpdated: new Date().toISOString(),
                    sensors: {
                        airTemp: { value: 72, unit: "°F", status: "optimal" },
                        humidity: { value: 65, unit: "%", status: "optimal" },
                        waterTemp: { value: 68, unit: "°F", status: "optimal" },
                        lightIntensity: { value: 450, unit: "PPFD", status: "optimal" },
                        ec: { value: 1.8, unit: "mS/cm", status: "optimal" },
                        ph: { value: 6.2, unit: "", status: "optimal" }
                    }
                };
                
                setPlantData(mockData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching plant data:", error);
                setLoading(false);
            }
        };

        fetchPlantData();
        
        // Poll every 30 seconds for updates
        const interval = setInterval(fetchPlantData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div style={{ 
                padding: '2rem', 
                textAlign: 'center',
                paddingTop: '12vh'
            }}>
                <p>Loading plant data...</p>
            </div>
        );
    }

    return (
        <div style={{ 
            padding: '2rem',
            paddingTop: '10vh',
            minHeight: '100vh',
            backgroundColor: '#f5f9f7'
        }}>
            {/* Plant Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌿</div>
                <h1 style={{ 
                    color: '#2f5b4a',
                    margin: '0.5rem 0'
                }}>
                    {plantData?.name || 'Plant Details'}
                </h1>
                <p style={{ 
                    color: '#6b8a78',
                    fontSize: '0.9rem'
                }}>
                    Last updated: {new Date(plantData?.lastUpdated).toLocaleString()}
                </p>
            </div>

            {/* Data Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                <Card 
                    title="Air Temperature"
                    value={plantData?.sensors.airTemp.value}
                    unit={plantData?.sensors.airTemp.unit}
                    status={plantData?.sensors.airTemp.status}
                />
                
                <Card 
                    title="Humidity"
                    value={plantData?.sensors.humidity.value}
                    unit={plantData?.sensors.humidity.unit}
                    status={plantData?.sensors.humidity.status}
                />
                
                <Card 
                    title="Water Temperature"
                    value={plantData?.sensors.waterTemp.value}
                    unit={plantData?.sensors.waterTemp.unit}
                    status={plantData?.sensors.waterTemp.status}
                />
                
                <Card 
                    title="Light Intensity"
                    value={plantData?.sensors.lightIntensity.value}
                    unit={plantData?.sensors.lightIntensity.unit}
                    status={plantData?.sensors.lightIntensity.status}
                />
                
                <Card 
                    title="Electrical Conductivity"
                    value={plantData?.sensors.ec.value}
                    unit={plantData?.sensors.ec.unit}
                    status={plantData?.sensors.ec.status}
                />
                
                <Card 
                    title="pH Level"
                    value={plantData?.sensors.ph.value}
                    unit={plantData?.sensors.ph.unit}
                    status={plantData?.sensors.ph.status}
                />
            </div>

            {/* Warnings/Recommendations Section */}
            <div style={{
                maxWidth: '1200px',
                margin: '3rem auto 0',
                padding: '0 1rem'
            }}>
                <h2 style={{ color: '#2f5b4a', marginBottom: '1rem' }}>
                    System Status
                </h2>
                <div style={{
                    background: '#d4edda',
                    border: '1px solid #c3e6cb',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    color: '#155724'
                }}>
                    ✓ All systems operating within optimal range
                </div>
            </div>
        </div>
    );
};

export default PlantPage;