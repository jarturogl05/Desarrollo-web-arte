import React from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Publication from '../../componens/publication/publication'


function Post() {
    let { id } = useParams();
    console.log(id);
    const postInfo = {id:1, publicationName: "Lofi cafe 👌", tags:["#City", "#Lofi"], urlImage:"https://i.redd.it/ytkkbowirm061.jpg"};
    

    return (
        
        <div>
            <NavBar></NavBar>
            <Publication postInfo = {postInfo} ></Publication> 

        </div>
    )
}

export default Post;
