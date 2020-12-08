import React from "react";
import "./profile.css";

function UserProfile(props) {
  const userProfileInfo = props.userProfileInfo;
  if (userProfileInfo){
    return(
        <div className="userProfile-Container">
          <div className="userInfo-Container">
            <img src={userProfileInfo.data.profilePictureURL} alt="User Profile Picture"></img>
            <h2>{userProfileInfo.data.username}</h2>
            <h3>{userProfileInfo.data.description}</h3>
          </div>
          <div className="userProfileButton-Container">
          <button className="userProfile-followButton">Follow</button>
            <button className="userProfile-commissionButton">Commission</button>
            <button className="userProfile-donationButton">Donate</button>
          </div>
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
