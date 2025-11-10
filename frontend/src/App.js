// import React core + hooks
import React, { useState, useEffect } from 'react';                 // React + state/effect hooks
// import router primitives
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Router, Routes, Route
// import pages/components
import DashboardPage from './pages/dashboard';                      // dashboard page
import PlantPage from './pages/plant-details';                      // plant details page
import Header from './components/header';                           // fixed header (mounts sidebar)

function App() {                                                    // main App component
  const [apiStatus, setApiStatus] = useState('Connecting...');      // backend status label
  const [data, setData] = useState({});                             // backend payload

  useEffect(() => {                                                 // run once on mount
    const fetchStatus = async () => {                               // fetcher for backend status
      try {                                                         // try to call Flask
        const response = await fetch('http://localhost:5000/api/status'); // endpoint
        const result = await response.json();                       // parse JSON
        setApiStatus(result.status);                                // set label
        setData(result);                                            // stash payload
      } catch (err) {                                               // on error
        console.error('Error fetching status from backend:', err);  // log for debug
        setApiStatus('Offline (Backend connection failed)');        // friendly fallback
      }
    };

    fetchStatus();                                                  // initial call
    const id = setInterval(fetchStatus, 10000);                     // poll every 10s
    return () => clearInterval(id);                                 // cleanup on unmount
  }, []);                                                           // no deps

  return (
    <Router>                                                        {/* provide routing context */}
      <div style={{ fontFamily: 'Arial, sans-serif', padding: 0, textAlign: 'center', margin: 0 }}>
        <Header />                                                  {/* fixed header + sidebar */}

        <Routes>                                                    {/* route table */}
          <Route path="/" element={<DashboardPage />} />            {/* home → dashboard */}
          <Route path="/plant/:id" element={<PlantPage />} />       {/* plant details */}
        </Routes>

        <div style={{ paddingTop: '8vh' }}>                         {/* offset for fixed header */}
          <h1>🌱 Agri-Sense Dashboard (MVP) 🌱</h1>                 {/* title */}

          {/* colored status line */}
          <p
            style={{
              fontSize: '1.2em',
              color: data.status === 'Online' ? 'green' : 'red',
              fontWeight: 'bold'
            }}
          >
            Backend Status: {apiStatus}                             {/* status text */}
          </p>
        </div>

        {data.status === 'Online' && (                              /* info card when online */
          <div
            style={{
              marginTop: '20px',
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px',
              maxWidth: '400px',
              margin: '20px auto'
            }}
          >
            <h3>API Information</h3>                                {/* card header */}
            <p>Message: {data.message}</p>                          {/* backend message */}
            <p>Version: {data.version}</p>                          {/* backend version */}
          </div>
        )}

        <p style={{ marginTop: '40px', color: '#666' }}>           {/* footer note */}
          *Frontend development starts here. Current view confirms successful API connection.*
        </p>
      </div>
    </Router>
  );
}

export default App;                                                 // export default
