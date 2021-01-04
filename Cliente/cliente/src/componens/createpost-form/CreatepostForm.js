import React, { useState } from "react";
import Dropzone from '../createpost-dropzone/Dropzone.js'
import "./createpostForm.css";

function CreatepostForm() {
 const [selectedFile, setSelectedFile] = useState();



  return (
    <div className="postform">
      <h2>Create new post</h2>
      <label className="titlemessage">Share your art</label>
      <form>
        

        <div className="postform-filecontainer">
          <Dropzone setSelectedFile={setSelectedFile}></Dropzone>
          {/* <input
            id="file"
            type="file"
            accept="image/*"
            className="inputfile"
          >
          </input>
          <label for="file">Select a Image</label> */}

        </div>

        <div className='postform-formcontainer'>
        <div className="postform-labelscontainer">
          <ul>
            <li>
              <label htmlFor="name">Title</label>
              <input id="name" type="text" autoComplete="off"></input>
            </li>

            <li>
              <label htmlFor="tags">Tags </label>
              <input id="tags" type="text"></input>
            </li>

            <li>
              <label htmlFor="description">Description </label>
              <textarea id="description"></textarea>
            </li>
          </ul>
        </div>
        <div className="postform-buttoncontainer ">
          <button type="submit">Create Post</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default CreatepostForm
