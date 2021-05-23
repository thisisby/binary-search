import React from "react";
import "./GameSettings.css";

const GameSetting = ({
  isGameOpen,
  setIsGameOpen,
  animationSpeed,
  setAnimationSpeed,
  arrayLenght,
  setArrayLength,
  settingsHandler,
}) => {
  const Difficultyhandler = (e) => {
    setAnimationSpeed(e);
    setIsGameOpen(!isGameOpen);
  };

  return (
    <div className={`settings ${isGameOpen ? "show-settings" : ""}`}>
      <div className="settings-inner">
        <div>
          <p>Сomplexity</p>
          <button onClick={() => Difficultyhandler(2)}>Level 1</button>
          <button onClick={() => Difficultyhandler(1)}>Level 2</button>
          <button onClick={() => Difficultyhandler(0.8)}>Level 3</button>
          <button onClick={() => Difficultyhandler(0.6)}>Level 4</button>
          <button onClick={() => Difficultyhandler(0.4)}>Level 5</button>
          <button onClick={() => Difficultyhandler(0.2)}>Level 6</button>
          <button
            className="invincible"
            onClick={() => Difficultyhandler(0.01)}
          >
            invincible
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetting;
