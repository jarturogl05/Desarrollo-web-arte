import React, { useState, useEffect, useRef } from "react";
import "./Dropzone.css";

function Dropzone(params) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validFiles, setValidFiles] = useState([]);
const [unsupportedFiles, setUnsupportedFiles] = useState([]);

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
        const x = file.find(item => item.name === current.name);
        if (!x) {
            return file.concat([current]);
        } else {
            return file;
        }
    }, []);
    setValidFiles([...filteredArray]);
    params.setSelectedFile(selectedFiles);

}, [selectedFiles]);


  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const handleFiles = (files) => {
    setSelectedFiles([]);
    setUnsupportedFiles([]);

      if (validateFile(files[0])) {
        const size = files[0].size/1024/1024;
        if(size < 6){
          setSelectedFiles((prevArray) => [...prevArray, files[0]]);

        }else{
          files[0]["invalid"] = true;
          setUnsupportedFiles(prevArray => [...prevArray, files[0]]);
          setErrorMessage("The file must be less than 6 MB");
        }
        
      } else {
        files[0]["invalid"] = true;
        setUnsupportedFiles(prevArray => [...prevArray, files[0]]);
        setErrorMessage("File type not permitted");
      }
    
  };




  const removeFile = (name) => {


    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    setSelectedFiles([...selectedFiles]);

    const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
    if (unsupportedFileIndex !== -1) {
        unsupportedFiles.splice(unsupportedFileIndex, 1);
        setUnsupportedFiles([...unsupportedFiles]);
    }


  };

  const fileInputRef = useRef();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  return (
    <div>
    {unsupportedFiles.length ? <p className='errorMessage'>{errorMessage}</p> : ''}

      <div
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        onClick={fileInputClicked}
      >
          
        <div className="drop-message">
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
          <div className="upload-icon"></div>
          Drag & Drop files here or click to upload
        </div>
      </div>

      <div className="file-display-container">
        {validFiles.map((data, i) => (
          <div className="file-status-bar" key={i}>
            <div>
              <div className="file-type-logo"></div>
              <div className="file-type">{fileType(data.name)}</div>
              <span className={`file-name ${data.invalid ? "file-error" : ""}`}>
                {data.name}
              </span>
              <span className="file-size">({fileSize(data.size)})</span>{" "}
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}
            </div>
            <div className="file-remove" onClick={() => removeFile(data.name)}>
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropzone;
