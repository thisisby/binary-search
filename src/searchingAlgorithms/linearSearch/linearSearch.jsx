import React from "react";
import { randomIntFromInterval } from "./../../utils/randomIntFromInterval.js";
import { linearSearchAnimations } from "./../searchingAlgorithms";

import ArrayTile from "./../arrayTile";

// Stylesheets
import "./linearSearch.css";

const LinearSearch = ({
  disabled,
  resetLinearArray,
  linearSearch,
  found,
  msgAfterExecution,
  array,
  linearSeconds,
  linearMilSeconds,
}) => {
  return (
    <div className="algorithms-box">
      <div className="title-box">
        {msgAfterExecution}
        <h2 className="title">Brute Force search</h2>
        <div>
          <span>{linearSeconds}</span>
          <span>:</span>
          <span>{linearMilSeconds}</span>
        </div>
      </div>
      {/* {!found ? (
            <p className="found growFind">{msgAfterExecution}</p>
          ) : null} */}
      <div className="box-wrapper">
        {array.map((value, idx) => (
          <ArrayTile type={`linearSearch`} key={idx} idx={idx} val={value} />
        ))}
      </div>
    </div>
  );
};

export default LinearSearch;
