import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"

export default function Header() {
    return (
        <>
        {/* Font/icon links */}
        <link href="https://fonts.googleapis.com/css?family=Offside" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>

        <header className="header-box">
            {/* Menu button */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="menu-button material-icons">menu</i>
            </button>

            {/* Title */}
            <Link className="title" to="/" style={{ textDecoration: 'none' }}>
                <h1>🌱Agri-Sense🌱</h1>
            </Link>
            
            {/* Profile Icon */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="material-icons profile-button">
                    account_circle
                </i>
            </button>
        </header>
        </>
    )
}