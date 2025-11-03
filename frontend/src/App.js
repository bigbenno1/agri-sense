import React, { useState, useEffect } from 'react';
//import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DashboardLayout from './layouts/dashboard-layout';
import DashboardPage from './pages/dashboard';
import PlantPage from './pages/plant-details';

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


  return (
    <DashboardLayout>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
        <h1>🌱 Agri-Sense Dashboard (MVP) 🌱</h1>
        <p style={{ fontSize: '1.2em', color: data.status === "Online" ? 'green' : 'red', fontWeight: 'bold' }}>
          Backend Status: {apiStatus}
        </p>
        
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
      </div>
    </DashboardLayout>
    
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<DashboardLayout>
    //         <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
    //           <h1>🌱 Agri-Sense Dashboard (MVP) 🌱</h1>
    //           <p style={{ fontSize: '1.2em', color: data.status === "Online" ? 'green' : 'red', fontWeight: 'bold' }}>
    //             Backend Status: {apiStatus}
    //           </p>
              
    //           {data.status === "Online" && (
    //             <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
    //               <h3>API Information</h3>
    //               <p>Message: {data.message}</p>
    //               <p>Version: {data.version}</p>
    //             </div>
    //           )}

    //           <p style={{ marginTop: '40px', color: '#666' }}>
    //             *Frontend development starts here. Current view confirms successful API connection.*
              
    //           </p>
    //         </div>
    //         </DashboardLayout>}>
    //       <Route index element={<DashboardPage/>}/>
    //       <Route path="plant/:id" element={<PlantPage/>}/>
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;