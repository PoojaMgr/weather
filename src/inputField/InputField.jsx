import React, { useContext } from "react";
import "./Input.css";
import { LocationContext } from "../App";

export default function InputField({ setCityFromInputFields }) {
  const city = useContext(LocationContext);

  // useEffect(() => {

  // const fetchApi = async () => {
  //  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=990daa7cdfb0ac2560296f2ca762eec2`)
  //     .then((res) => res.json())
  //     .then((val) => setCity(val));
  // };
  // // fetch(
  // //   `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=990daa7cdfb0ac2560296f2ca762eec2`
  // // )

  // location && fetchApi();
  // }, [location]);

  return (
    <>
      <div className="main">
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
