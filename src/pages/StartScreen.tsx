import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StartScreen.css";

export default function StartScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartSession = async () => {
    setIsLoading(true);

    try {
      // --- API Call (Commented Out) ---
      // await axios.post('/api/startSession');
      
      // --- Simulation ---
      console.log("Starting session...");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/CollageSelect");
      }, 3000);

    } catch (error) {
      console.error("Failed to start session", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="start-screen-container">
      
      {/* add svg link here */}
      <div className="logo-placeholder">
         {/* Temporary text to show where SVG goes */}
         <span>LOGO</span> 
      </div>

      <div className="action-area">
        <button 
          className={`start-session-btn ${isLoading ? "loading" : ""}`}
          onClick={handleStartSession}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loader-text">Starting...</span>
          ) : (
            "Start"
          )}
        </button>
      </div>

    </div>
  );
}