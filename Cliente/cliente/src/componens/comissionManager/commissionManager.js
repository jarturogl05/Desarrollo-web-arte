import React, { useState, useContext } from "react"
import { useHistory, Link } from "react-router-dom";
import './gallery.css'
import InfiniteScroll from "react-infinite-scroll-component";


function CommissionManager() {
  const [thumbnails, setThumbnails] = useState(thumbnailsList);
  const [hasMore, setHasMore] = useState();
  const history = useHistory();

  const fetchMoreData = () => {
    setTimeout(() => {
      setThumbnails(thumbnails.concat(thumbnailsList));
    }, 1500);
  };


 const handleImageclick = (id) => {
   
   history.push('/post/'+ id )
 }

}

export default CommissionManager
