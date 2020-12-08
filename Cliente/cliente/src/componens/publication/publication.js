import React from "react";
import SocialButtons from "../social-buttons/social-buttons";
import UserInfo from "../userInfo-publication/userInfo";
import "./publication.css";

import Carousel from "../userInfo-Image-carousel/carousel";

function Publication(props) {
  const postInfo = props.postInfo;

  


  return (
    <div className="publication">
      <img src={postInfo.urlImage} alt="art"></img>

      <div className="publication_info">
        <div className="publication_info_metadata">
          <h2>{postInfo.publicationName}</h2>
          <div className="publication_info_tags">
            {postInfo.tags.map((tag) => {
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
