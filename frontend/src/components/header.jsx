// Import React so we can render a component
import React from 'react';
// Import the Sidebar so it mounts once on every page
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

    // 3) Nudge the page content by the actual sidebar width
    const el = document.getElementById('sidebar');                   // find the sidebar element
    const w  = el ? el.getBoundingClientRect().width : (willClose ? 55 : 250); // read width or fall back
    document.body.style.paddingLeft = `${w}px`;                      // push main content over
  };

  return (
    <>
      {/* Mount the sidebar once so it can react to the <html> class */}
      <Sidebar />

      {/* Fixed header bar with a borderless button on the left */}
      <div
        style={{
          backgroundColor: '#CDDECB',
          borderStyle: 'groove none none none',
          boxShadow: '0px 1px 5px',
          padding: 0,
          width: '100%',
          height: '8vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100, // keep header above sidebar
        }}
      >
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          type="button"
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 6,
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 -960 960 960"
            fill="#2f3f36"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>

        {/* Your font links (unchanged) */}
        <link href="https://fonts.googleapis.com/css?family=Offside" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        {/* Centered title */}
        <header>
          <div
            style={{
              fontFamily: 'Offside, sans-serif',
              textAlign: 'Center',
              color: '#537E72',
              textShadow:
                '0px 2.5px white, -.5px 2.5px white, .5px 2.5px white, -.5px 0px white, .5px 0px white, 0px 0px 3px white',
              paddingTop: 0,
              fontSize: '2.5vh',
            }}
          >
            <h1 style={{ margin: 0 }}>🌱Agri-Sense🌱</h1>
          </div>
        </header>
      </div>
    </>
  );
}
