import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PlantPage = () => {
    const { id } = useParams();
    const [plantData, setPlantData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlantData = async () => {
            try {
                const dataResponse = await fetch('http://localhost:5000/api/data');
                const sensorData = await dataResponse.json();
                
                const recResponse = await fetch('http://localhost:5000/api/recommendation');
                const recommendations = await recResponse.json();
                
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
        const interval = setInterval(fetchPlantData, 5000);
        return () => clearInterval(interval);
    }, [id]);

    const DataCard = ({ title, value, unit, status, min, max }) => {
        const getStatusColor = (status) => {
            switch(status) {
                case 'optimal': return { bg: '#d4edda', border: '#c3e6cb', text: '#155724' };
                case 'warning': return { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' };
                case 'critical': return { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' };
                default: return { bg: '#e2e8f0', border: '#cbd5e0', text: '#4a5568' };
            }
        };

        const colors = getStatusColor(status);

        return (
            <div style={{
                background: colors.bg,
                border: `2px solid ${colors.border}`,
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <h3 style={{ 
                    margin: '0 0 1rem 0',
                    color: colors.text,
                    fontSize: '1rem',
                    fontWeight: '600'
                }}>
                    {title}
                </h3>
                
                {/* Main value display */}
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    padding: '1.5rem 0',
                    gap: '0.25rem'
                }}>
                    <span style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: colors.text,
                        lineHeight: 1
                    }}>
                        {value !== null && value !== undefined ? value : '--'}
                    </span>
                    <span style={{
                        fontSize: '1.2rem',
                        color: colors.text,
                        opacity: 0.8
                    }}>
                        {unit}
                    </span>
                </div>

                {/* Range indicator */}
                {min !== null && max !== null && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '0.5rem',
                        fontSize: '0.85rem',
                        color: colors.text
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Min: {min}{unit}</span>
                            <span>Max: {max}{unit}</span>
                        </div>
                    </div>
                )}

                {/* Status badge */}
                <div style={{
                    marginTop: '1rem',
                    textAlign: 'center'
                }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        background: colors.text,
                        color: 'white'
                    }}>
                        {status || 'unknown'}
                    </span>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div style={{ 
                paddingTop: 'calc(8vh + 2rem)', // Account for fixed header
                paddingLeft: '2rem',
                paddingRight: '2rem',
                paddingBottom: '2rem',
                textAlign: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f9f7'
            }}>
                <p style={{ color: '#6b8a78', fontSize: '1.2rem' }}>Loading plant data...</p>
            </div>
        );
    }

    return (
        <div style={{ 
            paddingTop: 'calc(8vh + 2rem)', // Account for fixed header
            paddingLeft: '2rem',
            paddingRight: '2rem',
            paddingBottom: '2rem',
            minHeight: '100vh',
            backgroundColor: '#f5f9f7'
        }}>
            {/* Back button */}
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                color: '#537E72',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
                ← Back to Dashboard
            </Link>

            {/* Plant Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
                <h1 style={{ 
                    color: '#2f5b4a',
                    margin: '0.5rem 0',
                    fontSize: '2.5rem'
                }}>
                    {plantData?.name || 'Plant Details'}
                </h1>
                <p style={{ 
                    color: '#6b8a78',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem'
                }}>
                    Last updated: {new Date(plantData?.lastUpdated).toLocaleString()}
                </p>
            </div>

            {/* Data Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1400px',
                margin: '0 auto 3rem',
                padding: '0 1rem'
            }}>
                <DataCard 
                    title="Air Temperature"
                    value={plantData?.sensors.airTemp.value}
                    unit={plantData?.sensors.airTemp.unit}
                    status={plantData?.sensors.airTemp.status}
                    min={plantData?.sensors.airTemp.min}
                    max={plantData?.sensors.airTemp.max}
                />
                
                <DataCard 
                    title="Humidity"
                    value={plantData?.sensors.humidity.value}
                    unit={plantData?.sensors.humidity.unit}
                    status={plantData?.sensors.humidity.status}
                    min={plantData?.sensors.humidity.min}
                    max={plantData?.sensors.humidity.max}
                />
                
                <DataCard 
                    title="Water Temperature"
                    value={plantData?.sensors.waterTemp.value}
                    unit={plantData?.sensors.waterTemp.unit}
                    status={plantData?.sensors.waterTemp.status}
                    min={plantData?.sensors.waterTemp.min}
                    max={plantData?.sensors.waterTemp.max}
                />
                
                <DataCard 
                    title="Electrical Conductivity"
                    value={plantData?.sensors.ec.value}
                    unit={plantData?.sensors.ec.unit}
                    status={plantData?.sensors.ec.status}
                    min={plantData?.sensors.ec.min}
                    max={plantData?.sensors.ec.max}
                />
                
                <DataCard 
                    title="pH Level"
                    value={plantData?.sensors.ph.value}
                    unit={plantData?.sensors.ph.unit}
                    status={plantData?.sensors.ph.status}
                    min={plantData?.sensors.ph.min}
                    max={plantData?.sensors.ph.max}
                />
            </div>

            {/* Recommendations Section */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                <h2 style={{ 
                    color: '#2f5b4a', 
                    marginBottom: '1.5rem',
                    fontSize: '1.8rem'
                }}>
                    Recommendations
                </h2>
                {plantData?.recommendations && plantData.recommendations.length > 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {plantData.recommendations.map((rec, index) => {
                            const isGood = rec.includes('perfect') || rec.includes('good') || rec.includes('no action');
                            return (
                                <div key={index} style={{
                                    background: isGood ? '#d4edda' : '#fff3cd',
                                    border: `2px solid ${isGood ? '#c3e6cb' : '#ffeaa7'}`,
                                    borderRadius: '0.75rem',
                                    padding: '1.25rem',
                                    color: isGood ? '#155724' : '#856404',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    fontSize: '1rem'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>
                                        {isGood ? '✓' : '⚠️'}
                                    </span>
                                    <span>{rec}</span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{
                        background: '#d4edda',
                        border: '2px solid #c3e6cb',
                        borderRadius: '0.75rem',
                        padding: '1.25rem',
                        color: '#155724',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '1rem'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>✓</span>
                        <span>All systems operating within optimal range</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlantPage;