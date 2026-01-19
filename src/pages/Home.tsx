import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to npm install axios
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  // --- State ---
  const [isConnected, setIsConnected] = useState(false);
  const [folderPath, setFolderPath] = useState<string>("");
  const [serverLogs, setServerLogs] = useState<string[]>(["System initialized..."]);

  // --- Handlers ---

  const handleConnect = async () => {
    addLog("Attempting connection to local host...");
    setIsConnected(true);
    // try {
    //   const response = await axios.get('/api/health', { timeout: 6000 });

    //   if (response.status === 200) {
    //     setIsConnected(true);
    //     addLog(`Connection established: ${response.data.message || 'OK'}`);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setIsConnected(false);

    //   if (axios.isAxiosError(error)) {
    //     addLog(`Error: ${error.message}`);
    //     if (error.code === 'ECONNABORTED') {
    //        addLog("Error: Connection timed out.");
    //     }
    //   } else {
    //     addLog("Error: Failed to connect.");
    //   }
    // }
  };

  const handleCheckStatus = async () => {
    if (!isConnected) return;
    addLog("Checking full status...");
    // Example second call
    // await axios.get('/api/status');
    setTimeout(() => addLog("Status: OK | Load: 12%"), 500);
  };

  const handleSetFolder = () => {
    addLog("Opening folder dialog...");
    // Future Tauri dialog code goes here
    setFolderPath("C:/Users/Admin/Documents/ProjectData");
  };

  const handleSetupWebcam = async () => {
    addLog("Requesting Camera Permissions...");
    try {
      // This triggers the browser popup
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // If we get here, they clicked "Allow".
      // We stop the stream immediately since we just wanted the permission.
      stream.getTracks().forEach(track => track.stop());

      addLog("SUCCESS: Camera access granted.");
    } catch (err) {
      console.error(err);
      addLog("ERROR: Camera access denied or unavailable.");
    }
  };

  const handleTestCapture = () => addLog("TEST: Triggering Photo Capture...");
  const handleTestCollage = () => addLog("TEST: Generating Collage...");
  const handleTestPrint = () => addLog("TEST: Sending job to printer...");

  const handleStartApp = () => {
    if (!folderPath) {
      addLog("WARNING: No folder selected.");
      return;
    }
    addLog("Launching application...");
    setTimeout(() => {
      navigate("/StartScreen");
    }, 500);
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setServerLogs((prev) => [`[${timestamp}] ${msg}`, ...prev]);
  };

  return (
    <div className="home-container setup-screen">

      {/* 1. Header Section */}
      <header className="setup-header">
        <h2>System Initialization</h2>
        <div className="connection-indicator">
          <span className="label">LINK:</span>
          <div className={`status-light ${isConnected ? "on" : "off"}`}></div>
        </div>
      </header>

      {/* 2. Control Panel */}
      <section className="control-group">

        {/* Row 1: Connection */}
        <div className="row">
          <button className="flex-btn" onClick={handleConnect} disabled={isConnected}>
            {isConnected ? "Connected" : "Connect to Host"}
          </button>

          <button className="flex-btn" onClick={handleCheckStatus} disabled={!isConnected}>
            Get Status
          </button>
        </div>

        {/* Row 2: Folder Selection (Updated) */}
        <div className="row folder-row">
          <button className="flex-btn" onClick={handleSetFolder}>Set Target Folder</button>
          <input
            type="text"
            className="folder-display flex-btn"
            value={folderPath}
            placeholder="No folder selected"
            // Allow manual typing if needed
            onChange={(e) => setFolderPath(e.target.value)}
          />
        </div>

        {/* ---  Webcam Setup --- */}
        <div className="row">
          <button className="flex-btn" onClick={handleSetupWebcam}>
            Initialize Webcam / Grant Permissions
          </button>
          {/* Empty spacer or status text could go here if you want split row */}
        </div>

        {/* Row 3: Hardware Tests */}
        <div className="row">
          <button className="flex-btn" onClick={handleTestCapture}>Test Capture</button>
          <button className="flex-btn" onClick={handleTestCollage}>Test Collage</button>
          <button className="flex-btn" onClick={handleTestPrint}>Test Print</button>
        </div>

      </section>


      <div className="start-action-area">
        {/* Added check: Button disabled if no connection */}
        <button className="start-app-btn" onClick={handleStartApp} disabled={!isConnected}>
          Start Application
        </button>
      </div>

      {/* 3. System Log & Start Button */}
      <section className="log-panel">
        <h3>System Log</h3>
        <div className="log-window">
          {serverLogs.map((log, index) => (
            <div key={index} className="log-line">{log}</div>
          ))}
        </div>


      </section>

    </div>
  );
}