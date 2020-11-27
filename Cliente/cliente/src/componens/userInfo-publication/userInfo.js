import React from 'react'
import './userInfo.css'
import { useHistory } from "react-router-dom";

import user from'./cat2.jpg'

function UserInfo() {
    const history = useHistory();

    const handleUserClick = () =>{
        history.push('/user');
    }

    return (
        <div className="userInfo-container">
            <img src={user} alt="user" onClick={handleUserClick}></img>
            <h3 onClick={handleUserClick}>Muterk</h3>
            <button className="userInfo__followButton">Follow</button>

        </div>
    )
}

export default UserInfo
