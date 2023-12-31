import { configureStore } from "@reduxjs/toolkit";
import PhotoListSlice from "./PhotoListSlice";
import PhotoSlice from "./PhotoSlice";
import PhotosAuthorSlice from "./PhotosAuthorSlice";
import AuthSlice from "./AuthSlice";
import AuthMeSlice from "./AuthMeSlice";
import UploadPhotoSlice from "./UploadPhotoSlice";
import AddPhotoSlice from "./AddPhotoSlice";
import DeletePhotoSlice from "./DeletePhotoSlice";
import DeletePhotoSliceFromDir from "./DeletePhotoSliceFromDir";
import ChangeInputSlice from "./ChangeInputSlice";
import UpdatePhotoSlice from "./UpdatePhotoSlice";
import ButtonSlice from "./ButtonSlice";
import PushSlice from "./PushSlice";
import RegistrationSlice from "./RegistrationSlice";
import DeleteProfileSlice from "./DeleteProfileSlice";
import UpdateProfileSlice from "./UpdateProfileSlice";
import UpdatePasswordSlice from "./UpdatePasswordSlice";

export const store = configureStore({
  reducer: {
    PhotoListSlice,
    PhotoSlice,
    PhotosAuthorSlice,
    AuthSlice,
    AuthMeSlice,
    UploadPhotoSlice,
    AddPhotoSlice,
    DeletePhotoSlice,
    DeletePhotoSliceFromDir,
    ChangeInputSlice,
    UpdatePhotoSlice,
    ButtonSlice,
    PushSlice,
    RegistrationSlice,
    DeleteProfileSlice,
    UpdateProfileSlice,
    UpdatePasswordSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
