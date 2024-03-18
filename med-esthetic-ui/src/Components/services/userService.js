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