import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    signUp: [],
};

const register = (payload) => {

    const userData = {
        username: payload.username,
        password: payload.password,
        passwordConfirm: payload.passwordConfirm,
        email: payload.email,
        birthday: payload.birthday,
    }

    axios({
        method: "post",
        url: 'https://hosung.shop/api/v1/signup',
        // headers: { 'Content-Type': 'application/json' },
        data: userData,
    })
        .then(function a(response) {
            alert('환영합니다');
            window.location.replace('/login');
        })
        .catch(function (error) {
            console.log('가입실패');
        })
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.signUp = action.payload;
            register(action.payload);
        },
    },
})

export const { addUser } = signUpSlice.actions;
export default signUpSlice.reducer;
