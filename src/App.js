import React, { useState, useEffect, useRef } from "react";

import { Route } from "react-router-dom";

//  Searching Visualiser
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";
import {
  binarySearchAnimations,
  linearSearchAnimations,
} from "./searchingAlgorithms/searchingAlgorithms";
import { randomIntFromInterval } from "./utils/randomIntFromInterval.js";
import SearchBar from "./SearchBar/SearchBar";
//  Stylesheets
import "./App.css";
import UserSearch from "./searchingAlgorithms/UserSearch/UserSearch";
import Setting from "./Setting/Setting";
import GameSetting from "./GameSettings/GameSettings";

const NUMBER_OF_ARRAY_BARS = 15;
const DEFAULT_COLOR = "#6376f1";
const FOUND_COLOR = "#28B463";
const NOT_FOUND_COLOR = "#F16388";

const App = () => {
  const [animationSpeed, setAnimationSpeed] = useState(0.01);
  const [arrayLenght, setArrayLength] = useState(56);
  const [userTimer, setUserTimer] = useState(0);
  const [linearTimer, setLinearTimer] = useState(0);
  const [binarTimer, setBinarTimer] = useState(0);
  const [countDown, setCountDown] = useState(3);
  const userRef = useRef(null);
  const linearRef = useRef(null);
  const binarRef = useRef(null);
  const coundDownInterval = useRef(null);

  const userSeconds = Math.floor(userTimer / 60);
  const userMilSeconds = (userTimer - userSeconds * 60)
    .toString()
    .padStart("2", "0");

  const linearSeconds = Math.floor(linearTimer / 60);
  const linearMilSeconds = (linearTimer - linearSeconds * 60)
    .toString()
    .padStart("2", "0");

  const binarSeconds = Math.floor(binarTimer / 60);
  const binarMilSeconds = (binarTimer - binarSeconds * 60)
    .toString()
    .padStart("2", "0");

  const startTimer = () => {
    userRef.current = setInterval(() => {
      setUserTimer((userTimer) => userTimer + 1);
    }, 17);
    linearRef.current = setInterval(() => {
      setLinearTimer((linearTimer) => linearTimer + 1);
    }, 16);
    binarRef.current = setInterval(() => {
      setBinarTimer((binarTimer) => binarTimer + 1);
    }, 15);
  };
  const stopUserTimer = () => {
    clearInterval(userRef.current);
  };
  const stoplinearTimer = () => {
    clearInterval(linearRef.current);
  };
  const stopbinarTimer = () => {
    clearInterval(binarRef.current);
  };

  const settingsHandler = () => {
    resetArray();
    resetLinearArray();
    resetUserArray("failed");
    setInputValue("");
    setIsOpen(!isOpen);
    setUserTimer(0);
    setLinearTimer(0);
    setBinarTimer(0);
    stopUserTimer();
    stoplinearTimer();
    stopbinarTimer();
    setCountDown(3);
  };

  let initArray = [];
  for (let i = 0; i < arrayLenght; i++) {
    initArray.push(randomIntFromInterval(1, 1000));
  }

  const handleClick = () => {
    coundDownInterval.current = setInterval(() => {
      setCountDown((countDown) => {
        if (countDown > 1) return countDown - 1;
        stopCountDown();
        return 0;
      });
    }, 1000);

    setTimeout(() => {
      binarySearch();
      linearSearch();
      startTimer();
    }, 3000);
  };

  const stopCountDown = () => {
    clearInterval(coundDownInterval.current);
  };

  const handleReset = () => {
    resetArray();
    resetLinearArray();
    resetUserArray();
    setInputValue("");
    setUserTimer(0);
    setLinearTimer(0);
    setBinarTimer(0);
    stopUserTimer();
    stoplinearTimer();
    stopbinarTimer();
    setCountDown(3);
  };

  //Binary starts
  const [binaryState, setBinaryState] = useState({
    array: [...initArray],
    found: false,
    disabled: false,
    elementFoundAt: 0,
    target: null,
    msgFound: "",
    previousLength: 0,
    animations: [],
    msgAfter: "",
  });

  const [linearState, setLinearState] = useState({
    array: [...initArray],
    found: false,
    disabled: false,
    elementFoundAt: 0,
    target: null,
    msgAfterExecution: "",
  });

  const [userState, setUserState] = useState({
    array: [...initArray],
    found: false,
    msgFound: "",
  });
  const [userSelect, setUserSelect] = useState();
  const [inputValue, setInputValue] = useState();
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleGenerator = () => {
    var item =
      userState.array[Math.floor(Math.random() * userState.array.length)];
    setInputValue(item);
  };

  const resetArray = () => {
    let array = [...initArray];
    const prevArray = document.getElementsByClassName("b-array-bar");
    document.getElementById("binarySearchTargetVal").value = "";
    for (let idx = 0; idx < prevArray.length; idx++) {
      prevArray[idx].style.backgroundColor = DEFAULT_COLOR;
      prevArray[idx].classList.remove("growFind");
      prevArray[idx].classList.remove("highlight-2");
    }
    let sortedArray = array.slice().sort((a, b) => a - b);
    setBinaryState({
      ...binaryState,
      array: sortedArray,
      found: false,
      disabled: false,
      previousLength: binaryState.animations.length,
      msgAfter: "",
    });
  };

  useEffect(() => {
    resetArray();
    resetUserArray();
  }, []);

  const hightlightWithinBounds = (start, end, arrayTiles) => {
    for (let i = start; i <= end; i++) {
      arrayTiles[i].classList.add("searchg-binar");
      arrayTiles[i].style.transition = "100ms all";
    }
  };

  const resetAllTiles = (arrayTiles) => {
    for (let i = 0; i < arrayTiles.length; i++) {
      arrayTiles[i].classList.remove("searchg-binar");
      arrayTiles[i].style.transition = "100ms all";
    }
  };

  const binarySearch = () => {
    var msg = "";
    const animations = [];
    let count = 0;
    const arrayTiles = document.getElementsByClassName("b-array-bar");
    const target = document.getElementById("binarySearchTargetVal").value;
    if (target === "") return;

    binarySearchAnimations(
      array,
      0,
      array.length - 1,
      parseInt(target),
      animations
    );

    for (let k = 0; k < animations.length; k++) {
      const [left, right, mid, found] = animations[k];
      count++;

      if (k === animations.length - 1 && found) {
        setTimeout(() => {
          setBinaryState({
            ...binaryState,
            disabled: true,
            found: true,
          });
          resetAllTiles(arrayTiles);
          arrayTiles[mid].classList.add("highlight-2");

          stopbinarTimer();
        }, (k + 1) * animationSpeed * 1000);
      }

      if (left === 0 && right === 0 && mid === 0 && !found) {
        setTimeout(() => {
          setBinaryState({
            ...binaryState,
            msgFound: `Element not found`,
            found: false,
          });
          resetAllTiles(arrayTiles);
        }, (k + 1) * animationSpeed * 1000);
      }

      setTimeout(() => {
        setBinaryState({ ...binaryState, disabled: true });
        resetAllTiles(arrayTiles);
        hightlightWithinBounds(left, right, arrayTiles);
      }, k * 1000 * animationSpeed);
    }

    setTimeout(() => {
      setBinaryState({
        ...binaryState,
        disabled: false,
        msgAfter: (
          <div className="congrats-back">
            <lord-icon
              src="https://cdn.lordicon.com/nndmudsk.json"
              trigger="loop"
              colors="primary:#08a88a,secondary:#08a88a"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </div>
        ),
      });
    }, count * 1000 * animationSpeed);
  };

  const { array, found, disabled, msgFound, msgAfter } = binaryState;

  //Binary ends

  // Linear starts
  const resetLinearArray = () => {
    const array = [...initArray];
    const prevArray = document.getElementsByClassName("l-array-bar");
    const found = false;
    const disabled = false;
    document.getElementById("binarySearchTargetVal").value = "";
    for (let idx = 0; idx < prevArray.length; idx++) {
      prevArray[idx].style.backgroundColor = DEFAULT_COLOR;
      prevArray[idx].classList.remove("growFind");
      prevArray[idx].classList.remove("highlight");
      prevArray[idx].classList.remove("search-linear-found");
      prevArray[idx].classList.remove("search-linear");
    }
    setLinearState({ array, found, disabled, msgAfterExecution: "" });
  };
  useEffect(() => {
    resetLinearArray();
  }, []);

  const linearSearch = () => {
    var msg = "";
    const target = document.getElementById("binarySearchTargetVal").value;
    if (target === "") return;
    const animations = linearSearchAnimations(linearState.array, target);

    let count = 0;

    for (let i = 0; i < animations.length; i++) {
      const [idx, currentEle, found] = animations[i];
      const arrayBars = document.getElementsByClassName("l-array-bar");
      const arrayBar = arrayBars[idx];
      const arrayBarStyle = arrayBar.style;

      count++;

      if (found) {
        msg = `${currentEle} found at index ${idx}`;
        setTimeout(() => {
          setLinearState({
            ...linearState,
            found: true,
            disabled: true,
            elementFoundAt: idx,
            target: currentEle,
          });

          stoplinearTimer();
          arrayBars[idx].classList.add("search-linear-found");
          arrayBar.classList.add("growFind");
          arrayBar.classList.add("highlight");
        }, i * animationSpeed * 1000);
        break;
      } else {
        msg = `${target} not found`;
        setTimeout(() => {
          setLinearState({
            ...linearState,
            found: false,
            disabled: true,
          });
          arrayBars[idx].classList.add("search-linear");
          arrayBar.classList.add("growFind");
        }, i * animationSpeed * 1000);
      }
    }
    setTimeout(() => {
      setLinearState({
        ...linearState,
        disabled: false,
        msgAfterExecution: (
          <div className="congrats-back">
            <lord-icon
              src="https://cdn.lordicon.com/nndmudsk.json"
              trigger="loop"
              colors="primary:#08a88a,secondary:#08a88a"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </div>
        ),
      });
    }, (count + 1) * animationSpeed * 1000);
  };
  const { arrayL, foundL, disabledL, msgAfterExecutionL } = linearState;

  // Linear ends

  //User starts
  const userChoice = (e, index) => {
    let selectedValue = e;
    const target = document.getElementById("binarySearchTargetVal").value;
    const userSelecteddBar = document.getElementById(`${index}`);
    if (selectedValue == target) {
      setUserSelect(selectedValue);
      setUserState({
        ...userState,
        msgFound: (
          <div className="congrats-back">
            <lord-icon
              src="https://cdn.lordicon.com/nndmudsk.json"
              trigger="loop"
              colors="primary:#08a88a,secondary:#08a88a"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </div>
        ),
      });
      stopUserTimer();
    } else {
      setUserSelect(false);
      userSelecteddBar.classList.add("user-failed");
    }
  };
  const resetUserArray = (e) => {
    let array = [...initArray];
    const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
    setUserState({
      ...userState,
      array: shuffledArray,
      msgFound: "",
    });
    if (e != "failed") {
      for (let k = 0; k < arrayLenght; k++) {
        document.getElementById(k).classList.remove("user-failed");
      }
    } else {
    }
  };

  const { arrayU, msgU, msgFoundU } = userState;
  //User ends

  return (
    <div className="App">
      <Setting
        isOpen={isOpen}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        arrayLenght={arrayLenght}
        setArrayLength={setArrayLength}
        settingsHandler={settingsHandler}
      />
      <GameSetting
        isGameOpen={isGameOpen}
        setIsGameOpen={setIsGameOpen}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        arrayLenght={arrayLenght}
        setArrayLength={setArrayLength}
        settingsHandler={settingsHandler}
      />
      <button onClick={() => setIsOpen(!isOpen)} className="set">
        <ion-icon name="settings-outline"></ion-icon>
      </button>
      <button onClick={() => setIsGameOpen(!isGameOpen)} className="game-set">
        <ion-icon name="game-controller-outline"></ion-icon>
      </button>
      <SearchBar
        handleClick={handleClick}
        handleReset={handleReset}
        handleGenerator={handleGenerator}
        inputValue={inputValue}
        inputChange={inputChange}
      />
      <div className="loader">
        <span className={countDown <= 0 ? "loader-light" : ""}>
          {countDown <= 0 ? "start" : countDown}
        </span>
      </div>
      <div className="wrapper">
        <UserSearch
          {...userState}
          userChoice={userChoice}
          userSelect={userSelect}
          inputChange={inputChange}
          userSeconds={userSeconds}
          userMilSeconds={userMilSeconds}
        />
        <LinearSearch
          {...linearState}
          resetLinearArray={resetLinearArray}
          linearSearch={linearSearch}
          NUMBER_OF_ARRAY_BARS={NUMBER_OF_ARRAY_BARS}
          DEFAULT_COLOR={DEFAULT_COLOR}
          FOUND_COLOR={FOUND_COLOR}
          NOT_FOUND_COLOR={NOT_FOUND_COLOR}
          animationSpeed={animationSpeed}
          linearSeconds={linearSeconds}
          linearMilSeconds={linearMilSeconds}
        />
        <BinarySearch
          {...binaryState}
          resetArray={resetArray}
          binarySearch={binarySearch}
          NUMBER_OF_ARRAY_BARS={NUMBER_OF_ARRAY_BARS}
          DEFAULT_COLOR={DEFAULT_COLOR}
          FOUND_COLOR={FOUND_COLOR}
          NOT_FOUND_COLOR={NOT_FOUND_COLOR}
          animationSpeed={animationSpeed}
          binarSeconds={binarSeconds}
          binarMilSeconds={binarMilSeconds}
        />
      </div>
    </div>
  );
};

export default App;
