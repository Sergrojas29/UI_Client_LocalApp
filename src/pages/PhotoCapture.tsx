import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PhotoCapture.css";

export default function PhotoCapture() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get Settings (Defaults provided)
  const { totalPhotos = 3, delaySeconds = 3 } = location.state || {};

  // State
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(1);
  const [timeLeft, setTimeLeft] = useState(delaySeconds);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start Camera
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1920, height: 1080 } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera Error:", err);
      }
    }
    setupCamera();
    
    // Auto-start
    const startTimer = setTimeout(() => setIsCountingDown(true), 1000);
    return () => clearTimeout(startTimer);
  }, []);

  // Countdown Logic
  useEffect(() => {
    if (!isCountingDown) return;

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleCapture();
    }
  }, [timeLeft, isCountingDown]);

  const handleCapture = () => {
    setIsCountingDown(false);
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 200);

    console.log(`Captured Photo ${currentPhotoIndex}`);
    
    if (currentPhotoIndex < totalPhotos) {
      setTimeout(() => {
        setCurrentPhotoIndex(prev => prev + 1);
        setTimeLeft(delaySeconds);
        setIsCountingDown(true);
      }, 1500); 
    } else {
      setTimeout(() => navigate("/Processing"), 1000);
    }
  };

  return (
    <div className="capture-container">
      
      {/* 1. Top Progress Bar */}
      <header className="capture-header">
        <div className="tabs-container progress-tabs">
          {Array.from({ length: totalPhotos }, (_, i) => i + 1).map((num) => (
            <div 
              key={num} 
              className={`tab-btn progress-step ${
                num === currentPhotoIndex ? "active" : ""
              }`}
            >
              Photo {num}
            </div>
          ))}
        </div>
      </header>

      {/* 2. Main Viewfinder (4:6 Ratio) */}
      <div className="viewfinder">
        <video ref={videoRef} autoPlay playsInline muted className="live-feed" />
        
        {/* Floating Timer Overlay (Centered) */}
        <div className="timer-floating-overlay">
          {isCountingDown ? (
            <>
              <span className="floating-countdown">{timeLeft}</span>
              {/* Floating Progress Bar */}
              <div className="floating-progress-track">
                <div 
                  className="floating-progress-fill"
                  style={{ 
                    width: `${(timeLeft / delaySeconds) * 100}%`,
                    transition: 'width 1s linear'
                  }}
                ></div>
              </div>
            </>
          ) : (
             <span className="floating-status">Smile!</span>
          )}
        </div>

        {/* Flash Overlay */}
        <div className={`flash-overlay ${flashActive ? "active" : ""}`}></div>
      </div>

    </div>
  );
}