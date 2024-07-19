import React, { useContext } from "react";
import "./Input.css";
import { LocationContext } from "../App";

export default function InputField() {
  const city = useContext(LocationContext);
  // const [cityWeather, setCityWeather] = useState('');


  const captureValue = (e) => {
    console.log(e.target.value);
  };

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
          // value={city.name}
          defaultValue={city.name}
          onChange={(e) => captureValue(e)}
        />
        <i className="fa fa-search icon" aria-hidden="true" />
      </div>
    </>
  );
}
