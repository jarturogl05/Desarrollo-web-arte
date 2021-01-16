import React,{useEffect,useState} from "react";
import SocialButtons from "../social-buttons/social-buttons";
import UserInfo from "../userInfo-publication/userInfo";
import "./publication.css";
import Carousel from "../userInfo-Image-carousel/carousel";
import {getPostById}  from '../../services/postsServices'

function Publication(props) {

  const [postInfo, setPostInfo] = useState([]);

 
  useEffect(async () => {
    const getPost = await getPostById(props.postID);
    console.log(getPost.post.tags);
    setPostInfo(getPost.post);
  },[])


  return (
    <div className="publication">
      <img src={postInfo.URLImage} alt="art"></img>

      <div className="publication_info">
        <div className="publication_info_metadata">
          <h2>{postInfo.name}</h2>
          <div className="publication_info_tags">
            { postInfo.tags && postInfo.tags.map((tag) => {
              return <a>{tag}</a>;
            })}
          </div>
        </div>

        <SocialButtons></SocialButtons>
      </div>
      <UserInfo></UserInfo>
      <Carousel></Carousel>
    </div>
  );
}

export default Publication;
