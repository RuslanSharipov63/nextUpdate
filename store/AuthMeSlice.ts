import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { InitialStateAuthType } from "@/types/type";

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchauthme',
    async function (_, thunkAPI) {
        let token = await window.localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json();
        return data;
    }
)

const initialState: InitialStateAuthType = {
    userData: {
        _id: "",
        fullName: "",
        email: "",
        createdAt: "",
        updatedAt: "",
        avatarUrl: "",
    },
    loading: false
}

let authMeSlice = createSlice({
    name: 'authme',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthMe.pending, (state) => {
                state.loading = false
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.userData = action.payload
                state.loading = true
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.loading = false
            })
    }

})

export default authMeSlice.reducer