import React from "react";
import "./editProfile-form.css";


function UserProfileEdit(props) {
    let userProfileInfo = props.userProfileInfo
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>{userProfileInfo.user}</h1>
                <button onClick={props.binding}>close me</button>
            </div>
        </div>
    )
}


export default UserProfileEdit;
