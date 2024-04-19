import React, { useState, useEffect } from 'react';
import './Admin.css';
import AdminSidebar from "../../Components/AdminProfile/AdminSidebar";
import { useParams } from "react-router-dom";
import UsersList from "../../Components/AdminProfile/UsersList";
import { fetchAllUsers, searchUsersByName } from '../../Components/services/userService';
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

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(users); // Reset filteredUsers to all users if search query is empty
            return;
        }

        try {
            const data = await searchUsersByName(searchQuery);
            setFilteredUsers(data); // Update filteredUsers with search results
        } catch (error) {
            console.error('Failed to search users:', error);
        }

        // console.log(filteredUsers);
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
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
