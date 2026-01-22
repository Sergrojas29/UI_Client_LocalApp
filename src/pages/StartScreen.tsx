import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

export default function StartScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartSession = async () => {
    setIsLoading(true);
    // Simulation of API call
    console.log("Starting session...");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/CollageSelect");
    }, 3000);
  };

  return (
    <div className="start-screen-container">
      
      {/* Logo Position: 
         Bottom of this div aligns with the vertical center of the screen 
      */}
      <div className="logo-placeholder">
         {/* <img src="/collage_300dpi (7).png" alt="" srcset="" /> */}
         {/* <img src="/music icon 4.png" alt="" srcset="" /> */}
         <img src="/DSC08582.JPG" alt="" srcset="" />
      </div>

      {/* Button Position:
         Dead center of the screen, z-index high to float on top 
      */}
      <button 
        className={`start-session-btn ${isLoading ? "loading" : ""}`}
        onClick={handleStartSession}
        disabled={isLoading}
      >
        {isLoading ? "Starting..." : "Start"}
      </button>

    </div>
  );
}