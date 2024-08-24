import { createSlice } from '@reduxjs/toolkit';
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
    },
    fetchPostsSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchPostsFailure(state) {
      state.loading = false;
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } =
  postsSlice.actions;

export default postsSlice.reducer;

// Selectors
export const selectLoading = state => state.posts.loading;
export const selectPosts = state => state.posts.data;
