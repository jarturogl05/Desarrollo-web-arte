import React, { useState, useContext } from "react"
import './home.css'
import NavBar from '../../componens/navbar/navbar'
import Gallery from '../../componens/gallery-thumbnail/gallery'

function Home() {
    return (     
        <div className='home-container'>
            <NavBar></NavBar>
            <h1>Home</h1>
            <Gallery></Gallery>
        </div>
    )
}

export default Home;
