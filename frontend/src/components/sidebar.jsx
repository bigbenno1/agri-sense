// Import React and the hook we need
import React, { useEffect } from 'react'; // bring in React + useEffect for lifecycle work

export default function Sidebar() { // export a component the app can render
  const HEADER_H = '8vh';           // fixed header height so the sidebar sits underneath
  const OPEN_W   = 250;             // expanded sidebar width in px
  const CLOSED_W = 55;              // collapsed sidebar width in px

  useEffect(() => {                                                      // run once on mount
    let styleEl = document.querySelector('style[data-sidebar-css="true"]'); // try to find our injected <style>
    if (!styleEl) {                                                      // if it doesn't exist yet
      styleEl = document.createElement('style');                         // create a <style> element
      styleEl.setAttribute('data-sidebar-css', 'true');                  // tag it so we can find it later
      document.head.appendChild(styleEl);                                // add it to <head>
    }                                                                    // end if no style tag
    styleEl.textContent = `                                            
:root{
  --base-clr: hsla(114 22% 83%);              /* panel background */
  --line-clr: hsla(111 14% 36%);              /* borders/dividers */
  --hover-clr: hsla(96 41% 64%);              /* hover background */
  --text-clr: hsla(146 41% 12%);              /* normal icon/text */
  --accent-clr: hsla(190 27% 66%);            /* active item color */
  --secondary-text-clr: hsla(163 21% 41%);    /* spare theme var */
}

/* Base sidebar panel */
#sidebar{
  box-sizing: border-box;                     /* predictable sizing */
  position: fixed;                            /* pin to viewport */
  top: 0; left: 0;                            /* dock to left edge */
  height: 100vh;                              /* full viewport height */
  padding-top: ${HEADER_H};                   /* sit under the fixed header */
  padding-left: 1em;                          /* inner left padding */
  padding-right: 1em;                         /* inner right padding */
  width: ${OPEN_W}px;                         /* expanded width */
  background-color: var(--base-clr);          /* theme bg */
  border-right: 1px solid var(--line-clr);    /* subtle divider */
  transition: width 300ms ease-in-out;        /* animate collapse/expand */
  z-index: 50;                                /* under header (header has 100) */
  overflow: hidden;                           /* clip text/icons when narrow */
}

/* Collapsed state driven by a class on <html> (set by Header’s button) */
html.agri-sidebar-closed #sidebar{
  width: ${CLOSED_W}px;                       /* narrow width when collapsed */
  padding-left: .5em;                         /* tighter padding */
  padding-right: .5em;                        /* tighter padding */
}

/* List + item basics */
#sidebar ul{ list-style: none; margin: 0; padding: 0; }        /* reset list */
#sidebar a{
  display:flex; align-items:center; gap:.75rem;                  /* icon + label row */
  min-height:40px; border-radius:.5em; padding:.5em .65em;       /* hit target + shape */
  color:var(--text-clr); text-decoration:none; white-space:nowrap; /* readable text */
}

/* Hover/active visuals */
#sidebar a:hover{ background-color: var(--hover-clr); }         /* hover bg */
#sidebar li.active a{ color: var(--accent-clr); }                /* active text */
#sidebar li.active a svg:not(.icon-stroke){ fill: var(--accent-clr); } /* active fill icons turn accent */
#sidebar li.active a svg.icon-stroke{ stroke: var(--accent-clr); }     /* active stroke icons turn accent */

/* Icon sizing + color handling */
#sidebar svg{ width:20px; height:20px; flex-shrink:0; opacity:.9; }     /* consistent icon size */
#sidebar svg:not(.icon-stroke){ fill: var(--text-clr); }                 /* fill icons follow text color */
#sidebar svg.icon-stroke{ fill:none; stroke:var(--text-clr); stroke-width:2px; stroke-linecap:round; stroke-linejoin:round; } /* stroke icons follow text color */

/* Hide labels (the right-side <span>) when collapsed to icon-only menu */
html.agri-sidebar-closed #sidebar a span{ display: none; }       /* hide item labels */
html.agri-sidebar-closed #sidebar a{ justify-content:center; }   /* center icons in collapsed state */
`;                                                                   // end CSS text

    // Read saved collapsed state and apply to <html> so CSS reacts immediately
    const savedClosed = (() => {                                      // wrap in IIFE for try/catch
      try { return localStorage.getItem('sidebar:closed') === 'true'; } // read persisted flag
      catch { return false; }                                         // default to expanded on error
    })();                                                             // end IIFE
    document.documentElement.classList.toggle('agri-sidebar-closed', savedClosed); // set the class

    // Make body’s left padding animate smoothly while the sidebar width changes
    const prevTr = document.body.style.transition;                    // remember old transition
    document.body.style.transition = 'padding-left 200ms ease';       // add a smooth transition

    // Keep body padding aligned to the actual rendered width (works during the width animation)
    const el = document.getElementById('sidebar');                     // find the sidebar node
    const applyPadding = () => {                                       // define a function to set padding
      const w = el ? el.getBoundingClientRect().width                 // prefer the live rendered width
                    : (savedClosed ? CLOSED_W : OPEN_W);              // fallback if not found yet
      document.body.style.paddingLeft = `${w}px`;                      // push content over by that width
    };                                                                 // end function
    applyPadding();                                                    // call once on mount

    // Observe the sidebar’s box size so padding tracks during transition
    const ro = ('ResizeObserver' in window && el)                      // check support + element
      ? new ResizeObserver(applyPadding)                               // create an observer
      : null;                                                          // otherwise skip
    ro?.observe(el);                                                   // start watching (optional chaining)

    // Cleanup on unmount
    return () => {                                                     // return cleanup
      ro?.disconnect();                                                // stop observing
      document.body.style.transition = prevTr;                         // restore original transition
    };                                                                 // end cleanup
  }, []);                                                              // only once

  // Inline positioning only; all sizes/colors come from the injected CSS
  const navStyle = {                                                   // style object for <nav>
    position: 'fixed',                                                 // pin to viewport
    top: 0, left: 0,                                                   // dock to top-left
    height: '100vh',                                                   // full height
    paddingTop: HEADER_H,                                              // avoid header overlap
    zIndex: 50,                                                        // under header
    backgroundColor: 'var(--base-clr)',                                // theme bg
    borderRight: '1px solid var(--line-clr)',                          // divider
    overflow: 'hidden',                                                // clip overflow
  };                                                                   // end style object

  return (                                                             // render the sidebar
    <nav id="sidebar" role="navigation" aria-label="Sidebar" style={navStyle}> {/* semantic nav */}
      <ul>                                                             {/* vertical list */}
        {/* Note: brand row removed entirely per request */}

        <li className="active">                                        {/* example active item */}
          <a href="#home">                                              {/* nav link */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"> {/* home icon */}
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
            </svg>
            <span>Home</span>                                          {/* label (hidden when collapsed) */}
          </a>
        </li>

        <li>                                                            {/* plant 1 */}
          <a href="#plant1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/>
            </svg>
            <span>Plant 1</span>
          </a>
        </li>

        <li>                                                            {/* plant 2 */}
          <a href="#plant2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/>
            </svg>
            <span>Plant 2</span>
          </a>
        </li>

        <li>                                                            {/* plant 3 */}
          <a href="#plant3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/>
            </svg>
            <span>Plant 3</span>
          </a>
        </li>

        <li>                                                            {/* plant 4 */}
          <a href="#plant4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/>
            </svg>
            <span>Plant 4</span>
          </a>
        </li>

        <li>                                                            {/* settings (sliders icon) */}
          <a href="#settings">
            <svg className="icon-stroke" viewBox="0 0 24 24" aria-hidden="true"> {/* stroke-based sliders */}
              <line x1="21" y1="4"  x2="14" y2="4"  />                            {/* top right line */}
              <line x1="10" y1="4"  x2="3"  y2="4"  />                            {/* top left line */}
              <circle cx="12" cy="4"  r="2"  />                                   {/* top knob */}
              <line x1="21" y1="12" x2="12" y2="12" />                            {/* middle right line */}
              <line x1="8"  y1="12" x2="3"  y2="12" />                            {/* middle left line */}
              <circle cx="10" cy="12" r="2"  />                                   {/* middle knob */}
              <line x1="21" y1="20" x2="16" y2="20" />                            {/* bottom right line */}
              <line x1="12" y1="20" x2="3"  y2="20" />                            {/* bottom left line */}
              <circle cx="14" cy="20" r="2"  />                                   {/* bottom knob */}
            </svg>
            <span>Settings</span>                                                {/* label (hidden when collapsed) */}
          </a>
        </li>
      </ul>
    </nav>
  ); // end render
} // end component
