import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../modules/signUpSlice";
import loginReducer from "../modules/loginSlice"
import list from '../modules/list';
import detail from '../modules/detail';
import comment from '../modules/comment';

const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        login: loginReducer,
        list, detail, comment
    },
});

export default store;