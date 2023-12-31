import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, IinitialStateList } from "@/types/type";
import { BASE_URL } from "@/baseValue";


export const fetchPhotosAuthor = createAsyncThunk(
    'photo/photosAuthor',
    async function (id: string | string[], thunkAPI) {
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
            tags: '',
            user: {
                _id: "",
                fullName: "",
                email: "",
                passwordHash: "",
                createdAt: "",
                updatedAt: "",
            },
            price: 0,
            size: 0,
            createdAt: '',
        },
    ],
    loading: "",
};

export const PhotoAuthorSlice = createSlice({
    name: "photolist",
    initialState,
    reducers: {
        actionPhotoAuthor: (state, action: PayloadAction<IinitialStateList>) => {
            state.list.push(action.payload)
        }
    },
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
export const { actionPhotoAuthor } = PhotoAuthorSlice.actions;
export default PhotoAuthorSlice.reducer;