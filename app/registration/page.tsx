"use client"
import { useState } from "react";
import { validationEmail, validationPassword } from "@/helper/validation";
import TextField from "@/components/TextField";

const RegistrationPage = () => {
  const [registerInput, setRegisterInput] = useState({
    email: "Email",
    password: "",
    firstName: "имя",
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
  const handleFocus = (etn: string) => {
    setRegisterInput({
      ...registerInput,
      [etn]: "",
    });
  };

  const handleBlur = (e: any): void => {
    if (validationEmail(registerInput.email) === false) {
      setError({ ...error, email: "Не валидный email" });
    }
  };
  return (
    <>
      <p>
        <label htmlFor="firstname">Имя</label>
      </p>
      <TextField
        typeText={"text"}
        valueText={registerInput.firstName}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="firstName"
        idText={"firstname"}
        funcBlur={handleBlur}
      />
      <label htmlFor="email">Электронная почта</label>
      <TextField
        typeText={"text"}
        valueText={registerInput.email}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="email"
        idText={"email"}
        funcBlur={handleBlur}
      />
      <p>
        <label htmlFor="password">Пароль</label>
      </p>
      <TextField
        typeText={"password"}
        valueText={registerInput.password}
        funcChange={handleChange}
        funcFocus={handleFocus}
        nameText="password"
        idText={"pass"}
        funcBlur={handleBlur}
      />
    </>
  );
};

export default RegistrationPage;
