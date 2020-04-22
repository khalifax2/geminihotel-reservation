import React from "react";
import { connect } from "react-redux";

import "./RoomLists.css";

const RoomLists = ({ selectedRoom }) => {
  {
    return selectedRoom.map((room, idx) => {
      return (
        <div className="room-breakdown">
          <div className="room-title">
            Room {++idx} :<span> {room.title}</span>
          </div>
          <div className="guest-count">
            <span className="adult-count">Adult : {room.adult}</span>{" "}
            <span className="child-count">Child : {room.child}</span>
          </div>
        </div>
      );
    });
  }
};

const mapStateToProps = (state) => ({
  selectedRoom: state.reservation.selectedRooms,
});
export default connect(mapStateToProps)(RoomLists);
