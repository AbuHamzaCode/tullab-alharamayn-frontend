import { GET_LESSONS } from "./constants";


const initialState = {
    lessons: false,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LESSONS:
            return {
                ...state,
                lessons: action.data,
            };
        default:
            return state;
    }
};

export default mainReducer;
