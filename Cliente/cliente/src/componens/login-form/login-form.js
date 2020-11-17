import React, { useState, useContext } from "react"
import UserContext from '../../utils/userContext'
import { useHistory } from "react-router-dom";



import "./login-form.css";

function Form() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const {token, setToken } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) =>{
    e.preventDefault();
    

    const loginUser = {username,password};
    const loginRes = {token:"12asda331", username: "muterk"} //petición

    setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmNhbXNvZnRAZ21haWwuY29tIiwiaWF0IjoxNjA1NTg0MjM2LCJleHAiOjE2MDU1ODYwMzZ9.bcdXqWUMISiqLHQrXD9LWjcMgJYb3552e4C59hHcitA");

    history.push("/");
  }


  return (
    <div className="container_form">
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
          ></input>
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            autoComplete="current-password"
            autoFocus
            required
          ></input>
        </p>
        <button type="submit">Login</button>
      </form>
      <a href="/register">Registrar usuario</a>
    </div>
  );
}

export default Form;
