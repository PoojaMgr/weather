import { useEffect, useState, createContext } from "react";
import "./Main.css";
// import sky from "./sky.svg";
import InputField from "../inputField/InputField";
import Dashboard from "../dashboard/Dashboard";
import { getCoordinatesHandler } from "../utils/coordinates";
import { getCityName, getWeatherBasedOnCity, getIcon } from "../api/fetchCalls";

export const LocationContext = createContext(null);
export const WeatherContext = createContext(null);

function MainComponent() {
  const [cityName, setCityName] = useState("");
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
    const iconFile = iconString && (await getIcon(iconString));
    if (iconFile) {
      const blobResp = await iconFile.blob();
      setWeatherIcon(URL?.createObjectURL?.(blobResp));
    }
  };

  useEffect(() => {
    getCoordinatesHandler(coordinatesCallbackFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cityFromInputField) {
      getWeather(cityFromInputField);
    }
  }, [cityFromInputField]);

  return (
    <LocationContext.Provider value={cityName}>
      <WeatherContext.Provider value={weatherData}>
        <div className="main">
          <header className="main-header">
            <InputField setCityFromInputFields={setCityFromInputField} />

            {/* <img src={weatherIcon} alt="sky" /> */}
          </header>
          <br></br>
            <Dashboard cityFromInputFields={cityFromInputField} weatherIcon={weatherIcon}/>
        </div>
      </WeatherContext.Provider>
    </LocationContext.Provider>
  );
}

export default MainComponent;
