import React, { useState, useEffect } from "react";
import Dropzone from '../createpost-dropzone/Dropzone.js'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import LoadingOverlayContainer from '../LoadingOverlay/LoadingOverlayContainer'
import "./createpostForm.css";

function CreatepostForm() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);


  function handleFile(){
    var result = false
    if(selectedFile[0]){
      console.log(selectedFile[0], 'aaaa');
      result = true;
    }
    return result;
  }

 const hanldeSumbit = (e) =>{
  e.preventDefault();
  var result = handleFile();
  console.log(result)
  if(result){
    setLoading(true);
  }

  }


  return (
    <div className="postform">

      {loading  &&
              <LoadingOverlayContainer>
              </LoadingOverlayContainer>
      }

      <h2>Create new post</h2>
      <label className="titlemessage">Share your art</label>
      <form onSubmit={hanldeSumbit}>
        <div className="postform-filecontainer">
          <Dropzone setSelectedFile={setSelectedFile}></Dropzone>
        </div>

        <div className="postform-formcontainer">
          <div className="postform-labelscontainer">
            <ul>
              <li>
                <label htmlFor="name">Title</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="off"
                  className="normalinput"
                  maxLength='50' 
                  required
                  onChange={(e) => setTitle(e.target.value) }
                ></input>
              </li>

              <li>
                <label htmlFor="tags">Tags </label>
                <ReactTagInput
                  required={true}
                  placeholder="Type and press enter"
                  tags={tags}
                  maxTags={4}
                  removeOnBackspace={true}
                  onChange={(newTags) => setTags(newTags)}
                />
              </li>

              <li>
                <label htmlFor="description">Description </label>
                <textarea 
                  id="description"
                  maxLength='' 
                   onChange={(e) => setDescription(e.target.value) }
                   required
                ></textarea>
              </li>
            </ul>
          </div>
          <div className="postform-buttoncontainer ">
            <button type="submit" >Create Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatepostForm
