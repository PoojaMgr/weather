import { fetchData } from "./customHooks/useFetch";

const getCityName = async (param) => {
  const { latitude, longitude } = param;
  const city = await fetchData(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  return city;
};

const getWeatherBasedOnCity =async(param) => {
    const { latitude, longitude } = param;
    const cityWeather = await fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=990daa7cdfb0ac2560296f2ca762eec2`);
    return cityWeather;
}

const getIcon = async(param) => {
    const getWeatherIcon = await fetchData(` https://openweathermap.org/img/wn/10d@2x.png`)
}

export { getCityName, getWeatherBasedOnCity };
