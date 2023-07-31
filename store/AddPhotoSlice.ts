import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "@/baseValue";
import { PhotoType, loadingType } from "@/types/type";


export const fetchAddPhoto = createAsyncThunk(
    'name/fetchaddphoto',
    async function (newPhoto: any/* : {
        imageURL: string,
        tags: string[];
        user: string,
        size: number
    } */, thunkAPI) {
console.log(newPhoto)
        let token = await window.localStorage.getItem('token');
        const JSONdata = await JSON.stringify(newPhoto);
        console.log(JSONdata)
        const response = await fetch(`${BASE_URL}/photo`, {
            "method": 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                /*  "Content-Type": "application/json", */
            },
            body: newPhoto,
        })
        const data = await response.json()
        return data;
    }
)

const initialState = {
    photo: <PhotoType>{
        _id: '',
        imageURL: '',
        tags: [],
        user: '',
        size: 0,
        createdAt: '',
        updatedAt: '',
    },
    loading: <loadingType>''
}

const AddPhotoSlice = createSlice({
    name: 'addphoto',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddPhoto.pending, (state, action) => {
                state.loading = 'pending'
            })
            .addCase(fetchAddPhoto.fulfilled, (state, action) => {
                state.photo = action.payload
                state.loading = 'fulfilled'
            })
            .addCase(fetchAddPhoto.rejected, (state, action) => {
                state.loading = 'rejected'
            })
    }
})

export default AddPhotoSlice.reducer