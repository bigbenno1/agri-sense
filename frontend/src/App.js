import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
//import DashboardLayout from './layouts/dashboard-layout';
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
      <div style={{ fontFamily: 'Arial, sans-serif', padding: 0, textAlign: 'center', margin: 0}}>
        <Header/>
        {/* <DashboardPage/>
        <PlantPage /> */}

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/plant/:id" element={<PlantPage />} /> 
        </Routes>

        {/* <div style={{paddingTop:"8vh"}}>
          <h1>🌱 Agri-Sense Dashboard (MVP) 🌱</h1>
          <p style={{ fontSize: '1.2em', color: data.status === "Online" ? 'green' : 'red', fontWeight: 'bold' }}>
            Backend Status: {apiStatus}
          </p>
        </div> */}
        {/* {data.status === "Online" && (
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
            <h3>API Information</h3>
            <p>Message: {data.message}</p>
            <p>Version: {data.version}</p>
          </div>
        )} */}
      </div>
    </Router>
  );
}

export default App;