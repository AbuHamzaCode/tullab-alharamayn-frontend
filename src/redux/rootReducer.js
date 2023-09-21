import { combineReducers } from 'redux';
import mainReducer from '../pages/redux/reducer';

const rootReducer = combineReducers({
  mainReducer,
});


export default rootReducer;