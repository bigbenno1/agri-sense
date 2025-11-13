import React from 'react';
//import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
//import DashboardPage from '../pages/dashboard';

const DashboardLayout = ({children}) => {
    return (
        <div className="dashboard-layout">
            <Header/>
            <div className="dashboard-body">
                <Sidebar />
                <section className="content">
                    {/* <Outlet/> */}
                    {children}
                </section>
            </div>
        </div>
    );
};

export default DashboardLayout;