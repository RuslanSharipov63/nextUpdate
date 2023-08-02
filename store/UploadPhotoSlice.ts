import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadingType } from "@/types/type";


export const fetchUploadPhoto = createAsyncThunk(
    "name/fetchuploadphoto",
    async function (
        newPhoto: any,
        thunkAPI
    ) {
        let token = await window.localStorage.getItem("token");
        const formData = await new FormData();
        formData.append("file", newPhoto);
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        return data;

    }
);

type photoURLType = {
    fileURL: {
        [x: string]: any;
        fileURL: string
    }
    loading: loadingType;
};

const initialState: photoURLType = {
    fileURL: {
        fileURL: ''
    },
    loading: "",
};

const UploadPhotoSlice = createSlice({
    name: "uploadphoto",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadPhoto.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchUploadPhoto.fulfilled, (state, action) => {
                state.fileURL = action.payload;
                state.loading = "fulfilled";
            })
            .addCase(fetchUploadPhoto.rejected, (state) => {
                state.loading = "rejected";
            });
    },
});

export default UploadPhotoSlice.reducer;
