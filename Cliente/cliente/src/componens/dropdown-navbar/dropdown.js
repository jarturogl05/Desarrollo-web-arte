import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./dropdown.css";

function Dropdown() {
  const [click, setClick] = useState(false);
  const history = useHistory();

  const handleClick = () => setClick(!click);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.replace("/login");
  };

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        <li>
          <a href="/messages">Messages</a>
          <a href="/settings">Settings</a>
          <a onClick={(e) => logOut(e)}>Logout</a>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;