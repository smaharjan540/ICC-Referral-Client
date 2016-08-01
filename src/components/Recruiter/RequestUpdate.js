import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestUpdate } from 'redux-base/modules/referralReducer';

const mapStateToProps = state => ({
});

const mapActionsToProps = { requestUpdate };

export default class RequestUpdate extends Component {

  constructor(props, context) {
    super(props, context);
  }

  onRequestUpdate() {
    this.props.requestUpdate(this.props.data);
  }
  render() {
    let _class = 'btn btn-large btn-info';
    let _label = 'Request Update';
    return (
      <div>
        <button className={_class} onClick={::this.onRequestUpdate}>{_label}</button>
      </div>
    );
  }
}

RequestUpdate.propTypes = {
  requestUpdate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(RequestUpdate);
