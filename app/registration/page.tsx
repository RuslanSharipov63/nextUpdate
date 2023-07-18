"use client";
import { useState } from "react";
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

type stateProps = {
  [x: string]: string;
};

const RegistrationPage = () => {
  const [registerInput, setRegisterInput] = useState<stateProps>({
    email: "",
    password: "",
    firstName: "",
  });
  const [error, setError] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [checkEmailPass, setCheckEmailPass] = useState(true);

  const handleChange = (etv: string, etn: string) => {
    setRegisterInput({
      ...registerInput,
      [etn]: etv,
    });
    setError({ ...error, firstName: "", email: "", password: "" });
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

  const checkAuth = (e: any) => {
    e.preventDefault();
    if (
      validationPassword(registerInput.password) === false ||
      validationEmail(registerInput.email) === false ||
      validationFirstName(registerInput.firstName) === false
    ) {
      setCheckEmailPass(false);
      return;
    }
    alert("Вход разрешен");
  };

  return (
    <div className={styles.container} style={{ marginBottom: "200px" }}>
      <div></div>
      <form>
        <div>
          <HelperText text={checkEmailPass ? "" : "Данные некорректны"} />
          <LabelText text={'имя'} />
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
          <LabelText text={'Электронная почта'} />
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
          <LabelText text={'Пароль'} />
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
        <Button text={"войти"} funcClick={checkAuth} />
      </form>
      <div></div>
    </div>
  );
};

export default RegistrationPage;
