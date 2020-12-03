import React from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Profile from '../../componens/profile/profile'


function UserProfile() {
    let { username } = useParams();
    console.log(username);
    const userInfo = {}

    return (
        
        <div>
            <NavBar></NavBar>
            <Profile userProfileInfo = {userInfo} ></Profile> 

        </div>
    )
}

export default UserProfile