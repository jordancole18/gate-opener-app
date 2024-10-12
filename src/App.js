import React, { useState } from 'react';
import './App.css';

function App() {

  const [gateStatus, setGateStatus] = useState();

  const triggerGate = () => {
    fetch('/api/open', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'X-API-KEY': process.env.REACT_APP_API_KEY,
      }
    })
    .then(res => res.json())
      .then(data => {
        setGateStatus("Gate has been triggered");
      })
      .catch(err => {
        setGateStatus("Gate has failed to trigger")
      });
  }

  return (
    <div>
      <header className="gate-opener-container">
        <button className="gate-opener-btn" onClick={triggerGate}>Open/Close Gate</button>
        {
          gateStatus && <p>{gateStatus}</p>
        }
      </header>
    </div>
  );
}

export default App;
