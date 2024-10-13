import React, { useEffect, useState } from 'react';
import './App.css';
import { ClipLoader } from 'react-spinners';
import netlifyIdentity from 'netlify-identity-widget';
import { loginUser, logoutUser } from './identityActions';

function App() {
    const [gateStatus, setGateStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('currentOpenSaucedUser');
        if (user) {
            setUser(JSON.parse(user));
        } else {
            netlifyIdentity.open();
        }
        netlifyIdentity.on('login', (user) => setUser(user, loginUser()));
        netlifyIdentity.on('logout', (user) => setUser(null, logoutUser()));
    }, [user, setUser]);

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
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setGateStatus('Gate has been triggered');
                } else {
                    setGateStatus('Gate has failed to trigger');
                }
            })
            .catch((err) => {
                setGateStatus('Gate has failed to trigger');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (!user) {
        return (
            <div>
                <header className="gate-opener-container">
                    <ClipLoader size={20} color="white" />
                </header>
            </div>
        );
    }

    return (
        <div>
            <header className="gate-opener-container">
                <button
                    className="gate-opener-btn"
                    onClick={triggerGate}
                    disabled={loading}
                >
                    {loading ? (
                        <ClipLoader size={20} color="white" />
                    ) : (
                        'Open/Close Gate'
                    )}
                </button>
                {gateStatus && <p>{gateStatus}</p>}
            </header>
        </div>
    );
}

export default App;
