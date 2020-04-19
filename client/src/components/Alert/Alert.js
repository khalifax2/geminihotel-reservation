import React from "react";
import { connect } from "react-redux";

import { Alert } from "react-bootstrap";

const NotifAlert = ({ errors }) => {
  return (
    <>
      {errors.length > 0 &&
        errors !== null &&
        errors.map(err => (
          <Alert key={err.id} variant="danger">
            {err.message}
          </Alert>
        ))}
    </>
  );
};

const mapStateToProps = state => ({
  errors: state.alert
});

export default connect(mapStateToProps)(NotifAlert);
