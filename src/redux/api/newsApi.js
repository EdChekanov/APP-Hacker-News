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

export const getNewsItem = createAsyncThunk(
  'newsItem/getNewsItem',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/item/${id}.json`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loadComments = createAsyncThunk(
  'newsItem/loadComments',
  async ({ comments, parentId }, thunkAPI) => {
    try {
      const commentPromises = comments.map((commentId) => {
        return api
          .get(`/item/${commentId}.json`)
          .then((resp) => resp.data)
          .catch(() => null);
      });

      const loadedComments = await Promise.all(commentPromises);
      const validComments = loadedComments.filter(Boolean);

      return thunkAPI.fulfillWithValue({
        comments: validComments,
        parentId,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
