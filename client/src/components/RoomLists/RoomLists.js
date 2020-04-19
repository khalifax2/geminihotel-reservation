import React from "react";

import DropdownCustom from "../Dropdown/DropdownCustom";

import "./RoomLists.css";

const RoomLists = ({ no, onChange, noAdults, noChildren }) => {
  console.log(noAdults, noChildren);

  return (
    <div className="room-lists">
      <span className="rl-lbl-ad">ADULTS</span>
      <span className="rl-lbl-ch">CHILDREN</span>
      <br />
      <span className="rl-rm-no">ROOM {no}</span>
      <div id="rl-adults">
        <DropdownCustom
          name="rl-adults-drp"
          title={noAdults}
          select={e => onChange(e, "adults")}
        />
      </div>
      <div id="rl-children">
        <DropdownCustom
          name="rl-children-drp"
          title={noChildren}
          select={e => onChange(e, "children")}
        />
      </div>
    </div>
  );
};

export default RoomLists;
