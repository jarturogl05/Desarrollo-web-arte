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

    if (dataIsReturned && commissionList && commissionList.data){
        return (
            <div className='myaskedcommissions-container'>
            <div className='table-wrapper'>
                <table className='table-myAskedCommissions'>
                    <thead>
                        <tr className='table-headers'>
                            <th>Title</th>
                            <th>Comments</th>
                            <th>Status</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionList.data.map((commission) => (
                            <tr>
                                <td>{commission.title}</td>
                                <td>{commission.comments}</td>
                                <td>{commission.status}</td>
                                <td>
                                    <Popup trigger={<button className='commissiontype-editButton'>Editar</button>} modal nested>
                                        {
                                            <h1>hola</h1>
                                        }
                                    </Popup>
                                    
                                    <Popup trigger={<button className='commissiontype-deleteButton'>Eliminar</button>} modal nested>
                                        {close => (
                                            <div className='popupconfirm'>
                                                <div className='popupconfirm-inner'>
                                                    <h1>Confirmation</h1>
                                                    <p>
                                                        Are you sure you want to delete this commission type?
                                            </p>
                                                    <p>
                                                        <button className='popupconfirm-cancelbutton' onClick={close}>Cancel</button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}                                        
                                    </Popup>
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
            <div className='mycommissionytypes-container'>
                <button className='addcommissiontype-addbutton' onClick={toggleAddPopup}>Add new one</button>
                <div>
                    <h1>Not yet added commissions, add one</h1>
                </div>
            </div>
        )
    }
    
}

export default MyAsignedCommissions
