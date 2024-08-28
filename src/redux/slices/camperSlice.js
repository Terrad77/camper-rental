import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  campers: [],
  loading: false,
  error: null,
  favorites: [],
};

const camperSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    fetchCampersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCampersSuccess: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.campers = action.payload;
      } else {
        console.error('Payload is not an array:', action.payload);
      }
      state.loading = false;
      state.error = null;
    },
    fetchCampersFailure(state, action) {
      console.error('Fetching campers failed:', action.payload);
      state.loading = false;
      state.error = action.payload || 'Failed to fetch campers';
    },

    // toggleFavorite(state, action) {
    //   const camperId = action.payload;
    //   const camper = state.campers.find(c => c._id === camperId);
    //   if (camper) {
    //     camper.isFavorite = !camper.isFavorite;
    //   }
    // },

    // toggleFavorite(state, action) {
    //   const camperId = action.payload;
    //   const camperIndex = state.campers.findIndex(c => c._id === camperId);
    //   if (camperIndex !== -1) {
    //     state.campers[camperIndex].isFavorite = state.campers.map(
    //       (camper, index) =>
    //         index === camperIndex
    //           ? {
    //               ...camper,
    //               isFavorite: !state.isFavorite,
    //             }
    //           : camper,
    //     );
    //   }
    // },

    // toggleFavorite(state, action) {
    //   const camperId = action.payload;
    //   const camperIndex = state.campers.findIndex(c => c._id === camperId);
    //   if (camperIndex !== -1) {
    //     state.campers[camperIndex].isFavorite =
    //       !state.campers[camperIndex].isFavorite;
    //   }
    // },

    toggleFavorite(state, action) {
      const camperId = action.payload;
      const camperIndex = state.campers.findIndex(c => c._id === camperId);

      if (camperIndex !== -1) {
        const isFavorite = !state.campers[camperIndex].isFavorite;
        state.campers[camperIndex].isFavorite = isFavorite;

        if (isFavorite) {
          // Добавляем ID кемпера в список избранного
          state.favorites.push(camperId);
        } else {
          // Удаляем ID кемпера из списка избранного
          state.favorites = state.favorites.filter(id => id !== camperId);
        }
      }
    },
  },
});

export const {
  fetchCampersStart,
  fetchCampersSuccess,
  fetchCampersFailure,
  toggleFavorite,
} = camperSlice.actions;

export default camperSlice.reducer;

// Selectors
export const selectLoading = state => state.campers.loading;
export const selectCampers = state => state.campers.campers;
export const selectFavorites = state => state.campers.favorites;
