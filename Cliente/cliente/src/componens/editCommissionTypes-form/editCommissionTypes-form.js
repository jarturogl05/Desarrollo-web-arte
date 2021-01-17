import React, {useState, useContext } from "react";
import "./editCommissionTypes-form.css";
import { editCommissionType } from '../../services/commissionServices'
import UserContext from '../../utils/userContext'



function EditCommissionTypeForm(props) {

    const {token} = useContext(UserContext);
    const commissionTypeId = props.value 
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [error, setError] = useState();

    const submit = async (e) =>{
        e.preventDefault();
        
        if (checkFields()){
            const editResponse = await editCommissionType(token, commissionTypeId, title, price, description)
            if (editResponse) {
                editResponseStatus(editResponse);
            } else {
                setError("Server Error")
                console.log(error);
            }
        }
    }
    
      function checkFields(){
          return true
      }
    
      function editResponseStatus(editResponse){
        switch(editResponse.status){
          case "ok":
            alert('Data changed!')
            props.binding()
            break;
          case "Error":
            alert('Server problem, check the data and try again')
            break;
          default:
            setError("Server error");
            console.log(editResponse);
        }
      }


    return (
        <div className='popup'>
            <div className='popup_inner'>
                <form className='editCommissionTypeForm' onSubmit={submit}>
                    <h1>Edit commission</h1>

                    <p>
                        <label>Title</label>
                        <br></br>
                        <input
                            type="text"
                            autoFocus
                            onChange = {(e) => setTitle(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <label>Price</label>
                        <br></br>
                        <input
                            type="number"
                            autoFocus
                            onChange = {(e) => setPrice(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <label>Description</label>
                        <br></br>
                        <input
                            type="text"
                            autoFocus
                            onChange = {(e) => setDescription(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <button className="editcommission-savebutton" type='submit'>Save Changes</button>
                        <button onClick={props.binding} className="editcommission-cancelbutton">Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}


export default EditCommissionTypeForm;
