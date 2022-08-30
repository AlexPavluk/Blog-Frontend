import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const{data} = await axios.get('/posts')
    return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => 
    axios.delete(`/posts/${id}`),
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchPostsPopulate = createAsyncThunk('posts/fetchPostsPopulate', async () => {
    const{data} = await axios.get('/posts/populate');
    return data;
})

const initialState = {
    posts: {
        items:[],
        status: 'loading'
    },
    tags: {
        items:[],
        status: 'loading'
    }
}


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    //  populate  (state, action)  {
    //         state.posts = fetchPosts.sort(viewsCount)
    //     }
    },
    extraReducers: {
        //Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'Loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state,) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //Полуение тегов
        [fetchTags.pending]: (state) => {
            state.tags.status = 'Loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state,) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        //Получение популярных статей 
        [fetchPostsPopulate.pending]: (state) => {
            state.posts.status = 'Loading';
        },
        [fetchPostsPopulate.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostsPopulate.rejected]: (state,) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postSlice.reducer;