import React, {useState, useContext} from "react";
import "./commission.css";
import Popup from 'reactjs-popup'
import {askCommission} from '../../services/commissionServices'
import UserContext from '../../utils/userContext'


function Commission(props) {
  const {token}  = useContext(UserContext);
  const commissionInfo = props.commissionInfo;
  const [extraComments, setExtraComments] = useState()
  const [Error, setError] = useState()

  const handleClick = async() => {
    const askResponse = await askCommission(token, props.username, commissionInfo._id, extraComments)
    manageResponseStatus(askResponse)
  }
  function manageResponseStatus(response){
    switch(response.status){
      case "ok":
        alert('Commission Created!')
        props.closeBinding()
        break;
      case "Error":
        alert('Server problem, check the data and try again')
        break;
      default:
        setError("Server error")
        console.log(Error);
    }
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
                    <button className='askCommission-Confirm' onClick={handleClick}>Ask Commission</button>
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
