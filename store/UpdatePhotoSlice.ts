import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { arrForEditPhotoType } from "@/types/type";
import { BASE_URL } from "@/baseValue";
import { loadingType } from "@/types/type";

export const fetchUpdatePhoto = createAsyncThunk(
  "name/fetchupdatephoto",
  async function (updatePhoto: arrForEditPhotoType) {
    let token = await window.localStorage.getItem("token");
    const JSONdata = JSON.stringify(updatePhoto);
    const response = await fetch(`${BASE_URL}/photo`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    const data = response.json();
    return data;
  }
);

type initialStateUpdateType = {
  success: { success: boolean };
  loading: loadingType;
};

const initialState: initialStateUpdateType = {
  success: { success: false },
  loading: "",
};

const updatePhotoSlice = createSlice({
  name: "updatephotoslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatePhoto.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUpdatePhoto.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.success = action.payload;
      })
      .addCase(fetchUpdatePhoto.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default updatePhotoSlice.reducer;
