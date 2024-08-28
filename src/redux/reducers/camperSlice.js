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
      // console.log('Fetching campers success:', action.payload); // [{13}]
      // console.log(Array.isArray(action.payload));
      // if (!state.campers) {
      //   state.campers = []; // Ensure campers is always an array
      // }
      if (Array.isArray(action.payload)) {
        // console.log('state', current(state));
        // console.log(action);
        // console.log('state.campers', state.campers); // undefined
        // state.campers.splice(0, state.campers.length, ...action.payload);
        // state.campers = action.payload;
        state.campers = action.payload;
        // console.log('state.campers', state.campers); // undefined
        // state.campers = [...action.payload];
        //Immer поддерживает безопасное обновление массива через методы, push, splice, и при помощи создания новых массивов. Прямое присвоение массива может вызвать ошибки
      } else {
        console.error('Payload is not an array:', action.payload);
      }
      state.loading = false;
      state.error = null;
      // return state;
    },
    fetchCampersFailure(state, action) {
      //   console.error('Fetching campers failed:', action.payload);
      //   state.loading = false;
      //   state.error = action.payload || 'Failed to fetch campers';
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
    toggleFavorite(state, action) {
      const camperId = action.payload;
      const camperIndex = state.campers.findIndex(c => c._id === camperId);
      if (camperIndex !== -1) {
        state.campers[camperIndex].isFavorite =
          !state.campers[camperIndex].isFavorite;
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
