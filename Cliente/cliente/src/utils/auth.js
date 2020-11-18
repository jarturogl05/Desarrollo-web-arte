import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";
import UserContext from './userContext'

const PrivateRoute =  ({ component: Component, ...otherProps }) => {

  const {token}  = useContext(UserContext);
  console.log(token);
  return (
    <Route
    {...otherProps}
    render={props => (
            (
                token
                    ?
                    <Component {...props} />
                    :
                    <Redirect to = '/login' />
            )
    )}
 />
  )
}
 

export default PrivateRoute;