import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePick.css";

const DatePick = ({ value, minDate, className, onChange }) => {
  return (
    <div>
      <DatePicker
        selected={value}
        className={className}
        minDate={minDate}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default DatePick;
