import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../modules/signUpSlice";
import loginReducer from "../modules/loginSlice"

const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        login: loginReducer,
    },
});

export default store;