import React, { useState, useEffect } from "react"
import { useHistory} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './commissionManager.css'
import { getCommissionTypes } from '../../services/commissionServices'


function CommissionManager(props) {
  const [commissions, setCommissions] = useState([]);
  const [username, setUsername] = useState(props.username)
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(async () =>{
    console.log(username, page)
    const commissionsFetched = await getCommissionTypes(username, page);
    setCommissions(commissionsFetched)
    console.log(commissionsFetched)
    setPage(page+1)
  },[])

  const fetchCommissions = () => {
    setPage(page+1)
    this.setCommissions({
      commissions: commissions.concat(getCommissionTypes(username, page))
    });
  }


  return (
    <div className='popup'>
            <div className='popup_inner'>
                <h1>User's Commissions</h1>
        <InfiniteScroll
          dataLength={commissions}
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
