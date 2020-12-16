import React from "react";
import "./profile.css";

function UserProfile(props) {
  const userProfileInfo = props.userProfileInfo;
  if (userProfileInfo){
    console.log(userProfileInfo)
    const buttons = userProfileInfo.isOwn ? 
    <button className="userProfile-editButton">Editar</button> : [<button className="userProfile-followButton">Follow</button>, <button className="userProfile-commissionButton">Commission</button>, <button className="userProfile-donationButton">Donate</button>]
    return(
        <div className="userProfile-Container">
          <div className="userInfo-Container">
            <img src={userProfileInfo.data.profilePictureURL} alt="User Profile Picture"></img>
            <h2>{userProfileInfo.data.username}</h2>
            <h3>{userProfileInfo.data.description}</h3>
          </div>
          <div className="userProfileButton-Container">
            {buttons}
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
