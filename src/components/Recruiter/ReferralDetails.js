import React, { PropTypes, Component } from 'react/addons';
import * as ReferralActions from 'redux-base/modules/referralReducer';
import Row from 'react-bootstrap/lib/Row';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import reactMixin from 'react-mixin';

@connect((state, props) => {
  if (props.params && props.params.id && state.referralReducer && state.referralReducer.items){
    let referral = state.referralReducer.items.filter(c => c.id == props.params.id);
    if (referral.length == 1)
      return {
        referral : referral[0],
        userId: state.auth.userId
      };
  }
  return {
    referral : {},
    userId: state.auth.userId
  };
})

@reactMixin.decorate(React.addons.LinkedStateMixin)

export default class ReferralDetails extends Component {

  initialState = {
    notification:null
  };

  constructor(props, context) {
    super(props, context);
    this.actions = bindActionCreators(ReferralActions, this.props.dispatch);
    this.state = this.props.referral;
    this.state = this.initialState;
  }

  componentWillMount() {
     this.actions.loadRecruiterReferrals(this.props.userId);
  }

  onSendNotification() {
    this.props.referral.notification = this.state.notification;
    this.actions.requestUpdate(this.props.referral);
  }



  render() {
    const referral = this.props.referral ? this.props.referral : {};
    const resumeurl = referral.resumefile ? 'http://localhost:8080/EnterpriseArchitecture/resources/'.concat(referral.resumefile):'';
    const notificationOptions = ['Looks good, will follow up', 'No current openings, will follow up once something comes available','Not selected, please notify your referral','Moving Forward', 'Remind Me', 'Associate Program'];
    return (
        <div className="container">
            <ul className="nav nav-tabs" role="referralTab">
              <li className="active">
                <a href="#first" role="tab" data-toggle="tab">
                  <icon className="fa fa-user"></icon>{this.props.referral.name}
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active in">
                <div className="panel panel-default">
                    <Row>
                        <div className="col-20">
                            <label className="label-class">Candidate Names:</label>
                        </div>
                        <div className="col-30">
                            <label className="label-display">{referral.name}</label>
                        </div>
                        <div className="col-10">
                            &nbsp;
                        </div>
                        <div className="col-10">
                            <label className="label-class">Referred By:</label>
                        </div>
                        <div className="col-30">
                            <label className="label-display">{referral.user.firstname} {referral.user.lastname}</label>
                        </div>
                    </Row>
                    <Row>
                         <div className="col-20">
                             <label className="label-class">Skills/Technologies:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.skill}</label>
                         </div>
                    </Row>
                    <Row>
                           <div className="col-20">
                               <label className="label-class">Connection:</label>
                           </div>
                           <div className="col-15">
                               <label className="label-display">{referral.connection}</label>
                           </div>
                           <div className="col-5">
                               &nbsp;
                           </div>
                           <div className="col-10">
                               <label className="label-class">Status:</label>
                           </div>
                           <div className="col-30">
                               <label className="label-display">{referral.status}</label>
                           </div>
                    </Row>
                    {referral.extra && <Row>
                         <div className="col-20">
                             <label className="label-class">Note:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.extra}</label>
                         </div>
                    </Row>}
                    {referral.resumefile && <Row>
                         <div className="col-20">
                             <label className="label-class">Resume:</label>
                         </div>
                         <div className="col-35">
                             <label className="label-display">
                                <a href={resumeurl} target="_blank">{referral.resumefile}</a>
                             </label>
                         </div>
                    </Row>}
                    {referral.email && <Row>
                         <div className="col-20">
                             <label className="label-class">Email:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.email}</label>
                         </div>
                    </Row>}
                    {referral.phone && <Row>
                         <div className="col-20">
                             <label className="label-class">Phone:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.phone}</label>
                         </div>
                    </Row>}
                    {referral.linkedin && <Row>
                         <div className="col-20">
                             <label className="label-class">LinkedIn:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.linkedin}</label>
                         </div>
                    </Row>}
                    {referral.github && <Row>
                         <div className="col-20">
                             <label className="label-class">Github:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.github}</label>
                         </div>
                    </Row>}
                    {referral.twitter && <Row>
                         <div className="col-20">
                             <label className="label-class">Twitter:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.twitter}</label>
                         </div>
                    </Row>}
                    {referral.other && <Row>
                         <div className="col-20">
                             <label className="label-class">Other:</label>
                         </div>
                         <div className="col-50">
                             <label className="label-display">{referral.other}</label>
                         </div>
                    </Row>}
                    <Row>
                         <div className="col-20">
                             <label className="label-class">Select notification option:</label>
                         </div>
                         <div className="col-50">
                             <DropdownList className="form-control" id="notification" valueLink={this.linkState('notification')} defaultValue={notificationOptions[0]} data={notificationOptions}/>
                         </div>
                         <div className="col-30">
                            <button className='btn btn-large btn-info' type="submit" onClick={::this.onSendNotification}>
                                Send Notification
                            </button>
                         </div>
                    </Row>
                </div>
              </div>
            </div>
        </div>
    );
  }
}
