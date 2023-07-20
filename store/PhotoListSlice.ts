import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const PhotoListAsyncThunk = createAsyncThunk(
    "photo/getAllPhoto",
    async function (_, thunkAPI) {
        const response = await fetch("http://localhost:4000/photos", {
            next: { revalidate: 60 }
        });
        const data = await response.json();
        return data;
    }
);

export interface IinitialStateList {
    imageURL: string;
    tags: Array<string>;
    user: string;
    size: number;
}

export type initialStateType = {
    list: IinitialStateList[];
    loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: initialStateType = {
    list: [
        {
            imageURL: "",
            tags: [],
            user: "",
            size: 0,
        },
    ],
    loading: "idle",
};

export const PhotoListSlice = createSlice({
    name: "photolist",
    initialState,
    reducers: {
        getPhotoList: (state, action: PayloadAction<IinitialStateList[]>) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(PhotoListAsyncThunk.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(PhotoListAsyncThunk.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = "succeeded";
            })
            .addCase(PhotoListAsyncThunk.rejected, (state) => {
                state.loading = "failed";
            })

    },
});

export const { getPhotoList } = PhotoListSlice.actions;
export default PhotoListSlice.reducer;
