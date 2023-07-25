import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType } from "@/types/type";
import { BASE_URL } from "@/baseValue";


export const fetchPhotosAuthor = createAsyncThunk(
    'photo/photosAuthor',
    async function (id: string, thunkAPI) {
        const response = await fetch(`${BASE_URL}/photos/${id}`)
        const data = await response.json();
        return data;
    }
);



const initialState: initialStateType = {
    list: [
        {
            _id: "",
            imageURL: "",
            tags: [],
            user: {
                _id: "",
                fullName: "",
                email: "",
                passwordHash: "",
                createdAt: "",
                updatedAt: "",
            },
            size: 0,
            createdAt: '',
        },
    ],
    loading: "",
};

export const PhotoAuthorSlice = createSlice({
    name: "photolist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotosAuthor.pending, (state) => {
                state.list = [];
                state.loading = "pending";
            })
            .addCase(fetchPhotosAuthor.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = "fulfilled";
            })
            .addCase(fetchPhotosAuthor.rejected, (state) => {
                state.list = [];
                state.loading = "rejected";
            });
    },
});

export default PhotoAuthorSlice.reducer;