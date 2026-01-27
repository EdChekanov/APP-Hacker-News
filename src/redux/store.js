import { configureStore } from '@reduxjs/toolkit';

import newsReducer from './slices/newsSlice';
import newsItemReducer from './slices/newsItemSlice';

import { commentsMiddleware } from './middleware/commentsMiddleware';

const store = configureStore({
  reducer: {
    news: newsReducer,
    newsItem: newsItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(commentsMiddleware.middleware),
});

export default store;
