import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard({ handleAdminLogout }) {
    const [userData, setUserData] = useState([]);
    const [filteredUserData, setFilteredUserData] = useState([]); // State for filtered user data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [searchCriteria, setSearchCriteria] = useState('username'); // State for selected search criteria

    useEffect(() => {
        // Fetch user data when the Dashboard component mounts
        axios
            .get('http://localhost:5000/api/users/')
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                return response.data;
            })
            .then((data) => {
                setUserData(data);
                setFilteredUserData(data); // Initialize filtered user data with all users
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const navigate = useNavigate(); // Get the navigate function from React Router

    const handleEditUser = (userId) => {
        // Redirect to the edit user page with the user's ID
        navigate(`/update/${userId}`);
    };

    const handleDeleteUser = async (userId) => {
        try {
            // Send a DELETE request to the backend to delete the user
            const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);

            if (response.status === 200) {
                // User deleted successfully, remove it from the state
                setUserData((prevUserData) => prevUserData.filter((user) => user._id !== userId));
                setFilteredUserData((prevUserData) => prevUserData.filter((user) => user._id !== userId));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to handle search query changes
    const handleSearchQueryChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter the user data based on the selected search criteria
        const filteredUsers = userData.filter((user) =>
            user[searchCriteria].toLowerCase().includes(query)
        );
        setFilteredUserData(filteredUsers);
    };

    // Function to handle changes in the search criteria
    const handleSearchCriteriaChange = (criteria) => {
        setSearchCriteria(criteria);

        // Re-filter the user data based on the selected criteria and the existing search query
        const filteredUsers = userData.filter((user) =>
            user[criteria].toLowerCase().includes(searchQuery)
        );
        setFilteredUserData(filteredUsers);
    };
    // Function to clear the search query
    const clearSearchQuery = () => {
        setSearchQuery('');
        // Reset the filtered user data to all users
        setFilteredUserData(userData);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="btn-group-vertical">
                        <button className="btn btn-danger btn-block mb-3" onClick={handleAdminLogout}>
                            Logout
                        </button>
                        <Link to="/create" className="btn btn-success btn-block mb-3">
                            Add New User
                        </Link>
                        <Link to="/read" className="btn btn-info btn-block mb-3">
                            Read Users in Detailed View
                        </Link>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="mb-4">Admin Dashboard</h1>

                    {loading && <div>Loading user data...</div>}
                    {error && <div className="alert alert-danger">Error: {error.message}</div>}
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control search-bar"
                                placeholder={`Search by ${searchCriteria}`}
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                            {searchQuery && (
                                <div className="input-group-append">
                                    <button className="btn clear-button" type="button" onClick={clearSearchQuery}>
                                        clear
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <p><strong>Select how to search</strong></p>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="usernameRadio"
                            name="searchCriteria"
                            value="username"
                            checked={searchCriteria === 'username'}
                            onChange={() => handleSearchCriteriaChange('username')}
                        />
                        <label className="form-check-label" htmlFor="usernameRadio">
                            Username
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="emailRadio"
                            name="searchCriteria"
                            value="email"
                            checked={searchCriteria === 'email'}
                            onChange={() => handleSearchCriteriaChange('email')}
                        />
                        <label className="form-check-label" htmlFor="emailRadio">
                            Email
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="phoneRadio"
                            name="searchCriteria"
                            value="phone_number"
                            checked={searchCriteria === 'phone_number'}
                            onChange={() => handleSearchCriteriaChange('phone_number')}
                        />
                        <label className="form-check-label" htmlFor="phoneRadio">
                            Phone Number
                        </label>
                   
                    </div>

                    {filteredUserData.length > 0 ? (
                        <div>
                            <h2>User Information:</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUserData.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone_number}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleEditUser(user._id)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No user data available.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
