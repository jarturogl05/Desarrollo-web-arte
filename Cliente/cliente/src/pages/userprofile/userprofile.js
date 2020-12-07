import React from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Profile from '../../componens/profile/profile'


function UserProfile() {
    let { username } = useParams();
    let profilePicture = "https://www.anime-planet.com/images/characters/akiko-himenokouji-43346.jpg"
    let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et feugiat ex, ac iaculis velit. Maecenas in sem dui"
    const userInfo = {username, profilePicture, description};
    


    return (
        <div>
            <NavBar></NavBar>
            <Profile userProfileInfo = {userInfo} ></Profile> 
        </div>
    )
}

export default UserProfile