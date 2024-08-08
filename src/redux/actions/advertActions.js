export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = camperId => ({
  type: 'TOGGLE_FAVORITE',
  payload: camperId,
});
