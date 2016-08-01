import React from 'react';
import { Route, Redirect } from 'react-router';
import Register from './components/Register';
import RecruiterReferralQueue from './components/Recruiter/ReferralQueue';
import RecruiterReferralDetails from './components/Recruiter/ReferralDetails';
import ReferralQueue from './components/Referral/ReferralQueue';
import ReferralDetails from './components/Referral/ReferralDetails';
import ReferralForm from './components/Referral/ReferralForm';
import CoreLayout from './containers/CoreLayout';
import LoginPage from './components/LoginPage/LoginPage';

export default (store) => {
  const requireLogin = (nextState, replace) => {
    const { auth: { username } } = store.getState();
    if (!username) {
      replace({ pathname: '/login' });
    }
  };
  console.log("login......"+requireLogin);
  const roleConsultant = (nextState, replace) => {
    const { auth: { username } } = store.getState();
    console.log(username);
    if (!username) {
      replace({ pathname: '/login' });
    }
  };

  return (
    <Route component={CoreLayout}>
        <Route path="login" component={LoginPage} />
        <Route path="register" component={Register} />
        <Route onEnter={requireLogin}>
            <Route path="referralqueue" component={ReferralQueue} />
            <Route path="recruiter/referralqueue" component={RecruiterReferralQueue} />
            <Route path="recruiter/referralqueue/:id" component={RecruiterReferralDetails} />
            <Route path="referralqueue/:id" component={ReferralDetails} />
            <Route path="referralform" component={ReferralForm} />
        </Route>
        <Redirect from="/" to="/login" />
    </Route>
	);
};
