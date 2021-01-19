import React,{useState, useEffect} from 'react'
import './userInfo.css'
import { useHistory } from "react-router-dom";

import user from'./cat2.jpg'

function UserInfo(props) {
    const [user, setUser] = useState('');
    const [image, setImage] = useState(' ')
    const history = useHistory();


    useEffect(() => {
      async function getUser() {
        if (user !== {}){
            setUser(props.autorFetched.username);
            setImage(props.autorFetched.image)

        }
      }
      getUser();
    }, [props.autorFetched]);


    const handleUserClick = () =>{
        history.push('/profile/' + user);
    }

    return (
        <div className="userInfo-container">
           {image && <img src={image} alt="user" onClick={handleUserClick}></img>} 
            {user && <h3 onClick={handleUserClick}>{user}</h3>}

        </div>
    )
}

export default UserInfo
