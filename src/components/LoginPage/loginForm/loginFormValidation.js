function checkEmail(value) {
  return true;
}

export default function validateLoginForm(data) {
  const errors = { };

  if (!data.username) {
    errors.username = 'Required login';
  } else if (!checkEmail(data.username)) {
    errors.username = 'Invalid email address';
  }

  if (!data.password) {
    errors.password = 'Password required';
  } else if (data.password.length < 0) {
    errors.password = 'Must be more than 5 characters';
  }

  return errors;
}
