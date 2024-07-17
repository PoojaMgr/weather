import { useEffect, useState, createContext } from 'react';
// import logo from './logo.svg';
import './App.css';
import InputField from './inputField/InputField';
import Dashboard from './dashboard/Dashboard';
import { getLocation } from "./inputField/Utils";

export const LocationContext = createContext(null);

function App() {
  const [location, setLocation] = useState(null);

  const success = (pos) => {
    const crd = pos.coords;
    setLocation(crd)
  }

  const error = (err) => {
    alert(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    getLocation(success, error, options)
  }, [])

  return (
    <LocationContext.Provider value={location}>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <InputField />
        </header>
        <section className='App-body'>
          <Dashboard />
        </section>
      </div>
    </LocationContext.Provider>

  );
}

export default App;
