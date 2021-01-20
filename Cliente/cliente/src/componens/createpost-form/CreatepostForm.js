import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Dropzone from "../createpost-dropzone/Dropzone.js";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import LoadingOverlayContainer from "../LoadingOverlay/LoadingOverlayContainer";
import createPost from "../../services/uploadServices";
import UserContext from '../../utils/userContext';
import "./createpostForm.css";

function CreatepostForm() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const {token}  = useContext(UserContext);
  const history = useHistory();

  function handleFile() {
    setErrorMessage('');
    var result = false;
    if (selectedFile[0]) {
      console.log(selectedFile[0], "aaaa");
      result = true;
    }
    return result;
  }

  const hanldeSumbit = async (e) => {
    
    e.preventDefault();
    console.log(tags);
    if(tags.length === 0){
      setWarningMessage('Enter at least one tag');
    }else{
      var result = handleFile();
      if (result) {
        setWarningMessage('');
        setLoading(true);
        const result = await createPost(selectedFile, title, tags, description, token);
        checkResult(result);
      }else{
        setWarningMessage('Select an Image');
      }
    }

  };

  const checkResult = (result) => {
    if (result !== undefined) {
      setLoading(false);
      history.push("/");
    } else {
      setErrorMessage('Server error, Try again later');
      setLoading(false);
    }
  };

  return (
    <div className="postform">
      {loading && <LoadingOverlayContainer></LoadingOverlayContainer>}

      <h2>Create new post</h2>
      <label className="titlemessage">Share your art</label>
      <form onSubmit={hanldeSumbit}>
        <div className="postform-filecontainer">
          <Dropzone setSelectedFile={setSelectedFile}></Dropzone>
        </div>
        {errorMessage && (
          <p className="errorMessage">{errorMessage}</p>
        )}
        {warningMessage &&(<p className="warningMessage">{warningMessage}</p>)}
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
                  maxLength="50"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="tags">Tags </label>
                <ReactTagInput
                  required="required"
                  placeholder="Type and press enter"
                  tags={tags}
                  maxTags={4}
                  removeOnBackspace={true}
                  onChange={(newTags) => setTags(newTags)}
                >
                </ReactTagInput>
              </li>

              <li>
                <label htmlFor="description">Description </label>
                <textarea
                  id="description"
                  maxLength=""
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
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

export default CreatepostForm;
