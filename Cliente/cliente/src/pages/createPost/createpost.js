import React from 'react'
import NavBar from '../../componens/navbar/navbar'
import CreatepostForm from '../../componens/createpost-form/CreatepostForm'
import './createpost.css'

function Createpost() {
    return (
        <div>
            <NavBar></NavBar>
            <div className='createpost-container'>
                <CreatepostForm></CreatepostForm>
            </div>
        </div>
    )
}

export default Createpost
