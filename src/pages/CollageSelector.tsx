import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollageSelector.css";

// Mock data (No changes needed here)
const TEMPLATES = [
  { id: 1, name: "Classic 3", type: "3 Photo", color: "#cbd5e1" },
  { id: 2, name: "Vertical Strip", type: "3 Photo", color: "#94a3b8" },
  { id: 3, name: "Grid 4", type: "4 Photo", color: "#64748b" },
  { id: 4, name: "Big Header", type: "4 Photo", color: "#475569" },
  { id: 5, name: "Funky Shapes", type: "Special", color: "#334155" },
  { id: 6, name: "Holiday Theme", type: "Special", color: "#1e293b" },
  { id: 7, name: "Minimal", type: "3 Photo", color: "#64748b" },
  { id: 8, name: "Party", type: "4 Photo", color: "#94a3b8" },
  { id: 9, name: "Retro", type: "Special", color: "#cbd5e1" },
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
    console.log(`Starting capture: Template ${selectedTemplateId}, Delay ${delaySeconds}s`);
    navigate("/PhotoCapture");
  };

  return (
    <div className="collage-selector-container">
      
      <header className="selector-header">
        <button className="back-btn" onClick={handleBack}>←</button>
        <h2>Choose a Template</h2>
        <div className="spacer"></div>
      </header>

      {/* Tabs */}
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

      {/* Grid */}
      <div className="template-grid">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplateId === template.id ? "selected" : ""}`}
            onClick={() => setSelectedTemplateId(template.id)}
            style={{ backgroundColor: template.color }}
          >
            <span className="template-label">{template.name}</span>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <footer className="selector-footer">
        
        <div className="delay-section">
          <span className="delay-label">Timer Delay</span>
          {/* Reusing the tab style logic here */}
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
      </footer>

    </div>
  );
}