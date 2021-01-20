import React, { useState, useRef, useEffect, useContext } from "react";
import "./navbar.css";
import { useHistory } from "react-router-dom";
import Dropdown from "../dropdown-navbar/dropdown";
import UserContext from '../../utils/userContext';

function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleOnClickLogo = () => {
    history.push("/");
  };

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };
  
  const handleOnClickUser = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  return (
    <div className="nav-bar">
      <h1 className="nav-bar_logo" onClick={handleOnClickLogo}>
        WebArt
      </h1>
      <ul className="nav-bar_menu">
        <li>
          <a href="/">Home</a>
          <a href="/createpost">Create Post</a>
          <a href='/mycommisions'>Manage My Commissions</a>
          <button onClick={handleOnClickUser} ref={wrapperRef}>Menu ▼
          {dropdown && <Dropdown   />}
          </button>
          {/* <a onClick={handleOnClickUser}>
            <img className="nav-bar_userImage" src="https://i.imgur.com/PnZquaF.jpg"></img>
            User ▼{dropdown && <Dropdown />}
          </a> */}
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
