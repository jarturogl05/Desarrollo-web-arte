import React, {useContext } from "react"
import Popup from 'reactjs-popup'

import { getMyAsignedCommissions, ResponseCommission } from '../../services/commissionServices'

import UserContext from '../../utils/userContext'
import './myAsignedCommissions.css'

function MyAsignedCommissions() {

  const {token}  = useContext(UserContext);

  var [dataIsReturned, setDataIsReturned] = React.useState(false)
  var [commissionList, setCommissionList] = React.useState()
  var [showAddPopup, setShowAddPopup] = React.useState(false)
  var [didChange, setDidChange] = React.useState(true)


      React.useEffect(() => {
          if(didChange){
            getCommissionlist()
          }
  }) 

  async function rejectCommission(commissionId){
    const response = await ResponseCommission(commissionId, 'Rejected')
    checkResponse(response);
  }

  async function acceptCommission(commissionId){  
    const response = await ResponseCommission(commissionId, 'Accepted')
    checkResponse(response);
  }

  async function markAsInProgress(commissionId){
    const response = await ResponseCommission(commissionId, 'InProgress')
    checkResponse(response);
  }

  async function markAsDelievered(commissionId){
    const response = await ResponseCommission(commissionId, 'Delievered')
    checkResponse(response);
  }

  function checkResponse(response){
    switch (response.status){
        case 'ok':
            alert('Commission Updated!')
            setDidChange(true)
            break;
        default:
            alert('Error at the server')
            break;
    }
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
    switch(status){
        case 'Asked':
            return(
            <div className='contextButtons-Container'>
                <Popup trigger={<button className='commission-acceptButton'>Acept</button>} modal nested>
                    {close => (
                        <div className='popupconfirm'>
                            <div className='popupconfirm-inner'>
                                <h1>Confirmation</h1>
                                <p>
                                    Are you sure you want to accept this commission
                </p>
                                <p>
                                    <button className='popupconfirm-acceptbutton' onClick={() => { acceptCommission(commissionid).then(close) }}>Accept</button>
                                    <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                </p>
                            </div>
                        </div>
                    )}
                </Popup>
                <Popup trigger={<button className='commission-rejectButton'>Reject</button>} modal nested>
                    {close => (
                        <div className='popupconfirm'>
                            <div className='popupconfirm-inner'>
                                <h1>Confirmation</h1>
                                <p>
                                    Are you sure you want to reject this
                </p>
                                <p>
                                    <button className='popupconfirm-acceptbutton' onClick={() => { rejectCommission(commissionid).then(close)}}>Reject</button>
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
                    <Popup trigger={<button className='commission-inProgressButton'>Mark as In Progress</button>} modal nested>
                        {close => (
                            <div className='popupconfirm'>
                                <div className='popupconfirm-inner'>
                                    <h1>Confirmation</h1>
                                    <p>
                                        Mark as 'In Progress'?
                    </p>
                                    <p>
                                        <button className='popupconfirm-acceptbutton' onClick={() => { markAsInProgress(commissionid).then(close) }}>Yes</button>
                                        <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                )
        case 'InProgress':
            return(
                <div className='contextButtons-Container'>
                    <Popup trigger={<button className='commission-delieveredButton'>Mark as delivered</button>} modal nested>
                        {close => (
                            <div className='popupconfirm'>
                                <div className='popupconfirm-inner'>
                                    <h1>Confirmation</h1>
                                    <p>
                                        Mark as 'Delievered'?
                    </p>
                                    <p>
                                        <button className='popupconfirm-acceptbutton' onClick={() => { markAsDelievered(commissionid).then(close) }}>Yes</button>
                                        <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                )
        default:
            return(
                <label>You must wait to interact</label>
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
                <div>
                    <h1>Not yet asigned commissions</h1>
                </div>
            </div>
        )
    }
    
}

export default MyAsignedCommissions
