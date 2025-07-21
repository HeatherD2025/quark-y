import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchScienceNews } from '../../api/newsApi';

export const getScienceNews = createAsyncThunk('news/getScienceNews', async () => {
    return await fetchScienceNews();
});

const NewsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [],
        loading: false,
        error: null,
    },
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
    }
});

export default NewsSlice.reducer