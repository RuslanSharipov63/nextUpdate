import { configureStore } from "@reduxjs/toolkit";
import PhotoListSlice from "./PhotoListSlice";

export const store = configureStore({
  reducer: {
    PhotoListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
