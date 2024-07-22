import { useEffect, useState, createContext } from "react";
import "./App.css";
// import sky from "./sky.svg";
import InputField from "./inputField/InputField";
import Dashboard from "./dashboard/Dashboard";
import { getCoordinates } from "./Utils";
import { getCityName, getWeatherBasedOnCity, getIcon } from "./ApiCalls";

export const LocationContext = createContext(null);
export const WeatherContext = createContext(null);

function App() {
  const [cityName, setCityName] = useState("");
  // const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [cityFromInputField, setCityFromInputField] = useState("");

  const coordinatesCallbackFn = async (pos) => {
    const crd = pos.coords;
    let cityName;
    if (crd) {
      const fetchedLocality = await getCityName(crd);
      cityName = fetchedLocality.locality;
      setCityName(cityName);
    }
    if (cityName) {
      getWeather(cityName);
    }
  };

  const getWeather = async (cityName) => {
    const weatherData = await getWeatherBasedOnCity(cityName);
    setWeatherData(weatherData);
    const iconString = weatherData?.weather?.[0]?.icon;
    console.log(iconString, "iconString");
    const iconFile = iconString && (await getIcon(iconString));
    console.log(iconFile, "getWeather1");
    if (iconFile) {
      const blobResp = await iconFile.blob();
      setWeatherIcon(URL?.createObjectURL?.(blobResp));
    }
    console.log(iconFile, "getWeather");
  };

  useEffect(() => {
    getCoordinates(coordinatesCallbackFn);
  }, []);

  useEffect(() => {
    if (cityFromInputField) {
      getWeather(cityFromInputField);
    }
  }, [cityFromInputField]);

  return (
    <LocationContext.Provider value={cityName}>
      <WeatherContext.Provider value={weatherData}>
        <div className="App">
          <header className="App-header">
            <InputField setCityFromInputFields={setCityFromInputField} />

            {/* <img src={weatherIcon} alt="sky" /> */}
          </header>
          <br></br>
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
