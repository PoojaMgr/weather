import React, { useContext } from "react";
import "./Input.css";
import { LocationContext } from "../main/MainComponent";

export default function InputField({ setCityFromInputFields }) {
  const city = useContext(LocationContext);

  const handlerForInput = (event) => {
    const value = event.target.value;
    if (value === "") return;

    if (value) {
      setCityFromInputFields(value);
    }
  };

  return (
    <>
      <div className="inputMain">
        <i className="fas fa-location-arrow icon" aria-hidden="true" />
        <input
          type="search"
          className="inputField"
          placeholder="Search for location"
          defaultValue={city}
          onChange={handlerForInput}
        />
        <i className="fa fa-search icon" aria-hidden="true" />
      </div>
    </>
  );
}
