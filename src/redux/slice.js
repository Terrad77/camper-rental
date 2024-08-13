import { createSlice } from '@reduxjs/toolkit';

const Slice = createSlice({
  name: 'example',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state) {
      state.loading = false;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  Slice.actions;

export default Slice.reducer;

// Selectors
export const selectLoading = state => state?.loading;
