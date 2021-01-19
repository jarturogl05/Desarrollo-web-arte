import React, {useContext } from "react"
import Popup from 'reactjs-popup'

import { getMyAsignedCommissions } from '../../services/commissionServices'

import UserContext from '../../utils/userContext'
import './myAsignedCommissions.css'

function MyAsignedCommissions() {

  const {token}  = useContext(UserContext);

  var [dataIsReturned, setDataIsReturned] = React.useState(false)
  var [commissionList, setCommissionList] = React.useState()
  var [showAddPopup, setShowAddPopup] = React.useState(false)
  var [didChange, setDidChange] = React.useState(true)

  function toggleAddPopup(){
    setShowAddPopup(!showAddPopup)
    setDidChange(!didChange)
  }
      React.useEffect(() => {
          if(didChange){
            getCommissionlist()
          }
  }) 

  async function rejectCommission(){
      alert('Si jala')
  }

  async function acceptCommission(){
      alert('Si Jala')
  }

  async function markAsInProgress(){

  }

  async function markAsDelievered(){

  }

  async function getCommissionlist(){
      try {
          setCommissionList(await getMyAsignedCommissions(token))
          setDataIsReturned(true)
          setDidChange(false)
      }catch(err){
          console.log('Error')
          setDidChange(false)
      }
  }



  function renderContextualButtons(status, commissionid){
      console.log('entra')
    switch(status){
        case 'Asked':
            return(
            <div className='contextButtons-Container'>
                <Popup trigger={<button className='commissiontype-acceptButton'>Acept</button>} modal nested>
                    {close => (
                        <div className='popupconfirm'>
                            <div className='popupconfirm-inner'>
                                <h1>Confirmation</h1>
                                <p>
                                    Are you sure you want to accept this commission
                </p>
                                <p>
                                    <button className='popupconfirm-acceptbutton' onClick={() => { acceptCommission().then(close) }}>Accept</button>
                                    <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                </p>
                            </div>
                        </div>
                    )}
                </Popup>
                <Popup trigger={<button className='commissiontype-rejectButton'>Reject</button>} modal nested>
                    {close => (
                        <div className='popupconfirm'>
                            <div className='popupconfirm-inner'>
                                <h1>Confirmation</h1>
                                <p>
                                    Are you sure you want to reject this
                </p>
                                <p>
                                    <button className='popupconfirm-acceptbutton' onClick={() => { rejectCommission().then(close) }}>Reject</button>
                                    <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                </p>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
            )
        case 'Paid':
            return(
                <div className='contextButtons-Container'>
                    <Popup trigger={<button className='commissiontype-inProgresstButton'>Mark as In Progress</button>} modal nested>
                        {close => (
                            <div className='popupconfirm'>
                                <div className='popupconfirm-inner'>
                                    <h1>Confirmation</h1>
                                    <p>
                                        Mark as 'In Progress'?
                    </p>
                                    <p>
                                        <button className='popupconfirm-acceptbutton' onClick={() => { markAsInProgress().then(close) }}>Yes</button>
                                        <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                )
        case 'In Progress':
            return(
                <div className='contextButtons-Container'>
                    <Popup trigger={<button className='commissiontype-inProgresstButton'>Mark as delivered</button>} modal nested>
                        {close => (
                            <div className='popupconfirm'>
                                <div className='popupconfirm-inner'>
                                    <h1>Confirmation</h1>
                                    <p>
                                        Mark as 'Delievered'?
                    </p>
                                    <p>
                                        <button className='popupconfirm-acceptbutton' onClick={() => { markAsDelievered().then(close) }}>Yes</button>
                                        <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                )
    }
  }

    if (dataIsReturned && commissionList && commissionList.data){
        return (
            <div className='myAsignedcommissions-container'>
            <div className='table-wrapper'>
                <table className='table-myAsignedCommissions'>
                    <thead>
                        <tr className='table-headers'>
                            <th>Title</th>
                            <th>Comments</th>
                            <th>Status</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionList.data.map((commission) => (
                            <tr>
                                <td>{commission.title}</td>
                                <td>{commission.comments}</td>
                                <td>{commission.status}</td>
                                <td>{commission.contractorUser}</td>
                                <td>
                                    {renderContextualButtons(commission.status, commission.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        )
    }else{
        return (
            <div className='myAsignedCommissions-container'>
                <button className='addcommissiontype-addbutton' onClick={toggleAddPopup}>Add new one</button>
                <div>
                    <h1>Not yet added commissions, add one</h1>
                </div>
            </div>
        )
    }
    
}

export default MyAsignedCommissions
