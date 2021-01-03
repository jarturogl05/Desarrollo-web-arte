import React from 'react'
import './Dropzone.css'

function Dropzone() {
  return (
    <div className="drop-container">
      <div className="drop-message">
        <div className="upload-icon"></div>
        Drag & Drop files here or click to upload
      </div>
    </div>
  );
}

export default Dropzone
