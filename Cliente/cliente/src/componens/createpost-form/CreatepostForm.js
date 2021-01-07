import React, { useState } from "react";
import Dropzone from '../createpost-dropzone/Dropzone.js'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "./createpostForm.css";

function CreatepostForm() {
 const [selectedFile, setSelectedFile] = useState();
 const [tags, setTags] = useState([]);



  return (
    <div className="postform">
      <h2>Create new post</h2>
      <label className="titlemessage">Share your art</label>
      <form>

        <div className="postform-filecontainer">
          <Dropzone setSelectedFile={setSelectedFile}></Dropzone>
        </div>

        <div className='postform-formcontainer'>
        <div className="postform-labelscontainer">
          <ul>
            <li>
              <label htmlFor="name">Title</label>
              <input id="name" type="text" autoComplete="off" className='normalinput'></input>
            </li>

            <li>
              <label htmlFor="tags">Tags </label>
                <ReactTagInput 
                placeholder="Type and press enter"
                tags={tags} 
                maxTags={4}
                removeOnBackspace={true}
                onChange={(newTags) => setTags(newTags)}
                />
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
