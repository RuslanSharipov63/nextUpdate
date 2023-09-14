"use client";
import { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ModalWindowUpdateProfile from "./ModalWindowUpdateProfile";
import { validationEmail, validationFirstName } from "@/helper/validation";
import {
  fetchUpdateProfile,
  fetchUpdateUploadPhotoUser,
} from "@/store/UpdateProfileSlice";
import { changeDisabledButton } from "@/store/ButtonSlice";
import { fetchAuthMe } from "@/store/AuthMeSlice";


type ModalWindowUpdateProfilePropsContainer = {
  id: string;
  avatarUrl: string;
  email: string;
  fullName: string;
  closeModalWindowUpdateProfile: () => void;
};

type stateProps = {
  [x: string]: string;
};

const ModalWindowUpdateProfileContainer: FC<
  ModalWindowUpdateProfilePropsContainer
> = ({ id, avatarUrl, email, fullName, closeModalWindowUpdateProfile }) => {
  const dispatch = useAppDispatch();
  const [checkEmailPass, setCheckEmailPass] = useState(true);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preView, setPreView] = useState("");
  const [loader, setLoader] = useState(false);

  const [registerInput, setRegisterInput] = useState<stateProps>({
    email: email,
    firstName: fullName,
  });

  const { success, loading, fileUrl } = useAppSelector(
    (state) => state.UpdateProfileSlice
  );
  const { disabledValueUpdate } = useAppSelector(state => state.ButtonSlice)
  const handleUploadChange = (e: any) => {
    setSelectedFile(null);
    setSelectedFile(e.target.files[0]);
    setPreView(URL.createObjectURL(e.target.files[0]));
  };

  const checkUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      validationEmail(registerInput.email) === false ||
      validationFirstName(registerInput.firstName) === false
    ) {
      setCheckEmailPass(false);
      return;
    }
    let dataUserUpdate = {
      id: id,
      fullName: registerInput.firstName,
      email: registerInput.email,
      avatarUrl: selectedFile ? selectedFile.name : avatarUrl,
    };
    dispatch(fetchUpdateProfile(dataUserUpdate));
    dispatch(changeDisabledButton('disabledValueUpdate'))
    setLoader(true);
  };

  useEffect(() => {
    if (success.success) {
      let dataUserUpdatePhoto = {
        id: id,
        file: selectedFile,
      };
      dispatch(fetchUpdateUploadPhotoUser(dataUserUpdatePhoto));
      return;
    }
  }, [success.success]);

  useEffect(() => {
    if (fileUrl.fileUrl === "ok") {
      setLoader(false);
      dispatch(changeDisabledButton('disabledValueUpdate'));
      dispatch(fetchAuthMe());
      return;
    }
  }, [fileUrl.fileUrl]);

  const handleChange = (etv: string, etn: string) => {
    setRegisterInput({
      ...registerInput,
      [etn]: etv,
    });
    setCheckEmailPass(true);
  };

  return (
    <>
      <ModalWindowUpdateProfile
        id={id}
        avatarUrl={avatarUrl}
        email={registerInput.email}
        fullName={registerInput.firstName}
        closeModalWindowUpdateProfile={closeModalWindowUpdateProfile}
        preView={preView}
        funcChange={handleChange}
        funcUploadChange={handleUploadChange}
        funcClick={checkUpdate}
        checkEmailPass={checkEmailPass}
        loader={loader}
        fileUrl={fileUrl.fileUrl}
        disabled={disabledValueUpdate}
      />
    </>
  );
};

export default ModalWindowUpdateProfileContainer;
