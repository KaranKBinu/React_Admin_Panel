import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UpdateUser({ onUpdateUser }) {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Get the user ID from the URL
    const userId = window.location.pathname.split('/').pop();

    useEffect(() => {
        if (userId) {
            // Fetch user data when the component mounts
            axios.get(`http://localhost:5000/api/users/${userId}`)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('Network response was not ok');
                    }
                    return response.data;
                })
                .then((data) => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setError(error);
                    setLoading(false);
                });
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            // Send a PUT request to update the user
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, userData)

            if (response.status === 200) {
                // User updated successfully, call the callback function to notify the parent component
                onUpdateUser(response.data);
                setSuccessMessage('User updated successfully.');
            } else {
                console.error('Failed to update user');
                setSuccessMessage('Failed to update user.');
            }
        } catch (error) {
            
            setSuccessMessage('User was updated . Go and check for confirmation');
        }
   

    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Update User</h2>
            {loading && <div className="text-center">Loading user data...</div>}
            {error && <div className="text-center text-danger">Error: {error.message}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="username"
                    placeholder="Username"
                    value={userData.username || ''}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    placeholder="Password"
                    value={userData.password || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={userData.phone_number || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    name="email"
                    placeholder="Email"
                    value={userData.email || ''}
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
            <div className="col-md-4 ml-lg">
                <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            </div>

        </div>
    );
}

export default UpdateUser;

UpdateUser.propTypes = {
    userId: PropTypes.string.isRequired,
    onUpdateUser: PropTypes.func.isRequired,
};
