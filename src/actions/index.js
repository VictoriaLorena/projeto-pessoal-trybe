import fetchApi from '../services/FETCHAPI';

export const LOGIN = 'USER_LOGIN';
export const SET_EXPENSES = 'SET_EXPENSES';

export const getLogin = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: SET_EXPENSES,
  payload: expense,
});

export const getCoins = (expense) => async (dispatch) => {
  const exchangeRates = await fetchApi();
  dispatch(addExpense({ ...expense, exchangeRates }));
};
