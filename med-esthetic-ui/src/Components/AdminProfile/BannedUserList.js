import React, { useState, useEffect } from 'react';
import { request } from "../../Pages/api/axios_helper";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminProfile.css';

const BannedUserList = () => {
    const [bannedUsers, setBannedUsers] = useState([]);

    useEffect(() => {
        fetchBannedUsers();
    }, []);

    const fetchBannedUsers = async () => {
        try {
            const response = await request('GET', '/admin/bannedUsers');
            if (response.status === 200) {
                setBannedUsers(response.data);
            } else {
                console.error('Failed to fetch banned users');
            }
        } catch (error) {
            console.error('Error fetching banned users:', error.message);
        }
    };

    const handleUnbanUserClick = async (userId) => {
        try {
            const response = await request('POST', `/admin/unbanUser/${userId}`);
            if (response.status === 200) {
                toast.success('User unbanned successfully');
                fetchBannedUsers();
            } else {
                toast.error('Failed to unban user');
            }
        } catch (error) {
            console.error('Error unbanning user:', error.message);
            toast.error('Failed to unban user');
        }
    };

    return (
        <div className='banned-user-list'>
            <div className="banned-user-header-container">
                <h1 className="main-heading-banned-user">Banned User List</h1>
            </div>
            <div className="table-container">
                {bannedUsers.length > 0 ? (
                    <table className='banned-user-table'>
                        <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bannedUsers.map(bannedUser => (
                            <tr key={bannedUser.userId}>
                                <td>{bannedUser.userName}</td>
                                <td>{bannedUser.reason}</td>
                                <td>
                                    <button className="unban-user-button" onClick={() => handleUnbanUserClick(bannedUser.userId)}>
                                        UnBan
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No banned users found.</p>
                )}
            </div>
            <ToastContainer position="bottom-right" autoClose={3000}/>
        </div>
    );
}
export default BannedUserList;
