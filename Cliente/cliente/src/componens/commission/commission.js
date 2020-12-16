import React from "react";
import "./commission.css";

function Commission(props) {
  const commissionInfo = props.commissionInfo;
  if (commissionInfo){
    return(
        <div className="commission-container">
          <h1>
          commisionInfo.description</h1>
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
