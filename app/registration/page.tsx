"use client";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import {
  validationEmail,
  validationPassword,
  validationFirstName,
} from "@/helper/validation";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import HelperText from "@/components/HelperText";
import LabelText from "@/components/LabelText";
import styles from "./registration.module.css";
import TextFieldUploads from "@/components/TextFieldUploads";
import InfoImage from "@/components/InfoImage";
import { fetchUploadUserForRegistration } from "@/store/RegistrationSlice";

type stateProps = {
  [x: string]: string;
};

const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const [registerInput, setRegisterInput] = useState<stateProps>({
    email: "",
    password: "",
    firstName: "",
  });
  const [error, setError] = useState({
    firstName: "",
    email: "",
    password: "",
    fileUpload: "",
  });
  const [checkEmailPass, setCheckEmailPass] = useState(true);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preView, setPreView] = useState("");

  const handleUploadChange = (e: any) => {
    setSelectedFile(null);
    setSelectedFile(e.target.files[0]);
    setError({ ...error, fileUpload: "" });
    setPreView(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (etv: string, etn: string) => {
    setRegisterInput({
      ...registerInput,
      [etn]: etv,
    });
    setError({
      ...error,
      firstName: "",
      email: "",
      password: "",
      fileUpload: "",
    });
    setCheckEmailPass(true);
  };
  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.target.name;
    setRegisterInput({
      ...registerInput,
      [key]: "",
    });
  };

  const handleBlur = (etn: string): void => {
    if (etn === "email") {
      if (validationEmail(registerInput.email) === false) {
        setError({ ...error, [etn]: "Не валидный email" });
      }
    }
    if (etn === "password") {
      if (validationPassword(registerInput.password) === false) {
        setError({ ...error, [etn]: "Пароль от 5 до 8 символов" });
      }
    }

    if (etn === "firstName") {
      if (validationFirstName(registerInput.firstName) === false) {
        setError({ ...error, [etn]: "Имя от 3 до 10 символов" });
      }
    }
  };

  const checkRegistration = (e: any) => {
    e.preventDefault();
    if (
      validationPassword(registerInput.password) === false ||
      validationEmail(registerInput.email) === false ||
      validationFirstName(registerInput.firstName) === false
    ) {
      setCheckEmailPass(false);
      return;
    }

    let dataRegistration = {
      fileName: selectedFile,
      email: registerInput.email,
    };
    dispatch(fetchUploadUserForRegistration(dataRegistration));
    setSelectedFile(null);
    setRegisterInput({
      ...registerInput,
      email: "",
      password: "",
      firstName: "",
    });
    setPreView("");
  };

  return (
    <div className={styles.container} style={{ marginBottom: "200px" }}>
      <TextFieldUploads typeText={"file"} funcChange={handleUploadChange} />
      <form>
        <div>
          <HelperText text={checkEmailPass ? "" : "Данные некорректны"} />
          <LabelText text={"имя"} />
          <TextField
            typeText={"text"}
            valueText={registerInput.firstName}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="firstName"
            idText={"firstname"}
            funcBlur={handleBlur}
          />
          <HelperText text={error.firstName === "" ? null : error.firstName} />
          <LabelText text={"Электронная почта"} />
          <TextField
            typeText={"text"}
            valueText={registerInput.email}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="email"
            idText={"email"}
            funcBlur={handleBlur}
          />
          <HelperText text={error.email === "" ? null : error.email} />
          <LabelText text={"Пароль"} />
          <TextField
            typeText={"password"}
            valueText={registerInput.password}
            funcChange={handleChange}
            funcFocus={handleFocus}
            nameText="password"
            idText={"pass"}
            funcBlur={handleBlur}
          />
          <HelperText text={error.password === "" ? null : error.password} />
        </div>
        <Button text={"войти"} funcClick={checkRegistration} />
      </form>
      <div>
        {selectedFile && <InfoImage info={selectedFile} preView={preView} />}
      </div>
    </div>
  );
};

export default RegistrationPage;
