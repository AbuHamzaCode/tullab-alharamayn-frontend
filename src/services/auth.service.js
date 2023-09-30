import { AUTH } from "../config/constants";
import { authToken, instance } from "../config/xhr";

export const login = async (body) => {
    return await instance.post(`${AUTH}/login`, body);
};

export const logout = async (token) => {
    return await instance.get(`${AUTH}/logout`, authToken(token));
};