import React, { useState } from 'react'
import './navbar.css'
import { useHistory } from "react-router-dom";
import Dropdown from '../dropdown-navbar/dropdown'


 function NavBar() {
    const [dropdown, setDropdown] = useState(false);

    const history = useHistory();

    const handleOnClickLogo = () =>{
        history.push("/");
    }

    const handleOnClickUser = () => {
        if (dropdown ) {
            setDropdown(false);
          } else {
            setDropdown(true);
          }
      };
    



    return (
        <div className="nav-bar">
            <h1 className="nav-bar_logo" onClick={ handleOnClickLogo }>App</h1>
            <ul className="nav-bar_menu">
                <li>
                    <a href="/">Home</a>
                    <a href="/createpost">Create Post</a>
                    <a onClick={handleOnClickUser} >User ▼
                    {dropdown && <Dropdown  />}
                    </a>
                </li>

            </ul>
        </div>
    )
}

export default NavBar;
