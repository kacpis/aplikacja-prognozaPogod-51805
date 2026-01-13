import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, setUnit } from './store';
import CityList from './CityList';
import CityDetails from './CityDetails';
import './App.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUnit = useSelector(state => state.weather.unit);

  return (
    <nav style={{ padding: '20px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>☀️ Najlepsza prognoza pogody z 51805</Link>
      <div>
        <span style={{ marginRight: '10px' }}>Jednostka: {currentUnit} </span>
        <button onClick={() => dispatch(setUnit('C'))} style={{ margin: '0 5px', padding: '5px 10px' }}>°C</button>
        <button onClick={() => dispatch(setUnit('F'))} style={{ margin: '0 5px', padding: '5px 10px' }}>°F</button>
        <button onClick={() => dispatch(setUnit('K'))} style={{ margin: '0 5px', padding: '5px 10px' }}>K</button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CityList />} />
          <Route path="/city/:id" element={<CityDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;