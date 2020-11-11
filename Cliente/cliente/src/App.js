import Login from './pages/login/login'
import Home from './pages/home/home'
import UserContext from "./context/userContext"

import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    token: undefined,
  });

  useEffect(() =>{
    const checkLoggedIn = async () =>{
      let token = localStorage.getItem("auth-token");

      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = true; // reemplazar por llamada

      if(tokenRes){

        const userRes = {id:111, user: "muterk" } //reemplaar por llamada

        setUserData({
          token,
          user: userRes,
        });
      }
    };
    
    checkLoggedIn();
  },[])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <header/>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
