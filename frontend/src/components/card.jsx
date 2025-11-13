import React from 'react';

// Plant Grid Card - for dashboard plant selection
export function PlantCard({ plant, onClick }) {
    return (
        <div 
            onClick={onClick}
            style={{
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
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
    );
}

// Data Card - for displaying sensor data on plant details page
export function DataCard({ title, value, unit, status, min, max }) {
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
}

// Originlal Card Component
export default function Card({ title = 'Card' }) {
    return (
        <div className="card" style={{
            width: '14rem',
            borderRadius: '0.6rem',
            boxShadow: '0 6px 8px rgba(0,0,0,0.12)',
            padding: '1rem',
            margin: '0.5rem',
            background: '#eaf3ee',
            color: '#2f5b4a'
        }}>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ height: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b8a78' }}>
                data visual
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Summary / recommendation</p>
        </div>
    );
}