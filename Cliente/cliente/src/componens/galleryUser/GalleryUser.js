import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom";
import './galleryUser.css'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import {getPostByUserName}  from '../../services/postsServices';

 function GalleryUser() {

  const [thumbnails, setThumbnails] = useState([]);
  const [hasMore, setHasMore] = useState();
  const [page, setPage] = useState(1);
  let { username } = useParams();

  const history = useHistory();
 

  useEffect(async () =>{
    const postsFetched = await getPostByUserName(username, page);
    if (postsFetched !== undefined){
      setThumbnails(postsFetched.docs);
      setPage(page + 1);
      setHasMore(postsFetched.hasNextPage);
    }
  },[])

 
  const fetchMoreData = async () => {
    setPage(page + 1);
    const postsFetched = await getPostByUserName(username,page);
    setThumbnails(thumbnails.concat(postsFetched.docs));
    setHasMore(postsFetched.hasNextPage);
  };


 const handleImageclick = (id) => {
  
   history.push('/post/'+ id )
 }

  return (
    <div>
      <InfiniteScroll
        dataLength={thumbnails}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadSpinner></LoadSpinner>}
        endMessage={
            <p style={{ textAlign: "center" }}>
              <b>End of list</b>
            </p>
          }
      >
        <div className="img-grid">
          {thumbnails &&
            thumbnails.map((thumbnails) => (
              <div className="img-wrap" key={thumbnails._id}>
                <img src={thumbnails.URLThumbnail[0]} onClick={() => handleImageclick(thumbnails._id)} alt="pic"></img>
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default GalleryUser;
