import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { InitialStateAuthType, IinitialStateList } from "@/types/type";

export const fetchAuth = createAsyncThunk(
  "name/fetchauth",
  async function (value: { email: string; password: string }, thunkAPI) {

    const userData = {
      email: value.email,
      password: value.password,
    }
    const JSONdata = JSON.stringify(userData)
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    );
    const data = await response.json();
    return data;
  }
);

const initialState: InitialStateAuthType = {
  userData: {
    fullName: "",
    email: "",
    avatarUrl: "",
    token: "",
  },
  loading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state, action) => {
        state.userData && action.payload;
        state.loading = false;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = true;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.userData && action.payload;
        state.loading = false;
      });
  },
});

export default AuthSlice.reducer;
