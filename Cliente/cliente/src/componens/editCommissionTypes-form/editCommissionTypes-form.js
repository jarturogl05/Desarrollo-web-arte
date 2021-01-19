import React, {useState, useContext } from "react";
import "./editCommissionTypes-form.css";
import { editCommissionType } from '../../services/commissionServices'
import UserContext from '../../utils/userContext'
import GenericLoadingOverlay from '../GenericLoadingOverlay/GenericLoadingOverlayContainer'



function EditCommissionTypeForm(props) {

    const {token} = useContext(UserContext);
    const commissionType = props.commissionType
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    const submit = async (e) =>{
        e.preventDefault();
        
        if (checkFields()){
            const editResponse = await editCommissionType(token, commissionType._id, title, price, description)
            if (editResponse) {
                editResponseStatus(editResponse);
            } else {
                setError("Server Error")
                console.log(error);
            }
        }
    }
    
    function checkFields(){
        var result = false;
        if (checkEmptyString(title) && checkEmptyString(description) && checkEmptyString(price)){
          result = true;
        }
        return result;
    }

    function checkEmptyString(testString){
      return !(!testString || testString.length === 0 || !testString.trim());
    }
    
      function editResponseStatus(editResponse){
        switch(editResponse.status){
          case "ok":
            alert('Data changed!')
            props.binding()
            props.changeData(true)
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
                {isLoading && <GenericLoadingOverlay message="Saving Changes"></GenericLoadingOverlay>}
                <form className='editCommissionTypeForm' onSubmit={submit}>
                    <h1>Edit commission</h1>
                    <p>
                    <label htmlFor='title'>Title</label>
                        <br></br>
                        <input
                            id='title'
                            type="text"
                            autoFocus
                            maxLength = '32'
                            defaultValue={commissionType.title}
                            onChange = {(e) => setTitle(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <label htmlFor='price'>Price</label>
                        <br></br>
                        <input
                            id='price'
                            type="number"
                            autoFocus
                            min='1'
                            max='500'
                            defaultValue={commissionType.price}
                            onChange = {(e) => setPrice(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <label htmlFor='description'>Description</label>
                        <br></br>
                        <input
                            id='description'
                            type="text"
                            autoFocus
                            maxLength='500'
                            defaultValue={commissionType.description}
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
