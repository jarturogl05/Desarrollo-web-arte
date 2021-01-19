import React from "react";
import Popup from 'reactjs-popup'
import EditProfile from "../editProfile-form/editProfile-form"
import CommissionManager from "../comissionManager/commissionManager"
import "./profile.css";



function UserProfile(props) {
  var [showPopup, setShowPopup] = React.useState(false)
  const userProfileInfo = props.userProfileInfo;

  function toggleShowPopup(){
    setShowPopup(!showPopup)
  }
  

  function renderButtons(){
    const commissionTest = {title:'Una pintura', price:25, description: 'jdfbkjdbfdkjf', picture: 'https://escanos.org/wp-content/uploads/sites/2/2015/11/Abstencion1.png'}
    if (userProfileInfo.isOwn){
      return (
        <div className="userProfileButton-Container">
          <button className="userProfile-editButton" onClick={toggleShowPopup}>Editar</button>
        </div>
      )
    } else {
      return (
        <div className="userProfileButton-Container">
          <button className="userProfile-followButton">Follow</button>
          <Popup trigger={<button className="userProfile-commissionButton">Commission</button>} modal nested>
            {
              close => (
                <CommissionManager username={props.userProfileInfo.username} closeBinding={close}></CommissionManager>
              )
            }
            </Popup>
          <button className="userProfile-donationButton">Donate</button>
        </div>
      )
    }
  }
  if (userProfileInfo){
    return(
      <div className="userProfile-Container">
        <div className="userInfo-Container">
          <img src={userProfileInfo.data.profilePictureURL} alt="User Profile Picture"></img>
          <h2>{userProfileInfo.username}</h2>
          <h3>{userProfileInfo.data.description}</h3>
        </div>
        {renderButtons()}
        {showPopup ? <EditProfile binding={toggleShowPopup} userProfileInfo = {userProfileInfo}></EditProfile>: null}
      </div>
    )
  }else{
    return(
        <div className="userNotFound-container">
            <h1>
                Your princess was not found in this castle
            </h1>
        </div>
    )
  }
}


export default UserProfile;
