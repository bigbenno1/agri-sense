import React from 'react';

export default function Card({ title = 'Card' }) {
	return (
		<div className="card" style={{
			width: '14rem',
			borderRadius: '0.6rem',
			boxShadow: '0 6px 8px rgba(0,0,0,0.12)',
			padding: '1rem',
			margin: '0.5rem',
			background: '#eaf3ee',
			color: '#2f5b4a'
		}}>
			<h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{title}</h3>
			<div style={{ height: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b8a78' }}>
				data visual
			</div>
			<p style={{ margin: 0, fontSize: '0.9rem' }}>Summary / recommendation</p>
		</div>
	);
}

// import React from "react"

// import "./Card.css";
// export const Card = () => {

//     return (
        
//     <div className="card-container">

//      <h2 className="data-type"> Data Type</h2>
//      <div class="horizontal-line"></div> {/* adds horizontal line for decoration */}
//       <p className="data-visual"> *insert data visual here* </p>
//       <p className="data-summary"> general summary of data/reccomendation</p>

//     </div>
 
//     );
// };
