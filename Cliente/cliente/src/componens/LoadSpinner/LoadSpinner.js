import { useState } from "react";
import { css } from "@emotion/core";
import DotLoader from 'react-spinners/DotLoader';


const override = css`
  display: block;
  margin: 20px auto;
  border-color: red;
`;

function LoadSpinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#212121");

  return (
    <div className="sweet-loading">
      <DotLoader color={color} loading={loading} css={override} size={80} />
    </div>
  );
}

export default LoadSpinner; 