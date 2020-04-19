import React from "react";

import "./AvailableRooms.css";

const AvailableRooms = () => {
  return (
    <>
      <div className="xs room-container">
        <div className="room-image"></div>
        <div className="room-content">
          <h5 className="room-title">GRAND SUPERIOR ROOM</h5>
          <span className="room-spec">
            <b>Bed</b> 2 King Beds / <b>Max</b> 4 People
          </span>
          <div className="room-details">
            <p>
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed
              posuere consectetur est at lobortis. Nullam quis risus eget urna
              mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis
              dis parturient...
            </p>
          </div>
          <button id="btn-select">Select this room</button>
          <div className="room-price">
            <span id="rp-head">Start From</span>
            <span id="rp-tail">$300 / Night</span>
          </div>
        </div>
      </div>
      <div className="room-container">
        <div className="room-image"></div>
        <div className="room-content">
          <h5 className="room-title">GRAND SUPERIOR ROOM</h5>
          <span className="room-spec">
            <b>Bed</b> 2 King Beds / <b>Max</b> 4 People
          </span>
          <div className="room-details">
            <p>
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed
              posuere consectetur est at lobortis. Nullam quis risus eget urna
              mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis
              dis parturient...
            </p>
          </div>
          <button id="btn-select">Select this room</button>
          <div className="room-price">
            <span id="rp-head">Start From</span>
            <span id="rp-tail">$300 / Night</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableRooms;
