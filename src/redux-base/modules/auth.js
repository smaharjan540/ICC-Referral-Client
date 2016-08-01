import axios from 'axios';

// --------------------------- Action constants --------------------------
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

// --------------------------- Reducer function --------------------------
const initialState = {
  username: null,
  userId: null,
  role: null,
  loggingIn: false,
  loginError: null
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
    console.log("LOGIN Reducer...");
      return {
        ...state,
        loggingIn: true
      };

    case LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS Reducer...");
      console.log(action);
      return {
        ...state,
        loggingIn: true,
        username: action.result.data.username,
        userId: action.result.data.id,
        role: action.result.data.role
      };

    case LOGIN_FAIL:
      console.log(action);
      console.log("LOGIN_FAIL Reducer...");
      return {
        ...state,
        loggingIn: false,
        username: null,
        userId: null,
        role: null,
        loginError: action.error.data
      };
    case LOGOUT:
      return {
        ...state
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        username: null,
        userId: null,
        role: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingIn: false,
        username: null,
        userId: null,
        role: null
      };
    default:
      return state;
  }
}

// --------------------------- Action functions --------------------------
export function login(username, password) {
  console.log("LOGIN Action...");
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: axios
      .post('http://localhost:8080/ICC-Referral-Server/api/login', {username, password})
  };
}

export function logout(username) {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: axios
      .post('http://localhost:8080/ICC-Referral-Server/api/logout', { username })
  };
}
