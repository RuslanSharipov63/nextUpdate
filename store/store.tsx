import { configureStore } from "@reduxjs/toolkit";
import PhotoListSlice from "./PhotoListSlice";
import PhotoSlice from "./PhotoSlice";

export const store = configureStore({
  reducer: {
    PhotoListSlice,
    PhotoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
