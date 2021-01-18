import React, {useState, useContext} from "react";
import { useHistory } from 'react-router-dom'
import "./editProfile-form.css";
import { editProfile } from '../../services/profileServices'
import UserContext from '../../utils/userContext'



function UserProfileEdit(props) {

    
    const {token, refreshToken}  = useContext(UserContext);
    const [username, setUsername] = useState();
    const [description, setDescription] = useState();
    const [twitter, setTwitter] = useState();
    const [facebook, setFacebook] = useState();
    const [instagram, setInstagram] = useState();
    const [youtube, setYoutube] = useState();
    const [profilePictureURL, setProfilePictureURL] = useState();
    const [error, setError] = useState();


    const history = useHistory();
    const submit = async (e) =>{
        e.preventDefault();
        
        if (checkFields()){
          const editResponse = await editProfile(token, refreshToken, username, description, twitter, facebook, instagram, youtube, profilePictureURL)
          if (editResponse){
            editResponseStatus(editResponse);
           }else{
             setError("Server Error")
             console.log(error);
           }
        }
      }
    
      function checkFields(){
          return true
      }
    
      function editResponseStatus(editResponse){
        switch(editResponse.status){
          case "ok":
            alert('Data changed! \n Redirecting to login')
            history.push("/login");
            break;
          case "Error":
            alert('Server problem, check the data and try again')
            break;
          default:
            setError("Server error");
            console.log(error);
        }
      }

    let userProfileInfo = props.userProfileInfo


    return (
        <div className='popup'>
            <div className='popup_inner'>
                <form className='editProfileForm' onSubmit={submit}>
                    <h1>Actualizar perfil</h1>

                    <img src={userProfileInfo.data.profilePictureURL} alt="User Profile"></img>

                    <p>
                        <label>Username</label>
                        <br></br>
                        <input
                            type="text"
                            autoFocus
                            onChange = {(e) => setUsername(e.target.value)}
                            defaultValue={userProfileInfo.username}
                        ></input>
                    </p>
                    <p>
                        <label>Twitter</label>
                        <br></br>
                        <input
                            type="text"
                            autoFocus
                            onChange = {(e) => setTwitter(e.target.value)}
                            defaultValue={userProfileInfo.data.twitter === undefined ? "" : userProfileInfo.data.twitter}
                        ></input>
                    </p>
                    <p>
                        <label>Facebook</label>
                        <br></br>
                        <input
                            type="text"
                            autoFocus
                            onChange = {(e) => setFacebook(e.target.value)}
                            defaultValue={userProfileInfo.data.facebook === undefined ? "" : userProfileInfo.data.facebook}
                        ></input>
                    </p>
                    <p>
                        <label>Instagram</label>
                        <br></br>
                        <input
                            type="text"
                            autoFocus
                            onChange = {(e) => setInstagram(e.target.value)}
                            defaultValue={userProfileInfo.data.instagram === undefined ? "" : userProfileInfo.data.instagram}
                        ></input>
                    </p>
                    <p>
                        <label>Profile Description</label>
                        <br></br>
                        <input
                            type="text"
                            autoFocus
                            onChange = {(e) => setDescription(e.target.value)}
                            defaultValue={userProfileInfo.data.description === undefined ? "" : userProfileInfo.data.description}
                        ></input>
                    </p>
                    <p>
                        <button className="editprofile-editbutton" type='submit'>Save Changes</button>
                        <button onClick={props.binding} className="editprofile-cancelbutton">Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}


export default UserProfileEdit;
