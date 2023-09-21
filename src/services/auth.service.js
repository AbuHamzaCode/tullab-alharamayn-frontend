import { AUTH } from "../config/constants";
import { instance } from "../config/xhr";

// export const signup = async (body) => {
//     const response = await instance.post(`${AUTH}/signup`, body);
//     return response.data;
// };

export const login = async (body) => {
    return await instance.post(`${AUTH}/login`, body);
};