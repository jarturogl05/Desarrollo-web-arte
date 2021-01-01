import React from 'react'
import './CreatepostForm'

function CreatepostForm() {
    return (
        <div>
            <form className='postform'>
                <h2>Create new post</h2>

                <label>
                    post name
                    <input type='text' autoComplete='off' name='postName'></input>
                </label>

                <label>

                </label>

            </form>
        </div>
    )
}

export default CreatepostForm
