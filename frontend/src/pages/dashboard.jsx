import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/card';

const DashboardPage = () => {
    return (
        <main className="dashboard-page"
            style={{ 
            padding: '2rem',
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
            
            <div className="cards" 
                style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                <Link to="/plant/1" style={{ textDecoration: 'none' }}>
                    <Card title="Plant 1"/>
                </Link>
                <Link to="/plant/2" style={{ textDecoration: 'none' }}>
                    <Card title="Plant 2"/>
                </Link>
                <Link to="/plant/3" style={{ textDecoration: 'none' }}>
                    <Card title="Plant 3"/>
                </Link>
            </div>
        </main>
    );
};

export default DashboardPage;