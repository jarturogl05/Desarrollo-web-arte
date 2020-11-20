import React, { useState } from 'react';
import './dropdown.css';

function Dropdown() {
  const [click, setClick] = useState(false)
  ;
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
        <li>
          <a href="/messages">Messages</a>
          <a>Settings</a>
          <a>Logout</a>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;