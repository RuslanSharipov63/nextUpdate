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

export const fetchUpdateUploadPhotoUser = createAsyncThunk(
    'name/fetchupdateuploadphotouser',
    async function (dataUserUpdatePhoto: { id: string, file: Blob | null }) {
        const formData = await new FormData();
        formData.append('id', dataUserUpdatePhoto.id);
        if (dataUserUpdatePhoto.file) {
            formData.append('file', dataUserUpdatePhoto.file)
        }
        const response = await fetch('/api/updateprofile', {
            method: 'POST',
            body: formData
        })
        const data = await response.json();
        return data;
    }
)


type initialStateType = {
    success: { success: boolean };
    loading: loadingType
    fileUrl: { fileUrl: string }
}

const initialState: initialStateType = {
    success: { success: false },
    loading: '',
    fileUrl: { fileUrl: '' }
}

const updateProfileSlice = createSlice({
    name: 'name/updateprofileslice',
    initialState,
    reducers: {
        resetFileUrl: (state) => {
            state.fileUrl.fileUrl = '';
            state.success.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpdateProfile.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
                state.success = action.payload
                state.loading = 'fulfilled'
            })
            .addCase(fetchUpdateProfile.rejected, (state) => {
                state.loading = 'rejected'
            })
            .addCase(fetchUpdateUploadPhotoUser.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(fetchUpdateUploadPhotoUser.fulfilled, (state, action) => {
                state.fileUrl = action.payload
                state.loading = 'fulfilled'
            })
            .addCase(fetchUpdateUploadPhotoUser.rejected, (state) => {
                state.loading = 'rejected'
            })
    }
})
export const { resetFileUrl } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;