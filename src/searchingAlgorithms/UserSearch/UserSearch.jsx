import React from "react";
import "./UserSearch.css";

const UserSearch = ({
  array,
  msg,
  userChoice,
  userSelect,
  userSeconds,
  userMilSeconds,
  msgFound,
}) => {
  return (
    <div className="algorithms-box">
      <div className="title-box">
        {msgFound}
        <h2 className="title">User</h2>
        <div>
          <span>{userSeconds}</span>
          <span>:</span>
          <span>{userMilSeconds}</span>
        </div>
      </div>

      <div className="">{msg}</div>
      <div className="box-wrapper">
        {array.map((v, index) => (
          <div
            key={index}
            id={index}
            onClick={() => userChoice(v, index)}
            className={`${v === userSelect ? "user-found" : ""} user-bar`}
          >{`${v}`}</div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
