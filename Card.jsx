import React from "react"

import "./Card.css";
export const Card = () => {

    return (
        
    <div className="card-container">

     <h2 className="data-type"> Data Type</h2>
     <div class="horizontal-line"></div> {/* adds horizontal line for decoration */}
      <p className="data-visual"> *insert data visual here* </p>
      <p className="data-summary"> general summary of data/reccomendation</p>

    </div>
 
    );
};