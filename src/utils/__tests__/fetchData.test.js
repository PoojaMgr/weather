import { fetchData } from "../fetchData";

global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  );

describe("fetchData check", () => {
  test("fetchData Method", async () => {
    const url =
      // eslint-disable-next-line no-template-curly-in-string
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en";
    const data = await fetchData(url);
    expect(data).not.toBeNull();
  });
});
