import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { loadingType } from "@/types/type";

export const fetchUploadUserForRegistration = createAsyncThunk(
  "name/fetchUploadUserForRegistration",
  async function (dataUserPhoto: { fileName: any; email: string }) {
    const formData = await new FormData();
    formData.append("file", dataUserPhoto.fileName);
    formData.append("email", dataUserPhoto.email);
    const response = await fetch("/api/userupload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

const fetchRegistration = createAsyncThunk(
  "name/fetchregistration",
  async function (userDataREgistration) {
    const JSONdata = JSON.stringify(userDataREgistration);
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });
    const data = await response.json();
    return data;
  }
);

type initialStateType = {
  dataResponse: {
    error?: string | undefined;
    fileUrl?: string | undefined;
    message?: string | undefined;
  };
  loading: loadingType;
};

const initialState: initialStateType = {
  dataResponse: {
    error: undefined,
    fileUrl: undefined,
    message: undefined,
  },
  loading: "",
};

const registrationSlice = createSlice({
  name: "name/registrationslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadUserForRegistration.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUploadUserForRegistration.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.dataResponse = action.payload;
      })
      .addCase(fetchUploadUserForRegistration.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default registrationSlice.reducer;
