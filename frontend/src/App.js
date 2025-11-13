import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import PlantPage from './pages/plant-details';
import SettingsPage from './pages/settings';
import Header from './components/header';
import Footer from './components/footer';
import useFetch from './hooks/useFetch';

// You will need to install Tailwind CSS for styling in the next steps, 
// but for now, we'll use inline styles to keep it minimal.

function App() {
  return (
    <Router>
      <div style={{ 
        fontFamily: 'Arial, sans-serif', 
        margin: 0,
        padding: 0
      }}>
        {/* Header with sidebar - renders on all pages */}
        <Header />
        
        {/* Main content area - routes handle different pages */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/plant/:id" element={<PlantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

        <Footer/>
      </div>
      
    </Router>
  );
}

export default App;