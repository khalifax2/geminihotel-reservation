import React from "react";

import { DropdownButton, Dropdown } from "react-bootstrap";

import "./DropdownCustom.css";

const DropdownCustom = ({ title, select, name }) => {
  let x = 5;
  if (name === "r-rooms-drp") x = 10;
  return (
    <DropdownButton
      size="sm"
      variant="secondary"
      title={title}
      onSelect={select}
      className={name}
    >
      {[...Array(x).keys()].map(i => {
        let n;
        name === "adult-drp" || "rl-adults-drp" || "rooms"
          ? (n = i + 1)
          : (n = i);
        while (n <= x) {
          return (
            <Dropdown.Item key={n} eventKey={n}>
              {n}
            </Dropdown.Item>
          );
        }
      })}
    </DropdownButton>
  );
};

export default DropdownCustom;
