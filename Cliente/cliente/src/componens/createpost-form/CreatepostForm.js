import React from "react";
import "./createpostForm.css";

function CreatepostForm() {
  return (
    <div>
      <form className="postform">
        <h2>Create new post</h2>
        <label className='titlemessage'>Share your art</label>

        <div className="postform-filecontainer">
          <input id="file" type="file" accept="image/*" className='inputfile'></input>
          <label for="file">Select a Image</label>
        </div>

        <div className='postform-labelscontainer'>
          <ul>
            <li>
              <label for="name">Post Name:</label>
              <input id="name" type="text" autoComplete="off"></input>
            </li>

            <li>
              <label for="tags">Tags: </label>
              <input id="tags" type="text"></input>
            </li>

            <li>
              <label for="description">Tags: </label>
              <textarea id="description"></textarea>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default CreatepostForm
