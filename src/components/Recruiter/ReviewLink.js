import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect(state => ({}))
export default class ViewLink extends Component {

  constructor(props, context) {
    super(props, context);
  }
  render() {
    const reviewLink = `/recruiter/referralqueue/${this.props.data}`;
    return (
      <div>
        <Link to={reviewLink}>Review</Link>
      </div>
    );
  }
}

