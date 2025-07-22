import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scienceNewsApi } from "../../api/scienceNewsApi";

export const getScienceNews = createAsyncThunk(
  "news/getScienceNews",
  async (_, thunkAPI) => {
    try {
      const articles = await scienceNewsApi();
      return articles;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const NewsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScienceNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScienceNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getScienceNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default NewsSlice.reducer;
