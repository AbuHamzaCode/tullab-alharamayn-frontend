import { GET_LESSONS, LESSON_FILE_UPLOAD } from "./constants";


export const getLessonsAction = (data) => ({
    type: GET_LESSONS,
    data
});

export const lessonFileUploadAction = (body, callback, token) => ({
    type: LESSON_FILE_UPLOAD,
    body,
    callback,
    token
});