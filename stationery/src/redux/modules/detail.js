import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDetail = createAsyncThunk(
  "detail/getDetail",
  async (id, thunkAPI) => {
    try {
      const data = await axios.get(`http://hosung.shop/api/v1/products/${id}`)
      //       .then((response) => {
      //   console.log(response.data.data);
      // });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  detail: [],
  isLoading: false,
  error: null,
};


export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
},
  extraReducers: {
    [getDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
  }
}
)

export const {} = detailSlice.actions;
export default detailSlice.reducer;
