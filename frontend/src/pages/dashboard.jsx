import React from 'react';
import { Link } from 'react-router-dom';
import { PlantCard } from '../components/card';

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
                        <PlantCard plant={plant} />
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default DashboardPage;