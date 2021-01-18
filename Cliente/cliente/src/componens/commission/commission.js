import React, {useState} from "react";
import "./commission.css";
import Popup from 'reactjs-popup'


function Commission(props) {
  const commissionInfo = props.commissionInfo;
  const [extraComments, setExtraComments] = useState()

  
  const askCommission = async() =>{
    alert('Commission created')
    props.closeBinding()
  }


  if (commissionInfo){
    return(
      <div className="commission-Container">
        <div className="commissionInfo-Container">
          <img src={commissionInfo.picture}></img>
          <h2>{commissionInfo.title}</h2>
          <h3>{commissionInfo.price}</h3>
          <h3>{commissionInfo.description}</h3>
          <Popup trigger={<button className="commissionInfo-askButton">Ask for this commission</button>} modal nested>
            {
              close => (
                <div className="askCommission-Container">
                  <div className='askCommission-Inner'>
                    <h1>Confirm Commission!</h1>
                    <label>Extra comments</label>
                    <input maxLength='255' type='input' onChange={(e) => setExtraComments(e.target.value)}></input>
                    <button className='askCommission-Confirm' onClick={askCommission}>Ask Commission</button>
                    <button className = 'askCommission-Cancel' onClick={close}>Cancel</button>
                  </div>
                </div>
              )
            }
          </Popup>
          
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
