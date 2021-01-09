import React from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Publication from '../../componens/publication/publication'


function Post() {
    const { id } = useParams();
    const postInfo = {id:1, publicationName: "Lofi cafe 👌", tags:["#City", "#Cafe"], urlImage:"https://imageswebart.blob.core.windows.net/imagenes/37701460376197926cosa.jpg"};
    

    return (
        
        <div>
            <NavBar></NavBar>
            <Publication postInfo = {postInfo} ></Publication> 

        </div>
    )
}

export default Post;
