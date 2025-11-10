import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const plants = [
        { id: 1, name: "Basil Plant 1"}, 
        { id: 2, name: "Basil Plant 2"},
        { id: 3, name: "Basil Plant 3"}
    ];

    return (
        <main className="dashboard-page"
            style={{ 
                paddingTop: 'calc(8vh + 2rem)', // Account for fixed header
                paddingLeft: '2rem',
                paddingRight: '2rem',
                paddingBottom: '2rem',
                minHeight: '100vh',
                backgroundColor: '#f5f9f7'
            }}>
            {/* Dashboard header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <h1 style={{ 
                    color: '#2f5b4a',
                    margin: '0.5rem 0'
                }}>
                    Current Plants
                </h1>
                <p style={{ 
                    color: '#6b8a78',
                    fontSize: '0.9rem'
                }}>
                    Click on a plant for more info
                </p>
            </div>
            
            <div className="plant-grid" 
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem'
                }}>
                {plants.map((plant) => (
                    <Link 
                        key={plant.id} 
                        to={`/plant/${plant.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div style={{
                            background: 'linear-gradient(135deg, #eaf3ee 0%, #d4e8d8 100%)',
                            borderRadius: '1rem',
                            padding: '2rem',
                            boxShadow: '0 4px 12px rgba(47, 91, 74, 0.15)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: '2px solid transparent',
                            minHeight: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(47, 91, 74, 0.25)';
                            e.currentTarget.style.borderColor = '#537E72';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 91, 74, 0.15)';
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                        >
                            {/* Plant Icon */}
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem'
                            }}>
                                🌿
                            </div>
                            
                            {/* Plant Name */}
                            <h2 style={{
                                color: '#2f5b4a',
                                fontSize: '1.5rem',
                                margin: '0 0 0.5rem 0',
                                fontWeight: '600'
                            }}>
                                {plant.name}
                            </h2>
                            
                            {/* Status indicator */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#537E72',
                                fontSize: '0.9rem'
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#4ade80',
                                    display: 'inline-block'
                                }}></span>
                                Active
                            </div>
                            
                            {/* View details hint */}
                            <p style={{
                                marginTop: '1rem',
                                color: '#6b8a78',
                                fontSize: '0.85rem',
                                fontStyle: 'italic'
                            }}>
                                Click to view details →
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default DashboardPage;