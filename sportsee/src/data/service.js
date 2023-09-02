//créer service de fetch/axios
// api.js

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
});

export const fetchData = async (endpoint) => {
    try {
        const response = await instance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
};
