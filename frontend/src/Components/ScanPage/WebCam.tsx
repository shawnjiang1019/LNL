import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react"; // import useRef

interface WebCamProps {
  setSrc: any;
}

const WebCam = ({ setSrc }: WebCamProps) => {
  const webcamRef = useRef(null); // create a webcam instance
  const [imgSrc, setImgSrc] = useState(null); // initialize it

  // created capture function
  const capture = useCallback(() => {
    const imageSrc = (webcamRef.current as any).getScreenshot();
    setImgSrc(imageSrc);
    setSrc(imageSrc);

    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="WebCam" />
      ) : (
        <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
};

export default WebCam;
