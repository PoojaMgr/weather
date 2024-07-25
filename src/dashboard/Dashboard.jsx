import React, { useContext } from "react";
import "./Dashboard.css";
import { WeatherContext } from "../main/MainComponent";

const Dashboard = (props) => {
  const weatherData = useContext(WeatherContext);
  const { weatherIcon } = props;

  return (
    <div className="main-body">
      {weatherData?.message === "bad query" ? (
        <h3>Uhh ohh, city not found!</h3>
      ) : (
        <div className="dashboard">
          {weatherData?.weather?.[0]?.icon && (
              <img src={weatherIcon} className="main-logo" alt="logo" />
            )}
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
