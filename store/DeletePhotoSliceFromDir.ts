import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadingType } from "@/types/type";

export const fetchDeletePhotoFromDir = createAsyncThunk(
  "name/fetchdeletephotofromdir",
  async function (name: string) {
    let token = await window.localStorage.getItem("token");
    const formData = await new FormData();
    formData.append("fileName", name);
    const response = await fetch("/api/delete", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  }
);

type initialStateType = {
  scces?: boolean;
};

const initialState = {
  succes: <initialStateType>{
    succes: false
  },
  loading: <loadingType>"",
};

const deletePhotoSliceFromDir = createSlice({
  name: "deletephotoslicefromdir",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeletePhotoFromDir.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDeletePhotoFromDir.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.succes = action.payload;
      })
      .addCase(fetchDeletePhotoFromDir.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default deletePhotoSliceFromDir.reducer;