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
        weather?.weather?.[0]?.icon &&
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
          console.log(weather);
          weather?.weather?.[0]?.icon &&
            getIcon(weather?.weather?.[0]?.icon).then((response) =>
              response.blob().then((blobResponse) => {
                setWeatherIcon(URL.createObjectURL(blobResponse));
              })
            );
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName, cityFromInputField]);

  return (
    <LocationContext.Provider value={cityName}>
      <WeatherContext.Provider value={weatherData}>
        <div className="App">
          {weatherData === null ? (
            <div class="fa-3x">
              <i class="fas fa-spinner fa-pulse" />
            </div>
          ) : null}
          <header className="App-header">
            {" "}
            <InputField setCityFromInputFields={setCityFromInputField} />
          </header>
          <section className="App-body">
            {weatherData?.weather?.[0]?.icon && (
              <img src={weatherIcon} className="App-logo" alt="logo" />
            )}
            <Dashboard cityFromInputFields={cityFromInputField} />
          </section>
        </div>
      </WeatherContext.Provider>
    </LocationContext.Provider>
  );
}

export default App;
