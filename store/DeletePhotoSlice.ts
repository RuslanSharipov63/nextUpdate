import { initialStateType } from './../types/type';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";

export const fetchDeletePhoto = createAsyncThunk(
    'name/fetchdeletephoto',
    async function (id: string) {
        let token = await window.localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/photo/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const data = await response.json();
        return data;
    }
)

type responseSuccesType = {
    succes?: boolean;
    message?: string;
}

const initialState = {
    succes: <responseSuccesType>{
        succes: false,
        message: '',
    },
    loading: <string>''
}

const deletePhotoSlice = createSlice({
    name: 'deletephotoslice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeletePhoto.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(fetchDeletePhoto.fulfilled, (state, action) => {
                state.succes = action.payload
                state.loading = 'fulfilled'
            })
            .addCase(fetchDeletePhoto.rejected, (state) => {
                state.loading = 'rejected'
            })
    }
})

export default deletePhotoSlice.reducer