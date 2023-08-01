import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { loadingType } from "@/types/type";

export const fetchUploadPhoto = createAsyncThunk(
  "name/fetchuploadphoto",
  async function (
    newPhoto: {
      fileObg: any;
      imageURL: string;
      tags: string;
      user: string;
      size: string;
    },
    thunkAPI
  ) {
    let token = await window.localStorage.getItem("token");
    const formData = await new FormData();
    formData.append("file", newPhoto.fileObg);
   /*  formData.append("imageURL", newPhoto.imageURL);
    formData.append("tags", newPhoto.tags);
    formData.append("user", newPhoto.user);
    formData.append("size", newPhoto.size); */

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  }
);

type photoURLType = {
  photoUpload: {
    error?: string;
    status?: number;
    fileURL?: string;
  };
  loading: loadingType;
};

const initialState: photoURLType = {
  photoUpload: {
    fileURL: "",
    status: 0,
    error: "",
  },
  loading: "",
};

const UploadPhotoSlice = createSlice({
  name: "uploadphoto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadPhoto.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUploadPhoto.fulfilled, (state, action) => {
        state.photoUpload = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(fetchUploadPhoto.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default UploadPhotoSlice.reducer;
