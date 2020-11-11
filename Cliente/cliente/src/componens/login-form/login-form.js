import React from 'react'
import './login-form.css'

function form() {

    return (
        <div className="container_form">
            <h2>Login</h2>
            <form className="form-grup">
                <p>
                    <label>Username</label>
                    <input type="text" autoFocus autoComplete="username" maxLength="150" required></input>
                </p>
                <p>
                    <label>Password</label>
                    <input type="password" autoComplete="current-password" autoFocus required></input>
                </p>
                <button type="submit">Login</button>
            </form>
            <a href ='/register'>Registrar usuario</a>
        </div>
    )
}

export default form
