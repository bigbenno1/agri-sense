import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const [apiStatus, setApiStatus] = useState("Connecting...");
  const [data, setData] = useState({});
  
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/status');
        const result = await response.json();
        setApiStatus(result.status);
        setData(result);
      } catch (error) {
        console.error("Error fetching status from backend:", error);
        setApiStatus("Offline (Backend connection failed)");
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      paddingTop: 'calc(8vh + 2rem)',
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

      {/* Settings Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚙️</div>
        <h1 style={{ 
          color: '#2f5b4a',
          margin: '0.5rem 0',
          fontSize: '2.5rem'
        }}>
          System Settings
        </h1>
        <p style={{ 
          color: '#6b8a78',
          fontSize: '0.9rem',
          marginTop: '0.5rem'
        }}>
          Monitor system status and configuration
        </p>
      </div>

      {/* Backend Status Card */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(47, 91, 74, 0.15)',
          border: '2px solid #e2e8f0'
        }}>
          <h2 style={{ 
            color: '#2f5b4a',
            marginTop: 0,
            marginBottom: '1.5rem',
            fontSize: '1.5rem'
          }}>
            Backend API Status
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: data.status === "Online" ? '#4ade80' : '#ef4444',
              boxShadow: data.status === "Online" ? '0 0 10px #4ade80' : '0 0 10px #ef4444'
            }}></div>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: data.status === "Online" ? '#155724' : '#721c24'
            }}>
              {apiStatus}
            </span>
          </div>

          {data.status === "Online" && (
            <div style={{
              background: '#f5f9f7',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginTop: '1rem'
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#2f5b4a' }}>Message:</strong>
                <span style={{ color: '#6b8a78', marginLeft: '0.5rem' }}>
                  {data.message}
                </span>
              </div>
              <div>
                <strong style={{ color: '#2f5b4a' }}>Version:</strong>
                <span style={{ color: '#6b8a78', marginLeft: '0.5rem' }}>
                  {data.version}
                </span>
              </div>
            </div>
          )}

          {data.status !== "Online" && (
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '0.5rem',
              padding: '1rem',
              color: '#856404',
              marginTop: '1rem'
            }}>
              ⚠️ Unable to connect to backend server. Please ensure the Flask server is running on http://localhost:5000
            </div>
          )}
        </div>

        {/* Additional Settings Sections (Future) */}
        <div style={{
          marginTop: '2rem',
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(47, 91, 74, 0.15)',
          border: '2px solid #e2e8f0'
        }}>
          <h2 style={{ 
            color: '#2f5b4a',
            marginTop: 0,
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            Application Settings
          </h2>
          <p style={{ color: '#6b8a78', margin: 0 }}>
            Coming soon: Configure plant thresholds, notifications, and more...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;