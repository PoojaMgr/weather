import React from "react";
import "./Input.css";

export default function InputField() {
  const captureValue = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <div className="main">
        <input type="search" className="inputField" placeholder="Search for location" onChange={(e) => captureValue(e)} />
        <i className="fa fa-search search" aria-hidden="true"/>
      </div>

    </>
  );
}
