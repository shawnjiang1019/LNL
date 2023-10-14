import React, { useState } from "react";
import WebCam from "./WebCam";

export default function ScanPage() {
  const [imgSrc, setSrc] = useState("");

  return (
    <div>
      <WebCam setSrc={setSrc} />
      {imgSrc && <div>{imgSrc}</div>}
      {imgSrc && <img src={imgSrc} alt="img" />}
    </div>
  );
}
