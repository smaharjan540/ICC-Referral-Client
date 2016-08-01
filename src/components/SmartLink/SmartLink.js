import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ location: state.routing.locationBeforeTransitions });

class SmartLink extends Component {
  render() {
    const { title, url } = this.props;
    return (
      <li className="active">
          <Link to={{ pathname: url }}>
          <span>{title}</span>
        </Link>
      </li>
    );
  }
}
SmartLink.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SmartLink);
