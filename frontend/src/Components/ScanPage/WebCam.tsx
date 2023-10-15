import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react"; // import useRef
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface WebCamProps {
  setSrc: (s: string) => void;
}

const WebCam = ({ setSrc }: WebCamProps) => {
  const webcamRef = useRef<Webcam>(null); // create a webcam instance
  const [imgSrc, setImgSrc] = useState(""); // initialize it

  const navigate = useNavigate();

  // created capture function
  const capture = useCallback(() => {
    if (webcamRef.current == null) return;

    const imageSrc = webcamRef.current.getScreenshot() as string;
    // setImgSrc(imageSrc);
    // console.log("imgsrc", imageSrc);

    const rawImg = imageSrc.slice(imageSrc.indexOf(",") + 1);
    setImgSrc(rawImg);
    localStorage.setItem("imgSrc", rawImg);
    toast.success("Photo captured!");

    navigate("/lnl");
  }, [webcamRef]);

  return (
    <div className="webcam-container">
      <Webcam
        height={480}
        width={480}
        ref={webcamRef as any}
        screenshotFormat="image/jpeg"
        style={{ marginBottom: "3rem" }}
      />
      <div className="btn-container">
        <Button
          variant="contained"
          style={{
            marginTop: "-5rem",
            marginBottom: "10rem",
            padding: "1rem 4rem",
            backgroundColor: "white",
            color: "black",
            fontSize: "1rem",
          }}
          onClick={capture}
        >
          Capture photo
        </Button>
      </div>
    </div>
  );
};

export default WebCam;
