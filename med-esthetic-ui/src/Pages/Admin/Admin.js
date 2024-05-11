import React, { useState, useEffect } from 'react';
import './Admin.css';
import AdminSidebar from "../../Components/AdminProfile/AdminSidebar";
import { useParams } from "react-router-dom";
import UsersList from "../../Components/AdminProfile/UsersList";
import { fetchAllUsers } from '../../Components/services/userService';
import AdminTab from "../../Components/AdminProfile/AdminTab";

const Admin = () => {
    const { activepage } = useParams()
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await fetchAllUsers();
            setUsers(data);
            setFilteredUsers(data); // Initialize filteredUsers with all users
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(users); // Reset filteredUsers to all users if search query is empty
            return;
        }

        const filtered = users.filter(user =>
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered); // Update filteredUsers with search results
        // console.log(filteredUsers);
    };


    const handleChange = (event) => {
        setSearchQuery(event.target.value);
        // If  query cleared refresh the user list
        if (event.target.value.trim() === '') {
            setFilteredUsers(users);
        }
    };


    return (
        <div className="adminprofile">
            <div className="adminprofilein">
                <div className="left">
                    <AdminSidebar activepage={activepage} />
                </div>
                <div className="right">
                    {activepage === "admintab" && <AdminTab/>}
                    {/* Pass users data to UsersList component */}
                    {activepage === "userslist" && <UsersList users={filteredUsers}
                                                              searchQuery={searchQuery}
                                                              handleSearch={handleSearch}
                                                              handleChange={handleChange} />}
                    {/*{activepage === "" && }*/}
                </div>
            </div>
        </div>
    );
};

export default Admin;
