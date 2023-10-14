import React, { useState } from "react";
import WebCam from "./WebCam";

export default function ScanPage() {
  const [src, setSrc] = useState(null);
  
  return (
    <div>
      <WebCam setSrc={setSrc}/>
    </div>
  );
}
