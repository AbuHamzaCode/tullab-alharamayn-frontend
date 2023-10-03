import { combineReducers } from 'redux';
import mainReducer from '../pages/redux/reducer';
import lessonReducer from "../pages/lessons/redux/reducer";

const rootReducer = combineReducers({
  mainReducer,
  lessonReducer,
});


export default rootReducer;