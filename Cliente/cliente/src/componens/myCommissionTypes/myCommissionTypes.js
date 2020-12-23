import React, { useState, useContext } from "react"
import { useHistory, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import './myComissionTypes.css'

function MyCommissionTypes() {
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

  return (
    <div>
      <InfiniteScroll
        dataLength={thumbnails.length}
        next={fetchMoreData}
        hasMore={!hasMore}
        loader={<h4>Loading..</h4>}
        endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
      >
        <div className="img-grid">
          {thumbnails &&
            thumbnails.map((thumbnails) => (
              <div className="img-wrap" key={thumbnails.id}>
                <img src={thumbnails.URLThumbnail} onClick={() => handleImageclick(thumbnails.id)} alt="pic"></img>
   
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default MyCommissionTypes
