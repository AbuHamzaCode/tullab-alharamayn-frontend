import { LESSON } from "../config/constants";
import { authToken, instance } from "../config/xhr";


export const lessonCreate = async (body, token) => {
    return await instance.post(`${LESSON}/create`, body, authToken(token));
};
export const postLessonFileUpload = async (body, token) => {
    return await instance.post(`${LESSON}/file-upload`, body, authToken(token));
};
