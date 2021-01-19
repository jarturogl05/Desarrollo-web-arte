import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup'
import GenericLoadingOverlay from '../GenericLoadingOverlay/GenericLoadingOverlayContainer'

import { doRegister } from '../../services/userServices'
import "./register-form.css";


function Form() {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [passwordStrength, setPasswordStrength] = useState();

  const history = useHistory();


  const submit = async (e) =>{
    setIsLoading(true)
    e.preventDefault();
    if (checkFields()){
      const registerResponse = await doRegister(username, email, password)
      setIsLoading(false)
      if (registerResponse){
        registerResponseStatus(registerResponse);
       }else{
         setError("Server Error")
         console.log(error);
       }
    }else{
      setIsLoading(false)
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
    var result = false;

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
      event.target.style.borderColor = 'green'
      setPasswordStrength('High Password Strength')
    } else if (mediumRegex.test(event.target.value)) {
      event.target.style.borderColor = 'yellow'
      setPasswordStrength('Medium Password Strength')
    } else {
      event.target.style.borderColor = 'red'
      setPasswordStrength('Low Password Strength')
    }
  }


  function registerResponseStatus(registerResponse){
    switch(registerResponse.status){
      case "ok":
        alert('User created!')
        history.push("/login");
        break;
      case "DUPLICATED_VALUES":
        alert('Email or user already registered')
        break;
      default:
        setError("Server error");
        console.log(error);
    }
  }


  return (
      <div className="container_registerForm">
        {isLoading && <GenericLoadingOverlay message='Registering data'></GenericLoadingOverlay>}
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
            <Popup
              trigger={open => (
                <input
                  type="password"
                  autoFocus
                  required
                  onClick={open}
                  onChange={(e) => checkPasswordStrength(e)}
                ></input>
              )}
              position="right center"
              closeOnDocumentClick
            >
              <span> A secure password includes numbers, symbols and capital letters </span>
            </Popup>
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
          <button type="submit" value="Register">Sign up</button>
        </form>
        <a href="/login">Iniciar sesión</a>
      </div>
  );
}

export default Form;
