import React from "react";
import EditProfile from "../editProfile-form/editProfile-form"
import "./profile.css";

function updateProfile(user){
  return (
    <EditProfile userInfo={user}></EditProfile>
  )
}

function UserProfile(props) {
  var [showPopup, setShowPopup] = React.useState(false)
  const userProfileInfo = props.userProfileInfo;

  function toggleShowPopup(){
    setShowPopup(!showPopup)
  }
  

  function renderButtons(){
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
          <button className="userProfile-commissionButton">Commission</button>
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
          <h2>{userProfileInfo.data.username}</h2>
          <h3>{userProfileInfo.data.description}</h3>
        </div>
        {renderButtons()}
        {showPopup ? <EditProfile binding={toggleShowPopup} userProfileInfo = {userProfileInfo.data}></EditProfile>: null}
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
