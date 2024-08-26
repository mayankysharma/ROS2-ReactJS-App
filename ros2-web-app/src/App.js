import React, { useState, useEffect } from 'react';
import './App.css';
import mapImg from './map.png';
import mapNavImg from './mapnav.png';
import remoteControlImg from './remote-control.png';
import settingsImg from './settings.png'; // Import the new icon

function App() {
  const [videoSrc, setVideoSrc] = useState(null);

  const runCommand = (command) => {
    fetch(`http://localhost:8000/ros2/${command}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    // Fetch the video stream URL from the backend or set it to a default URL
    setVideoSrc('http://localhost:8000/video-feed'); // Replace with your actual video feed URL
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ROBOTICS</h1>
      
      </header>
      <div className="button-grid">
        <div className="button-wrapper">
          <img src={remoteControlImg} alt="Remote Control" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('remote')}>Remote Mode</button>
        </div>
        <div className="button-wrapper">
          <img src={settingsImg} alt="Create Map" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('create_map')}>Create Map</button>
        </div>
        <div className="button-wrapper">
          <img src={mapNavImg} alt="SLAM + NAV" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('slam_nav')}>SLAM + NAV</button>
        </div>
        <div className="button-wrapper">
          <img src={mapImg} alt="MAP + NAV" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('map_nav')}>MAP + NAV</button>
        </div>
      </div>
      <div className="camera-feed">
        {videoSrc ? (
          <video src={videoSrc} autoPlay controls width="320" height="240" />
        ) : (
          <p>Loading camera feed...</p>
        )}
      </div>
    </div>
  );
}

export default App;
