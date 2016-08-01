import React, { Component } from 'react/addons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReferralActions from 'redux-base/modules/referralReducer';
import { fetchReferrals, loadRecruiterReferrals } from 'redux-base/modules/referralReducer';
import Row from 'react-bootstrap/lib/Row';

import { Link } from 'react-router';
import Griddle from 'griddle-react';
import ReviewLink from './ReviewLink';
import RequestUpdate from './RequestUpdate';

@connect(state => ({
  referrals: state.referralReducer.items,
  searchTerm: state.referralReducer.searchReferralTerm,
  userId: state.auth.userId
}))

export default class ReferralQueue extends Component {

  columnMeta = [
    {
      columnName: 'name',
      displayName: 'Candidate Name',
      locked: false,
      visible: true
    },
    {
      columnName: 'status',
      displayName: 'Status',
      locked: false,
      visible: true
    },
    {
      columnName: 'skill',
      displayName: 'Skills/Technologies',
      locked: false,
      visible: true
    },
    {
      columnName: 'requestupdate',
      displayName: '',
      locked: true,
      visible: true,
      customComponent: RequestUpdate
    },
    {
      columnName: 'timestamp',
      displayName: 'Submission Timestamp',
      locked: false,
      visible: true
    },
    {
      columnName: 'id',
      displayName: 'Review',
      locked: true,
      visible: true,
      customComponent: ReviewLink,
    },
    {
      columnName: 'referredby',
      displayName: 'Referred By:',
      locked: false,
      visible: true
    }
  ];

  constructor(props, context) {
    super(props, context);
    this.actions = bindActionCreators(ReferralActions, this.props.dispatch);
  }

  componentWillMount() {
    this.actions.loadRecruiterReferrals(this.props.userId);
  }

  render() {
    const { searchTerm } = this.props;
    const filteredItems = [];
    if(this.props.referrals){
        for (const referral of this.props.referrals) {
          filteredItems.push(
            Object.assign({}, referral, {requestupdate: referral})
          );
        }
    }
    return (
        <div className="container">
          <ul className="nav nav-tabs" role="tabmyprofile">
            <li className="active">
              <a href="#first" role="tab" data-toggle="tab">
                <icon className="fa fa-user"></icon>Referral Queue
              </a>
            </li>
          </ul>
          <div className="tab-content">
           <div className="tab-pane fade active in" id="first">
              <div className="panel panel-default">
                  <Row>
                      <section className="main">
                        <Griddle resultsPerPage={10} showFilter={true} useGriddleStyles={true} previousText="<< Previous" nextText='Next >>' results={filteredItems} columns={['id', 'name', 'status', 'skill', 'requestupdate','timestamp', 'referredby']} showSettings={false} columnMetadata={this.columnMeta}/>
                      </section>
                  </Row>
              </div>
           </div>
          </div>
      </div>
    );
  }
}
