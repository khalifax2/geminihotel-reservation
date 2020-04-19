import React from "react";
import { connect } from "react-redux";

import Login from "../Form/Login/Login";
import Signup from "../Form/Signup/Signup";

const Modal = ({ formType }) => {
  return <>{formType === "login" ? <Login /> : <Signup />}</>;
};

const mapStateToProps = state => ({
  formType: state.modal.formType
});

export default connect(mapStateToProps)(Modal);
