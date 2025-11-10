import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import DashboardLayout from './layouts/dashboard-layout';
import DashboardPage from './pages/dashboard';
import PlantPage from './pages/plant-details';
import Header from './components/header';
import useFetch from './hooks/useFetch';

// You will need to install Tailwind CSS for styling in the next steps, 
// but for now, we'll use inline styles to keep it minimal.

function App() {
  // State to hold data fetched from the Flask backend
  const [apiStatus, setApiStatus] = useState("Connecting...");
  const [data, setData] = useState({});
  
  // useEffect hook runs when the component mounts
  useEffect(() => {
    // Function to fetch data from the Flask server
    const fetchStatus = async () => {
      try {
        // Fetch data from the endpoint defined in backend/app.py
        const response = await fetch('http://localhost:5000/api/status');
        const result = await response.json();
        
        // Update state with fetched data
        setApiStatus(result.status);
        setData(result);
        
      } catch (error) {
        console.error("Error fetching status from backend:", error);
        setApiStatus("Offline (Backend connection failed)");
      }
    };

    // Call the function to fetch data immediately
    fetchStatus();
    
    // Set up an interval to poll the status every 10 seconds
    const interval = setInterval(fetchStatus, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on mount
  
  //using API
  /*
  const plantName = 'basil'; // example plant name
  // fetch data
  const { data: sensorData, loading: loadingData, error: errorData } =
    useFetch(`/api/data?name=${plantName}`);

  // fetch recommendation
  const { data: recommendation, loading: loadingRec, error: errorRec } =
    useFetch(`/api/recommendation?name=${plantName}`);

  if (loadingData || loadingRec) return <p>Loading...</p>;
  if (errorData || errorRec) return <p>Error: {errorData || errorRec}</p>;
  */
  

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 0, textAlign: 'center', margin: 0}}>
      <Header/>
      {/* <DashboardPage/>
      <PlantPage /> */}

      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/plant/:id" element={<PlantPage />} /> 
        </Routes>
      </Router>
      <div style={{paddingTop:"8vh"}}>
        <h1>🌱 Agri-Sense Dashboard (MVP) 🌱</h1>
        <p style={{ fontSize: '1.2em', color: data.status === "Online" ? 'green' : 'red', fontWeight: 'bold' }}>
          Backend Status: {apiStatus}
        </p>
      </div>
      {data.status === "Online" && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
          <h3>API Information</h3>
          <p>Message: {data.message}</p>
          <p>Version: {data.version}</p>
        </div>
      )}

      <p style={{ marginTop: '40px', color: '#666' }}>
        *Frontend development starts here. Current view confirms successful API connection.*
       
      </p>
      
      {/* display API data */}
      {/* <h1>{plantName} Sensor Data</h1>
      {sensorData && (
        <ul>
          <li>Air Temp: {sensorData.air_temp}°C</li>
          <li>Water Temp: {sensorData.water_temp}°C</li>
          <li>Humidity: {sensorData.humidity}%</li>
          <li>EC: {sensorData.electrical_conductivity}</li>
          <li>pH: {sensorData.pH}</li>
        </ul>
      )}

      <h2>Recommendation</h2>
      {recommendation && <p>{recommendation.message}</p>} */}
    </div>

  );
}

export default App;