import { createSlice } from '@reduxjs/toolkit';
import { getNews } from '../api/newsApi';

const initialState = {
  news: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
  selectors: {
    selectNews: (state) => state.news,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const { selectNews, selectLoading, selectError } = newsSlice.selectors;
export default newsSlice.reducer;
