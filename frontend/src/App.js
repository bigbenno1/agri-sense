import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import PlantPage from './pages/plant-details';
import SettingsPage from './pages/settings';
import Header from './components/header';

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
      </div>
    </Router>
  );
}

export default App;