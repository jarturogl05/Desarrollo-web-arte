import React, { useState, useContext, useEffect } from "react"
import { useHistory, Link } from "react-router-dom";
import './gallery.css'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import {getHomePosts}  from '../../services/postsServices';

 function Gallery() {

  const [thumbnails, setThumbnails] = useState([]);
  const [hasMore, setHasMore] = useState();
  const [page, setPage] = useState(1);
  const history = useHistory();
 

  useEffect(async () =>{
    const postsFetched = await getHomePosts(page);
    setThumbnails(postsFetched.docs);
    setPage(page + 1);
    setHasMore(postsFetched.hasNextPage);
  },[])

 
  const fetchMoreData = async () => {
    setPage(page + 1);
    const postsFetched = await getHomePosts(page);
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

export default Gallery
