import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { bookSearch } from "../../redux/actions/reservation";

import DatePick from "../DatePick/DatePick";
import DropdownCustom from "../Dropdown/DropdownCustom";
import Modal from "../Modal/Modal";

import "./BookForm.css";

const BookForm = ({ bookSearch, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    checkIn: new Date(),
    checkOut: "",
    rooms: [{ room: { adults: 1, children: 0 } }],
    direct: false,
  });

  const { checkIn, checkOut, direct, rooms } = formData;

  useEffect(() => {
    if (checkIn > checkOut && checkOut !== "") {
      setFormData({ ...formData, checkOut: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn]);

  const onChange = (value, name) => {
    if (name === "adults" || name === "children") {
      setFormData({
        ...formData,
        rooms: [
          {
            room: { ...formData.rooms[0].room, [name]: value },
          },
        ],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    bookSearch({ checkIn, checkOut, rooms });
    checkIn && checkOut && setFormData({ ...formData, direct: true });
  };

  const redirect = () => {
    if (direct) return <Redirect to="/reservation" />;
  };

  return (
    <div className="book-form">
      <h2 className="bn-label">Book now!</h2>
      <Form onSubmit={(e) => onSubmit(e)}>
        <span id="checkin-label">CHECK IN</span>
        <Form.Group controlId="check-in">
          <DatePick
            minDate={new Date()}
            className="checkin"
            value={checkIn}
            onChange={(e) => onChange(e, "checkIn")}
          />
        </Form.Group>
        <span id="checkout-label">CHECK OUT</span>
        <Form.Group controlId="check-out">
          <DatePick
            minDate={checkIn}
            className="checkout"
            value={checkOut}
            onChange={(e) => onChange(e, "checkOut")}
          />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <span id="adults">ADULTS</span>
            <DropdownCustom
              title={rooms[0].room.adults}
              select={(e) => onChange(e, "adults")}
              name="adult-drp"
            />
            <span id="children">CHILDREN</span>
            <DropdownCustom
              title={rooms[0].room.children}
              select={(e) => onChange(e, "children")}
              name="children-drp"
            />
          </ButtonToolbar>
        </Form.Group>
        {!isAuthenticated ? (
          <Modal />
        ) : (
          <Button className="btn-search" variant="info" type="submit">
            SEARCH
          </Button>
        )}
        {redirect()}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { bookSearch })(BookForm);
