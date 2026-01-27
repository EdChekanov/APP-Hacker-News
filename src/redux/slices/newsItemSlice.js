import { createSlice } from '@reduxjs/toolkit';
import { getNewsItem, loadComments } from '../api/newsApi';

const initialState = {
  value: null,
  comments: {},
  loading: false,
  commentsLoading: false,
  error: null,
  loadStack: [],
};

const newsItemSlice = createSlice({
  name: 'newsItem',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = {};
      state.loadStack = [];
    },
    addToLoadStack: (state, action) => {
      state.loadStack.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsItem.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments[action.payload.parentId] = action.payload.comments;
      })
      .addCase(getNewsItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadComments.pending, (state) => {
        state.commentsLoading = true;
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
          state.commentsLoading = false;
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
    selectNewsItem: (state) => state.value,
    selectComments: (state) => state.comments,
    selectLoading: (state) => state.loading,
    selectCommentLoading: (state) => state.commentsLoading,
    selectError: (state) => state.error,
    selectLoadStack: (state) => state.loadStack,
  },
});

export const {
  selectNewsItem,
  selectComments,
  selectLoading,
  selectCommentLoading,
  selectError,
  selectLoadStack,
} = newsItemSlice.selectors;
export const { resetComments, addToLoadStack } = newsItemSlice.actions;
export default newsItemSlice.reducer;
