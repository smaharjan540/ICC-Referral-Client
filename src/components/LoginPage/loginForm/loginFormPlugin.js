import { LOGIN_FAIL } from 'redux-base/modules/auth';

export default {
  loginForm: (state, action) => {
    switch (action.type) {
      case LOGIN_FAIL: {
        const actionError = action.error.data;
        const invalidFields = {};

        if (actionError && actionError.validationErrors) {

          const validationErrors = actionError.validationErrors;

          for (const fieldName of Object.keys(validationErrors)) {
            invalidFields[fieldName] = { ...state[fieldName], submitError: validationErrors[fieldName] };
          }
        }

        return {
          ...state,
          ...invalidFields
        };
      }
      default:
        return state;
    }
  }
};
