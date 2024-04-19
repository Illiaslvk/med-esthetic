import { request } from '../../Pages/api/axios_helper';

export const fetchAllUsers = async () => {
    try {
        const response = await request('GET', '/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const searchUsersByName = async (name) => {
    try {
        const response = await request('GET', `/admin/users?name=${name}`);
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};

export const fetchMessages = async () => {
    try {
        const response = await request("GET", "/messages");
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};