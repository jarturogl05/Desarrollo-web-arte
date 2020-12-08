import React from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Profile from '../../componens/profile/profile'
import { getProfileInfo} from '../../services/profileServices'

function UserProfile(){
    let { username } = useParams();
    var [dataIsReturned, setDataIsReturned] = React.useState(false)
    var [profileInfo, setProfileInfo] = React.useState()
    async function infoProfile(){
        try {
            setProfileInfo(await getProfileInfo(username))
            setDataIsReturned(true)
        }catch(err){
            console.log('Error')
        }
    }
    React.useEffect(() => {
        infoProfile()
    })
    return (
        <div>
            <NavBar></NavBar>
            <Profile userProfileInfo = {profileInfo} ></Profile> 
        </div>
    )
}

export default UserProfile