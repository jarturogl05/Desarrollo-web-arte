import React from "react";
import "./editProfile-form.css";


function UserProfileEdit(props) {
    let userProfileInfo = props.userProfileInfo
    return (
        <div className='popup'>
            <div className='popup_inner'>

                <img src={userProfileInfo.profilePictureURL} alt="User Profile Picture"></img>

                <p>
                    <label>Confirm password</label>
                    <br></br>
                    <input
                        type="password"
                        autoFocus
                        required
                    ></input>
                </p>
                <p>
                    <label>Confirm password</label>
                    <br></br>
                    <input
                        type="password"
                        autoFocus
                        required
                    ></input>
                </p>
                <p>
                    <label>Confirm password</label>
                    <br></br>
                    <input
                        type="password"
                        autoFocus
                        required
                    ></input>
                </p>
                <p>
                    <label>Confirm password</label>
                    <br></br>
                    <input
                        type="password"
                        autoFocus
                        required
                    ></input>
                </p>
                <p>
                    <label>Confirm password</label>
                    <br></br>
                    <input
                        type="password"
                        autoFocus
                        required
                    ></input>
                </p>
                <button onClick={props.binding}>close me</button>
            </div>
        </div>
    )
}


export default UserProfileEdit;
