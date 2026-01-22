import { combineReducers, configureStore } from '@reduxjs/toolkit';

import newsReducer from './slices/newsSlice';

const store = configureStore({
  reducer: combineReducers({
    news: newsReducer,
  }),
});

export default store;
