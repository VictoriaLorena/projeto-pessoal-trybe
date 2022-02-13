import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default user;
