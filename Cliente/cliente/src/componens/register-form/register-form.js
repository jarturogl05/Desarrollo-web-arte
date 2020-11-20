import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import doRegister from '../../services/userServices'

import "./register-form.css";


function Form() {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const history = useHistory();


  const submit = async (e) =>{
    e.preventDefault();

    const newUser = {username, email, password};
    console.log(newUser);

    const registerResponse = await doRegister(username, email, password)
    
    if (registerResponse){
      registerResponseStatus(registerResponse);
     }
     else{
       setError("Server Error")
       console.log(error);
     }
  }


  function registerResponseStatus(registerResponse){
    switch(registerResponse.status){
      case "ok":
        history.push("/login");
        break;
      case "DUPLICATED_VALUES":
        console.log(error);
        break;
      default:
        setError("Server error");
        console.log(error);

    }
  }


  return (
      <div className="container_registerForm">
        <h2>Register</h2>
        <form className="form-grup" onSubmit={submit}>
          <p>
            <label>Username</label>
            <input
              type="text"
              autoFocus
              maxLength="150"
              required
              onChange={(e) => setUsername(e.target.value)}

            ></input>
          </p>
          <p>
            <label>Email</label>
            <input
              type="email"
              autoFocus
              maxLength = "120"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </p>
          <p>
            <label>Password</label>
            <input
              type="password"
              autoFocus
              required
              onChange={(e) => setPassword(e.target.value)}

            ></input>
          </p>
          <p>
            <label>Confirm password</label>
            <input
              type="password"
              autoFocus
              required
              onChange={(e) => setPasswordCheck(e.target.value)}
            ></input>
          </p>
          <button type="submit" value="Register">Registrarse</button>
        </form>
        <a href="/login">Iniciar sesión</a>
      </div>
  );
}

export default Form;
