import { useEffect, useState, createContext } from "react";
import "./Main.css";
import showLoader from "../loader.svg";
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
  const [loader, setLoader] = useState(false);

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
    weatherData && setLoader(false);
    const iconString = weatherData?.weather?.[0]?.icon;
    const iconFile = iconString && (await getIcon(iconString));
    if (iconFile) {
      const blobResp = await iconFile.blob();
      setWeatherIcon(URL?.createObjectURL?.(blobResp));
    }
  };

  useEffect(() => {
    setLoader(true);
    getCoordinatesHandler(coordinatesCallbackFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cityFromInputField) {
        setLoader(true);
        getWeather(cityFromInputField);
      }
    }, 5000);

    return () => clearInterval(timer);
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
          {!loader ? (
            <Dashboard
              cityFromInputFields={cityFromInputField}
              weatherIcon={weatherIcon}
            />
          ) : (
            <div className="loader">
              <img src={showLoader} alt="loader" />{" "}
            </div>
          )}
        </div>
      </WeatherContext.Provider>
    </LocationContext.Provider>
  );
}

export default MainComponent;
