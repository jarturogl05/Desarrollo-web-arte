import React, {useState, useEffect} from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Publication from '../../componens/publication/publication'
import {getPostById}  from '../../services/postsServices'

function Post() {
    // const [selectedPost, setSelectedPost] = useState();
    const { id } = useParams();
    //const postInfo = {id:1, publicationName: "Lofi cafe 👌", tags:["#City", "#Cafe"], urlImage:"https://imageswebart.blob.core.windows.net/imagenes/37701460376197926cosa.jpg"};
    
    // useEffect(async () =>{
    //     const getPost = await getPostById(id);
    //     console.log(getPost);
    //     setSelectedPost(getPost.post);
    //   },[])

    return (
        
        <div>
            <NavBar></NavBar>
            <Publication postID = {id} ></Publication> 

        </div>
    )
}

export default Post;
