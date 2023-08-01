import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { PhotoType, loadingType } from "@/types/type";

export const fetchAddPhoto = createAsyncThunk(
  "name/fetchaddphoto",
  async function (photo: string) {
    let token = await window.localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: photo,
    });
    const data = await response.json();
    return data;
  }
);

const initialState = {
  photo: <PhotoType>{
    _id: "",
    imageURL: "",
    tags: "",
    user: "",
    size: "",
    createdAt: "",
    updatedAt: "",
  },
  loading: <loadingType>" ",
};

const AddPhotoSlice = createSlice({
  name: "addphotoslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddPhoto.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAddPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(fetchAddPhoto.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default AddPhotoSlice.reducer;
