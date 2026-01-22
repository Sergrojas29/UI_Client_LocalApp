import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios"; // Make sure to npm install axios
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  // --- State ---
  const [isConnected, setIsConnected] = useState(false);
  const [folderPath, setFolderPath] = useState<string | null>(null);
  const [serverLogs, setServerLogs] = useState<string[]>(["System initialized..."]);

  // --- Handlers ---

  const handleConnect = async () => {
    addLog("Attempting connection to local host...");
    const response = await axios.get('/debug/connect', { timeout: 6000 });
    const success = response.data.isConnected;
    if (success) {
      setIsConnected(true);
      addLog("Camera has been connected successfully");
    } else {
      setIsConnected(false);
      addLog("Camera Failed to connected");
    }
  };

  const handleCheckStatus = async () => {
    if (!isConnected) {
      addLog("Server not connected");
      return;
    };
    addLog("Checking full status...");
    const response = await axios.get('/debug/connect', { timeout: 6000 });
    const success = (response.status == 200) ? true : false;
    if (success) {
      addLog(`Target folder m_save_path: ${response.data.m_save_path}`);
      addLog(`connected: ${response.data.m_connected}`);
      addLog("_____________Session information _____________:")
      for (const [key, value] of Object.entries(response.data.session)) {
        addLog(`${key} : ${value}`);
      }
    } else {
      addLog("Error: no response");
    }
  };

  const handleSetFolder = async (filePath: string | null) => {
    if (filePath == null) {
      addLog("Error: Enter folder path")
      return
    }
    const response = await axios.post(`/debug/setTargetFolder/${filePath}`);
    const succuess = response.data.isCreated;
    if (succuess) {
      addLog(`${response.data.description} : success`)
      addLog(`${response.data.service} : ${response.data.file_path} `)
    } else {
      addLog("Error setting folder")
    }
  };

  const handleSetupWebcam = async () => {
    addLog("Requesting Camera Permissions...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      addLog("SUCCESS: Camera access granted.");

    } catch (err) {
      console.error(err);
      addLog("ERROR: Camera access denied or unavailable.");
    }
  };

  const handleTestCapture = async ()  => {
    addLog("TEST: Triggering Photo Capture...")
    const response = await axios("/debug/testCapture");

    const success = response.data.isTestCapture

    if(success){
      addLog("Success photo was captured..")
    }else{
      addLog(`Error : ${response.data.error}`)
    }

  };
  const handleTestPrint = async ()=>{
    addLog("TEST: Print...")
    const response = await axios("/debug/testPrint");

    const success = response.data.isPrinting
    if(success){
      addLog("Success printer job was created..")
    }else{
      addLog(`Error : ${response.data.error}`)
    }
  }

  const handleStartApp = () => {
    if (!folderPath) {
      addLog("WARNING: No folder selected.");
      return;
    }
    addLog("Launching application...");
    setTimeout(() => {
      addLog("Starting Program......")
      navigate("/StartScreen");
    }, 200);
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setServerLogs((prev) => [`[${timestamp}] ${msg}`, ...prev]);
  };

  return (
    <div className="home-container setup-screen">

      <header className="setup-header">
        <h2>System Initialization</h2>
        <div className="connection-indicator">
          <span className="label">LINK:</span>
          <div className={`status-light ${isConnected ? "on" : "off"}`}></div>
        </div>
      </header>

      <section className="control-group">

        {/* Connection */}
        <div className="row">
          <button className="flex-btn" onClick={handleConnect} disabled={isConnected}>
            {isConnected ? "Connected" : "Connect to Host"}
          </button>

          <button className="flex-btn" onClick={handleCheckStatus} disabled={!isConnected}>
            Get Status
          </button>
        </div>

        <div className="row folder-row">
          <button disabled={folderPath == null ? true : false} className="flex-btn" onClick={() => {
            handleSetFolder(folderPath);
          }}>Set Target Folder</button>
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

        {/* Hardware Tests */}
        <div className="row">
          <button className="flex-btn" onClick={handleTestCapture}>Test Capture</button>
          <button className="flex-btn" onClick={handleTestPrint}>Test Print</button>
        </div>

      </section>


      <div className="start-action-area">
        {/* Added check: Button disabled if no connection */}
        <button className="start-app-btn" onClick={handleStartApp} disabled={!isConnected}>
          Start Application
        </button>
      </div>

      {/* System Log & Start Button */}
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