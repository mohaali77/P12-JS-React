//créer service de fetch/axios
// api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/'


export async function getData(userId) {
    try {
        const { response } = await axios.get(`${API_URL}user/${userId}`);
        console.log(response);
    } catch (error) {
        throw error;
    }
};
