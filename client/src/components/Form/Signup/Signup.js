import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import Alert from "../../Alert/Alert";

import {
  handleShowSignup,
  handleCloseSignup,
  formType
} from "../../../redux/actions/modal";
import { signup } from "../../../redux/actions/auth";

import "./Signup.css";

const Signup = ({
  handleCloseSignup,
  handleShowSignup,
  signup,
  show,
  err,
  formType,
  type
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const { register, handleSubmit, errors, getValues } = useForm();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClick = () => {
    handleShowSignup();
    formType("signup");
  };

  const onSubmit = () => {
    signup(formData);
  };

  return (
    <>
      {type !== "signup" && (
        <Button className="btn-signup" variant="link" onClick={() => onClick()}>
          Signup
        </Button>
      )}
      <Modal show={show} onHide={() => handleCloseSignup()}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Alert />
          <Modal.Body>
            <Form.Group controlId="f-fname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Firstname"
                onChange={e => onChange(e)}
                name="firstName"
                ref={register({ required: true })}
              />
              {errors.firstName && errors.firstName.type === "required" && (
                <p className="error">Firstname is required</p>
              )}
            </Form.Group>
            <Form.Group controlId="f-lname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lastname"
                onChange={e => onChange(e)}
                name="lastName"
                ref={register({ required: true })}
              />
              {errors.lastName && errors.lastName.type === "required" && (
                <p className="error">Lastname is required</p>
              )}
            </Form.Group>
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
            <Form.Group controlId="f-cpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={e => onChange(e)}
                name="passwordConfirm"
                ref={register({
                  required: true,
                  validate: {
                    matchesPreviousPassword: value => {
                      const { password } = getValues();
                      return password === value || "Password should match!";
                    }
                  }
                })}
              />
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === "required" && (
                  <p className="error">Password Confirm is required</p>
                )}
              {errors.passwordConfirm && errors.passwordConfirm.message && (
                <p className="error">{errors.passwordConfirm.message}</p>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleCloseSignup()}>
              Close
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={
                err ? () => handleShowSignup() : () => handleCloseSignup()
              }
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  show: state.modal.showSignup,
  err: state.alert,
  type: state.modal.formType
});

export default connect(mapStateToProps, {
  handleShowSignup,
  handleCloseSignup,
  signup,
  formType
})(Signup);
