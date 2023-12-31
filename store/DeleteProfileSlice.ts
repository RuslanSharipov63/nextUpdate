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
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  }
);


export const fetchImageUrlUser = createAsyncThunk(
  'name/fetchimageurluser',
  async function (id: string) {
    const response = await fetch(`${BASE_URL}/photoauthor/${id}`, {
      method: 'POST'
    })
    const data = await response.json();
    return data;
  })
 
export const fetchDeleteImageUrlUser = createAsyncThunk(
  'name/fetchdeleteimageurluser',
  async function (imageURL:string[]) {
    const formData = new FormData();
    formData.append("imageURL", JSON.stringify(imageURL));
    const response = await fetch('/api/deleteallphotouser', {
      method: 'POST',
      body: formData
    })
    const data = await response.json();
    return data;
  }) 



type initialStateType = {
  listImageUrlUser: {
      [x: string]: string; id: string 
}[];
  success: {
    success: boolean;
  }
  loading: string;
}

const initialState: initialStateType = {
  listImageUrlUser: [{
    id: '',
  }],
  success: {
    success: false,
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
        state.success = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(fetchDeleteProfile.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchDeletePhotoProfile.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDeletePhotoProfile.fulfilled, (state, action) => {
        state.success = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(fetchDeletePhotoProfile.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchImageUrlUser.fulfilled, (state, action) => {
        state.listImageUrlUser = action.payload;
      })
  },
});

export default deleteProfileSlice.reducer;
