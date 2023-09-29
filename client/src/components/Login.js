import React from 'react';
import './Login.css';
function Login({
    adminUsername,
    adminPassword,
    adminError,
    handleAdminLogin,
    setAdminUsername,
    setAdminPassword,
}) {
    return (
        <div className="login-container">
            <h1>Admin Login</h1>
            <div>
                <input
                    type="text"
                    placeholder="Admin Username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                />
            </div>
            <button onClick={handleAdminLogin}>Login</button>
            {adminError && <div className="error">{adminError}</div>}
        </div>
    );
}

export default Login;
