import { useEffect, useState, createContext } from "react";
// import logo from './logo.svg';
import "./App.css";
import InputField from "./inputField/InputField";
import Dashboard from "./dashboard/Dashboard";
import { getLocation } from "./inputField/Utils";
import { getCityName, getWeatherBasedOnCity } from "./ApiCalls";

export const LocationContext = createContext(null);
export const UserInputContext = createContext(null);
export const WeatherContext = createContext(null);

function App() {
  const [cityName, setCityName] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  const success = (pos) => {
    const crd = pos.coords;
    setCoordinates(crd);
  };

  useEffect(() => {
    getLocation(success); // get co-ordinates
  }, []);
  useEffect(() => {
    if (coordinates) {
      getCityName(coordinates).then((data) => setCityName(data.locality));
    }
  }, [coordinates]);

  useEffect(() => {
    if(coordinates){
      getWeatherBasedOnCity(coordinates).then((weather) => setWeatherData(weather))
    }
  }, [coordinates])

  return (
    <LocationContext.Provider value={cityName}>
      <WeatherContext.Provider value={weatherData}>
      {/* <UserInputContext value={cityFromUser}> */}
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <InputField />
        </header>
        <section className="App-body">
          <Dashboard />
        </section>
      </div>
      {/* </UserInputContext> */}
      </WeatherContext.Provider>
    </LocationContext.Provider>
  );
}

export default App;
