import { React } from "react";
import Loader from 'react-loader-spinner'
import LoadingOverlay from "react-loading-overlay";
import "./GenericLoadingOverlayContainer.css";

function GenericLoadingOverlayContainer(props) {


  return (
    <div className="GenericLoadingOverlay-container">
      <div className="overlay">
        <LoadingOverlay
          active={true}
          spinner={<Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
          text={props.message}
        ></LoadingOverlay>
      </div>
    </div>
  );
}

export default GenericLoadingOverlayContainer;
