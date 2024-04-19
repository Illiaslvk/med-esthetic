import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import "./AdminProfile.css";
import { request } from "../../Pages/api/axios_helper";

const UsersList = ({ users, searchQuery, handleSearch, handleChange }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        setUserList(users);
    }, [users]);

    const handleDetailsClick = (user) => {
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
    };

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const response = await request('PUT', `/admin/${userId}/role`, { role: newRole });
            if (response.status === 200) {
                console.log(`User with ID ${userId} role updated successfully`);
                fetchUserList(); // Refresh the user list after updating the role
                handleClosePopup();
            } else {
                console.error('Failed to update user role');
            }
        } catch (error) {
            console.error('Error updating user role:', error.message);
        }
    };


    const handleDeleteUser = async (userId) => {
        try {
            const response = await request('DELETE', `/admin/delete/${userId}`)
            if (response.status === 200) {
                console.log(`User with ID ${userId} deleted successfully`);
                fetchUserList();
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    const fetchUserList = async () => {
        try {
            const response = await request('GET', '/admin/users');
            if (response.status === 200) {
                setUserList(response.data);
            } else {
                console.error('Failed to fetch user list');
            }
        } catch (error) {
            console.error('Error fetching user list:', error.message);
        }
    };

    return (
        <div className='users-list'>
            <h1 className='main-heading'>Users List</h1>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search by name...'
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="table-container">
                <table className='user-table'>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName }</td>
                            <td>{user.email}</td>
                            <td>
                                <button className='details-button' onClick={() => handleDetailsClick(user)}>Details</button>
                                <button className='delete-button' onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <Popup
                    user={selectedUser}
                    onClose={handleClosePopup}
                    onUpdateRole={(userId, newRole) => handleUpdateRole(userId, newRole)}
                />
            )}
        </div>
    );
};

export default UsersList;
