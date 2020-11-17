import Login from './pages/login/login'
import Home from './pages/home/home'
import Register from './pages/register/register'
import PrivateRoute from './utils/auth'
import UserContext from "./utils/userContext"
import checkToken from './services/tokenServices'

import {setLocalStorage, getLocalStorage} from './utils/localStorage'

import React, { useState, useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {

 var tokenInitialState = undefined;

  const [token, setToken] = useState(() => getLocalStorage("token", tokenInitialState));

  useEffect(() => {
    const tokenStauts = async () => {
      const response =  await checkToken(token);
      if(response.message === "Access Granted"){
        setLocalStorage("token", token);
      }else{
        setToken(undefined)
        setLocalStorage("token", undefined);
      }
    }
      tokenStauts();
  }, [token]);



  return (
    <BrowserRouter>
      <UserContext.Provider value={{token, setToken}}>
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
