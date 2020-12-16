import React, {useContext} from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Profile from '../../componens/profile/profile'
import UserContext from '../../utils/userContext'
import { getProfileInfo} from '../../services/profileServices'

function UserProfile(){
    const {token}  = useContext(UserContext);
    let { username } = useParams();
    var [dataIsReturned, setDataIsReturned] = React.useState(false)
    var [profileInfo, setProfileInfo] = React.useState()
    async function infoProfile(){
        try {
            setProfileInfo(await getProfileInfo(username, token))
            setDataIsReturned(true)
        }catch(err){
            console.log('Error')
        }
    }
    React.useEffect(() => {
        infoProfile()
    }, [])
    return (
        <div>
            <NavBar></NavBar>
            <Profile userProfileInfo = {dataIsReturned && profileInfo.data ? profileInfo : undefined} ></Profile> 
        </div>
    )
}

export default UserProfile