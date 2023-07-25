import { configureStore } from "@reduxjs/toolkit";
import PhotoListSlice from "./PhotoListSlice";
import PhotoSlice from "./PhotoSlice";
import PhotosAuthorSlice from "./PhotosAuthorSlice";
import AuthSlice from "./AuthSlice";

export const store = configureStore({
  reducer: {
    PhotoListSlice,
    PhotoSlice,
    PhotosAuthorSlice,
    AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
