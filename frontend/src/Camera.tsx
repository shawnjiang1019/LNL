import { useCallback } from "react";

export default function Camera() {
  const openCam = useCallback((video: HTMLVideoElement) => {
    if (video == null) return;

    let All_mediaDevices = navigator.mediaDevices;
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      console.log("getUserMedia() not supported.");
      return;
    }
    All_mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
      .then(function (vidStream) {
        if ("srcObject" in video) {
          video.srcObject = vidStream;
        } else {
          (video as any).src = window.URL.createObjectURL(vidStream as any);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (e) {
        console.log(e.name + ": " + e.message);
      });
  }, []);

  return (
    <div>
      <h1>Open WebCam Using JavaScript</h1>
      <video ref={openCam} />
    </div>
  );
}
