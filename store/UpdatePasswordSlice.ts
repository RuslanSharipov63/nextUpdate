import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";

export const fetchUpdatePassword = createAsyncThunk(
    'name/fetchupdatepassword',
    async function (value: {
        email: string;
        password: string;
        unicpath: string
    }) {
        const passData = {
            email: value.email,
            password: value.password
        }
        const dataJSON = JSON.stringify(passData);
        const response = await fetch(`${BASE_URL}/reconstructionpass/${value.unicpath}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: dataJSON
        })
        const data = await response.json();
        return data;

    }
)

type initialStateType = {
    success: { success: boolean | null };
    token?: { token: string | null };
    loading?: string;
}

const initialState: initialStateType = {
    success: { success: null },
    token: { token: null },
    loading: '',
}

const UpdatePasswordSlice = createSlice({
    name: 'updatepasswordslice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpdatePassword.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(fetchUpdatePassword.fulfilled, (state, action) => {
                { action.hasOwnProperty('token') ? state.token = action.payload : state.success = action.payload }
            })
            .addCase(fetchUpdatePassword.rejected, (state) => {
                state.loading = 'rejected'
            })
    }
})

export default UpdatePasswordSlice.reducer;