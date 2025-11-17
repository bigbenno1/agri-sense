import React from 'react';


export default function Card({ title = 'Card', value, unit, status }) {
 return (
   <div className="card" style={{
     width: '15rem',
     borderRadius: '0.6rem',
     boxShadow: '0 6px 8px rgba(0,0,0,0.12)',
     padding: '1rem',
     margin: '0.5rem',
     background: '#eaf3ee',
     color: '#2f5b4a'
   }}>
     <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{title}</h3>
     <div style={{
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       fontSize: '2rem',
       fontWeight: 'bold',
       color: '#2f5b4a',
     }}>
       {value !== undefined ? `${value} ${unit || ''}` : '–'}
     </div>
     {status && (
       <p style={{
           marginTop: '1rem',
           background: (status.toLowerCase().includes('perfect') || status.toLowerCase().includes('good')) ? '#d4edda' : '#edd6d4',
           border: status.toLowerCase().includes('perfect') || status.toLowerCase().includes('good') ? '1px solid #155724' : '1px solid #850a04',
           borderRadius: '0.5rem',
           padding: '0.5rem',
           color: status.includes('perfect') || status.includes('good') ? '#155724' : '#850a04',
           boxShadow: '0 6px 8px rgba(0,0,0,0.12)'


       }}>
           {status.includes('perfect') || status.includes('good') ? '✓ ' : '🛑 '}
         {status}
       </p>
     )}
   </div>
 );
}
