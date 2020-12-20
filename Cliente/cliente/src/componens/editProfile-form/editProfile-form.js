import React from "react";
import "./editProfile-form.css";


function UserProfileEdit(props) {
    let userProfileInfo = props.userProfileInfo
    console.log(userProfileInfo)
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>Actualizar perfil</h1>

                <img src={userProfileInfo.data.profilePictureURL} alt="User Profile Picture"></img>

                <p>
                    <label>Username</label>
                    <br></br>
                    <input
                        type="text"
                        autoFocus
                        required
                        defaultValue={userProfileInfo.username}
                    ></input>
                </p>
                <p>
                    <label>Twitter</label>
                    <br></br>
                    <input
                        type="text"
                        autoFocus
                        required
                        defaultValue={userProfileInfo.data.twitter === undefined ? "": userProfileInfo.data.twitter}
                    ></input>
                </p>
                <p>
                    <label>Facebook</label>
                    <br></br>
                    <input
                        type="text"
                        autoFocus
                        required
                        defaultValue={userProfileInfo.data.facebook === undefined ? "": userProfileInfo.data.facebook}
                    ></input>
                </p>
                <p>
                    <label>Instagram</label>
                    <br></br>
                    <input
                        type="text"
                        autoFocus
                        required
                        defaultValue={userProfileInfo.data.instagram === undefined ? "": userProfileInfo.data.instagram}
                    ></input>
                </p>
                <p>
                    <label>Profile Description</label>
                    <br></br>
                    <input
                        type="text"
                        autoFocus
                        required
                        defaultValue={userProfileInfo.data.description === undefined ? "": userProfileInfo.data.description}
                    ></input>
                </p>
                <button onClick={props.binding}>close me</button>
            </div>
        </div>
    )
}


export default UserProfileEdit;
