import { fetchData } from "./customHooks/useFetch";

const getCityName = async (param) => {
  const { latitude, longitude } = param;
  const city = await fetchData(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  return city;
};

const getWeatherBasedOnCity = async (cityName) => {
  // const { latitude, longitude } = param;
  const cityWeather = await fetchData(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=990daa7cdfb0ac2560296f2ca762eec2`
  );
  return cityWeather;
};

const getIcon = async (param) => {
  const getWeatherIcon = await fetch(
    `https://openweathermap.org/img/wn/${param}.png`
  );

  return getWeatherIcon;
};

export { getCityName, getWeatherBasedOnCity, getIcon };
