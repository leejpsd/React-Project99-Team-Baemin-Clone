import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (id, thunkAPI) => {
    try {
      const data = await axios.get(`https://hosung.shop/api/v1/review/${id}`)
      //       .then((response) => {
      //   console.log(response);
      // });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postComment = createAsyncThunk(
  "comment/postComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`https://hosung.shop/api/v1/review/${payload.id}`, {content:payload.content},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      })
      //   .then((response) => {
      //   console.log(response.data.data);
      // });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const data = await axios.put(`https://hosung.shop/api/v1/review/${payload.id}`, 
      {
        content:payload.content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      })
      //   .then((response) => {
      //   console.log(response.data.data);
      // });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    console.log(id)
    try {
      const data = await axios.delete(`https://hosung.shop/api/v1/review/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      })
      //   .then((response) => {
      //   console.log(response.data.data);
      // });
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  comment: [],
  isLoading: false,
  error: null,
};


export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
},
  extraReducers: {
    [getComment.fulfilled]: (state, action) => {
      state.comment = action.payload;
    },
    [postComment.fulfilled]: (state, action) => {
      state.comment.push(action.payload);
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comment = state.comment.filter((list) => list.id !== action.payload)
    },
    [editComment.fulfilled]: (state, action) => {
      state.comment = state.comment.map((list) => list.id === action.payload.id 
      ? { ...list, 'content':action.payload.content} 
      : list)
    },
  }
}
)

export const {} = commentSlice.actions;
export default commentSlice.reducer;
