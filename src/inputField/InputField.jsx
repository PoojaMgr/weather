import React, { useContext, useEffect } from "react";
import "./Input.css";
import { useFetch } from "../customHooks/useFetch";
import { LocationContext } from "../App";

export default function InputField() {
  const location = useContext(LocationContext);
  console.log(location, 'location')

  const param = {
    lat: 28.57,
    lon: 77.38
  };
  // const data = useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude
  // }&appid=990daa7cdfb0ac2560296f2ca762eec2`)    

  const captureValue = (e) => {
    console.log(e.target.value);   
    
  };

  useEffect(() => {
    const fetchApi = async() => {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude
      }&appid=990daa7cdfb0ac2560296f2ca762eec2`)
      .then(res => res.json())
      .then(val => console.log(val))
    }
  location && fetchApi();
  }, [location])
  

  return (
    <>
      <div className="main">
        <i className="fas fa-location-arrow icon" aria-hidden="true"/>
        <input type="search" className="inputField" placeholder="Search for location" onChange={(e) => captureValue(e)} />
        <i className="fa fa-search icon" aria-hidden="true"/>
      </div>

    </>
  );
}
