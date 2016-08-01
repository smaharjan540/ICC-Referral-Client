import React, { Component, PropTypes } from 'react';
import { Header, SmartLink } from '../components';
import '../styles/main.scss';
import Row from 'react-bootstrap/lib/Row';
import { connect } from 'react-redux';

@connect(state => ({
  role: state.auth.role,
  username: state.auth.username
}))

export default class CoreLayout extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const { role, username } = this.props;

    return (
      <div className="mainWrapper">
        <div className="header">
          <Header />
        </div>
        <Row>
          <div className="col-25">
            <div className="sidebar-wrapper">
              <ul className="sidebar-nav nav-pills nav-stacked">
              <SmartLink url="/dashboard" title="Dashboard" />
              { username && role==='CONSULTANT' &&
                (<SmartLink url="/referralform" title="Referral Submission Form" />)
              }
              { username && role==='CONSULTANT' &&
                <SmartLink url="/referralqueue" title="Referral Queue" />
              }
              { username && role==='RECRUITER' &&
                <SmartLink url="/recruiter/referralqueue" title="Referral Queue" />
              }
              </ul>
            </div>
          </div>
          <div className="col-1">
            &nbsp;
          </div>
          <div className="col-74">
            {this.props.children}
          </div>
        </Row>
        <div className="footer">
          <Row>
            <div className="col-25">
              &nbsp;
            </div>
            <div className="col-75">
              <label>@ICC Referral</label>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
