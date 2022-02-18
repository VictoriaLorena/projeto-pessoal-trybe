import { SET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...payload,
        id: state.expenses.length,
      }],
    };

  default:
    return state;
  }
};
export default walletReducer;
