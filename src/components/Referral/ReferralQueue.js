import React, { Component } from 'react/addons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReferralActions from 'redux-base/modules/referralReducer';
import { fetchReferrals, load } from 'redux-base/modules/referralReducer';
import Row from 'react-bootstrap/lib/Row';

import { Link } from 'react-router';
import Griddle from 'griddle-react';
import ViewLink from './ViewLink';

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
      displayName: 'Submission Status',
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
      columnName: 'createdate',
      displayName: 'Submission Date',
      locked: false,
      visible: true
    },
    {
      columnName: 'id',
      displayName: 'View',
      locked: false,
      visible: true,
      customComponent: ViewLink
    },
  ];

  constructor(props, context) {
    super(props, context);
    this.actions = bindActionCreators(ReferralActions, this.props.dispatch);
  }

  componentWillMount() {
    this.actions.load(this.props.userId);
  }



  applySearch(query) {
    const queryLowerCase = query.trim().toLowerCase();
    const items = this.props.referrals;
    const filterParam = function (param){
        if (typeof(param) !== 'undefined' && param !== null){
            return param.toString().toLowerCase();
        }
        return '';
    }
    let result = items;

    if (queryLowerCase) {
      result = items.filter(c => {
        return (filterParam(c.name).includes(queryLowerCase) || filterParam(c.skill).includes(queryLowerCase))
      });
    }

    return result;
  }

  render() {
    const { searchTerm } = this.props;
    const filteredItems = this.applySearch(searchTerm);

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
                        <Griddle resultsPerPage={10} showFilter={true} useGriddleStyles={true} previousText="<< Previous" nextText='Next >>' results={filteredItems} columns={['name', 'skill', 'status', 'createdate', 'id']} columnMetadata={this.columnMeta}/>
                      </section>
                  </Row>
              </div>
           </div>
          </div>
      </div>
    );
  }
}
