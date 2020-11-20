import React from 'react'
import {  useParams } from "react-router-dom";

function Post() {
    let { id } = useParams();
    console.log(id);
    return (
        <div>
            <h1>{id}</h1>
            
        </div>
    )
}

export default Post;
