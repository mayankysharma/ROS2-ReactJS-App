import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import './App.css';
import remoteControlImg from './remote-control.png';
import settingsImg from './settings.png';
import mapNavImg from './mapnav.png';
import mapImg from './map.png';

function App() {
  const [connected, setConnected] = useState(false);
  const [ros, setRos] = useState(null);

  useEffect(() => {
    const newRos = new ROSLIB.Ros({
      url: 'ws://localhost:9090'
    });

    newRos.on('connection', () => {
      console.log('Connected to websocket server.');
      setConnected(true);
    });

    newRos.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      setConnected(false);
    });

    newRos.on('close', () => {
      console.log('Connection to websocket server closed.');
      setConnected(false);
    });

    setRos(newRos);

    window.addEventListener('beforeunload', stopSlamNav);

    return () => {
      if (newRos) {
        newRos.close();
      }
      window.removeEventListener('beforeunload', stopSlamNav);
    };
  }, []);

  const runCommand = (command) => {
    fetch(`http://localhost:3001/${command}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error:', error));
  };

  const stopSlamNav = () => {
    fetch('http://localhost:3001/stop-slam-nav', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error stopping node:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>KICK ROBOTICS</h1>
        <p className="sub-title">UI App for AirqBot</p>
        <p className="connection-status">
          Connection status: {connected ? 'Connected' : 'Disconnected'}
        </p>
      </header>
      <div className="button-grid">
        <div className="button-wrapper">
          <img src={remoteControlImg} alt="Remote Control" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('run-remote-mode')}>Remote Mode</button>
        </div>
        <div className="button-wrapper">
          <img src={settingsImg} alt="Create Map" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('run-create-map')}>Create Map</button>
        </div>
        <div className="button-wrapper">
          <img src={mapNavImg} alt="SLAM + NAV" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('run-slam-nav')}>SLAM + NAV</button>
        </div>
        <div className="button-wrapper">
          <img src={mapImg} alt="MAP + NAV" className="button-icon" />
          <button className="robot-button" onClick={() => runCommand('run-map-nav')}>MAP + NAV</button>
        </div>
      </div>
    </div>
  );
}

export default App;