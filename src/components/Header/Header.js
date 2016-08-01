import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import Row from 'react-bootstrap/lib/Row';
import { Link } from 'react-router';

const mapStateToProps = (state) => ({ username: state.auth.username });

class Header extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.handleLogout();
  }

  render() {
    const { username } = this.props;
    const login = !username?'SignIn':'SignOut';
    return (
      <div>
        <Row>
          <div className="col-25 header-left">
            <label className="logo">ICC Referral</label>
          </div>
          <div className="col-75 header-right">
            Welcome to ICC referral page <strong>{ username || 'Anonymous'} | </strong>
            <a href="#" onClick={this.onLogoutClick}>{ login }</a>
          </div>
        </Row>
      </div>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string
};

export default connect(mapStateToProps)(Header);
