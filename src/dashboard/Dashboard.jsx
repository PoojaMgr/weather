import React, { useContext } from "react";
import "./Dashboard.css";
import { WeatherContext } from "../App";

const Dashboard = () => {
  const weatherData = useContext(WeatherContext);

  return (
    <div className="info">
      {weatherData?.message === "bad query" ? (
        <h3>Uhh ohh, city not found!</h3>
      ) : (
        <>
          <h3 className="location">{weatherData?.name}</h3>
          <h1>
            {" "}
            <i className="fa-solid fa-temperature-three-quarters"></i>{" "}
            {weatherData?.main?.temp}°
          </h1>
          <h3>{weatherData?.weather?.[0]?.description}</h3>
          <p>
            H:{weatherData?.main?.temp_max}° L:{weatherData?.main?.temp_min}°
          </p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
