import React from "react";
import "./Setting.css";

const Setting = ({
  isOpen,
  animationSpeed,
  setAnimationSpeed,
  arrayLenght,
  setArrayLength,
  settingsHandler,
}) => {
  return (
    <div className={`settings ${isOpen ? "show-settings" : ""}`}>
      <div className="settings-inner">
        <div>
          <p>Length of an array</p>
          <input
            value={arrayLenght}
            onChange={(e) => setArrayLength(e.target.value)}
            placeholder="length"
            type="number"
          />
        </div>
        <div>
          <p>Speed of animation</p>
          <input
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(e.target.value)}
            placeholder="animation"
            type="number"
          />
        </div>
        <button onClick={settingsHandler}>Set the settings</button>
      </div>
    </div>
  );
};

export default Setting;
