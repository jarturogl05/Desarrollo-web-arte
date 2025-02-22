import Login from './pages/login/login'
import Home from './pages/home/home'
import Register from './pages/register/register'
import Post from './pages/post/post'
import UserProfile from './pages/userprofile/userprofile'
import commissionAdmin from './pages/commissionAdmin/commissionAdmin'
import Createpost from './pages/createPost/createpost'
import PrivateRoute from './utils/auth'
import UserContext from "./utils/userContext"
import ScrollToTop from "./utils/scroll"
import checkToken from './services/tokenServices'


import {setLocalStorage, getLocalStorage} from './utils/localStorage'

import React, { useState, useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {

 var tokenInitialState = undefined;

  const [token, setToken] = useState(() => getLocalStorage("token", tokenInitialState));
  const [refreshToken, setRefreshToken] = useState(() => getLocalStorage("refreshToken", tokenInitialState))
  const [currentUsername, setCurrentUsername] = useState(() => getLocalStorage("currentUsername", tokenInitialState))

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
    setLocalStorage("currentUsername", currentUsername);
  },[refreshToken])

  
  const checkResponse = (response) => {
    if(response.message === "Access Granted"){
      setLocalStorage("token", token);
      setLocalStorage("currentUsername", currentUsername);
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
    <ScrollToTop>

      <UserContext.Provider value={{token, refreshToken, currentUsername, setToken, setRefreshToken, setCurrentUsername}}>
        <header/>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <PrivateRoute isLoggedIn exact path="/" component={Home}></PrivateRoute>
            <PrivateRoute excat path='/createpost' component={Createpost}></PrivateRoute>
            <PrivateRoute exact path="/post/:id" component={Post} ></PrivateRoute>
            <PrivateRoute exact path="/profile/:username" component={UserProfile}></PrivateRoute>
            <PrivateRoute exact path="/mycommisions" component={commissionAdmin}></PrivateRoute>
          </Switch>
        </div>
      </UserContext.Provider>
      </ScrollToTop>
    </BrowserRouter>
  );
}




export default  App;
