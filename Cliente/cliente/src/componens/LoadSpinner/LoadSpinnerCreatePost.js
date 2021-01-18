import { useState } from "react";
import { css } from "@emotion/core";
import HashLoader from 'react-spinners/HashLoader';


const override = css`
  display: block;
  margin: 20px auto;
  border-color: red;
`;

function LoadSpinnerCreatePost() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <HashLoader color={color} loading={loading} css={override} size={80} />
    </div>
  );
}

export default LoadSpinnerCreatePost; 