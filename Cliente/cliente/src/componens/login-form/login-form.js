import React, { useState, useContext } from "react"
import UserContext from "../../utils/userContext";
import { useHistory } from "react-router-dom";

import doLogin from "../../services/userServices";


import "./login-form.css";

function Form() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const {token, setToken,  setRefreshToken } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) =>{
    e.preventDefault();
    const loginResponse = await doLogin(username, password)
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
        history.push("/");
        break;
      case "USER_NOT_FOUND":
        setError(loginResponse.status);
        console.log(error);
        break;
      case "INVALID_PASSWORD":
        setError(loginResponse.status);
        console.log(error);
        break;
      default:
        setError("Server error");
        console.log(error);

    }
  }


  return (
    <div className="container_form">
      {error ?(
      <h1>{error}</h1>): null}
      <h2>Login</h2>
      <form className="form-grup" onSubmit={submit}>
        <p>
          <label>Username</label>
          <input
            type="text"
            autoFocus
            autoComplete="username"
            maxLength="150"
            required
            onChange = {(e) => setUsername(e.target.value)}
          ></input>
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            autoComplete="current-password"
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
