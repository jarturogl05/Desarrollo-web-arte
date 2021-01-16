import React, {useState, useEffect} from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Publication from '../../componens/publication/publication'

function Post() {
    const { id } = useParams();
    return (
        
        <div>
            <NavBar></NavBar>
            <Publication postID = {id} ></Publication> 

        </div>
    )
}

export default Post;
