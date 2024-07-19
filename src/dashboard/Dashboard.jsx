import React, { useContext } from "react";
import "./Dashboard.css";
import { WeatherContext } from "../App";

const Dashboard = () => {
  const weatherData = useContext(WeatherContext)
  return (
    <div className="info">
      <h3 className="location">
        London
      </h3>
      <h1> <i className="fa-solid fa-temperature-three-quarters"></i> {weatherData.temp}°</h1>
      <h3>Mostly Cloudy</h3>
      <p>H:32° L:27°</p>
    </div>
  );
};

export default Dashboard;
