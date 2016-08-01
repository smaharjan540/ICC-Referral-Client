import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { login } from 'redux-base/modules/auth';
import loginFormValidation from './loginForm/loginFormValidation';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

const mapStateToProps = (state) => ({
  user: state.auth.username,
  role: state.auth.role,
  loginError: state.auth.loginError
});

const reduxFormConfig = {
  form: 'loginForm',
  fields: ['username', 'password'],
  validate: loginFormValidation
};

class Login extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.role==='CONSULTANT') {
      browserHistory.push('/referralqueue');
    }
    if (nextProps.user && nextProps.role==='RECRUITER') {
      browserHistory.push('/recruiter/referralqueue');
    }
  }

  handleLogin(data) {
    this.props.dispatch(login(data.username, data.password));
  }

  render() {
    const styles = require('./LoginPage.scss');

    const { user, loginError, fields: { username, password }, handleSubmit } = this.props;

    const fieldClasses = (field, classes) => classnames(classes, {
      'has-error': field.error && field.touched
    });
    const errorBlock = (field) => (field.error && field.touched && <small className="help-block">{field.error}</small>);

    return (
      <div className={`container ${styles.loginPage}`}>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-5 col-sm-offset-5">
            <div className="panel panel-default panel-signin">
              <div className="panel-heading">
                <h3 className="panel-title">Please Log in</h3>
              </div>
              <form className="form-signin" onSubmit={handleSubmit(::this.handleLogin)}>

                <div className={fieldClasses(username, 'form-group')}>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"/></span>
                    { /* // will pass value, onBlur and onChange */ }
                    <input type="text" className="form-control" {...username} placeholder="Username" autoFocus/>
                  </div>
                  {errorBlock(username)}
                </div>

                <div className={fieldClasses(password, 'form-group')}>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"/></span>
                    <input type="password" className="form-control" {...password} placeholder="Password"/>
                  </div>
                  {errorBlock(password)}
                </div>

                {
                  !user && loginError &&
                  <div className="alert alert-danger">
                    {loginError.message}
                  </div>
                }

                <button className="btn btn-primary btn-block" onSubmit={handleSubmit(::this.handleLogin)}><i className="fa fa-sign-in"/>{' '}Log in</button>
              </form>
              <div className="register">
                <Link to="/register">
                    <span>Register</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.string,
  loginError: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm(reduxFormConfig, mapStateToProps)(Login);
