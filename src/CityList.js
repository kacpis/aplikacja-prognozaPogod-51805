import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from './store';
import { citiesData } from './data';

const CityList = () => {
  const [search, setSearch] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  const favorites = useSelector(state => state.weather.favorites);
  const dispatch = useDispatch();

  const filteredCities = useMemo(() => {
    return citiesData.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase());
      const matchesFavorites = showOnlyFavorites ? favorites.includes(city.id) : true;
      return matchesSearch && matchesFavorites;
    });
  }, [search, showOnlyFavorites, favorites]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Wybierz miasto</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Szukaj miasta..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', marginRight: '10px' }}
        />
        
        <button 
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          style={{ 
            padding: '10px 20px', 
            background: showOnlyFavorites ? '#ffd700' : '#ddd', 
            border: 'none', 
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          {showOnlyFavorites ? "Pokaż wszystkie" : "Pokaż tylko ulubione ⭐"}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {filteredCities.map(city => {
          const isFav = favorites.includes(city.id);
          return (
            <div key={city.id} style={{ position: 'relative', border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '200px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', background: isFav ? '#fffff0' : 'white' }}>
              
              <button 
                onClick={() => dispatch(toggleFavorite(city.id))}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
              >
                {isFav ? '⭐' : '☆'}
              </button>

              <div style={{ fontSize: '40px' }}>{city.current.icon}</div>
              <h3>{city.name}</h3>
              <Link to={`/city/${city.id}`} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                Sprawdź pogodę &rarr;
              </Link>
            </div>
          );
        })}
      </div>
      {filteredCities.length === 0 && <p>Nie znaleziono miast.</p>}
    </div>
  );
};

export default CityList;