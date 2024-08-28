import React, { useState } from "react";
import "./style.css";

const LightBulb = ({ isOn }) => {
  return (
    <div className={`container ${isOn ? '' : 'night'}`}>
      <div className="bulb-light">
        <div id="light" />
        <div id="bulb">
          <div className="bulb-top">
            <div className="reflection" />
          </div>
          <div className="bulb-middle-1" />
          <div className="bulb-middle-2" />
          <div className="bulb-middle-3" />
          <div className="bulb-bottom" />
        </div>

        <div id="base">
          <div className="screw-top" />
          <div className="screw-a" />
          <div className="screw-b" />
          <div className="screw-a" />
          <div className="screw-b" />
          <div className="screw-a" />
          <div className="screw-b" />
          <div className="screw-c" />
          <div className="screw-d" />
        </div>
      </div>
    </div>
  );
};

export default function Light() {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <>
      <button className="btn" onClick={handleClick}>{isOn ? "Turn On" : "Turn Off"}</button>
      <LightBulb isOn={isOn} />
    </>
  );
}
