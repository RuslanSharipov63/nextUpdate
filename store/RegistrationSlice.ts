import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { loadingType } from "@/types/type";
import { userDataType } from "@/types/type";

export const fetchUploadUserForRegistration = createAsyncThunk(
  "name/fetchUploadUserForRegistration",
  async function (dataUploadUser: { file?: any; id: string }) {
    const formData = await new FormData();
    if (dataUploadUser.file) {
      formData.append("file", dataUploadUser.file);
    }
    formData.append("id", dataUploadUser.id);
    const response = await fetch("/api/userupload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  }
);

export const fetchRegistration = createAsyncThunk(
  "name/fetchregistration",
  async function (userDataREgistration: {
    fullName: string;
    email: string;
    avatarUrl: any;
    password: string;
  }) {
    const JSONdata = JSON.stringify(userDataREgistration);
    console.log(JSONdata, 'json slice')
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
  userData: userDataType,
  dataResponse: {
    error?: string | undefined;
    fileUrl?: string | undefined;
    message?: string | undefined;
  };
  loading: loadingType;
  message: string;
};

const initialState: initialStateType = {
  userData: {
    _id: '',
    fullName: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    avatarUrl: '',
    token: '',
  },
  dataResponse: {
    error: undefined,
    fileUrl: undefined,
    message: undefined,
  },
  loading: "",
  message: '',
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
      })
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        action.payload["message"] != undefined ? state.message = action.payload : state.userData = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state) => {
        state.loading = 'rejected'
      })
  },
});

export default registrationSlice.reducer;
