import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as ReferralActions from 'redux-base/modules/referralReducer';
import Row from 'react-bootstrap/lib/Row';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@connect((state, props) => {
  if (props.params && props.params.id && state.referralReducer && state.referralReducer.items){
    console.log(props.params.id);
    console.log(state.referralReducer.items.length);
    let referral = state.referralReducer.items.filter(c => c.id == props.params.id);
    if (referral.length == 1)
      console.log(referral[0].name);
      return {
        referral : referral[0],
        userId: state.auth.userId
      };
  }
  return {
    userId: state.auth.userId
  };
})

export default class ReferralDetails extends Component {

  constructor(props, context) {
    super(props, context);
    this.actions = bindActionCreators(ReferralActions, this.props.dispatch);
    this.state = this.props.referral;
  }

  componentWillMount() {
     this.actions.load(this.props.userId);
  }

  render() {
    const referral = this.props.referral ? this.props.referral : {};
    const resumeurl = referral.resumefile ? 'http://localhost:8080/EnterpriseArchitecture/resources/'.concat(referral.resumefile):'';
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
                            <label className="label-class">First Name:</label>
                        </div>
                        <div className="col-35">
                            <label className="label-class">{referral.name}</label>
                        </div>
                    </Row>
                    <Row>
                         <div className="col-20">
                             <label className="label-class">Skills/Technologies:</label>
                         </div>
                         <div className="col-35">
                             <label className="label-class">{referral.skill}</label>
                         </div>
                    </Row>
                    <Row>
                         <div className="col-20">
                             <label className="label-class">Resume:</label>
                         </div>
                         <div className="col-35">
                             <label className="label-class">
                                <a href={resumeurl} target="_blank">{referral.resumefile}</a>
                             </label>
                         </div>
                     </Row>
                </div>
              </div>
            </div>
        </div>
    );
  }
}
