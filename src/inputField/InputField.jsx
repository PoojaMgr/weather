import React, { useContext } from "react";
import "./Input.css";
import { LocationContext } from "../main/MainComponent";

export default function InputField({ setCityFromInputFields }) {
  const city = useContext(LocationContext);

  return (
    <>
      <div className="mainDiv">
        <i className="fas fa-location-arrow icon" aria-hidden="true" />
        <input
          type="search"
          className="inputField"
          placeholder="Search for location"
          defaultValue={city}
          onChange={(e) => setCityFromInputFields(e.target.value)}
        />
        <i className="fa fa-search icon" aria-hidden="true" />
      </div>
    </>
  );
}
