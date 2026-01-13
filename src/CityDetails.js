import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from './store';
import { citiesData } from './data';

const ForecastRow = ({ day, temp, icon, unit }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
    <span>{day}</span>
    <span>{icon}</span>
    <strong>{temp.toFixed(1)} °{unit}</strong>
  </div>
);

const CityDetails = () => {
  const { id } = useParams();
  const unit = useSelector(state => state.weather.unit);
  const favorites = useSelector(state => state.weather.favorites);
  const dispatch = useDispatch();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const found = citiesData.find(c => c.id === parseInt(id));
    setCity(found);
  }, [id]);

  const convertTemp = useCallback((temp) => {
    if (unit === 'F') return (temp * 9/5) + 32;
    if (unit === 'K') return temp + 273.15;
    return temp;
  }, [unit]);

  if (!city) return <div>Ładowanie...</div>;

  const isFav = favorites.includes(city.id);

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '15px', position: 'relative' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>&larr; Powrót do listy</Link>
      
      <button 
        onClick={() => dispatch(toggleFavorite(city.id))}
        style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer' }}
        title={isFav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      >
        {isFav ? '⭐' : '☆'}
      </button>

      <h1 style={{ textAlign: 'center' }}>{city.name}</h1>
      
      <div style={{ textAlign: 'center', background: isFav ? '#fffff0' : '#f0f8ff', padding: '20px', borderRadius: '10px', border: isFav ? '1px solid gold' : 'none' }}>
        <div style={{ fontSize: '60px' }}>{city.current.icon}</div>
        <h2>{convertTemp(city.current.temp).toFixed(1)} °{unit}</h2>
        <p>{city.current.condition}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px', fontSize: '14px' }}>
            <div>💨 Wiatr: {city.current.wind} km/h</div>
            <div>💧 Opady: {city.current.precip} mm</div>
            <div>☁️ Chmury: {city.current.clouds}%</div>
        </div>
      </div>

      <h3>Prognoza na 5 dni:</h3>
      <div>
        {city.forecast.map((day, index) => (
          <ForecastRow 
            key={index}
            day={day.day}
            icon={day.icon}
            temp={convertTemp(day.temp)}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};

export default CityDetails;