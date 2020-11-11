import React from "react";
import "./register-form.css";

function form() {
  return (
      <div className="container_form">
        <h2>Register</h2>
        <form className="form-grup">
          <p>
            <label>Username</label>
            <input
              type="text"
              autoFocus
              maxLength="150"
              required
            ></input>
          </p>
          <p>
            <label>Password</label>
            <input
              type="password"
              autoFocus
              required
            ></input>
          </p>
          <button type="submit">Registrarse</button>
        </form>
        <a href="/login">Iniciar sesión</a>
      </div>
  );
}

export default form;
