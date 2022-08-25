import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const __loginUsers = createAsyncThunk(
    "login/loginUsers",
    async (payload, thunkAPI) => {
        console.log(payload)

        try {
            const data = await axios.post("http://hosung.shop/api/v1/login", {
                username: payload.id,
                password: payload.pw,
            })
            // .then((response) => {
            //     console.log(response)
            //     // const accessToken = response.headers.authorization;
            //     window.localStorage.setItem(
            //         "token", response.headers.authorization
            //     );
            //     console.log(response)
            // });
            // console.log(data.headers.authorization)
            // if (Response.status === 200 || Response.status === 201) {
            window.localStorage.setItem(
                "token", data.headers.authorization)
            alert('로그인 성공')
            window.location.replace('/')
            return thunkAPI.fulfillWithValue(data.data.data.username);
            // }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    login: [],
    isLoading: false,
    error: null,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // login: (state, action) => {
        //     state.signUp = action.payload;
        //     console.log(action.payload);
        // },
    },
    extraReducers: {
        [__loginUsers.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [__loginUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.login = action.payload;
            console.log(action.payload)
        },
        [__loginUsers.rejected]: (state, { payload }) => {
            state.isloading = false;
            state.error = payload;
        },
    },
});

export const { } = loginSlice.actions;

export default loginSlice.reducer;