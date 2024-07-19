import { useEffect, useState, createContext } from "react";
import "./App.css";
import InputField from "./inputField/InputField";
import Dashboard from "./dashboard/Dashboard";
import { getLocation } from "./inputField/Utils";
import { getCityName, getWeatherBasedOnCity, getIcon } from "./ApiCalls";

export const LocationContext = createContext(null);
export const WeatherContext = createContext(null);

function App() {
  const [cityName, setCityName] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [cityFromInputField, setCityFromInputField] = useState("");

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
    if (cityName) {
      getWeatherBasedOnCity(cityName).then((weather) => {
        setWeatherData(weather);
        getIcon(weather?.weather?.[0]?.icon).then((response) =>
          response.blob().then((blobResponse) => {
            setWeatherIcon(URL.createObjectURL(blobResponse));
          })
        );
      });
    }

    if (cityFromInputField) {
      const timer = setTimeout(() => {
        getWeatherBasedOnCity(cityFromInputField).then((weather) => {
          setWeatherData(weather);
          getIcon(weather?.weather?.[0]?.icon).then((response) =>
            response.blob().then((blobResponse) => {
              setWeatherIcon(URL.createObjectURL(blobResponse));
            })
          );
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
    getIcon("04d").then((response) =>
      response.blob().then((blobResponse) => {
        setWeatherIcon(URL.createObjectURL(blobResponse));
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName, cityFromInputField]);

  return (
    <LocationContext.Provider value={cityName}>
      <WeatherContext.Provider value={weatherData}>
        <div className="App">
          <header className="App-header">
            {" "}
            <InputField setCityFromInputFields={setCityFromInputField} />
          </header>
          <section className="App-body">
            <img src={weatherIcon} className="App-logo" alt="logo" />
            <Dashboard cityFromInputFields={cityFromInputField} />
          </section>
        </div>
      </WeatherContext.Provider>
    </LocationContext.Provider>
  );
}

export default App;
