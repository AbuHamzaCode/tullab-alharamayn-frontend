import { USERS } from "../config/constants";
import { instance } from "../config/xhr.";
const authToken = "sddsada";

export const getUsers = async () => {
    const response = await instance.get(USERS);
    return response.data;
};

export const createUser = async (body) => {
    const response = await instance.post(`${USERS}/create`, body, {
        headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the 'Authorization' header
        },
    });
    return response.data;
};