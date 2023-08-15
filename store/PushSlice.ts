import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  pushBol: boolean;
  message: string;
};

const initialState: initialStateType = {
  pushBol: false,
  message: "",
};

const pushSlice = createSlice({
  name: "name/pushslice",
  initialState,
  reducers: {
    changePush: (state, action: PayloadAction<string | null>) => {
      switch (action.payload) {
        case "delete":
          state.pushBol = !state.pushBol;
          state.message = "фото удалено";
          break;
        case "add":
          state.pushBol = !state.pushBol;
          state.message = "фото добавлено";
          break;
        case "update":
          state.pushBol = !state.pushBol;
          state.message = "информация обновлена";
          break;
        default:
          state.pushBol = false;
          state.message = "";
          break;
      }
    },
  },
});

export const { changePush } = pushSlice.actions;
export default pushSlice.reducer;
