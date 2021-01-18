import React from "react";
import "./commission.css";

function Commission(props) {
  const commissionInfo = props.commissionInfo;
  if (commissionInfo){
    return(
      <div className="commission-Container">
        <div className="commissionInfo-Container">
          <img src={commissionInfo.picture}></img>
          <h2>{commissionInfo.title}</h2>
          <h3>{commissionInfo.price}</h3>
          <h3>{commissionInfo.description}</h3>
        </div>
      </div>
    )
  }else{
    return(
        <div className="commissionErrorFound-container">
            <h1>
                Invalid Commission
            </h1>
            
        </div>
    )
  }
}


export default Commission;
