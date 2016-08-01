import { combineReducers } from 'redux';

import auth from './auth';
import referralReducer from './referralReducer';
import userReducer from './userReducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import loginFormPlugin from 'components/LoginPage/loginForm/loginFormPlugin';

import multireducer from 'multireducer';

export default combineReducers({
  routing: routerReducer,
  auth,
  form: formReducer.plugin(loginFormPlugin),
  referralReducer,
  userReducer
});
