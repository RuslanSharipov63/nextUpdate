import { loadingType } from './../types/type';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";

export const fetchUpdateProfile = createAsyncThunk(
    'name/fetchupdateprofile',
    async function (dataUpdateProfile: {
        id: string;
        fullName: string;
        email: string;
        avatarUrl: string;
    }) {
        let token = await window.localStorage.getItem('token');
        const JSONdata = JSON.stringify(dataUpdateProfile);
        const response = await fetch(`${BASE_URL}/updateprofile`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSONdata
        })

        const data = await response.json();
        return data;
    }
)

type initialStateType = {
    succes: boolean;
    loading: loadingType
}

const initialState: initialStateType = {
    succes: false,
    loading: '',
}

const updateProfileSlice = createSlice({
    name: 'name/updateprofileslice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpdateProfile.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
                state.succes = action.payload.succes
                state.loading = 'fulfilled'
            })
            .addCase(fetchUpdateProfile.rejected, (state) => {
                state.loading = 'rejected'
            })
    }
})

export default updateProfileSlice.reducer;