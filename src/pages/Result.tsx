import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import "./Result.css";

// --- Constants & Mock Data ---
const UPLOAD_DELAY = 6000; // 6 seconds as requested
const MOCK_GALLERY_URL = "https://your-booth-domain.com/g/ABCD123";

// Placeholder images (replace with real results later)
const MOCK_PHOTOS = [
  { id: 1, url: "https://placehold.co/400x600/png?text=Photo+1" },
  { id: 2, url: "https://placehold.co/400x600/png?text=Photo+2" },
  { id: 3, url: "https://placehold.co/400x600/png?text=Photo+3" },
  { id: 4, url: "https://placehold.co/400x600/png?text=Gif+Result" },
];

export default function Result() {
  // --- State ---
  // UI State
  const [isUploading, setIsUploading] = useState(true);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  
  // Selection State
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([]);
  
  // Input State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // --- Effects ---
  useEffect(() => {
    // Simulate the 6-second upload process
    const timer = setTimeout(() => {
      setIsUploading(false);
    }, UPLOAD_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---
  const togglePhotoSelection = (id: number) => {
    setSelectedPhotoIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "carousel" ? "grid" : "carousel"));
  };

  const handlePrint = () => {
    if (selectedPhotoIds.length === 0) {
        alert("Select at least one photo to print!");
        return;
    }
    console.log("Printing photos:", selectedPhotoIds);
    // Call API to print here
  };

  const handleSendDigital = () => {
     console.log(`Sending link to Email: ${email}, Phone: ${phone}`);
     alert("Sent!");
  };


  return (
    <div className="result-container">
      
      {/* =======================
          TOP HALF: Photo Selection
      ======================== */}
      <section className="top-half-section">
        <div className="photo-viewer-container">
            
            {/* Floating Toggle Button */}
            <button className="floating-view-toggle" onClick={toggleViewMode}>
                {viewMode === "carousel" ? "Switch to GridView" : "Switch to Carousel"}
            </button>

            {/* The Gallery (Carousel or Grid based on state) */}
            <div className={`gallery-view ${viewMode}`}>
                {MOCK_PHOTOS.map((photo) => {
                    const isSelected = selectedPhotoIds.includes(photo.id);
                    return (
                        <div 
                          key={photo.id} 
                          className={`photo-item ${isSelected ? "selected" : ""}`}
                          onClick={() => togglePhotoSelection(photo.id)}
                        >
                            <img src={photo.url} alt="Result" />
                            {/* Selection Checkmark Overlay */}
                            <div className="selection-overlay">
                                {isSelected && <span className="checkmark">✔</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Print Action Bar beneath photos */}
        <div className="print-action-bar">
            <p>{selectedPhotoIds.length} photos selected</p>
            <button 
                className="print-btn" 
                onClick={handlePrint}
                disabled={selectedPhotoIds.length === 0}
            >
                Print Selected
            </button>
        </div>
      </section>


      {/* =======================
          BOTTOM HALF: Sharing
      ======================== */}
      <section className="bottom-half-section">
        
        {isUploading ? (
          /* --- State A: Uploading Animation --- */
          <div className="uploading-state">
            <div className="spinner-stack">
                {/* The central spinner */}
                <div className="result-spinner"></div>
                
                {/* Social Icons popping out from behind (Placeholders) */}
                <div className="social-icon icon-ig">IG</div>
                <div className="social-icon icon-fb">FB</div>
                <div className="social-icon icon-sc">SC</div>
                <div className="social-icon icon-pin">Pin</div>
            </div>
            <h2>Uploading for Digital Download...</h2>
            <p>Getting ready to post the event!</p>
          </div>
        ) : (
          /* --- State B: Inputs & QR Code --- */
          <div className="sharing-state">
            
            {/* Left Side: Inputs */}
            <div className="input-side">
                <h3>Download High Quality Image</h3>
                <p className="sub-text">Enter your details to receive the link instantly.</p>
                
                <div className="input-group">
                    <input 
                      type="email" 
                      placeholder="Enter Email Address" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                      type="tel" 
                      placeholder="Enter Phone Number" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <button className="send-btn" onClick={handleSendDigital}>Send Link</button>
            </div>

            {/* Right Side: Huge QR Code */}
            <div className="qr-side">
                <div className="qr-wrapper">
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={MOCK_GALLERY_URL}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <p>Scan to view gallery</p>
            </div>

          </div>
        )}

      </section>
    </div>
  );
}