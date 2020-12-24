import React, { useState, useContext } from "react"
import { useHistory, useParams} from "react-router-dom";
import Popup from 'reactjs-popup'

import { getCommissionTypes, deleteCommissionType } from '../../services/commissionServices'

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

  function deleteDefined(e) {
    console.log(e.currentTarget.value)
    deleteCommissionType(token, e.currentTarget.value)
    getCommissionTypelist()
  }

  function editDefined(e) {

  }

  async function getCommissionTypelist(){
      try {
          setCommissionTypeList(await getCommissionTypes(token))
          setDataIsReturned(true)
      }catch(err){
          console.log('Error')
      }
  }

    if (dataIsReturned && commissionTypeList && commissionTypeList.data){
        console.log(commissionTypeList)
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionTypeList.data.map((commissionType) => (
                            <tr>
                                <td>{commissionType.title}</td>
                                <td>{commissionType.price}</td>
                                <td>{commissionType.description}</td>
                                <td>
                                    <button className='commissiontype-editButton' onClick={(e) => editDefined(e)}>Editar</button>
                                    <Popup trigger={<button className='commissiontype-deleteButton'>Eliminar</button>} modal nested>
                                        {close => (
                                            <div className='popupconfirm'>
                                                <div className='popupconfirm-inner'>
                                                    <h1>Confirmation</h1>
                                                    <p>
                                                        Are you sure you want to delete this commission type?
                                            </p>
                                                    <p>
                                                        <button className='popupconfirm-acceptbutton' value={commissionType._id} onClick={(e) => deleteDefined(e)}>Yes</button>
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
                {showAddPopup ? <AddCommissionType binding={toggleAddPopup}></AddCommissionType> : null}
            </div>
        )
    }
    
}

export default MyCommissionTypes
