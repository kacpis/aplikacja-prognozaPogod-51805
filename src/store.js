import { createSlice, configureStore } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('weatherAppState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('weatherAppState', serializedState);
  } catch (e) {
    console.warn(e);
  }
};

const persistedState = loadFromLocalStorage();

const weatherSlice = createSlice({
  name: 'weather',
  initialState: persistedState ? persistedState.weather : { unit: 'C', favorites: [] }, 
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    toggleFavorite: (state, action) => {
      const cityId = action.payload;
      if (state.favorites.includes(cityId)) {
        state.favorites = state.favorites.filter(id => id !== cityId);
      } else {
        state.favorites.push(cityId);
      }
    }
  }
});

export const { setUnit, toggleFavorite } = weatherSlice.actions;

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer
  }
});

store.subscribe(() => {
  saveToLocalStorage({
    weather: store.getState().weather
  });
});