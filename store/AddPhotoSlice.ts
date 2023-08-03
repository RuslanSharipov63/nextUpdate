import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { PhotoType, loadingType } from "@/types/type";

export const fetchAddPhoto = createAsyncThunk(
  "name/fetchaddphoto",
  async function (photo: {
    imageURL: string;
    tags: string;
    user: string;
    size: number;
    price?: number
  }) {
    const photoData = {
      imageURL: photo.imageURL,
      tags: photo.tags,
      user: photo.user,
      size: photo.size,
      price: photo.price
    };
    let token = await window.localStorage.getItem("token");
    const JSONdata = JSON.stringify(photoData);
console.log(photoData)
    const response = await fetch(`${BASE_URL}/photo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSONdata,
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
    price: 0,
    size: 0,
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
