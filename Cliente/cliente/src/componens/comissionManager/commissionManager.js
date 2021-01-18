import React, { useState } from "react"
import { useHistory} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './commissionManager.css'
import { getCommissionTypes } from '../../services/commissionServices'


function CommissionManager() {
  const [commissions, setCommissions] = useState();
  const [hasMore, setHasMore] = useState();
  const [page, setPage] = useState(0);

  const history = useHistory();

  fetchCommissions = () => {
    setPage(page+1)
    this.setCommissions({
      commissions: commissions.concat(getCommissionTypes())
    });
  }


  return (
    <div className='popup'>
            <div className='popup_inner'>
                <h1>User's Commissions</h1>
        <InfiniteScroll
          dataLength={commissions.length} //This is important field to render the next data
          next={fetchCommissions}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {commissions}
        </InfiniteScroll>
            </div>
        </div>
  )
}

export default CommissionManager
