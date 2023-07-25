import { configureStore } from "@reduxjs/toolkit";
import PhotoListSlice from "./PhotoListSlice";
import PhotoSlice from "./PhotoSlice";
import PhotosAuthorSlice from "./PhotosAuthorSlice";

export const store = configureStore({
  reducer: {
    PhotoListSlice,
    PhotoSlice,
    PhotosAuthorSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
