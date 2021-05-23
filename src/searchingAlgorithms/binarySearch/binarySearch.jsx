import React, { useState, useEffect } from "react";

import { randomIntFromInterval } from "./../../utils/randomIntFromInterval.js";
import { binarySearchAnimations } from "./../searchingAlgorithms";

import ArrayTile from "./../arrayTile";

//Stylesheets
import "./binarySearch.css";

const BinarySearch = ({
  disabled,
  resetArray,
  binarySearch,
  found,
  msgFound,
  array,
  binarSeconds,
  binarMilSeconds,
  msgAfter,
}) => {
  return (
    <div className="algorithms-box">
      <div className="title-box">
        {msgAfter}
        <h2 className="title">Binary Search</h2>
        <div>
          <span>{binarSeconds}</span>
          <span>:</span>
          <span>{binarMilSeconds}</span>
        </div>
      </div>
      <div className="box-wrapper">
        {array.map((value, idx) => (
          <ArrayTile type={"binarySearch"} key={idx} idx={idx} val={value} />
        ))}
      </div>
    </div>
  );
};

export default BinarySearch;
