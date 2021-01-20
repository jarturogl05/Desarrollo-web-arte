import React, {useContext } from "react"
import Popup from 'reactjs-popup'

import { getMyAskedCommissions, ResponseCommission } from '../../services/commissionServices'

import UserContext from '../../utils/userContext'
import './myAskedCommissions.css'

function MyAskedCommissions() {

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

  async function cancelCommission(commissionId){
    const response = await ResponseCommission(commissionId, 'Canceled')
    checkResponse(response);
  }

  async function payCommission(commissionId){  
    const response = await ResponseCommission(commissionId, 'Paid')
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
          setCommissionList(await getMyAskedCommissions(token))
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
                    <Popup trigger={<button className='commission-cancelButton'>Cancel</button>} modal nested>
                        {close => (
                            <div className='popupconfirm'>
                                <div className='popupconfirm-inner'>
                                    <h1>Confirmation</h1>
                                    <p>
                                        Cancel the commision?
                    </p>
                                    <p>
                                        <button className='popupconfirm-acceptbutton' onClick={() => { cancelCommission(commissionid).then(close) }}>Yes</button>
                                        <button className='popupconfirm-cancelbutton' onClick={close}>No</button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                )
                case 'Accepted':
                    return(
                    <div className='contextButtons-Container'>
                        <Popup trigger={<button className='commission-payButton'>Pay commission</button>} modal nested>
                            {close => (
                                <div className='popupconfirm'>
                                    <div className='popupconfirm-inner'>
                                        <h1>Confirmation</h1>
                                        <p>
                                            Are you sure you want to pay this commission
                        </p>
                                        <p>
                                            <button className='popupconfirm-acceptbutton' onClick={() => { payCommission(commissionid).then(close) }}>Accept</button>
                                            <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <Popup trigger={<button className='commission-cancelButton'>Cancel</button>} modal nested>
                            {close => (
                                <div className='popupconfirm'>
                                    <div className='popupconfirm-inner'>
                                        <h1>Confirmation</h1>
                                        <p>
                                            Are you sure you want cancel this commission
                        </p>
                                        <p>
                                            <button className='popupconfirm-acceptbutton' onClick={() => { cancelCommission(commissionid).then(close)}}>Reject</button>
                                            <button className='popupconfirm-cancelbutton' onClick={close}>No</button>
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
            <div className='myAskedcommissions-container'>
            <div className='table-wrapper'>
                <table className='table-myAskedCommissions'>
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
            <div className='myAskedCommissions-container'>
                <div>
                    <h1>Not yet asked commissions</h1>
                </div>
            </div>
        )
    }
    
}

export default MyAskedCommissions
