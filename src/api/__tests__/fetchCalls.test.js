import { waitFor } from "@testing-library/react";
import * as fetchCalls from "../fetchCalls";

// 1. Import the module you want to mock into your test file.
// 2. jest.mock() the module.
// 3. Use .mockResolvedValue(<mocked response>) to mock the response.

jest.mock("../../utils/fetchData", () => {
  const originalModule = jest.requireActual("../../utils/fetchData");
  return {
    // __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    fetchData: jest
      .fn()
      .mockReturnValueOnce("Noida")
      .mockReturnValueOnce({
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
      }),
    // fetchData: () => mockApiResponse,
  };
});
// beforeEach(() => {
//   useFetchMethods.fetchData = jest.fn().mockResolvedValue(mockApiResponse);
// });
// afterEach(() => {
//   jest.resetAllMocks();
// });

describe("successful fetch calls", () => {
  it("should successfully call cityname", async () => {
    // mockApiResponse = "Noida";
    const param = { latitude: 20, longitude: 20 };
    await waitFor(async () => {
      const apiResp = await fetchCalls.getCityName(param);
      expect(apiResp).toBe("Noida");
    });
  });
  //   mockApiResponse = "";
  test("getWeatherBasedOnCity method", async () => {
    const cityName = "Noida";
    await waitFor(async () => {
      const apiResp = await fetchCalls.getWeatherBasedOnCity(cityName);
      //   expect(apiResp).toBeTruthy();
      expect(apiResp).toMatchObject({
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
      });
    });
  });
  test("getIcon method", async () => {
    const cityName = "04d";
    await waitFor(async () => {
      const apiResp = await fetchCalls.getIcon(cityName);
      expect(apiResp).not.toBeNull();
    });
  });
});
