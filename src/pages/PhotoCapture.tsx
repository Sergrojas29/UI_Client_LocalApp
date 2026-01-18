import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PhotoCapture.css";

export default function PhotoCapture() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Get Settings from previous page (Defaults provided if testing directly)
  const { totalPhotos = 3, delaySeconds = 3 } = location.state || {};

  // 2. State
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(1);
  const [timeLeft, setTimeLeft] = useState(delaySeconds);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  
  // Video Ref for the live feed
  const videoRef = useRef<HTMLVideoElement>(null);

  // 3. Start Camera on Mount
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
    
    // Auto-start the first countdown after a short buffer
    const startTimer = setTimeout(() => setIsCountingDown(true), 1000);
    return () => clearTimeout(startTimer);
  }, []);

  // 4. Countdown Logic
  useEffect(() => {
    if (!isCountingDown) return;

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      // Time is 0 -> CAPTURE!
      handleCapture();
    }
  }, [timeLeft, isCountingDown]);

  const handleCapture = () => {
    setIsCountingDown(false);
    
    // Flash Effect
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 200);

    console.log(`Captured Photo ${currentPhotoIndex}`);
    
    // Move to next photo or finish
    if (currentPhotoIndex < totalPhotos) {
      setTimeout(() => {
        setCurrentPhotoIndex(prev => prev + 1);
        setTimeLeft(delaySeconds); // Reset timer
        setIsCountingDown(true);   // Start next countdown
      }, 1500); // 1.5s pause to review the "photo" (optional)
    } else {
      console.log("All photos taken! moving to processing...");
      setTimeout(() => navigate("/Processing"), 1000);
    }
  };

  return (
    <div className="capture-container">
      
      {/* 1. Top Progress Bar (Styled like Tabs) */}
      <header className="capture-header">
        <div className="tabs-container progress-tabs">
          {Array.from({ length: totalPhotos }, (_, i) => i + 1).map((num) => (
            <div 
              key={num} 
              className={`tab-btn progress-step ${
                num === currentPhotoIndex ? "active" : 
                num < currentPhotoIndex ? "completed" : ""
              }`}
            >
              Photo {num}
            </div>
          ))}
        </div>
      </header>

      {/* 2. Main Viewfinder */}
      <div className="viewfinder">
        <video ref={videoRef} autoPlay playsInline muted className="live-feed" />
        
        {/* Flash Overlay */}
        <div className={`flash-overlay ${flashActive ? "active" : ""}`}></div>
      </div>

      {/* 3. Footer Timer (Dynamic) */}
      <footer className="capture-footer">
        <div className="timer-display">
          {isCountingDown ? (
            <span className="countdown-number">{timeLeft}</span>
          ) : (
             <span className="status-text">Smile!</span>
          )}
        </div>
        
        {/* Visual Timer Bar (Optional visual flair) */}
        <div className="timer-bar-container">
            <div 
              className="timer-fill"
              style={{ 
                width: isCountingDown ? `${(timeLeft / delaySeconds) * 100}%` : '0%',
                transition: 'width 1s linear'
              }}
            ></div>
        </div>
      </footer>

    </div>
  );
}