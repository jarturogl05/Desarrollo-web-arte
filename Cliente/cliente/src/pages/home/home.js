import React, { useState, useContext } from "react"
import UserContext from '../../utils/userContext'
import { useHistory } from "react-router-dom";


function Home() {

    const {token}  = useContext(UserContext);
    const history = useHistory();

    const logOut = (e) =>{
        e.preventDefault();
        localStorage.clear();
        history.replace("/login");

    }

    return (
        
        <div>
            <h1>{token}</h1>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}

export default Home;
