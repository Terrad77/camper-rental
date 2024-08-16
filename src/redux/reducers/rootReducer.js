import { TOGGLE_FAVORITE } from '../actions/advertActions';

const loadFavoritesFromLocalStorage = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    if (serializedFavorites === null) {
      return [];
    }
    return JSON.parse(serializedFavorites);
  } catch (e) {
    console.error('Could not load favorites from localStorage', e);
    return [];
  }
};

const saveFavoritesToLocalStorage = favorites => {
  try {
    const serializedFavorites = JSON.stringify(favorites);
    localStorage.setItem('favorites', serializedFavorites);
  } catch (e) {
    console.error('Could not save favorites to localStorage', e);
  }
};

const initialState = {
  favorites: loadFavoritesFromLocalStorage(),
  campers: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const { payload } = action;
      const updatedFavorites = state.favorites.includes(payload)
        ? state.favorites.filter(id => id !== payload)
        : [...state.favorites, payload];

      // збереження оновленого списку в localStorage
      saveFavoritesToLocalStorage(updatedFavorites);

      return {
        ...state,
        favorites: updatedFavorites,
      };

    default:
      return state;
  }
};

export default rootReducer;
