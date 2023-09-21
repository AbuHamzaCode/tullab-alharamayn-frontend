
import axios from 'axios';


export const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
});


export const authToken = token => {
    return {
        headers: {
            Accept: `application/json`,
            Authorization: `Bearer ${token}`,
        }
    };
};