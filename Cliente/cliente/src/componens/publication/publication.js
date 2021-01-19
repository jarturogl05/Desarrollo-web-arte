import React, { useEffect, useState, useContext } from "react";
import SocialButtons from "../social-buttons/social-buttons";
import UserInfo from "../userInfo-publication/userInfo";
import "./publication.css";
import Carousel from "../userInfo-Image-carousel/carousel";
import { getPostById, getPostByUser } from "../../services/postsServices";
import UserContext from '../../utils/userContext';
import {getProfileInfoById} from '../../services/profileServices';

function Publication(props) {
  const [postInfo, setPostInfo] = useState([]);
  const [autorWorks, setAutorWorks] = useState([]);
  const [autorId, setAutorId] = useState('');
  const [autorFetched, setAutorFetched] = useState({});
  const {token}  = useContext(UserContext);


  useEffect(() => {

    async function fetchPost(){
      const getPost = await getPostById(props.postID);
      if(getPost !== undefined){
        setPostInfo(getPost.post);
        setAutorId(getPost.autorId);
      }
    }
     fetchPost();
  }, []);

  useEffect(() => {

      async function fetchAutorWorks(){
      if(autorId !== ''){
        const postsFetched = await getPostByUser(postInfo.autorId,1);
        setAutorWorks(postsFetched.docs);
      }
    }

    async function fetchUser(){
      if(autorId !== ''){
        const autorFetched = await getProfileInfoById(postInfo.autorId, token);
        setAutorFetched(autorFetched);
      }
    }

    fetchUser();
    fetchAutorWorks();
      
  }, [autorId]);


  return (
    <div className="publication">
      <img src={postInfo.URLImage} alt="art"></img>
      <div className="publication_info">
        <div className="publication_info_metadata">
          <h2>{postInfo.name}</h2>
          <div className="publication_info_tags">
            {postInfo.tags &&
              postInfo.tags.map((tag) => {
                return <a>{tag}</a>;
              })}
          </div>
            <p>{postInfo.description}</p>
        </div>

        <SocialButtons></SocialButtons>
      </div>
      <UserInfo autorFetched={autorFetched}></UserInfo>
       <Carousel autorWorks={autorWorks}></Carousel>
    </div>
  );
}

export default Publication;
