import React, { PropTypes, Component } from 'react/addons';
import classnames from 'classnames'
import reactMixin from 'react-mixin';
import ValidationMixin from 'react-validation-mixin';
import Joi from 'joi';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from 'redux-base/modules/userReducer';
import Row from 'react-bootstrap/lib/Row';
import 'react-widgets/dist/css/react-widgets.css';
import DropdownList from 'react-widgets/lib/DropdownList';


@connect((state, props) => {
  return {
    recruiters: state.userReducer.recruiters
  };
})
@reactMixin.decorate(ValidationMixin)

@reactMixin.decorate(React.addons.LinkedStateMixin)

export default class Register extends Component {

  initialState = {
    username: null,
    email: null,
    password: null,
    recruiter: null,
    firstname: null,
    lastname: null
  };

  constructor(props, context) {
    super(props, context);
    this.actions = bindActionCreators(UserActions, this.props.dispatch);

    this.validatorTypes = {
      username: Joi.string().required().label('Username'),
      password: Joi.string().required().label('Password'),
      email: Joi.string().required().label('Email'),
      recruiter: Joi.string().required().label('Recruiter'),
      firstname: Joi.string().required().label('Firstname'),
      lastname: Joi.string().required().label('Lastname')
    }
    this.state = this.initialState;
  }

  componentWillMount() {
    this.actions.loadRecruiters();
  }

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  getClasses(field) {
    return classnames({
      'form-group': true,
      'has-error': !this.isValid(field)
    });
  }

  handleReset(event) {
    event.preventDefault();
    this.clearValidations();
    this.setState(this.initialState);
  }

  handleSubmit(event) {
    event.preventDefault();
    var onValidate = function(error, validationErrors) {
      if (error) {
        this.setState({
          feedback: 'Failed to submit',
          class: 'fail-label'
        });
      } else {
        this.setState({
          feedback: 'Submitted',
          class: 'success-label'
        });
        this.actions.addConsultant(this.state);
        this.handleReset(event);
      }
    }.bind(this);
    this.validate(onValidate);
  }

  render() {
    const submitBtnLbl = 'Register';
    const options = this.props.recruiters;
    return (
        <div className="container">
            <ul className="nav nav-tabs" role="referralTab">
              <li className="active">
                <a href="#first" role="tab" data-toggle="tab">
                  <icon className="fa fa-user"></icon>Register
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active in">
                <div className="panel panel-default">
                    <form onSubmit={::this.handleSubmit} className='form-horizontal'>
                        <fieldset>
                            <Row>
                                <div className="col-10">
                                    &nbsp;
                                </div>
                                <div className="col-35">
                                  <label className="label-class">Select your recruiter:</label>
                                </div>
                                <div className="col-25">
                                  <DropdownList className="form-control" id="recruiter" valueLink={this.linkState('recruiter')} data={options}/>
                                </div>
                                <div className="col-30">
                                  &nbsp;
                                </div>
                            </Row>
                            <Row className={this.getClasses('firstname')}>
                                 <div className="col-10">
                                     &nbsp;
                                 </div>
                                 <div className="col-35">
                                   <label className="label-class">Firstname:</label>
                                 </div>
                                 <div className="col-25">
                                    <input type='text' id='firstname' valueLink={this.linkState('firstname')} onBlur={this.handleValidation('firstname')} className='form-control' />
                                 </div>
                                 <div className="col-30">
                                   {this.getValidationMessages('firstname').map(this.renderHelpText)}
                                 </div>
                            </Row>
                            <Row className={this.getClasses('lastname')}>
                                 <div className="col-10">
                                     &nbsp;
                                 </div>
                                 <div className="col-35">
                                   <label className="label-class">Lastname:</label>
                                 </div>
                                 <div className="col-25">
                                    <input type='text' id='lastname' valueLink={this.linkState('lastname')} onBlur={this.handleValidation('lastname')} className='form-control' />
                                 </div>
                                 <div className="col-30">
                                   {this.getValidationMessages('lastname').map(this.renderHelpText)}
                                 </div>
                            </Row>
                            <Row className={this.getClasses('username')}>
                                 <div className="col-10">
                                     &nbsp;
                                 </div>
                                 <div className="col-35">
                                   <label className="label-class">Username:</label>
                                 </div>
                                 <div className="col-25">
                                    <input type='text' id='username' valueLink={this.linkState('username')} onBlur={this.handleValidation('username')} className='form-control' />
                                 </div>
                                 <div className="col-30">
                                   {this.getValidationMessages('username').map(this.renderHelpText)}
                                 </div>
                            </Row>
                            <Row className={this.getClasses('email')}>
                                 <div className="col-10">
                                     &nbsp;
                                 </div>
                                 <div className="col-35">
                                   <label className="label-class">Email:</label>
                                 </div>
                                 <div className="col-25">
                                    <input type='text' id='email' valueLink={this.linkState('email')} onBlur={this.handleValidation('email')} className='form-control' />
                                 </div>
                                 <div className="col-30">
                                   {this.getValidationMessages('email').map(this.renderHelpText)}
                                 </div>
                            </Row>
                            <Row className={this.getClasses('password')}>
                                <div className="col-10">
                                    &nbsp;
                                </div>
                                <div className="col-35">
                                    <label className="label-class">Password:</label>
                                </div>
                                <div className="col-25">
                                    <input type='password' id='password' valueLink={this.linkState('password')} onBlur={this.handleValidation('password')} className='form-control' />
                                </div>
                                <div className="col-30">
                                    {this.getValidationMessages('password').map(this.renderHelpText)}
                                </div>
                            </Row>
                            <Row className={this.getClasses('confirmpassword')}>
                                <div className="col-10">
                                    &nbsp;
                                </div>
                                <div className="col-35">
                                    <label className="label-class">Confirm Password:</label>
                                </div>
                                <div className="col-25">
                                    <input type='password' id='confirmpassword' valueLink={this.linkState('confirmpassword')} onBlur={this.handleValidation('confirmpassword')} className='form-control' />
                                </div>
                                <div className="col-30">
                                    {this.getValidationMessages('confirmpassword').map(this.renderHelpText)}
                                </div>
                            </Row>
                            <Row>
                                <div className="col-50">&nbsp;</div>
                                <div className={this.state.class}>{this.state.feedback}</div>
                            </Row>
                            <Row>
                                <div className="col-45">
                                 &nbsp;
                                </div>
                                <div>
                                    <button type='submit' className='btn btn-large btn-primary'>{submitBtnLbl}</button>
                                    {' '}
                                    <button onClick={::this.handleReset} className='btn btn-large btn-info'>Reset</button>
                                </div>
                            </Row>
                        </fieldset>
                    </form>
                </div>
              </div>
            </div>
        </div>
    );
  }
}
