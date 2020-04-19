import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";
import Service from "../../components/Service/Service";

import "./hompage.css";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Service />
    </div>
  );
};

export default Homepage;
