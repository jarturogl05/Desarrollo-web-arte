import React from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Profile from '../../componens/profile/profile'
import { getProfileInfo} from '../../services/profileServices'

function UserProfile(){
    let { username } = useParams();
    var profileInfo;
    React.useEffect(() => {
        async function infoProfile(){
            try {
                profileInfo = await getProfileInfo(username)
            }catch(err){
                console.log('Error')
            }
        }
    })
    return (
        <div>
            <NavBar></NavBar>
            <Profile userProfileInfo = {profileInfo} ></Profile> 
        </div>
    )
}

export default UserProfile