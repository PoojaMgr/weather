import logo from './logo.svg';
import './App.css';
import InputField from './inputField/InputField';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <InputField/>        
      </header>
      <section className='App-body'>
        <Dashboard/>
      </section>
    </div>
  );
}

export default App;
