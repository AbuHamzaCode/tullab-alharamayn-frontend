import Cookies from "js-cookie";
import { COMMON_VALIDATION_ERROR, COMMON_ERROR, COMMON_REQUEST, COMMON_SUCCESS, LOGIN, USER_DATA, LOGOUT_SUCCESS } from "./constants";
import storage from 'redux-persist/lib/storage';


const initialState = {
    common_error: null,
    common_success: null,
    common_validation_error: null,
    common_requesting: false,
    user: false,
    isLogged: false,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        /** 
         * @param COMMON_ERROR - usage for snackbar when post request given error
         */
        case COMMON_ERROR:
            return { ...state, common_error: action.data };


        /** 
        * @param COMMON_SUCCESS - usage for snackbar when post request given success
        */
        case COMMON_SUCCESS:
            return { ...state, common_success: action.data };


        /** 
        * @param COMMON_VALIDATION_ERROR - usage for form validation error which one sended from api
        */
        case COMMON_VALIDATION_ERROR:
            return { ...state, common_validation_error: action.data };


        /** 
        * @param COMMON_REQUEST - usage for set new state - to request controlling state
        */
        case COMMON_REQUEST:
            return { ...state, common_requesting: action.data };
        case LOGIN:
            return {
                ...state,
                common_requesting: true,
            };
        case LOGOUT_SUCCESS:
            storage.removeItem('persist:tullab');
            Cookies.remove('twj');
            return {
                ...state,
                ...initialState,
            };
        case USER_DATA:
            return {
                ...state,
                user: action.data,
                isLogged: action.data.username,
            };
        default:
            return state;
    }
};

export default mainReducer;
