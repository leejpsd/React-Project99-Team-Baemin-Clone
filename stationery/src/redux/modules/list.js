import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getList = createAsyncThunk(
  "list/getList",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("https://hosung.shop/api/v1/products")

      // .then((response) => {
      //   console.log(response.data.data);
      // });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getListLv = createAsyncThunk(
  "listLv/getListLv",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("https://hosung.shop/api/v1/products?category=리빙")

      // .then((response) => {
      //   console.log(response.data.data);
      // });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getListSt = createAsyncThunk(
  "listSt/getListSt",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("https://hosung.shop/api/v1/products?category=문구")

      // .then((response) => {
      //   console.log(response.data.data);
      // });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  list: [],
  isLoading: false,
  error: null,
};


export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
  highPrice: (state, action) => {
    state.list = state.list.sort(function (a, b) {
      return b.price - a.price;
    })
  },
  lowPrice: (state, action) => {
    state.list = state.list.sort(function (a, b) {
      return a.price - b.price;
    })
},
  newItem: (state, action) => {
    state.list = state.list.sort(function (a, b) {
      return a.productId - b.productId;
    })
},
},
  extraReducers: {
    [getList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
    [getListLv.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
    [getListSt.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
  }
}
)

export const {highPrice,lowPrice,newItem,searchLv} = listSlice.actions;
export default listSlice.reducer;
