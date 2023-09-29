import React from 'react';
import axios from 'axios';

function DeleteUser({ user, onUserDeleted }) {
    const handleDelete = () => {
        // Send a DELETE request to delete the user
        axios.delete(`http://localhost:5000/api/users/${user._id}`)
            .then((response) => {
                if (response.status === 200) {
                    onUserDeleted(user._id);
                }
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className="delete-user-container">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete user: {user.username}?</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteUser;
