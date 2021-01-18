import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import Commission from '../commission/commission'
import './commissionManager.css'
import { getCommissionTypes } from '../../services/commissionServices'


function CommissionManager(props) {
  const [commissions, setCommissions] = useState([]);
  const [username, setUsername] = useState(props.username)
  const [hasMore, setHasMore] = useState();
  const [page, setPage] = useState(1);

  useEffect(async () =>{
    console.log(username, page)
    const commissionsFetched = await getCommissionTypes(username, page);
    setCommissions(commissionsFetched.data.docs)
    setHasMore(commissionsFetched.data.hasNextPage)
    setPage(page+1)
  },[])

  const fetchCommissions = async () => {
    const commissionsFetched = await getCommissionTypes(username, page);
    setCommissions(commissions.concat(commissionsFetched.data.docs))
    setHasMore(commissionsFetched.data.hasNextPage)
    setPage(page+1)
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
          {commissions && commissions.map((commission) => (
            <Commission commissionInfo={commission}></Commission>
          ))}
        </InfiniteScroll>
            </div>
        </div>
  )
}

export default CommissionManager
