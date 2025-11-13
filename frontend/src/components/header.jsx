import React from 'react';
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
            <a href="">
                <i className="menu-button material-icons">menu</i>
            </a>

            {/* Title */}
            <a className="title"
                href="">
                <h1>🌱Agri-Sense🌱</h1>
            </a>
            
            {/* Profile Icon */}
            <a href="">
                <i class="material-icons profile-button">
                    account_circle
                </i>
            </a>
        </header>
        </>
    )
}
