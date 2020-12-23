import React, { useState, useContext } from "react"
import { useHistory, useParams} from "react-router-dom";

import { getCommissionTypes } from '../../services/commissionServices'

import UserContext from '../../utils/userContext'
import './myCommissionType.css'
import AddCommissionType from '../addCommissionType-form/addCommissionType-form'

function MyCommissionTypes() {

  const history = useHistory();
  const {token}  = useContext(UserContext);
  let { username } = useParams();

  var [dataIsReturned, setDataIsReturned] = React.useState(false)
  var [commissionTypeList, setCommissionTypeList] = React.useState()
  var [showAddPopup, setShowAddPopup] = React.useState(false)

  function toggleAddPopup(){
    setShowAddPopup(!showAddPopup)
  }
  
      React.useEffect(() => {
          getCommissionTypelist()
  }, []) 

  async function getCommissionTypelist(){
      try {
          setCommissionTypeList(await getCommissionTypes(username, token))
          setDataIsReturned(true)
      }catch(err){
          console.log('Error')
      }
  }

 const handleImageclick = (id) => {
   history.push('/post/'+ id )
 }

    if (dataIsReturned && commissionTypeList && commissionTypeList.data){
        return (
            <div className='mycommissionytypes-container'>
                <button className='addcommissiontype-addbutton' onClick={toggleAddPopup}>Add new one</button>
            <div className='table-wrapper'>
                <table className='table-myCommissionTypes'>
                    <thead>
                        <tr className='table-headers'>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionTypeList.map(commissionType => {
                            <tr>
                                <td>commissionType.Title</td>
                                <td>commissionType.Price</td>
                                <td>commissionType.Description</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        )
    }else{
        return (
            <div className='mycommissionytypes-container'>
                <button className='addcommissiontype-addbutton' onClick={toggleAddPopup}>Add new one</button>
                <div>
                    <h1>Not yet added commissions, add one</h1>
                </div>
                {showAddPopup ? <AddCommissionType binding={toggleAddPopup}></AddCommissionType> : null}
            </div>
        )
    }
    
}

export default MyCommissionTypes
