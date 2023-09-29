import React, { useState } from 'react';
import './CreateUser.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function CreateUser({ onUserCreated }) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        phone_number: '',
        email: '',
    });

    const [message, setMessage] = useState(''); // To display success or error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { username, password, phone_number, email } = userData;

        // Simple form validation logic
        if (!username || !password || !phone_number || !email) {
            setMessage('All fields are required.');
            return false;
        }

        if (phone_number.length !== 10 || !/^\d+$/.test(phone_number)) {
            setMessage('Phone number must be a 10-digit number.');
            return false;
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            setMessage('Invalid email address.');
            return false;
        }

        // Validate password length
        if (password.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            return false;
        }

        setMessage(''); // Clear any previous error message
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return; // Don't submit if the form is invalid
        }

        // Send a POST request to create a new user
        axios.post('http://localhost:5000/api/users/', userData)
            .then((response) => {
                if (response.status === 201) {
                    onUserCreated(response.data);
                    setMessage('User created successfully.');
                    // Clear the form after successful creation
                    setUserData({
                        username: '',
                        password: '',
                        phone_number: '',
                        email: '',
                    });
                }
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                setMessage('User created sucessfully. Please go and check.');
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 ml-lg">
                    <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
                </div>
                <div className="col-md-6">
                    <div className="create-user-container">
                        <h2>Create User</h2>
                        {message && <p className="message error">{message}</p>}
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={userData.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
