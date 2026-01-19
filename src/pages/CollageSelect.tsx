import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollageSelect.css";

// Updated Mock Data with orientation
// Added some landscape examples
const TEMPLATES = [
  { id: 1, name: "Classic Portrait", type: "3 Photo", color: "#1e293b", orientation: "portrait" },
  { id: 2, name: "Vertical Strip", type: "3 Photo", color: "#1e293b", orientation: "portrait" },
  { id: 3, name: "Wide Trio", type: "3 Photo", color: "#c18080", orientation: "landscape" },
  { id: 4, name: "Grid 4", type: "4 Photo", color: "#1e293b", orientation: "portrait" },
  { id: 5, name: "Big Header Land", type: "4 Photo", color: "#c18080", orientation: "landscape" },
  { id: 6, name: "Holiday Theme", type: "Special", color: "#1e293b", orientation: "portrait" },
  { id: 7, name: "Minimal Wide", type: "3 Photo", color: "#c18080", orientation: "landscape" },
  { id: 8, name: "Party Time", type: "4 Photo", color: "#1e293b", orientation: "portrait" },
  { id: 9, name: "Retroscape", type: "Special", color: "#c18080", orientation: "landscape" },
  { id: 10, name: "Port 3", type: "3 Photo", color: "#1e293b", orientation: "portrait" },
  { id: 11, name: "Land 4", type: "4 Photo", color: "#c18080", orientation: "landscape" },
  { id: 12, name: "Special Port", type: "Special", color: "#1e293b", orientation: "portrait" },
];

export default function CollageSelector() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("3 Photo");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [delaySeconds, setDelaySeconds] = useState(3);

  const filteredTemplates = TEMPLATES.filter((t) => t.type === activeTab);

  const handleBack = () => {
      console.log("Ending session...");
      navigate("/StartScreen");
  };

  const handleStartCapture = () => {
    if (!selectedTemplateId) {
      alert("Please select a template first!");
      return;
    }
    const template = TEMPLATES.find(t => t.id === selectedTemplateId);
    const photoCount = template?.type === "3 Photo" ? 3 : 4;

    navigate("/PhotoCapture", { 
      state: { 
        templateId: selectedTemplateId, 
        delaySeconds: delaySeconds,
        totalPhotos: photoCount 
      } 
    });
  };

  return (
    <div className="collage-selector-container">
      
      {/* 1. Header */}
      <header className="selector-header">
        <button className="back-btn" onClick={handleBack}>←</button>
        <h2>Choose a Template</h2>
        <div className="spacer"></div>
      </header>

      {/* 2. Tabs */}
      <div className="tabs-container">
        {["3 Photo", "4 Photo", "Special"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Controls */}
      <section className="control-bar">
        <div className="delay-section">
          <span className="control-label">Timer Delay</span>
          <div className="tabs-container delay-tabs">
            {[3, 5, 10].map((sec) => (
              <button
                key={sec}
                className={`tab-btn ${delaySeconds === sec ? "active" : ""}`}
                onClick={() => setDelaySeconds(sec)}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        <button 
          className="start-capture-btn" 
          onClick={handleStartCapture}
          disabled={!selectedTemplateId}
        >
          Start Capture
        </button>
      </section>

      {/* 4. Grid (Now using Flexbox) */}
      <div className="template-flex-container">
        {filteredTemplates.map((template) => {
           // Determine orientation class based on data
           const orientationClass = template.orientation === "landscape" ? "landscape-4x6" : "portrait-4x6";
           const selectedClass = selectedTemplateId === template.id ? "selected" : "";
           
           return (
          <div
            key={template.id}
            // Apply base class + orientation class + selection class
            className={`template-card ${orientationClass} ${selectedClass}`}
            onClick={() => setSelectedTemplateId(template.id)}
            style={{ backgroundColor: template.color }}
          >
            {/* Wrapper for future internal scrolling */}
            <div className="template-scroll-wrapper">
                 <span className="template-label">{template.name}</span>
            </div>
          </div>
        )})}
      </div>

    </div>
  );
}