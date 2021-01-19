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
  const [passwordStrength, setPasswordStrength] = useState('A secure password includes numbers, symbols and capital letters');

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
    const emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    if (emailRegex.test(email)){
      result = true
    }else{
      alert('La dirección de email es invalida')
    }
    return result
  }
  function isValidPassword(){
    var result = false;
    const passwordRegex = new RegExp('^(?=.*[0-9,a-z,A-Z]).{8,64}$')
    const blankSpace = new RegExp('/\s/')
    if (passwordRegex.test(password) && !blankSpace.test(password)){
      result = true
    }else{
      alert('Invalid password, a password has to contain 8 or more characters and cant contain blank spaces')
    }
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
    setPassword(event.target.value)
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
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type="text"
              autoFocus
              maxLength="150"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </p>
          <p>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type="email"
              autoFocus
              maxLength = "120"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </p>
          <p>
            <label htmlFor='password'>Password</label>
            <Popup
              trigger={open => (
                <input
                  id='password'
                  type="password"
                  autoFocus
                  required
                  maxLength='64'
                  onClick={open}
                  onChange={(e) => checkPasswordStrength(e)}
                ></input>
              )}
              position="right center"
              closeOnDocumentClick
            >
              <span> {passwordStrength} </span>
            </Popup>
          </p>
          <p>
            <label htmlFor='confirmPassword'>Confirm password</label>
            <input
              id='confirmPassword'
              type="password"
              autoFocus
              required
              maxLength='64'
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
