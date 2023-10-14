import React, { useState, useEffect } from "react";
import WebCam from "./WebCam";

export default function ScanPage() {
  const [imgSrc, setSrc] = useState(null);
  const [songs, results] = useState('');
  
  useEffect(() => {
    fetch('/top')
      .then(data => data.json())
      .then(data => results(data.songs));
  }, []);
  
  return (
    <div>
      <WebCam setSrc={setSrc} />
      {imgSrc && <div>{imgSrc}</div>}
      {imgSrc && <img src={imgSrc}/>}
      <h1>{songs}</h1>
      

    </div>
  );
}
