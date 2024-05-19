import React, { useState, useEffect } from 'react';
import Popup from './Forms/Popup';
import AddUserForm from './Forms/AddUserForm';
import BanUserForm from './Forms/BanUserForm';
import "./AdminProfile.css";
import { request } from "../../Pages/api/axios_helper";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersList = ({ users, searchQuery, handleSearch, handleChange }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userList, setUserList] = useState([]);
    const [isAddUserFormVisible, setIsAddUserFormVisible] = useState(false);
    const [isBanUserFormVisible, setIsBanUserFormVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        setUserList(users);
    }, [users]);

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const response = await request('PUT', `/admin/${userId}/role`, { role: newRole });
            if (response.status === 200) {
                console.log(`User with ID ${userId} role updated successfully`);
                toast.success("Role changed successfully!");
                fetchUserList();
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

    const handleAddUserClick = () => {
        setIsAddUserFormVisible(true);
    };

    const handleCloseAddUserForm = () => {
        setIsAddUserFormVisible(false);
    };

    const handleDetailsClick = (user) => {
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
    };

    const handleBanUser = (userId) => {
        setSelectedUserId(userId);
        setIsBanUserFormVisible(true);
    };

    const handleBanUserFormClose = () => {
        setIsBanUserFormVisible(false);
        fetchUserList();
    };

    return (
        <div className='users-list'>
            <h1 className='main-heading'>Users List</h1>
            <div className='search-container'>
                <div className='search-elements'>
                    <input
                        type='text'
                        placeholder='Search by name...'
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <button onClick={handleAddUserClick}>Add User</button>
            </div>
            <div className="table-container">
                <table className='user-table'>
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className='details-button' onClick={() => handleDetailsClick(user)}>Details</button>
                                <button className='ban-button' onClick={() => handleBanUser(user.id)}>Ban</button>
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
            {isAddUserFormVisible && (
                <AddUserForm onClose={handleCloseAddUserForm} onUserAdded={fetchUserList} />
            )}
            {isBanUserFormVisible && (
                <BanUserForm onClose={handleBanUserFormClose} userId={selectedUserId} fetchUserList={fetchUserList}/>
            )}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default UsersList;