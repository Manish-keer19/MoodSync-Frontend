import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import "./FacialExpression.css"
import axios from 'axios';

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = '/models'; 
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood(){
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if(!detections || detections.length === 0){
      console.log("No Face Detected");
      return;
    }

    let bestExpression = "";
    let maxValue = 0;
    for(const [exp, value] of Object.entries(detections[0].expressions)){
      if (value > maxValue){
        maxValue = value;
        bestExpression = exp;
      }
    }
    
    // axios.get(`http://localhost:3000/songs?mood=${bestExpression}`)
    axios.get(`https://moodsync-backend-4ptr.onrender.com/songs?mood=${bestExpression}`)
      .then(response=>{
        console.log("bestexpression is ", bestExpression);
        setSongs(response.data.songs);
      })
      .catch(err => console.error(err));
 }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className='mood-element'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='user-video-feed'
      />
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
}
