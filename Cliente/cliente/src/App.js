import Login from './pages/login/login'
import Home from './pages/home/home'
import Register from './pages/register/register'
import PrivateRoute from './utils/auth'
import UserContext from "./utils/userContext"

import {setLocalStorage, getLocalStorage} from './utils/localStorage'

import React, { useState, useEffect, useMemo } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {  

  var initialState = {
    userId: undefined,
    userName: undefined,
    token: undefined
  };
  

  const [user, setUser] = useState(() => getLocalStorage("user", initialState));

  useEffect(() => {
    setLocalStorage("user", user);
  }, [user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <header/>
        <div className="App">
          <Switch>
            <PrivateRoute isLoggedIn exact path="/" component={Home}></PrivateRoute>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}



export default  App;
