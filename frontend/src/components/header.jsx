import React from 'react';
import "./header.css"
import Sidebar from './sidebar';

export default function Header() {
  // Single click handler that toggles a class on <html> and updates padding
  const toggleSidebar = () => {
    // 1) Flip a flag class on <html> (drives all sidebar CSS)
    const root = document.documentElement;                           // get the <html> element
    const willClose = !root.classList.contains('agri-sidebar-closed'); // figure out next state
    root.classList.toggle('agri-sidebar-closed', willClose);           // apply/remove the class

    // 2) Persist the state so refresh keeps your preference
    try { localStorage.setItem('sidebar:closed', String(willClose)); } catch {}

    // // 3) Nudge the page content by the actual sidebar width
    // const el = document.getElementById('sidebar');                   // find the sidebar element
    // const w  = el ? el.getBoundingClientRect().width : (willClose ? 55 : 250); // read width or fall back
    // document.body.style.paddingLeft = `${w}px`;                      // push main content over
  };

  return (
    <>
      {/* Mount the sidebar once so it can react to the <html> class */}
      <Sidebar />
    
      <header className="header-box">
        {/* Font/icon links */}
        <link href="https://fonts.googleapis.com/css?family=Offside" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>

        {/* Menu button */}
        <button onClick={toggleSidebar} aria-label="Toggle sidebar">
          <i className="menu-button material-icons">menu</i>
        </button>
        {/* <a href="" onClick={toggleSidebar} aria-label="Toggle sidebar">
                <i className="menu-button material-icons">menu</i>
             </a> */}

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