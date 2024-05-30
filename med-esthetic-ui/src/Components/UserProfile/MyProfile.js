import React, { useState, useEffect } from 'react';
import { request } from "../../Pages/api/axios_helper";
import './MyProfile.css';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        remindersEnabled: false
    });

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await request('GET', '/user/me');
            if (response.status === 200) {
                setUser(response.data);
                setEditedUser({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    remindersEnabled: response.data.remindersEnabled
                });
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const handleToggle = async () => {
        const updatedUser = { ...editedUser, remindersEnabled: !editedUser.remindersEnabled };
        try {
            const response = await request('PUT', `/email/${user.id}/reminders`, { remindersEnabled: updatedUser.remindersEnabled });
            if (response.status === 200) {
                // Update state with the new reminder preference
                setEditedUser(updatedUser);
            } else {
                console.error('Failed to update reminder preference');
            }
        } catch (error) {
            console.error('Error updating reminder preference:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('PUT', `/updateUserById/${user.id}`, {
                id: user.id,
                ...editedUser
            });
            if (response.status === 200) {
                console.log('User details updated successfully');
                fetchUserDetails();
            } else {
                console.error('Failed to update user details');
            }
        } catch (error) {
            console.error('Error updating user details:', error.message);
        }
    };


    return (
        <div className='my-profile'>
            <h1 className='main-heading-profile'>Personal Information</h1>

            {user && (
                <form className='form-profile'>
                    <div className='form-group-profile'>
                        <label htmlFor='firstName'>First Name <span>*</span></label>
                        <input type='text' name='firstName' id='firstName' value={editedUser.firstName} onChange={handleChange} />
                    </div>

                    <div className='form-group-profile'>
                        <label htmlFor='email'>Email <span>*</span></label>
                        <input type='email' name='email' id='email' value={editedUser.email} onChange={handleChange} />
                    </div>

                    <div className='form-group-profile'>
                        <label htmlFor='lastName'>Last Name <span>*</span></label>
                        <input type='text' name='lastName' id='lastName' value={editedUser.lastName} onChange={handleChange} />
                    </div>

                    <div className='form-group-profile'>
                        <label htmlFor='remindersEnabled'>Enable Reminders</label>
                        <input type='checkbox' name='remindersEnabled' id='remindersEnabled' checked={editedUser.remindersEnabled} onChange={handleToggle}/>
                    </div>
                </form>
            )}
            <button className='main-button-profile' type='submit' onClick={handleSubmit}>Save Changes</button>
        </div>
    );
}

export default MyProfile;