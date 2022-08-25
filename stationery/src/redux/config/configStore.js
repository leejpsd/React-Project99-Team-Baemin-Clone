import { configureStore } from "@reduxjs/toolkit";
import list from '../modules/list';
import detail from '../modules/detail';
import comment from '../modules/comment';

const store = configureStore({
    reducer: { list,detail,comment },
});

export default store;