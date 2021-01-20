import React, { useState, useContext } from "react"
import UserContext from "../../utils/userContext";
import { useHistory } from "react-router-dom";
import GenericLoader from '../GenericLoadingOverlay/GenericLoadingOverlayContainer'

import { doLogin } from "../../services/userServices";


import "./login-form.css";

function Form() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const {token, currentUsername, setToken,  setRefreshToken, setCurrentUsername } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    const loginResponse = await doLogin(username, password)
    setIsLoading(false);
    if (loginResponse){
     loginResponseStatus(loginResponse);
    }
    else{
      setError("Server Error")
      console.log(error);
    }
  }

   function loginResponseStatus(loginResponse){
    switch(loginResponse.status){
      case "ok":
        setToken(loginResponse.token);
        setRefreshToken(loginResponse.refreshToken);
        setCurrentUsername(username);
        history.push("/");
        break;
      case "USER_NOT_FOUND":
        alert('User not found, check your spelling and try again')
        console.log(error);
        break;
      case "INVALID_PASSWORD":
        alert('Incorrect Password, check your spelling and try again')
        console.log(error);
        break;
      default:
        setError("Server error");
        console.log(error);

    }
  }


  return (
    <div className="container_form">
      {isLoading && <GenericLoader message='Login in'></GenericLoader>}
      <h2>Login</h2>
      <form className="form-grup" onSubmit={submit}>
        <p>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type="text"
            autoFocus
            maxLength="150"
            required
            onChange = {(e) => setUsername(e.target.value)}
          ></input>
        </p>
        <p>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type="password"
            autoFocus
            required
            onChange = {(e) => setPassword(e.target.value)}
          ></input>
        </p>
        <button type="submit">Login</button>
      </form>
      <a href="/register">Registrar usuario</a>
    </div>
  );
}

export default Form;
