import React, {useState, useContext } from "react";
import "./addCommissionType-form.css";
import { addCommissionType } from '../../services/commissionServices'
import UserContext from '../../utils/userContext'
import GenericLoadingOverlay from '../GenericLoadingOverlay/GenericLoadingOverlayContainer'



function AddCommissionTypeForm(props) {

    const {token} = useContext(UserContext);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    const submit = async (e) =>{
        e.preventDefault();
        if (checkFields()){
            setIsLoading(true)
            const addResponse = await addCommissionType(token, title, price, description)
            setIsLoading(false)
            if (addResponse) {
                addResponseStatus(addResponse);
            } else {
                setError("Server Error")
                console.log(error);
            }
        }else{
            alert('Empty fields, fill all the fields before continuing')
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
    
      function addResponseStatus(addResponse){
        switch(addResponse.status){
          case "ok":
            alert('Data changed!')
            props.binding()
            break;
          case "Error":
            alert('Server problem, check the data and try again')
            break;
          default:
            setError("Server error");
            console.log(addResponse);
        }
      }


    return (
        <div className='popup'>
            <div className='popup_inner'>
            {isLoading && <GenericLoadingOverlay message="Creating a new commission type"></GenericLoadingOverlay>}
                <form className='addNewCommissionTypeForm' onSubmit={submit}>
                    <h1>Add a new commission type</h1>
                    <p>
                        <label htmlFor='title'>Title</label>
                        <br></br>
                        <input
                            id='title'
                            type="text"
                            autoFocus
                            maxLength = '32'
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
                            onChange = {(e) => setDescription(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <button className="addcommission-savebutton" type='submit'>Save Changes</button>
                        <button onClick={props.binding} className="addcommission-cancelbutton">Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}


export default AddCommissionTypeForm;
