import React, { useState, useEffect } from "react";
import WebCam from "./WebCam";
import { bottom } from "@popperjs/core";

export default function ScanPage() {
  const [imgSrc, setSrc] = useState('');
  const [songs, results] = useState('');
  
  useEffect(() => {
    // fetch("http://localhost:3001").then(d => d.json()).then(d => results(d));
    // .then((data) => data.json())
    // .then((data) => console.log(data));
  }, []);
  

  
  return (
    <body>
      <div style = {{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} >
      <WebCam setSrc={setSrc} />
      {imgSrc && <div>{imgSrc}</div>}
      {imgSrc && <img src={imgSrc}/>}
      <h1>{songs}</h1>
      

      </div>
    </body>
    
    
  );
}
