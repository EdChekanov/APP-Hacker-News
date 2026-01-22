import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const getNews = createAsyncThunk('news/getNews', async (_, thunkAPI) => {
  try {
    const response = await api.get('/newstories.json');
    const newsIds = response.data.slice(0, 100);

    const newsPromises = newsIds.map(async (id) => {
      const response = await api.get(`/item/${id}.json`);
      return response.data;
    });

    const news = await Promise.all(newsPromises);

    return thunkAPI.fulfillWithValue(news.filter(Boolean));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
