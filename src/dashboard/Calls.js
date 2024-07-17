import { fetchData } from "../customHooks/useFetch";

export const CityName = async (param) => {
  const { latitude, longitude } = param;
  const city = await fetchData(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  return city;
};
