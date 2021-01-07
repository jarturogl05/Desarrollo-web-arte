import { React } from "react";
import LoadingOverlay from "react-loading-overlay";
import "./LoadingOverlayContainer.css";
import LoadSpinnerCreatePost from "../LoadSpinner/LoadSpinnerCreatePost";

function LoadingOverlayContainer() {


  return (
    <div className="LoadingOverlay-container">
      <div className="overlay">
        <LoadingOverlay
          active={true}
          spinner={<LoadSpinnerCreatePost></LoadSpinnerCreatePost>}
          text="Creating a new post"
        ></LoadingOverlay>
      </div>
    </div>
  );
}

export default LoadingOverlayContainer;
