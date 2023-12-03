import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type initialStateChangeInputType = {
    id: string | string[];
    tagsStore: string;
    priceStore: string;
    errorTagsStore: string;
    errorPriceStore: string;
    searchtags: string;
}

const initialState: initialStateChangeInputType = {
    id: '',
    tagsStore: '',
    priceStore: '',
    errorTagsStore: '',
    errorPriceStore: '',
    searchtags: '',
}

const changeInputSlice = createSlice({
    name: 'changeInputSlice',
    initialState,
    reducers: {
        idStore: (state, action: PayloadAction<string | string[]>) => {
            state.id = action.payload;
            state.errorTagsStore = '';
        },
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
        tagsSearchChange: (state, action: PayloadAction<string>) => {
            state.searchtags = action.payload;
        },
        clearSearchTags: (state) => {
            state.searchtags = '';
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
    setPriceError,
    idStore,
    tagsSearchChange,
    clearSearchTags
} = changeInputSlice.actions;
export default changeInputSlice.reducer;