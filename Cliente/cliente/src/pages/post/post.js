import React from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'


function Post() {
    let { id } = useParams();
    console.log(id);
    return (
        
        <div>
            <NavBar></NavBar>
            <h1>{id}</h1>
        </div>
    )
}

export default Post;
