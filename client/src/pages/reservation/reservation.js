import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

import { bookSearch } from "../../redux/actions/reservation";
import { setFormData } from "../../redux/actions/reservation";

import DatePick from "../../components/DatePick/DatePick";
import Navbar from "../../components/Navbar/Navbar";
import AvailableRooms from "../../components/AvailableRooms/AvailableRooms";
import RoomLists from "../../components/RoomLists/RoomLists";
import Footer from "../../components/Footer/Footer";

import "./reservation.css";

const Rooms = ({ checkIn, checkOut, selectedRoom }) => {
  const [ht, setHt] = useState(350);
  useEffect(() => {
    if (selectedRoom.length > 1) setHt((prev) => prev + 90);
  }, [selectedRoom]);
  console.log(ht);

  return (
    <>
      <div className="bg-reservation">
        <Navbar />
        <Container>
          <Row>
            <Col lg={4}>
              <div className="reservation-form" style={{ height: `${ht}px` }}>
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
                  <div className="r-label-rooms">
                    <h6>ROOM</h6>
                    {selectedRoom.length > 0 ? (
                      <RoomLists />
                    ) : (
                      <span>No Room Selected.</span>
                    )}
                  </div>
                  {selectedRoom.length > 0 && (
                    <button className="submit-reservation">Submit</button>
                  )}
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
      <Footer count={selectedRoom.length} />
    </>
  );
};

const mapStateToProps = (state) => ({
  checkIn: state.reservation.form.checkIn,
  checkOut: state.reservation.form.checkOut,
  selectedRoom: state.reservation.selectedRooms,
});

export default connect(mapStateToProps, { bookSearch })(Rooms);
