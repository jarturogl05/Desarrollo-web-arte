import React, { useState, useContext } from "react"
import './home.css'
import NavBar from '../../componens/navbar/navbar'
import Gallery from '../../componens/gallery-thumbnail/gallery'

function Home() {

    // const {token}  = useContext(UserContext);
    // const history = useHistory();

    // const logOut = (e) =>{
    //     e.preventDefault();
    //     localStorage.clear();
    //     history.replace("/login");

    // }

    return (
        
        <div className='home-container'>
            <NavBar></NavBar>
            <h1>Home</h1>
            <Gallery></Gallery>
        </div>
    )
}

export default Home;
