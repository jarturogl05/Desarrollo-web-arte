import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from '../../utils/userContext'

import "./dropdown.css";

function Dropdown() {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const {currentUsername} = useContext(userContext)

  const handleClick = () => setClick(!click);
  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.replace("/login");
  };

  const currentProfileUrl = '/profile/' + currentUsername
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        <li>
          <a href={currentProfileUrl}>My profile</a>
          <a onClick={(e) => logOut(e)}>Logout</a>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;