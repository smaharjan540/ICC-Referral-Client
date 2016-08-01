import React, { PropTypes, Component } from 'react/addons';
import classnames from 'classnames'
import reactMixin from 'react-mixin';
import ValidationMixin from 'react-validation-mixin';
import Joi from 'joi';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ReferralActions from 'redux-base/modules/referralReducer';
import Row from 'react-bootstrap/lib/Row';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import DropdownList from 'react-widgets/lib/DropdownList';
import Dropzone from 'react-dropzone';

@connect((state, props) => {
  return {
    skillOptions: state.referralReducer.skills,
    username: state.auth.username
  };
})
@reactMixin.decorate(ValidationMixin)

@reactMixin.decorate(React.addons.LinkedStateMixin)

export default class ReferralForm extends Component {

  initialState = {
    name: null,
    skills: [],
    connection: null,
    status: null,
    extra: null,
    email: null,
    phone: null,
    linkedin: null,
    github: null,
    twitter: null,
    other: null,
    file: [],
    resumefile: null,
    username: this.props.username
  };

  constructor(props, context) {
    super(props, context);
    this.actions = bindActionCreators(ReferralActions, this.props.dispatch);

    this.validatorTypes = {
      name: Joi.string().required().label('Candidate Name'),
      skills: Joi.array().min(1).label("Skill sets")
    }
    this.state = this.initialState;
  }

    componentWillMount() {
      this.actions.loadSkills();
      //console.log(this.props.username);
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
          feedback: 'Referral submitted',
          class: 'success-label'
        });
        this.actions.addReferral(this.state);
        this.handleReset(event);
      }
    }.bind(this);
    this.validate(onValidate);
  }

  onDrop(file) {
    this.setState({
        file: file[0],
        resumefile: file[0].name
    });
    this.actions.upload(file[0]);
    console.log('Received files: ', file[0]);
  }

  onOpenClick() {
      this.refs.dropzone.open();
  }

  render() {
    const submitBtnLbl = 'Submit';
    const options = this.props.skillOptions;
    const statusOptions = ['Actively', 'Passive'];
    const connectionOptions = ['Friend', 'Coworker'];
    return (
        <div className="container">
            <ul className="nav nav-tabs" role="referralTab">
              <li className="active">
                <a href="#first" role="tab" data-toggle="tab">
                  <icon className="fa fa-user"></icon>Referral Submission Form
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active in">
                <div className="panel panel-default">
                    <form onSubmit={::this.handleSubmit} className='form-horizontal'>
                        <fieldset>
                            <Row className={this.getClasses('name')}>
                             <div className="col-20">
                               <label className="label-class">Candidate Name:</label>
                             </div>
                             <div className="col-35">
                                <input type='text' id='name' valueLink={this.linkState('name')} onBlur={this.handleValidation('name')}
                                                             disabled={this.props.isEdit} className='form-control' />
                             </div>
                             <div className="col-45">
                               {this.getValidationMessages('name').map(this.renderHelpText)}
                             </div>
                            </Row>
                            <Row className={this.getClasses('skills')}>
                               <div className="col-20">
                                 <label className="label-class">Skills/Technology:</label>
                               </div>
                               <div className="col-35">
                               <Multiselect className="form-multiselect" id='skills' valueLink={this.linkState('skills')} data={options} onBlur={this.handleValidation('skills')}
                                                                                            disabled={this.props.isEdit}/>
                               </div>
                               <div className="col-45">
                                 {this.getValidationMessages('skills').map(this.renderHelpText)}
                               </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                  <label className="label-class">Connection:</label>
                                </div>
                                <div className="col-35">
                                  <DropdownList className="form-control" defaultValue={connectionOptions[0]}  id="connection" valueLink={this.linkState('connection')} data={connectionOptions}/>
                                </div>
                                <div className="col-5">
                                  &nbsp;
                                </div>
                                <div className="col-10">
                                  <label className="label-class">Status:</label>
                                </div>
                                <div className="col-25">
                                  <DropdownList className="form-control" id="status" defaultValue={statusOptions[0]} valueLink={this.linkState('status')} data={statusOptions}/>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                    <label className="label-class">Other Information:</label>
                                </div>
                                <div className="col-75">
                                    <textarea className="form-control" id="extra" valueLink={this.linkState('extra')}></textarea>
                                </div>
                            </Row>
                            <Row>
                                 <div className="col-20">
                                   <label className="label-class">Attach Resume:</label>
                                 </div>
                                 <div>
                                    <div className="dropzone">
                                        <Dropzone ref="dropzone" onDrop={::this.onDrop}/>
                                    </div>
                                    <button className='btn btn-large btn-info' type="button" onClick={::this.onOpenClick}>
                                        Upload
                                    </button>
                                   {(typeof(this.state.file) !== 'undefined' && this.state.file !== null) ? this.state.file.name : ''}
                                 </div>
                                 <div className="col-5">
                                   &nbsp;
                                 </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                    &nbsp;
                                </div>
                                <div>
                                  <label className="label-class">Please fill the following candidate details if you don't have resume:</label>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                  <label className="label-class">Email:</label>
                                </div>
                                <div className="col-35">
                                  <input type="text" className="form-control" id="email" valueLink={this.linkState('email')} autoFocus/>
                                </div>
                                <div className="col-45">
                                  &nbsp;
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                  <label className="label-class">Phone:</label>
                                </div>
                                <div className="col-35">
                                  <input type="text" className="form-control" id="phone" valueLink={this.linkState('phone')} autoFocus/>
                                </div>
                                <div className="col-45">
                                  &nbsp;
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                  <label className="label-class">LinkedIn:</label>
                                </div>
                                <div className="col-35">
                                  <input type="text" className="form-control" id="linkedin" valueLink={this.linkState('linkedin')} autoFocus/>
                                </div>
                                <div className="col-45">
                                  &nbsp;
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                  <label className="label-class">Github:</label>
                                </div>
                                <div className="col-35">
                                  <input type="text" className="form-control" id="github" valueLink={this.linkState('github')} autoFocus/>
                                </div>
                                <div className="col-45">
                                  &nbsp;
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                  <label className="label-class">Twitter:</label>
                                </div>
                                <div className="col-35">
                                  <input type="text" className="form-control" id="twitter" valueLink={this.linkState('twitter')} autoFocus/>
                                </div>
                                <div className="col-45">
                                  &nbsp;
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">
                                  <label className="label-class">Other:</label>
                                </div>
                                <div className="col-35">
                                  <input type="text" className="form-control" id="other" valueLink={this.linkState('other')} autoFocus/>
                                </div>
                                <div className="col-45">
                                  &nbsp;
                                </div>
                            </Row>
                            <Row>
                                <div className="col-20">&nbsp;</div>
                                <div className={this.state.class}>{this.state.feedback}</div>
                            </Row>
                            <Row>
                                <div className="col-20">
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
