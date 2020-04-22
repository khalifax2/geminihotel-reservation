import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faMale } from "@fortawesome/free-solid-svg-icons";

import { setCount, selectRoom } from "../../redux/actions/reservation";

import "./AvailableRooms.css";

const AvailableRooms = ({ rooms, setCount, selectRoom }) => {
  return (
    <>
      {rooms.map((room) => {
        const {
          _id,
          bed,
          type,
          capacity,
          rate,
          description,
          url,
          adult,
          child,
        } = room;

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
                    onClick={() => setCount(_id, "DEC_ADULT")}
                  >
                    -
                  </button>
                  <FontAwesomeIcon icon={faMale} /> {adult}{" "}
                  <button
                    className="inc"
                    onClick={() => setCount(_id, "INC_ADULT")}
                  >
                    +
                  </button>
                </span>
                <span className="qty-child">
                  <button
                    className="dec"
                    onClick={() => setCount(_id, "DEC_CHILD")}
                  >
                    -
                  </button>
                  <FontAwesomeIcon icon={faChild} /> {child}{" "}
                  <button
                    className="inc"
                    onClick={() => setCount(_id, "INC_CHILD")}
                  >
                    +
                  </button>
                </span>
              </div>
              <button id="btn-select" onClick={() => selectRoom(_id)}>
                Select this room
              </button>
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

export default connect(mapStateToProps, { setCount, selectRoom })(
  AvailableRooms
);
