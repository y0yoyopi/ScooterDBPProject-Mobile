import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

//const API_URL = 'http://localhost:8080';
//const API_URL = 'http://10.100.224.45:8080';
const API_URL = 'http://192.168.0.101:8080';


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
    try {
    const response = await axios.post(`${API_URL}/api/auth/register`, { ...body });
    return response.data;
    }
    catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getProfile = async () => {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const fetchListTours = async () => {
    try {
        const token = await SecureStore.getItemAsync('token'); // Retrieve token securely
        const response = await axios.get(`${API_URL}/api/auth/tours`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }

        });
        return response.data.content;
    }
    catch (error) {
        throw error;
    }
};

export const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    // Remove token securely
};