import React, { useState } from "react"
import { useHistory} from "react-router-dom";
import './commissionManager.css'
import InfiniteScroll from "react-infinite-scroll-component";


function CommissionManager() {
  const [commissions, setCommissions] = useState();
  const [hasMore, setHasMore] = useState();
  const history = useHistory();

  return (
    <div className='popup'>
            <div className='popup_inner'>
                <h1>User's Commissions</h1>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchCommissions}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items}
        </InfiniteScroll>
            </div>
        </div>
  )
}

export default CommissionManager
