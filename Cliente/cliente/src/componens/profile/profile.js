import React from "react";
import "../publication/publication.css";

function UserProfile(props) {
  const userProfileInfo = props.userProfileInfo;
  if (userProfileInfo.username){
    return(
        <div className="user">
            <h1>
                It was a user
            </h1>
        </div>
    )
  }else{
    return(
        <div className="your_princess_not_found">
            <h1>
                Your princess was not found
            </h1>
        </div>
    )
  }
}


export default UserProfile;
