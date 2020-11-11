import LoginForm from '../../componens/login-form/login-form'
import './login.css'

import React, { useState, useContext } from "react";


function login() {
    return (
        <div className="container_page" >
            <LoginForm/>
        </div>
    )
}

export default login
