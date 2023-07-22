import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { initialStateType } from "@/types/type";
import { foBuilderRedux } from "@/helper/forBuilderRedux";

export const fetchPhoto = createAsyncThunk(
  "name/fetchPhoto",
  async function (_id: string, thunkAPI) {
    const response = await fetch(`${BASE_URL}/photo/${_id}`);
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
      createdAt: "",
    },
  ],
  loading: "",
};

export const PhotoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhoto.pending, (state) => {
        state.list = [];
        foBuilderRedux(state, "pending");
      })
      .addCase(fetchPhoto.fulfilled, (state, action) => {
        state.list.push(action.payload);
        foBuilderRedux(state, "fulfilled");
      })
      .addCase(fetchPhoto.rejected, (state) => {
        state.list = [];
        foBuilderRedux(state, "rejected");
      });
  },
});

export default PhotoSlice.reducer;
