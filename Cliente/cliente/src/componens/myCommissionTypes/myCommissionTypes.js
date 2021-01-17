import React, {useContext } from "react"
import Popup from 'reactjs-popup'

import { getCommissionTypes, deleteCommissionType } from '../../services/commissionServices'

import UserContext from '../../utils/userContext'
import './myCommissionType.css'
import AddCommissionType from '../addCommissionType-form/addCommissionType-form'
import EditCommissionTypeForm from '../editCommissionTypes-form/editCommissionTypes-form'

function MyCommissionTypes() {

  const {token}  = useContext(UserContext);

  var [dataIsReturned, setDataIsReturned] = React.useState(false)
  var [commissionTypeList, setCommissionTypeList] = React.useState()
  var [showAddPopup, setShowAddPopup] = React.useState(false)
  var [didChange, setDidChange] = React.useState(true)

  function toggleAddPopup(){
    setShowAddPopup(!showAddPopup)
    setDidChange(!didChange)
  }
      React.useEffect(() => {
          if(didChange){
            getCommissionTypelist()
          }
  }) 

    async function deleteDefined(e) {
        await deleteCommissionType(token, e.currentTarget.value)
        // check response
        setDidChange(true)
    }

  function editDefined(e) {
    
  }

  async function getCommissionTypelist(){
      try {
          setCommissionTypeList(await getCommissionTypes(token))
          setDataIsReturned(true)
          setDidChange(false)
      }catch(err){
          console.log('Error')
          setDidChange(false)
      }
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
                                    <Popup trigger={<button className='commissiontype-editButton'>Editar</button>} modal nested>
                                        {
                                            close => (
                                                <EditCommissionTypeForm value={commissionType._id} binding={close} changeData={setDidChange}></EditCommissionTypeForm>
                                            )
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
                                                        <button className='popupconfirm-acceptbutton' value={commissionType._id} onClick={(e) => {
                                                            deleteDefined(e)
                                                            .then(close)
                                                        }}>Yes</button>
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
            {showAddPopup ? <AddCommissionType binding={toggleAddPopup}></AddCommissionType> : null}
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
