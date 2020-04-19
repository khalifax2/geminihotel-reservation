import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import Alert from "../../Alert/Alert";
import Signup from "../Signup/Signup";

import { login } from "../../../redux/actions/auth";
import {
  handleShowLogin,
  handleCloseLogin,
  formType
} from "../../../redux/actions/modal";

import "./Login.css";

const Login = ({
  login,
  isAuthenticated,
  err,
  handleShowLogin,
  handleCloseLogin,
  formType,
  showLogin
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { register, handleSubmit, errors } = useForm();
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.type]: e.target.value });

  const onClick = () => {
    handleShowLogin();
    formType("login");
  };

  const onSubmit = () => {
    login({ email, password });
    // ();
  };

  const closedLogin = () => {
    handleCloseLogin();
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <Button className="btn-search" variant="info" onClick={() => onClick()}>
        {!isAuthenticated && "SEARCH-L"}
      </Button>
      <Modal show={showLogin} onHide={() => closedLogin()}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Alert />
          <Modal.Body>
            <Form.Group controlId="f-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={e => onChange(e)}
                name="email"
                ref={register({
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <p className="error">Email is required</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p className="error">Enter a valid email</p>
              )}
            </Form.Group>
            <Form.Group controlId="f-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => onChange(e)}
                name="password"
                ref={register({ required: true })}
              />
              {errors.password && errors.password.type === "required" && (
                <p className="error">Password is required</p>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <span>Dont have account yet?</span>
            <Signup />
            <Button
              className="btn-close"
              variant="secondary"
              onClick={() => closedLogin()}
            >
              Close
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={err ? () => handleShowLogin() : () => closedLogin()}
            >
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  err: state.alert,
  showLogin: state.modal.showLogin
});

export default connect(mapStateToProps, {
  login,
  handleCloseLogin,
  handleShowLogin,
  formType
})(Login);
