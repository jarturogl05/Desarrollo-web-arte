import Login from './pages/login/login'
import Home from './pages/home/home'
import Register from './pages/register/register'
import Post from './pages/post/post'
import UserProfile from './pages/userprofile/userprofile'
import PrivateRoute from './utils/auth'
import UserContext from "./utils/userContext"
import checkToken from './services/tokenServices'


import {setLocalStorage, getLocalStorage} from './utils/localStorage'

import React, { useState, useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {

 var tokenInitialState = undefined;

  const [token, setToken] = useState(() => getLocalStorage("token", tokenInitialState));
  const [refreshToken, setRefreshToken] = useState(() => getLocalStorage("refreshToken", tokenInitialState))

  useEffect(() => {
    const tokenStauts = async () => {
      const response =  await checkToken(token, refreshToken);
      if (response){
        checkResponse(response);
      }else{
        setToken(undefined)
        setLocalStorage("token", undefined);
        setLocalStorage("refreshToken", undefined);

      }
    }
      tokenStauts();
  }, [token]);

  useEffect(() => {
    setLocalStorage("refreshToken", refreshToken);
  },[refreshToken])

  
  const checkResponse = (response) => {
    if(response.message === "Access Granted"){
      setLocalStorage("token", token);
    }else if(response.message === "Refreshing Token"){
      setLocalStorage("token", response.newToken);
    }
    else{
      setToken(undefined);
      setLocalStorage("token", undefined);

    }
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{token,refreshToken, setToken, setRefreshToken}}>
        <header/>
        <div className="App">
          <Switch>
            <PrivateRoute isLoggedIn exact path="/" component={Home}></PrivateRoute>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/post/:id" component={Post}></Route>
            <Route exact path="/profile/:id" component={UserProfile}></Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default  App;
