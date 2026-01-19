import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import TouchKeyboard from "../components/TouchKeyboard";
import "./Download.css";

const UPLOAD_DELAY = 6000; 
const MOCK_GALLERY_URL = "https://your-booth-domain.com/g/ABCD123";

export default function Download() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [activeInput, setActiveInput] = useState<"email" | "phone" | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsUploading(false), UPLOAD_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleSendDigital = () => {
     if(!email && !phone) {
         alert("Please enter an email or phone number.");
         return;
     }
     console.log(`Sending link to Email: ${email}, Phone: ${phone}`);
     alert("Sent! Check your device.");
     setActiveInput(null); 
  };

  const handleFinish = () => {
      navigate("/StartScreen");
  };

  const handleInputChange = (inputVal: string) => {
    if (activeInput === "email") setEmail(inputVal);
    if (activeInput === "phone") setPhone(inputVal);
  };

  return (
    <div className="dl-page-container">
        
        {isUploading ? (
          <div className="dl-uploading-state">
            <div className="dl-spinner-stack">
                <div className="dl-main-spinner"></div>
                <div className="dl-social-icon dl-icon-ig">IG</div>
                <div className="dl-social-icon dl-icon-fb">FB</div>
                <div className="dl-social-icon dl-icon-sc">SC</div>
                <div className="dl-social-icon dl-icon-pin">Pin</div>
            </div>
            <h2 className="dl-animate-pulse">Uploading High Res Photos...</h2>
            <p className="sub-text">Getting your gallery ready for social media!</p>
          </div>
        ) : (
          <div className="dl-sharing-state">
            
            <div className={`dl-content-card ${activeInput ? "dl-keyboard-open" : ""}`}>
                <div className="dl-input-side">
                    <h3>Your Photos are Ready!</h3>
                    <p className="sub-text">Tap to enter details.</p>
                    
                    <div className="dl-input-group">
                        <input 
                          type="text" 
                          placeholder="Enter Email Address" 
                          value={email}
                          onFocus={() => setActiveInput("email")}
                          readOnly 
                        />
                        <input 
                          type="text" 
                          placeholder="Enter Phone Number" 
                          value={phone}
                          onFocus={() => setActiveInput("phone")}
                          readOnly 
                        />
                    </div>
                    
                    <button className="dl-send-btn" onClick={handleSendDigital}>
                        SEND LINK
                    </button>
                </div>

                <div className="dl-vertical-divider"></div>

                <div className="dl-qr-side">
                    <div className="dl-qr-wrapper">
                        <QRCode
                            size={256}
                            style={{ width: "100%", height: "100%" }}
                            value={MOCK_GALLERY_URL}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <p className="dl-scan-text">Scan for Gallery</p>
                </div>
            </div>

            <button className="dl-finish-btn" onClick={handleFinish}>
                I'm Done &rarr;
            </button>

            {activeInput && (
              <TouchKeyboard
                inputName={activeInput}
                layout={activeInput === "phone" ? "number" : "default"}
                onChange={handleInputChange}
                onClose={() => setActiveInput(null)}
              />
            )}

          </div>
        )}
    </div>
  );
}