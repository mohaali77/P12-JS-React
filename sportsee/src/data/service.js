//créer service de fetch/axios
// api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export async function getData(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function getDataActivity(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}/activity`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function getDataSessions(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}/average-sessions`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function getDataPerformance(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}/performance`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

