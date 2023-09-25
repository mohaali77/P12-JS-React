import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export async function getData(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}`);
        return response.data
    } catch (error) {
    }
}

export async function getDataActivity(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}/activity`);
        return response.data
    } catch (error) {
    }
}

export async function getDataSessions(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}/average-sessions`);
        return response.data
    } catch (error) {
    }
}

export async function getDataPerformance(userId) {
    try {
        const response = await axios.get(`${API_URL}user/${userId}/performance`);
        return response.data
    } catch (error) {
    }
}

