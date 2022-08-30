import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js';

export const fetchAuth = createAsyncThunk ('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
}) 

export const fetchRegister = createAsyncThunk ('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk ('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})

const initialState = {
    data: null,
    status: 'Loading',
}

const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'Loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state,) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'Loading';
            state.data = null;
        },

        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state,) => {
            state.status = 'error';
            state.data = null;
        },

        [fetchRegister.pending]: (state) => {
            state.status = 'Loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state,) => {
            state.status = 'error';
            state.data = null;
        },
        

    }
}) 

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReduser = authSlices.reducer;

export const { logout } = authSlices.actions