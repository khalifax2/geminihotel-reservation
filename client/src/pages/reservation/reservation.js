import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import { bookSearch } from "../../redux/actions/reservation";
import { setFormData } from "../../redux/actions/reservation";

import DatePick from "../../components/DatePick/DatePick";
import Navbar from "../../components/Navbar/Navbar";
import AvailableRooms from "../../components/AvailableRooms/AvailableRooms";
import DropdownCustom from "../../components/Dropdown/DropdownCustom";
import RoomLists from "../../components/RoomLists/RoomLists";

import "./reservation.css";

const Rooms = ({
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
  bookSearch,
  setFormData,
}) => {
  // const [formData, setFormData] = useState({
  //   roomQty: 1
  // });

  // useEffect(() => {
  //   if (checkIn > checkOut && checkOut !== "") {
  //     setFormData({ ...formData, checkOut: "" });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkIn]);

  // const onChange = (value, name) => {
  //   setFormData({ name, value });
  // };

  // const onSubmit = async e => {
  //   e.preventDefault();
  //   await bookSearch({ checkIn, checkOut, adults, children });
  //   checkIn && checkOut && setFormData({ ...formData, direct: true });
  // };
  console.log("CHECKIN", checkIn);
  return (
    <div className="bg-reservation">
      <Navbar />
      <Container>
        <Row>
          <Col lg={4}>
            <div className="reservation-form">
              <form>
                <h5 id="reservation-label">Your Reservation</h5>
                <div className="r-label-check">CHECK IN</div>
                <DatePick
                  className="r-check-in"
                  minDate={new Date()}
                  value={Date.parse(checkIn)}
                  // onChange={e => onChange(e, "checkIn")}
                />
                <div className="r-label-check">CHECK OUT</div>
                <DatePick
                  className="r-check-out"
                  minDate={Date.parse(checkIn)}
                  value={Date.parse(checkOut)}
                  // onChange={e => onChange(e, "checkOut")}
                />
                <div className="r-label-rooms">ROOMS</div>
                {/* <DropdownCustom
                  name="r-rooms-drp"
                  title={roomQty}
                  select={e => onChange(e, "roomQty")}
                />
                {[...Array(parseInt(roomQty)).keys()].map(i => {
                  return (
                    <RoomLists
                      key={i}
                      no={i + 1}
                      adults={adults}
                      children={children}
                      onChange={onChange}
                    />
                  );
                })} */}
              </form>
            </div>
          </Col>
          <Col lg={8}>
            <div className="progress-bar">
              <span id="step1">Choose Date</span>
              <span id="step2">Choose Room</span>
              <span id="step3">Make a Reservation</span>
              <span id="step4">Confirmation</span>
            </div>
            <AvailableRooms />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkIn: state.reservation.form.checkIn,
  checkOut: state.reservation.form.checkOut,
  adults: state.reservation.form.adults,
  children: state.reservation.form.children,
  rooms: state.reservation.form.rooms,
});

export default connect(mapStateToProps, { bookSearch })(Rooms);
