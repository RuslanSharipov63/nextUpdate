import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IinitialStateList,initialStateType } from "@/types/type";
import { BASE_URL } from "@/baseValue";

export const PhotoListAsyncThunk = createAsyncThunk(
  "photo/getAllPhoto",
  async function (_, thunkAPI) {
    const response = await fetch(`${BASE_URL}/photos`, {
      next: { revalidate: 60 },
    });
    const data = await response.json();
    return data;
  }
);


const initialState: initialStateType = {
  list: [
    {
      _id: "",
      imageURL: "",
      tags: [],
      user: {
        _id: "",
        fullName: "",
        email: "",
        passwordHash: "",
        createdAt: "",
        updatedAt: "",
      },
      size: 0,
      createdAt: '',
    },
  ],
  loading: "",
};

export const PhotoListSlice = createSlice({
  name: "photolist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PhotoListAsyncThunk.pending, (state) => {
        state.list = [];
        state.loading = "pending";
      })
      .addCase(PhotoListAsyncThunk.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(PhotoListAsyncThunk.rejected, (state) => {
        state.list = [];
        state.loading = "rejected";
      });
  },
});

export default PhotoListSlice.reducer;
