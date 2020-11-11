import Login from './pages/login/login'
import Home from './pages/home/home'

import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
       <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
    </div>
    </BrowserRouter>
 
  );
}

export default App;
