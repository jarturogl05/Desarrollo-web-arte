import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { doRegister } from '../../services/userServices'

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
    
    if (checkFields()){
      const registerResponse = await doRegister(username, email, password)
      if (registerResponse){
        registerResponseStatus(registerResponse);
       }else{
         setError("Server Error")
         console.log(error);
       }
    }
  }

  function checkFields(){
    var result  = false
    if (isValidPassword() && areMatchingPasswords() && isValidEmail()){
      result = true
    }
    return result
  }
  
  
  function isValidEmail(){
    var result = false
    const emailRegex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9].\+[A-Za-z]+$")
    if (emailRegex.test(email)){
      result = true
    }else{
      alert('La dirección de email es invalida')
    }
    return result
  }
  function isValidPassword(){
    var result = false

    result = true;
    return result
  }
  function areMatchingPasswords(){
    var result = false
    if (password === passwordCheck){
      result = true
    }else{
      alert('Las contraseñas no coinciden')
    }
    return result
  }

  function checkPasswordStrength(event){
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (strongRegex.test(event.target.value)) {
    } else if (mediumRegex.test(event.target.value)) {
    } else {
    }
  }


  function registerResponseStatus(registerResponse){
    switch(registerResponse.status){
      case "ok":
        alert('!Usuario registrado!')
        history.push("/login");
        break;
      case "DUPLICATED_VALUES":
        alert('Usuario existente')
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
