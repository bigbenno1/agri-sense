import React from 'react';
//import { Link } from 'react-router-dom';
import Card from '../components/card';

const DashboardPage = () => {
    return (
        <main className="dashboard-page">
            <h1>Agrisense Dashboard</h1>
            <div className="cards">
                {/* <Link to="/plant/1">
                    <Card title="Plant 1"/>
                </Link>
                <Link to="/plant/2">
                    <Card title="Plant 2"/>
                </Link>
                <Link to="/plant/3">
                    <Card title="Plant 3"/>
                </Link> */}
            </div>
        </main>

    );
};

export default DashboardPage;