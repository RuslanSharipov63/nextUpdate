import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ButtonType = {
    disabledValueUpload: boolean;
    disabledValueDelete: boolean;
    disabledValueUpdate: boolean;
}

const initialState: ButtonType = {
    disabledValueUpload: false,
    disabledValueDelete: false,
    disabledValueUpdate: false,
}

const ButtonSlice = createSlice({
    name: 'name/buttonslice',
    initialState,
    reducers: {
        changeDisabledButton: (state, action: PayloadAction<string | null>) => {
            switch (action.payload) {
                case 'disabledValueUpload':
                    state.disabledValueUpload = !state.disabledValueUpload;
                    break;
                case 'disabledValueUpdate':
                    state.disabledValueUpdate = !state.disabledValueUpdate;
                    break;
                case 'disabledValueDelete':
                    state.disabledValueDelete = !state.disabledValueDelete;
                    break;
                default:
                    state.disabledValueUpload = false;
                    state.disabledValueDelete = false;
                    state.disabledValueUpdate = false;
                    break;
            }

        },
    }
})
export const { changeDisabledButton } = ButtonSlice.actions;
export default ButtonSlice.reducer;