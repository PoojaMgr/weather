import { useEffect, useState, createContext } from "react";
// import logo from './logo.svg';
import "./App.css";
import InputField from "./inputField/InputField";
import Dashboard from "./dashboard/Dashboard";
import { getLocation } from "./inputField/Utils";
import { CityName } from "./dashboard/Calls";

export const LocationContext = createContext(null);
export const UserInputContext = createContext(null);

function App() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const success = (pos) => {
    const crd = pos.coords;
    setCoordinates(crd);
  };

  useEffect(() => {
    getLocation(success);
  }, []);
  useEffect(() => {
    if (coordinates) {
      CityName(coordinates).then((data) => setLocation(data.locality));
    }
  }, [coordinates]);

  return (
    <LocationContext.Provider value={location}>
      {/* <UserInputContext value={cityFromUser}> */}
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <InputField />
        </header>
        <section className="App-body">
          <Dashboard />
        </section>
      </div>
      {/* </UserInputContext> */}
    </LocationContext.Provider>
  );
}

export default App;
