export const LOGIN = 'USER_LOGIN';

export const getLogin = (email) => ({
  type: LOGIN,
  email,
});
