import React, { useState } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faMale } from "@fortawesome/free-solid-svg-icons";

import "./AvailableRooms.css";

const AvailableRooms = ({ rooms }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const onClick = (e) => {
    if (e.target.name === "incAdult")
      setAdultCount((prevCount) => prevCount + 1);
    if (e.target.name === "incChild")
      setChildCount((prevCount) => prevCount + 1);
    if (adultCount > 0) {
      if (e.target.name === "decAdult")
        setAdultCount((prevCount) => prevCount - 1);
    }
    if (childCount > 0) {
      if (e.target.name === "decChild")
        setChildCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <>
      {rooms.map((room) => {
        const { _id, bed, type, capacity, rate, description, url } = room;

        return (
          <div className="xs room-container" key={_id}>
            <div
              className="room-image"
              style={{
                backgroundImage: `url(${require(`../../img/rooms/${url}`)})`,
              }}
            ></div>
            <div className="room-content">
              <h5 className="room-title">{type.toUpperCase()}</h5>
              <span className="room-spec">
                <b>Bed</b> {bed} / <b>Max</b> {capacity} People
              </span>
              <div className="room-details">
                <p className="description">{description}</p>
                <span className="qty-adult">
                  <button
                    className="dec"
                    onClick={(e) => onClick(e)}
                    name="decAdult"
                  >
                    -
                  </button>
                  <FontAwesomeIcon icon={faMale} /> {adultCount}{" "}
                  <button
                    className="inc"
                    onClick={(e) => onClick(e)}
                    name="incAdult"
                  >
                    +
                  </button>
                </span>
                <span className="qty-child">
                  <button
                    className="dec"
                    onClick={(e) => onClick(e)}
                    name="decChild"
                  >
                    -
                  </button>
                  <FontAwesomeIcon icon={faChild} /> {childCount}{" "}
                  <button
                    className="inc"
                    onClick={(e) => onClick(e)}
                    name="incChild"
                  >
                    +
                  </button>
                </span>
              </div>
              <button id="btn-select">Select this room</button>
              <div className="room-price">
                <span id="rp-head">Start From</span>
                <span id="rp-tail">${rate} / Night</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => ({
  rooms: state.reservation.availableRooms,
});

export default connect(mapStateToProps)(AvailableRooms);
