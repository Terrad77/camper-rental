import { TOGGLE_FAVORITE } from '../actions/advertActions';

const initialState = {
  favorites: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const { payload } = action;
      return {
        ...state,
        favorites: state.favorites.includes(payload)
          ? state.favorites.filter(id => id !== payload)
          : [...state.favorites, payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
