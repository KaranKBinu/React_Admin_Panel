import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReadUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/');

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelected = (user) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Users List</h2>
            {loading && <div className="text-center">Loading users...</div>}
            {error && <div className="text-center text-danger">Error: {error.message}</div>}
            <div className="col-md-4 ml-lg">
                <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            </div>
            <ul className="list-group mt-3">
                {users.map((user) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={user._id}>
                        {user.username}
                        <button className="btn btn-primary" onClick={() => handleUserSelected(user)}>View Details</button>
                    </li>
                ))}
            </ul>
            
            {selectedUser && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">User Details</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Username:</strong> {selectedUser.username}</p>
                                <p><strong>Password:</strong> {selectedUser.password}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Phone Number:</strong> {selectedUser.phone_number}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReadUsers;
