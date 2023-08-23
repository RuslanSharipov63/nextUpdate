import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";

export const fetchDeleteProfile = createAsyncThunk(
  "name/fetchdeleteprofile",
  async function (id: string) {
    let token = await window.localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/author/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  }
);

export const fetchDeletePhotoProfile = createAsyncThunk(
  "name/fetchdeletephotoprofile",
  async function (id: string) {
    const formData = new FormData();
    formData.append("id", id);
    const response = await fetch("/api/profiledelete", {
      method: "DELETE",
      body: formData,
    });
    const data = await response.json();
    return data;
  }
);

type initialStateType = {
  succes: {
    succes: boolean;
  };
  loading: string;
};

const initialState: initialStateType = {
  succes: {
    succes: false,
  },
  loading: "",
};

const deleteProfileSlice = createSlice({
  name: "name/deleteprofileslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeleteProfile.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDeleteProfile.fulfilled, (state, action) => {
        state.succes = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(fetchDeleteProfile.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchDeletePhotoProfile.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDeletePhotoProfile.fulfilled, (state, action) => {
        state.succes = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(fetchDeletePhotoProfile.rejected, (state) => {
        state.loading = "rejected";
      })
  },
});

export default deleteProfileSlice.reducer;
