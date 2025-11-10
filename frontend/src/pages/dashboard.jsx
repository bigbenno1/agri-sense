import React from 'react';
import { Link } from 'react-router-dom';
//import Card from '../components/card';
import Button from '../components/button';

const DashboardPage = () => {
    const plants = [
                { id: 1, name: "Basil Plant 1"}, 
                { id: 2, name: "Basil Plant 2"},
                { id: 3, name: "Basil Plant 3"}
            ];
    return (
        <main className="dashboard-page"
            style={{ 
            padding: '2rem',
            paddingTop: '10vh',
            minHeight: '100vh',
            backgroundColor: '#f5f9f7'
        }} >
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
                    click for more info
                </p>
            </div>
            <div className="cards" 
                style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                {plants.map((plant) => (
                    <Link key={plant.id} to={`/plant/${plant.id}`}>
                        <Button>{plant.name}</Button>
                    </Link>
                ))}
            </div>
        </main>

    );
};

export default DashboardPage;