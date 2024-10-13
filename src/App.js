import React, { useState } from 'react';
import './App.css';
import { ClipLoader } from 'react-spinners';

function App() {
  const [gateStatus, setGateStatus] = useState();
  const [loading, setLoading] = useState(false);

  const triggerGate = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    fetch('/api/open', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'X-API-KEY': process.env.REACT_APP_API_KEY,
      }
    })
    .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGateStatus("Gate has been triggered");
        } else {
          setGateStatus("Gate has failed to trigger");
        }
      })
      .catch(err => {
        setGateStatus("Gate has failed to trigger")
      }).finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <header className="gate-opener-container">
        <button className="gate-opener-btn" onClick={triggerGate} disabled={loading}>
          {loading ? <ClipLoader size={20} color="white" /> : 'Open/Close Gate'}
        </button>
        {
          gateStatus && <p>{gateStatus}</p>
        }
      </header>
    </div>
  );
}

export default App;
