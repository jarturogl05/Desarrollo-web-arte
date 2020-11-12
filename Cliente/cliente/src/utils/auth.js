import React, { useContext } from "react";
import { Redirect, Route,useHistory } from "react-router-dom";
import UserContext from './userContext'


const PrivateRoute = ({ component: Component, ...otherProps }) => {
  
  const {user}  = useContext(UserContext);
  return (
    <Route
    {...otherProps}
    render={props => (
            (
                user.token
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