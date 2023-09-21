import { COMMON_VALIDATION_ERROR, COMMON_ERROR, COMMON_REQUEST, COMMON_SUCCESS, LOGIN, USER_DATA } from "./constants";

export const loginAction = (body) => ({
    type: LOGIN,
    body
});

export const userDataAction = (data) => ({
    type: USER_DATA,
    data
});

export const commonRequestAction = (data) => ({
    type: COMMON_REQUEST,
    data
});

export const commonErrorAction = (errorData) => ({
    type: COMMON_ERROR,
    errorData
});

export const commonSuccessAction = (successData) => ({
    type: COMMON_SUCCESS,
    successData
});

export const commonValidationErrorAction = (errorData) => ({
    type: COMMON_VALIDATION_ERROR,
    errorData
});