import React from "react";

const ArrayTile = ({ idx, val, type }) =>
  type === "binarySearch" ? (
    <div className="b-array-bar">{`${val}`}</div>
  ) : (
    <div className="l-array-bar">{`${val}`}</div>
  );

export default ArrayTile;
