import React from "react";

export default function InputField() {
  const captureValue = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <label htmlFor="city ">Enter</label>
      <input type="search" id="city" onChange={(e) => captureValue(e)} />
    </div>
  );
}
