const mockWeatherResponse = {
  coord: {
    lon: 77.33,
    lat: 28.58,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 30.16,
    feels_like: 29.88,
    temp_min: 30.16,
    temp_max: 30.16,
    pressure: 995,
    humidity: 40,
    sea_level: 995,
    grnd_level: 970,
  },
  visibility: 10000,
  wind: {
    speed: 3.67,
    deg: 73,
    gust: 2.8,
  },
  rain: {
    "1h": 1.78,
  },
  clouds: {
    all: 89,
  },
  dt: 1721648192,
  sys: {
    type: 1,
    id: 9165,
    country: "IN",
    sunrise: 1721606790,
    sunset: 1721656044,
  },
  timezone: 19800,
  id: 7279746,
  name: "Noida",
  cod: 200,
};

export { mockWeatherResponse };
