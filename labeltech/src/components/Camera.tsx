"use client";
import { useEffect, useRef } from 'react';

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: true
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing the camera:", err);
        });
    }
  }, []);

  return (
    <div>
        <p>Take a picture of a mushrooms</p>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default Camera;
