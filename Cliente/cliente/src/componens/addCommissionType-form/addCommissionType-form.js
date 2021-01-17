import React, {useState, useContext } from "react";
import "./addCommissionType-form.css";
import { addCommissionType } from '../../services/commissionServices'
import UserContext from '../../utils/userContext'



function AddCommissionTypeForm(props) {

    const {token} = useContext(UserContext);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [error, setError] = useState();

    const submit = async (e) =>{
        e.preventDefault();
        
        if (checkFields()){
            const addResponse = await addCommissionType(token, title, price, description)
            if (addResponse) {
                addResponseStatus(addResponse);
            } else {
                setError("Server Error")
                console.log(error);
            }
        }
    }
    
      function checkFields(){
          return true
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
                <form className='addNewCommissionTypeForm' onSubmit={submit}>
                    <h1>Add a new commission type</h1>

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
                        <button className="addcommission-savebutton" type='submit'>Save Changes</button>
                        <button onClick={props.binding} className="addcommission-cancelbutton">Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}


export default AddCommissionTypeForm;
