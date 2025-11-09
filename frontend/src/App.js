import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import PlantPage from './pages/plant-details';
import Header from './components/header';

function App() {
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
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: 0, margin: 0 }}>
        <Header/>
        
        {/* Show connection status banner if offline */}
        {data.status !== "Online" && (
          <div style={{
            position: 'fixed',
            top: '8vh',  // Right below the header
            left: 0,
            right: 0,
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '0.75rem',
            textAlign: 'center',
            zIndex: 999,  // Below header (1000) but above content
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderBottom: '2px solid #f5c6cb'
          }}>
            ⚠️ Backend Status: {apiStatus}
          </div>
        )}
        {/* Add padding to content when banner is showing */}
        <div style={{ 
          paddingTop: data.status !== "Online" ? 'calc(8vh + 3rem)' : '8vh' 
        }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/plant/:id" element={<PlantPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;