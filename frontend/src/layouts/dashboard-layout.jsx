// src/layouts/dashboard-layout.jsx
import React from 'react';
import Header from '../components/header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="app-grid">
        <main style={{ padding: '16px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

