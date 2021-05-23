import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  handleClick,
  handleReset,
  handleGenerator,
  inputChange,
  inputValue,
}) => {
  return (
    <>
      <div className="search-box">
        <input
          type="number"
          id="binarySearchTargetVal"
          placeholder="Find Element"
          value={inputValue}
          onChange={inputChange}
        />
        <button
          className="but-start"
          type="button"
          id="binarySearchBtn"
          onClick={handleClick}
        >
          Search
        </button>
        <button
          className="but-reset"
          id="binarySearchResetArray"
          type="button"
          onClick={() => handleReset()}
        >
          Reset Array
        </button>
        <button
          className="but-generate"
          id="binarySearchResetArray"
          type="button"
          onClick={() => handleGenerator()}
        >
          Generate a number
        </button>
      </div>
    </>
  );
};

export default SearchBar;
