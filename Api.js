import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

//const API_URL = 'http://localhost:8080';
const API_URL = 'http://10.100.224.45:8080';


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        await SecureStore.setItemAsync('token', response.data.token);// Store token securely
        return response.data.token;
    }
    catch (error) {
        console.error('Error during login:',
        error.response ? error.response.data : error.message);
         throw (error) 
        }
};

export const register = async (body) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, { ...body });
    return response.data;
};
/*
export const getProfile = async () => {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.get(`${API_URL}/passenger/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}
*/
export const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    // Remove token securely
};