import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/card';

const PlantPage = () => {
    const { id } = useParams(); // Get plant ID from URL
    const [plantData, setPlantData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlantData = async () => {
            try {
                // Fetch sensor data from Flask backend
                const dataResponse = await fetch('http://localhost:5000/api/data');
                const sensorData = await dataResponse.json();
                
                // Fetch recommendations
                const recResponse = await fetch('http://localhost:5000/api/recommendation');
                const recommendations = await recResponse.json();
                
                // Format data for display
                const formattedData = {
                    id: id,
                    name: `${sensorData.name || "Plant"} #${id}`,
                    lastUpdated: new Date().toISOString(),
                    sensors: {
                        airTemp: sensorData.air_temp,
                        humidity: sensorData.humidity,
                        waterTemp: sensorData.water_temp,
                        ec: sensorData.electrical_conductivity,
                        ph: sensorData.pH
                    },
                    recommendations: recommendations
                };
                
                setPlantData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching plant data:", error);
                setLoading(false);
            }
        };

        fetchPlantData();
        
        // Poll every 5 seconds for updates
        const interval = setInterval(fetchPlantData, 5000);
        return () => clearInterval(interval);
    }, [id]);

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
            minHeight: '100vh',
            backgroundColor: '#f5f9f7'
        }}>
            {/* Back button */}
            <Link to="/" style={{
                display: 'inline-block',
                marginBottom: '1rem',
                color: '#537E72',
                textDecoration: 'none',
                fontSize: '1rem'
            }}>
                ← Back to Dashboard
            </Link>

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
                    Recommendations
                </h2>
                {plantData?.recommendations && plantData.recommendations.length > 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        {plantData.recommendations.map((rec, index) => (
                            <div key={index} style={{
                                background: rec.includes('perfect') || rec.includes('good') ? '#d4edda' : '#fff3cd',
                                border: rec.includes('perfect') || rec.includes('good') ? '1px solid #c3e6cb' : '1px solid #ffeaa7',
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                color: rec.includes('perfect') || rec.includes('good') ? '#155724' : '#856404'
                            }}>
                                {rec.includes('perfect') || rec.includes('good') ? '✓' : '⚠️'} {rec}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        background: '#d4edda',
                        border: '1px solid #c3e6cb',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        color: '#155724'
                    }}>
                        ✓ All systems operating within optimal range
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlantPage;