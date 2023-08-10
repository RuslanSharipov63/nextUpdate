import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type initialStateChangeInputType = {
    tagsStore: string;
    priceStore: string;
    errorTagsStore: string;
    errorPriceStore: string;
}

const initialState: initialStateChangeInputType = {
    tagsStore: '',
    priceStore: '',
    errorTagsStore: '',
    errorPriceStore: '',
}

const changeInputSlice = createSlice({
    name: 'changeInputSlice',
    initialState,
    reducers: {
        tagsStoreChange: (state, action: PayloadAction<string>) => {
            state.tagsStore = action.payload;
            state.errorTagsStore = '';
        },
        priceStoreChange: (state, action: PayloadAction<string>) => {
            state.priceStore = action.payload;
            state.errorPriceStore = '';
        },
        handleStoreFocus: (state) => {
            state.tagsStore = '';
        },
        setTagsError: (state, action: PayloadAction<string>) => {
            state.errorTagsStore = action.payload
        },
        setPriceError: (state, action: PayloadAction<string>) => {
            state.errorPriceStore = action.payload
        },
    }
})

export const { tagsStoreChange,
    priceStoreChange,
    handleStoreFocus,
    setTagsError,
    setPriceError
} = changeInputSlice.actions;
export default changeInputSlice.reducer;