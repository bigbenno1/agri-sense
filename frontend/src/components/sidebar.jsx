import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const HEADER_H = '8vh';
  const OPEN_W   = 250;
  const CLOSED_W = 55;

  useEffect(() => {
    let styleEl = document.querySelector('style[data-sidebar-css="true"]');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('data-sidebar-css', 'true');
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `                                            
:root{
  --base-clr: hsla(114 22% 83%);
  --line-clr: hsla(111 14% 36%);
  --hover-clr: hsla(96 41% 64%);
  --text-clr: hsla(146 41% 12%);
  --accent-clr: hsla(190 27% 66%);
  --secondary-text-clr: hsla(163 21% 41%);
}
#sidebar{
  box-sizing: border-box;
  position: fixed;
  top: 0; left: 0;
  height: 100vh;
  padding-top: ${HEADER_H};
  padding-left: 1em;
  padding-right: 1em;
  width: ${OPEN_W}px;
  background-color: var(--base-clr);
  border-right: 1px solid var(--line-clr);
  transition: width 300ms ease-in-out;
  z-index: 50;
  overflow: hidden;
}
html.agri-sidebar-closed #sidebar{
  width: ${CLOSED_W}px;
  padding-left: .5em;
  padding-right: .5em;
}
#sidebar ul{ list-style: none; margin: 0; padding: 0; }
#sidebar a{
  display:flex; align-items:center; gap:.75rem;
  min-height:40px; border-radius:.5em; padding:.5em .65em;
  color:var(--text-clr); text-decoration:none; white-space:nowrap;
}
#sidebar a:hover{ background-color: var(--hover-clr); }
#sidebar li.active a{ color: var(--accent-clr); }
#sidebar li.active a svg:not(.icon-stroke){ fill: var(--accent-clr); }
#sidebar li.active a svg.icon-stroke{ stroke: var(--accent-clr); }
#sidebar svg{ width:20px; height:20px; flex-shrink:0; opacity:.9; }
#sidebar svg:not(.icon-stroke){ fill: var(--text-clr); }
#sidebar svg.icon-stroke{ fill:none; stroke:var(--text-clr); stroke-width:2px; stroke-linecap:round; stroke-linejoin:round; }
html.agri-sidebar-closed #sidebar a span{ display: none; }
html.agri-sidebar-closed #sidebar a{ justify-content:center; }
`;

    const savedClosed = (() => {
      try { return localStorage.getItem('sidebar:closed') === 'true'; }
      catch { return false; }
    })();
    document.documentElement.classList.toggle('agri-sidebar-closed', savedClosed);

    const prevTr = document.body.style.transition;
    document.body.style.transition = 'padding-left 200ms ease';

    const el = document.getElementById('sidebar');
    const applyPadding = () => {
      const w = el ? el.getBoundingClientRect().width : (savedClosed ? CLOSED_W : OPEN_W);
      document.body.style.paddingLeft = `${w}px`;
    };
    applyPadding();

    const ro = ('ResizeObserver' in window && el) ? new ResizeObserver(applyPadding) : null;
    ro?.observe(el);

    return () => {
      ro?.disconnect();
      document.body.style.transition = prevTr;
    };
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0,
    height: '100vh',
    paddingTop: HEADER_H,
    zIndex: 50,
    backgroundColor: 'var(--base-clr)',
    borderRight: '1px solid var(--line-clr)',
    overflow: 'hidden',
  };

  return (
    <nav id="sidebar" role="navigation" aria-label="Sidebar" style={navStyle}>
      <ul>
        <li className="active">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
            </svg>
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/plant/1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/>
            </svg>
            <span>Plant 1</span>
          </Link>
        </li>

        <li>
          <Link to="/plant/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/>
            </svg>
            <span>Plant 2</span>
          </Link>
        </li>

        <li>
          <Link to="/plant/3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/>
            </svg>
            <span>Plant 3</span>
          </Link>
        </li>

        <li>
          <Link to="/settings">
            <svg className="icon-stroke" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="21" y1="4"  x2="14" y2="4"  />
              <line x1="10" y1="4"  x2="3"  y2="4"  />
              <circle cx="12" cy="4"  r="2"  />
              <line x1="21" y1="12" x2="12" y2="12" />
              <line x1="8"  y1="12" x2="3"  y2="12" />
              <circle cx="10" cy="12" r="2"  />
              <line x1="21" y1="20" x2="16" y2="20" />
              <line x1="12" y1="20" x2="3"  y2="20" />
              <circle cx="14" cy="20" r="2"  />
            </svg>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}