import { combineReducers } from 'redux';
import user from './user';
import myReducer from './myReducer';
import wallet from './wallet';

const rootReducer = combineReducers({
  user,
  wallet,
  myReducer,
});

export default rootReducer;
